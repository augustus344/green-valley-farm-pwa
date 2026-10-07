export type AnimalKind = 'cow' | 'chicken' | 'sheep' | 'goat';

export interface Animal {
  id: string;
  name: string;
  kind: AnimalKind;
  breed: string;
  tagId: string;
  ageYears: number;
  health: number;
  emoji: string;
  needsCheck?: boolean;
}

export interface FeedingSlot {
  time: string;
  label: string;
  status: 'done' | 'upcoming';
}

export type ZoneId =
  | 'overview'
  | 'house'
  | 'tomato'
  | 'vegetable'
  | 'corn'
  | 'animals'
  | 'water'
  | 'storage';

export interface Zone {
  id: ZoneId;
  name: string;
  chipLabel: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  emoji: string;
}

export const ZONES: Zone[] = [
  { id: 'house', name: 'Farm House', chipLabel: 'Farm House', x: 8, y: 8, w: 28, h: 26, color: '#C45C4A', emoji: '🏠' },
  { id: 'tomato', name: 'Tomato Field', chipLabel: 'Tomato Field', x: 42, y: 6, w: 30, h: 22, color: '#E85A4F', emoji: '🍅' },
  { id: 'vegetable', name: 'Vegetable Field', chipLabel: 'Vegetable Field', x: 76, y: 8, w: 18, h: 28, color: '#5BA85A', emoji: '🥬' },
  { id: 'corn', name: 'Corn Field', chipLabel: 'Corn Field', x: 6, y: 40, w: 34, h: 28, color: '#E8C547', emoji: '🌽' },
  { id: 'animals', name: 'Animal Area', chipLabel: 'Animal Area', x: 46, y: 36, w: 32, h: 32, color: '#8B6B4A', emoji: '🐄' },
  { id: 'water', name: 'Water Tank', chipLabel: 'Water Tank', x: 82, y: 44, w: 14, h: 24, color: '#4A90C4', emoji: '💧' },
  { id: 'storage', name: 'Storage', chipLabel: 'Storage', x: 70, y: 72, w: 24, h: 18, color: '#9B8B6E', emoji: '📦' },
];

export const ANIMALS: Animal[] = [
  { id: '1', name: 'Bella', kind: 'cow', breed: 'Holstein', tagId: 'COW-014', ageYears: 3, health: 96, emoji: '🐄' },
  { id: '2', name: 'Daisy', kind: 'cow', breed: 'Jersey', tagId: 'COW-021', ageYears: 4, health: 89, emoji: '🐄' },
  { id: '3', name: 'Moose', kind: 'cow', breed: 'Angus', tagId: 'COW-007', ageYears: 5, health: 74, emoji: '🐂', needsCheck: true },
  { id: '4', name: 'Clover', kind: 'cow', breed: 'Holstein', tagId: 'COW-033', ageYears: 2, health: 98, emoji: '🐄' },
  { id: '5', name: 'Maple', kind: 'cow', breed: 'Guernsey', tagId: 'COW-019', ageYears: 6, health: 91, emoji: '🐄' },
  { id: '6', name: 'Henrietta', kind: 'chicken', breed: 'Rhode Island', tagId: 'CHK-101', ageYears: 1, health: 97, emoji: '🐔' },
  { id: '7', name: 'Penny', kind: 'chicken', breed: 'Leghorn', tagId: 'CHK-102', ageYears: 2, health: 94, emoji: '🐔' },
  { id: '8', name: 'Clucky', kind: 'chicken', breed: 'Orpington', tagId: 'CHK-103', ageYears: 1, health: 99, emoji: '🐔' },
  { id: '9', name: 'Nugget', kind: 'chicken', breed: 'Sussex', tagId: 'CHK-104', ageYears: 3, health: 88, emoji: '🐔' },
  { id: '10', name: 'Woolly', kind: 'sheep', breed: 'Merino', tagId: 'SHP-201', ageYears: 3, health: 95, emoji: '🐑' },
  { id: '11', name: 'Fluffy', kind: 'sheep', breed: 'Suffolk', tagId: 'SHP-202', ageYears: 2, health: 92, emoji: '🐑' },
  { id: '12', name: 'Cloud', kind: 'sheep', breed: 'Dorset', tagId: 'SHP-203', ageYears: 4, health: 90, emoji: '🐑' },
  { id: '13', name: 'Billy', kind: 'goat', breed: 'Alpine', tagId: 'GOT-301', ageYears: 2, health: 93, emoji: '🐐' },
  { id: '14', name: 'Nanny', kind: 'goat', breed: 'Nubian', tagId: 'GOT-302', ageYears: 3, health: 96, emoji: '🐐' },
  { id: '15', name: 'Pepper', kind: 'goat', breed: 'Boer', tagId: 'GOT-303', ageYears: 1, health: 98, emoji: '🐐' },
  { id: '16', name: 'Shadow', kind: 'goat', breed: 'Alpine', tagId: 'GOT-304', ageYears: 4, health: 87, emoji: '🐐' },
];

export const FEEDING_SLOTS: FeedingSlot[] = [
  { time: '06:00', label: 'Hay & silage', status: 'done' },
  { time: '12:00', label: 'Grain mix', status: 'done' },
  { time: '18:00', label: 'Evening feed', status: 'upcoming' },
];

export const QUICK_STATS = [
  { label: 'Crops', value: 12, emoji: '🌱' },
  { label: 'Animals', value: 48, emoji: '🐄' },
  { label: 'Soil Moisture', value: 72, suffix: '%', emoji: '💧' },
  { label: 'Harvest', value: 1280, suffix: ' kg', emoji: '🌾' },
];

export const CATEGORY_COUNTS: Record<AnimalKind, number> = {
  cow: 18,
  chicken: 20,
  sheep: 6,
  goat: 4,
};

export const ZONE_DETAILS: Record<string, Record<string, string | number>> = {
  house: { size: '180 m²', type: 'Barn + office', team: '4 workers', built: '2019' },
  tomato: { status: 'Excellent', growth: 78, health: 94, soil: 81 },
  vegetable: { status: 'Great', growth: 88, crops: 'Lettuce + Carrots', soil: 85 },
  corn: { status: 'Good', growth: 70, health: 88, soil: 76 },
  animals: { count: 48, health: 96, nextFeed: '6 PM' },
  water: { level: 82, stored: '8,200 L', usedToday: '1,240 L' },
  storage: { capacity: '92%', items: 'Feed, tools, seed' },
};
