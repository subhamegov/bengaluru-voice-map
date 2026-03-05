// Bengaluru (BBMP) Administrative Hierarchy
// Zones → Wards → Areas

export interface Zone {
  name: string;
}

export interface Ward {
  code: string;
  name: string;
  zones: Zone[];
}

export interface SubCounty {
  name: string;
  wards: Ward[];
}

// BBMP has 8 zones, each containing multiple wards
// Using real BBMP ward names and zone structure
export const BENGALURU_ZONES: SubCounty[] = [
  {
    name: "South Zone",
    wards: [
      { code: "JAYANAGAR", name: "Jayanagar", zones: [{ name: "Jayanagar 4th Block" }, { name: "Jayanagar 9th Block" }, { name: "Ashoka Pillar" }] },
      { code: "JP_NAGAR", name: "JP Nagar", zones: [{ name: "JP Nagar 1st Phase" }, { name: "JP Nagar 6th Phase" }, { name: "Sarakki" }] },
      { code: "BASAVANAGUDI", name: "Basavanagudi", zones: [{ name: "Bull Temple Road" }, { name: "Gandhi Bazaar" }, { name: "National College" }] },
      { code: "HANUMANTHANAGAR", name: "Hanumanthanagar", zones: [{ name: "Hanumanthanagar" }, { name: "Gavipuram" }] },
      { code: "VISHVESHWARAPURAM", name: "Vishveshwarapuram", zones: [{ name: "Vishveshwarapuram" }, { name: "Siddapura" }] },
      { code: "PADMANABHANAGAR", name: "Padmanabhanagar", zones: [{ name: "Padmanabhanagar" }, { name: "ISRO Layout" }] },
      { code: "BTM_LAYOUT", name: "BTM Layout", zones: [{ name: "BTM 1st Stage" }, { name: "BTM 2nd Stage" }, { name: "Madiwala" }] },
      { code: "BANASHANKARI", name: "Banashankari", zones: [{ name: "Banashankari 2nd Stage" }, { name: "Banashankari 3rd Stage" }, { name: "Kathriguppe" }] },
    ]
  },
  {
    name: "West Zone",
    wards: [
      { code: "RAJAJINAGAR", name: "Rajajinagar", zones: [{ name: "Rajajinagar 1st Block" }, { name: "Rajajinagar 4th Block" }] },
      { code: "VIJAYANAGAR", name: "Vijayanagar", zones: [{ name: "Vijayanagar" }, { name: "RPC Layout" }] },
      { code: "BASAVESHWARANAGAR", name: "Basaveshwaranagar", zones: [{ name: "Basaveshwaranagar" }, { name: "HMT Layout" }] },
      { code: "KAMAKSHIPALYA", name: "Kamakshipalya", zones: [{ name: "Kamakshipalya" }, { name: "Magadi Road" }] },
      { code: "KENGERI", name: "Kengeri", zones: [{ name: "Kengeri" }, { name: "Kengeri Satellite Town" }] },
      { code: "RAJARAJESHWARINAGAR", name: "Rajarajeshwarinagar", zones: [{ name: "RR Nagar" }, { name: "Ideal Homes" }] },
      { code: "NAGARBHAVI", name: "Nagarbhavi", zones: [{ name: "Nagarbhavi 1st Stage" }, { name: "Nagarbhavi 2nd Stage" }] },
    ]
  },
  {
    name: "East Zone",
    wards: [
      { code: "INDIRANAGAR", name: "Indiranagar", zones: [{ name: "Indiranagar 1st Stage" }, { name: "100 Feet Road" }, { name: "CMH Road" }] },
      { code: "CV_RAMAN_NAGAR", name: "CV Raman Nagar", zones: [{ name: "CV Raman Nagar" }, { name: "New Thippasandra" }] },
      { code: "ULSOOR", name: "Ulsoor", zones: [{ name: "Ulsoor" }, { name: "Ulsoor Lake" }, { name: "Halasuru" }] },
      { code: "SHIVAJINAGAR", name: "Shivajinagar", zones: [{ name: "Commercial Street" }, { name: "Russell Market" }] },
      { code: "HOYSALANAGAR", name: "Hoysalanagar", zones: [{ name: "Hoysalanagar" }, { name: "Frazer Town" }] },
      { code: "JEEVAN_BHIMA_NAGAR", name: "Jeevan Bhima Nagar", zones: [{ name: "Jeevan Bhima Nagar" }, { name: "HAL 2nd Stage" }] },
    ]
  },
  {
    name: "North Zone",
    wards: [
      { code: "MALLESHWARAM", name: "Malleshwaram", zones: [{ name: "Malleshwaram 8th Cross" }, { name: "Margosa Road" }, { name: "Sampige Road" }] },
      { code: "SADASHIVANAGAR", name: "Sadashivanagar", zones: [{ name: "Sadashivanagar" }, { name: "Palace Orchards" }] },
      { code: "HEBBAL", name: "Hebbal", zones: [{ name: "Hebbal" }, { name: "Kempapura" }] },
      { code: "RT_NAGAR", name: "RT Nagar", zones: [{ name: "RT Nagar" }, { name: "HBR Layout" }] },
      { code: "YESHWANTHPUR", name: "Yeshwanthpur", zones: [{ name: "Yeshwanthpur" }, { name: "Tumkur Road" }] },
      { code: "MATHIKERE", name: "Mathikere", zones: [{ name: "Mathikere" }, { name: "MSR Nagar" }] },
    ]
  },
  {
    name: "Mahadevapura Zone",
    wards: [
      { code: "WHITEFIELD", name: "Whitefield", zones: [{ name: "Whitefield Main Road" }, { name: "ITPL" }, { name: "Kadugodi" }] },
      { code: "MARATHAHALLI", name: "Marathahalli", zones: [{ name: "Marathahalli Bridge" }, { name: "Outer Ring Road" }] },
      { code: "BELLANDUR", name: "Bellandur", zones: [{ name: "Bellandur" }, { name: "Bellandur Lake" }] },
      { code: "VARTHUR", name: "Varthur", zones: [{ name: "Varthur" }, { name: "Varthur Lake" }] },
      { code: "HAGADUR", name: "Hagadur", zones: [{ name: "Hagadur" }, { name: "Hoodi" }] },
      { code: "GARUDACHARPALYA", name: "Garudacharpalya", zones: [{ name: "Garudacharpalya" }, { name: "Mahadevapura" }] },
    ]
  },
  {
    name: "Bommanahalli Zone",
    wards: [
      { code: "HSR_LAYOUT", name: "HSR Layout", zones: [{ name: "HSR Sector 1" }, { name: "HSR Sector 7" }] },
      { code: "KORAMANGALA", name: "Koramangala", zones: [{ name: "Koramangala 4th Block" }, { name: "Koramangala 8th Block" }, { name: "Forum Mall" }] },
      { code: "BOMMANAHALLI", name: "Bommanahalli", zones: [{ name: "Bommanahalli" }, { name: "Hongasandra" }] },
      { code: "BEGUR", name: "Begur", zones: [{ name: "Begur" }, { name: "Arekere" }] },
      { code: "ELECTRONIC_CITY", name: "Electronic City", zones: [{ name: "Electronic City Phase 1" }, { name: "Electronic City Phase 2" }] },
      { code: "SINGASANDRA", name: "Singasandra", zones: [{ name: "Singasandra" }, { name: "Hosur Road" }] },
    ]
  },
  {
    name: "Dasarahalli Zone",
    wards: [
      { code: "DASARAHALLI", name: "Dasarahalli", zones: [{ name: "Dasarahalli" }, { name: "Jalahalli" }] },
      { code: "PEENYA", name: "Peenya", zones: [{ name: "Peenya Industrial Area" }, { name: "Peenya 2nd Stage" }] },
      { code: "VIDYARANYAPURA", name: "Vidyaranyapura", zones: [{ name: "Vidyaranyapura" }, { name: "BEL Layout" }] },
      { code: "LAGGERE", name: "Laggere", zones: [{ name: "Laggere" }, { name: "Chowdeshwari Nagar" }] },
      { code: "NAGAPURA", name: "Nagapura", zones: [{ name: "Nagapura" }, { name: "Subramanyanagar" }] },
    ]
  },
  {
    name: "Yelahanka Zone",
    wards: [
      { code: "YELAHANKA", name: "Yelahanka", zones: [{ name: "Yelahanka New Town" }, { name: "Yelahanka Old Town" }] },
      { code: "THANISANDRA", name: "Thanisandra", zones: [{ name: "Thanisandra" }, { name: "Nagawara" }] },
      { code: "KOGILU", name: "Kogilu", zones: [{ name: "Kogilu" }, { name: "Jakkur" }] },
      { code: "BYRATHI", name: "Byrathi", zones: [{ name: "Byrathi" }, { name: "Kothanur" }] },
      { code: "SAHAKARNAGAR", name: "Sahakarnagar", zones: [{ name: "Sahakarnagar" }, { name: "Kodigehalli" }] },
    ]
  },
];

