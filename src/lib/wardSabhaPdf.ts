// Ward Sabha PDF generation utilities
// Generates agenda and summary PDFs as downloadable blobs

function createPdfBlob(lines: string[]): Blob {
  // Simple text-based PDF generator (no external deps)
  const content = lines.join('\n');
  const pdfContent = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
4 0 obj
<</Length ${content.length + 200}>>
stream
BT
/F1 14 Tf
50 740 Td
14 TL
${lines.map(l => `(${l.replace(/[()\\]/g, '\\$&')}) '`).join('\n')}
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000206 00000 n 
trailer<</Size 6/Root 1 0 R>>
startxref
${500 + content.length}
%%EOF`;

  return new Blob([pdfContent], { type: 'application/pdf' });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadWardSabhaAgenda(wardName = 'Ward 148', date = '21 Dec 2024') {
  const lines = [
    'Ward Sabha Meeting Agenda',
    `${wardName} - Bengaluru`,
    '',
    `Date: ${date}`,
    'Location: Community Hall',
    '',
    'Agenda',
    '',
    '1. Review of previous meeting decisions',
    '2. Updates on ward infrastructure works',
    '3. Budget allocations for upcoming projects',
    '4. Citizen proposals and feedback',
    '5. Open discussion',
    '',
    'Data from Citizen Reports:',
    '  - Road pothole complaints: 54 reports',
    '  - Garbage complaints: 32 reports',
    '  - Citizen proposals: 6 submitted',
  ];

  const blob = createPdfBlob(lines);
  downloadBlob(blob, `ward_sabha_agenda_${date.replace(/\s/g, '_').toLowerCase()}.pdf`);
}

export function downloadWardSabhaSummary(
  wardName = 'Ward 148',
  date = '15 Sep 2024',
  attendance = 82
) {
  const lines = [
    'Ward Sabha Meeting Summary',
    `${wardName} - Bengaluru`,
    '',
    `Meeting Date: ${date}`,
    `Attendance: ${attendance} residents`,
    '',
    'Key Decisions',
    '  - Allocate Rs 25 lakh for road resurfacing',
    '  - Install 40 new streetlights',
    '  - Improve waste collection schedule',
    '',
    'Budget Notes',
    '  Ward infrastructure allocation: Rs 1.2 crore',
    '  Projects approved: Rs 35 lakh',
    '',
    'Action Items',
    '  - Road repair tender issued',
    '  - Streetlight installation scheduled',
    '',
    'Topics Linked to Citizen Data:',
    '  - Road pothole complaints: 54 reports',
    '  - Garbage complaints: 32 reports',
    '  - Citizen proposals: 6 submitted',
  ];

  const blob = createPdfBlob(lines);
  downloadBlob(blob, `ward_sabha_summary_${date.replace(/\s/g, '_').toLowerCase()}.pdf`);
}
