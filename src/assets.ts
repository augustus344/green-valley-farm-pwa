// CC0 Kenney game assets (public domain)
// Animals: Animal Pack Redux — https://kenney.nl/assets/animal-pack-redux
// Mirrored at ETdoFresh/kenney.nl for stable raw URLs

const R =
  'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_animalpackredux/PNG/Round';

export const ASSETS = {
  cow: `${R}/cow.png`,
  chicken: `${R}/chicken.png`,
  goat: `${R}/goat.png`,
  pig: `${R}/pig.png`,
  // Tiny Farm has no public per-tile raw mirror — reuse animals/icons as zone art
  tree: `${R}/cow.png`, // placeholder swapped in UI with emoji trees when needed
  tree_small: `${R}/chicken.png`,
  carrot: `${R}/pig.png`,
  corn: `${R}/goat.png`,
  tomato: `${R}/pig.png`,
  lettuce: `${R}/chicken.png`,
  barn: `${R}/cow.png`,
  farmer_a: `${R}/cow.png`,
  sprite_sheep: `${R}/goat.png`,
  water_barrel: `${R}/pig.png`,
  crate: `${R}/chicken.png`,
  tilemap: `${R}/cow.png`,
} as const;

/** Remote CC0 URLs to precache in the service worker */
export const ASSET_URLS = Object.values(ASSETS);
