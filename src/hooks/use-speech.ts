/**
 * Global speech manager — enforces single-active-reader across the entire app.
 * 
 * Usage:
 *   const { speak, stop, isSpeaking, activeId } = useSpeech();
 *   speak('my-unique-id', 'Text to read');   // starts or toggles
 *   stop();                                   // stops any active speech
 *   isSpeaking('my-unique-id');               // true if this ID is active
 */

let currentId: string | null = null;
let listeners: Set<() => void> = new Set();

function notify() {
  listeners.forEach((fn) => fn());
}

/** Stop whatever is currently being read. */
export function globalStopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  currentId = null;
  notify();
}

/** Start reading text. Automatically stops any previous speech. */
export function globalSpeak(id: string, text: string, lang = 'en-US') {
  // Stop any current speech first
  globalStopSpeech();

  if (!('speechSynthesis' in window)) return;

  currentId = id;
  notify();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.onend = () => {
    if (currentId === id) {
      currentId = null;
      notify();
    }
  };
  utterance.onerror = () => {
    if (currentId === id) {
      currentId = null;
      notify();
    }
  };
  window.speechSynthesis.speak(utterance);
}

/** Toggle: if this id is speaking, stop; otherwise start. */
export function globalToggleSpeech(id: string, text: string, lang = 'en-US') {
  if (currentId === id) {
    globalStopSpeech();
  } else {
    globalSpeak(id, text, lang);
  }
}

export function getActiveSpeechId(): string | null {
  return currentId;
}

// ── React hook ──

import { useSyncExternalStore, useCallback, useEffect } from 'react';

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

function getSnapshot() {
  return currentId;
}

export function useSpeech() {
  const activeId = useSyncExternalStore(subscribe, getSnapshot);

  const isSpeaking = useCallback(
    (id: string) => activeId === id,
    [activeId],
  );

  return {
    /** Toggle speech for a given id/text pair */
    toggle: globalToggleSpeech,
    /** Start speech (stops any previous) */
    speak: globalSpeak,
    /** Stop all speech */
    stop: globalStopSpeech,
    /** Check if a specific id is currently speaking */
    isSpeaking,
    /** The currently active speech id, or null */
    activeId,
  };
}

/**
 * Hook that stops speech when the component unmounts.
 * Use in modals/drawers that have read-aloud buttons.
 */
export function useStopSpeechOnUnmount() {
  useEffect(() => {
    return () => { globalStopSpeech(); };
  }, []);
}