// Ward center coordinates for reverse geocoding (Bengaluru)
export const WARD_COORDINATES: { [wardCode: string]: { lat: number; lng: number; subCounty: string } } = {
  // South Zone
  JAYANAGAR: { lat: 12.9250, lng: 77.5938, subCounty: "South Zone" },
  JP_NAGAR: { lat: 12.9100, lng: 77.5850, subCounty: "South Zone" },
  BASAVANAGUDI: { lat: 12.9432, lng: 77.5730, subCounty: "South Zone" },
  HANUMANTHANAGAR: { lat: 12.9380, lng: 77.5640, subCounty: "South Zone" },
  VISHVESHWARAPURAM: { lat: 12.9360, lng: 77.5780, subCounty: "South Zone" },
  PADMANABHANAGAR: { lat: 12.9150, lng: 77.5550, subCounty: "South Zone" },
  BTM_LAYOUT: { lat: 12.9166, lng: 77.6101, subCounty: "South Zone" },
  BANASHANKARI: { lat: 12.9255, lng: 77.5468, subCounty: "South Zone" },

  // West Zone
  RAJAJINAGAR: { lat: 12.9900, lng: 77.5550, subCounty: "West Zone" },
  VIJAYANAGAR: { lat: 12.9700, lng: 77.5370, subCounty: "West Zone" },
  BASAVESHWARANAGAR: { lat: 12.9880, lng: 77.5390, subCounty: "West Zone" },
  KAMAKSHIPALYA: { lat: 12.9830, lng: 77.5200, subCounty: "West Zone" },
  KENGERI: { lat: 12.9100, lng: 77.4850, subCounty: "West Zone" },
  RAJARAJESHWARINAGAR: { lat: 12.9200, lng: 77.5100, subCounty: "West Zone" },
  NAGARBHAVI: { lat: 12.9600, lng: 77.5100, subCounty: "West Zone" },

  // East Zone
  INDIRANAGAR: { lat: 12.9784, lng: 77.6408, subCounty: "East Zone" },
  CV_RAMAN_NAGAR: { lat: 12.9850, lng: 77.6600, subCounty: "East Zone" },
  ULSOOR: { lat: 12.9800, lng: 77.6200, subCounty: "East Zone" },
  SHIVAJINAGAR: { lat: 12.9850, lng: 77.6050, subCounty: "East Zone" },
  HOYSALANAGAR: { lat: 12.9950, lng: 77.6150, subCounty: "East Zone" },
  JEEVAN_BHIMA_NAGAR: { lat: 12.9700, lng: 77.6500, subCounty: "East Zone" },

  // North Zone
  MALLESHWARAM: { lat: 13.0035, lng: 77.5700, subCounty: "North Zone" },
  SADASHIVANAGAR: { lat: 13.0100, lng: 77.5800, subCounty: "North Zone" },
  HEBBAL: { lat: 13.0358, lng: 77.5970, subCounty: "North Zone" },
  RT_NAGAR: { lat: 13.0200, lng: 77.5950, subCounty: "North Zone" },
  YESHWANTHPUR: { lat: 13.0220, lng: 77.5500, subCounty: "North Zone" },
  MATHIKERE: { lat: 13.0150, lng: 77.5680, subCounty: "North Zone" },

  // Mahadevapura Zone
  WHITEFIELD: { lat: 12.9698, lng: 77.7500, subCounty: "Mahadevapura Zone" },
  MARATHAHALLI: { lat: 12.9591, lng: 77.7009, subCounty: "Mahadevapura Zone" },
  BELLANDUR: { lat: 12.9260, lng: 77.6762, subCounty: "Mahadevapura Zone" },
  VARTHUR: { lat: 12.9400, lng: 77.7400, subCounty: "Mahadevapura Zone" },
  HAGADUR: { lat: 12.9800, lng: 77.7200, subCounty: "Mahadevapura Zone" },
  GARUDACHARPALYA: { lat: 12.9900, lng: 77.7100, subCounty: "Mahadevapura Zone" },

  // Bommanahalli Zone
  HSR_LAYOUT: { lat: 12.9116, lng: 77.6389, subCounty: "Bommanahalli Zone" },
  KORAMANGALA: { lat: 12.9352, lng: 77.6245, subCounty: "Bommanahalli Zone" },
  BOMMANAHALLI: { lat: 12.9010, lng: 77.6280, subCounty: "Bommanahalli Zone" },
  BEGUR: { lat: 12.8800, lng: 77.6300, subCounty: "Bommanahalli Zone" },
  ELECTRONIC_CITY: { lat: 12.8450, lng: 77.6600, subCounty: "Bommanahalli Zone" },
  SINGASANDRA: { lat: 12.8900, lng: 77.6500, subCounty: "Bommanahalli Zone" },

  // Dasarahalli Zone
  DASARAHALLI: { lat: 13.0350, lng: 77.5200, subCounty: "Dasarahalli Zone" },
  PEENYA: { lat: 13.0300, lng: 77.5100, subCounty: "Dasarahalli Zone" },
  VIDYARANYAPURA: { lat: 13.0600, lng: 77.5650, subCounty: "Dasarahalli Zone" },
  LAGGERE: { lat: 13.0200, lng: 77.5100, subCounty: "Dasarahalli Zone" },
  NAGAPURA: { lat: 12.9950, lng: 77.5200, subCounty: "Dasarahalli Zone" },

  // Yelahanka Zone
  YELAHANKA: { lat: 13.1007, lng: 77.5963, subCounty: "Yelahanka Zone" },
  THANISANDRA: { lat: 13.0600, lng: 77.6300, subCounty: "Yelahanka Zone" },
  KOGILU: { lat: 13.0700, lng: 77.5900, subCounty: "Yelahanka Zone" },
  BYRATHI: { lat: 13.0500, lng: 77.6400, subCounty: "Yelahanka Zone" },
  SAHAKARNAGAR: { lat: 13.0600, lng: 77.5800, subCounty: "Yelahanka Zone" },
};

// Helper functions
export function getWardsBySubCounty(subCountyName: string): Ward[] {
  const subCounty = BENGALURU_ZONES.find(sc => sc.name === subCountyName);
  return subCounty?.wards || [];
}

export function getZonesByWard(subCountyName: string, wardCode: string): Zone[] {
  const subCounty = BENGALURU_ZONES.find(sc => sc.name === subCountyName);
  const ward = subCounty?.wards.find(w => w.code === wardCode);
  return ward?.zones || [];
}

export function getWardByCode(wardCode: string): { ward: Ward; subCounty: string } | null {
  for (const zone of BENGALURU_ZONES) {
    const ward = zone.wards.find(w => w.code === wardCode);
    if (ward) {
      return { ward, subCounty: zone.name };
    }
  }
  return null;
}

// Haversine distance
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Reverse geocode to nearest ward
export function reverseGeocodeToWard(lat: number, lng: number): {
  wardCode: string;
  wardName: string;
  subCounty: string;
  zone: string;
} | null {
  let nearestWard: string | null = null;
  let nearestDistance = Infinity;
  let nearestSubCounty = '';

  for (const [wardCode, coords] of Object.entries(WARD_COORDINATES)) {
    const distance = haversineDistance(lat, lng, coords.lat, coords.lng);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestWard = wardCode;
      nearestSubCounty = coords.subCounty;
    }
  }

  if (nearestWard && nearestDistance < 8) {
    const wardInfo = getWardByCode(nearestWard);
    if (wardInfo) {
      const zones = getZonesByWard(nearestSubCounty, nearestWard);
      return {
        wardCode: nearestWard,
        wardName: wardInfo.ward.name,
        subCounty: nearestSubCounty,
        zone: zones.length > 0 ? zones[0].name : ''
      };
    }
  }

  return null;
}
