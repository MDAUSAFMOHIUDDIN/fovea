export interface Product {
  id: string;
  slug: string;
  name: string;
  series: string;
  category: 'Optical' | 'Sunglasses' | 'Bespoke Titanium';
  gender: 'Men' | 'Women' | 'Unisex';
  material: string;
  materialType: 'Titanium' | 'Italian Acetate' | 'Hybrid Metal & Acetate' | 'Beta-Titanium';
  frameShape: 'Round' | 'Square' | 'Rectangle' | 'Aviator' | 'Cat Eye' | 'Wayfarer';
  colorFamily: 'Black' | 'Tortoise' | 'Gold' | 'Silver' | 'Crystal' | 'Champagne' | 'Navy';
  dimensions: string;
  lensWidth: number;
  bridgeWidth: number;
  templeLength: number;
  weight: string;
  price: number;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  colors: { name: string; hex: string; accentHex: string }[];
  defaultColor: string;
  badge?: string;
  homeTrialEligible: boolean;
  shortDesc: string;
  editorialStory: string;
  features: string[];
  silhouette: 'round-panto' | 'architectural-square' | 'aviator-wire' | 'crown-panto' | 'geometric-hex' | 'cat-eye-sculpt' | 'classic-wayfarer' | 'slender-rectangle';
  productCode?: string;
  frameWidth?: number;
  lensHeight?: number;
  sideImage?: string;
  foldedImage?: string;
  // High-Resolution Realistic Campaign & Studio Photography
  image: string; // Primary studio product shot on travertine/neutral stone
  hoverImage: string; // Secondary angle: angled/profile shot or frame in motion
  modelImage: string; // Fashion editorial model wearing this silhouette
  detailImage: string; // Close-up macro of hinge, titanium bevel or lens coating
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  aesthetic: string;
  materialHighlight: string;
  itemCount: number;
  featuredProductId: string;
  coverImage: string;
  editorialImage: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string[];
}

export interface FAQItem {
  id: string;
  category: 'Home Trial' | 'Prescription & Lenses' | 'Craftsmanship' | 'Delivery & Returns';
  question: string;
  answer: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'fovea-01',
    slug: 'kyoto-titanium-panto',
    name: 'The Kyoto Panto',
    productCode: 'FOV-SB-802',
    series: 'Architectural Titanium',
    category: 'Optical',
    gender: 'Unisex',
    material: 'Japanese Grade-A Titanium',
    materialType: 'Titanium',
    frameShape: 'Round',
    colorFamily: 'Silver',
    dimensions: '48 — 21 — 145 mm',
    lensWidth: 48,
    bridgeWidth: 21,
    templeLength: 145,
    frameWidth: 138,
    lensHeight: 43,
    weight: '8.4 grams',
    price: 420,
    isNewArrival: false,
    isFeatured: true,
    inStock: true,
    colors: [
      { name: 'Brushed Raw Titanium', hex: '#8C929D', accentHex: '#C5A880' },
      { name: 'Matte Obsidian', hex: '#1C1F26', accentHex: '#3A4252' },
      { name: 'Champagne Bronze', hex: '#A88960', accentHex: '#EAE6DF' },
    ],
    defaultColor: 'Brushed Raw Titanium',
    badge: 'Ultralight 8.4g',
    homeTrialEligible: true,
    shortDesc: 'A flawless balance of historic pantoscopic geometry and featherweight aerospace titanium.',
    editorialStory:
      'Forged in Sabae, Japan—the world epicenter of titanium eyewear mastery. Each frame undergoes 240 distinct cold-milling and hand-buffing steps to achieve featherweight structural rigidity that sits weightlessly across the nasal bridge.',
    features: [
      'Single-piece rimless bridge architecture',
      'Frictionless screwless hinge system',
      'Medical-grade silicone titanium nosepads',
      'Compatible with progressive & high-index lenses',
    ],
    silhouette: 'round-panto',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-02',
    slug: 'aethel-acetate-square',
    name: 'The Aethel Sculpt',
    productCode: 'FOV-VR-410',
    series: 'Mazzucchelli Acetate Sculptures',
    category: 'Optical',
    gender: 'Unisex',
    material: '8mm Italian Bio-Acetate',
    materialType: 'Italian Acetate',
    frameShape: 'Square',
    colorFamily: 'Tortoise',
    dimensions: '50 — 20 — 145 mm',
    lensWidth: 50,
    bridgeWidth: 20,
    templeLength: 145,
    frameWidth: 142,
    lensHeight: 44,
    weight: '24.2 grams',
    price: 380,
    isNewArrival: false,
    isFeatured: true,
    inStock: true,
    colors: [
      { name: 'Vintage Havana Tortoise', hex: '#543D28', accentHex: '#8C673D' },
      { name: 'Smoked Champagne Crystal', hex: '#DDD3BF', accentHex: '#FAF9F6' },
      { name: 'Deep Midnight Navy', hex: '#0C162C', accentHex: '#1A365D' },
    ],
    defaultColor: 'Vintage Havana Tortoise',
    badge: 'Artisanal Block Acetate',
    homeTrialEligible: true,
    shortDesc: 'Bold beveling and sculpted 8mm cured acetate with custom ribbed wire core temples.',
    editorialStory:
      'Milled from slabs of cured Italian cotton-derived Mazzucchelli acetate, aged for four months to prevent deformation. The frame features diamond-faceted temple bevels that catch ambient light with quiet distinction.',
    features: [
      'Hand-filed 45-degree browline chamfer',
      'Visible interior engraved bronze wire core',
      'Five-barrel hand-pinned hinges',
      'High-gloss tumble polish over 72 hours in beechwood chips',
    ],
    silhouette: 'architectural-square',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-03',
    slug: 'solis-aviator-titanium',
    name: 'The Solis Double-Bridge',
    productCode: 'FOV-SB-905',
    series: 'Architectural Titanium',
    category: 'Sunglasses',
    gender: 'Men',
    material: 'Beta-Titanium & Mineral Glass',
    materialType: 'Beta-Titanium',
    frameShape: 'Aviator',
    colorFamily: 'Gold',
    dimensions: '54 — 18 — 145 mm',
    lensWidth: 54,
    bridgeWidth: 18,
    templeLength: 145,
    frameWidth: 144,
    lensHeight: 48,
    weight: '14.1 grams',
    price: 460,
    isNewArrival: true,
    isFeatured: true,
    inStock: true,
    colors: [
      { name: 'Brushed Gold & Olive Gradient', hex: '#C5A880', accentHex: '#42503C' },
      { name: 'Gunmetal & Blue Tint', hex: '#454955', accentHex: '#1A365D' },
      { name: 'Matte Black & Solid Grey', hex: '#1C1F26', accentHex: '#0C162C' },
    ],
    defaultColor: 'Brushed Gold & Olive Gradient',
    badge: 'ZEISS Mineral Glass',
    homeTrialEligible: true,
    shortDesc: 'A sculptural reinterpretation of the classic pilot silhouette with an ultra-fine suspended browline.',
    editorialStory:
      'Engineered with an architectural tension arch that flexes naturally to contour individual facial structures. Fitted with distortion-free ZEISS polarized glass lenses coated with backside anti-reflective protection.',
    features: [
      '100% UVA/UVB optical protection',
      'Hydrophobic and oleophobic dual lens coating',
      'Laser-etched micro logo at the left temple tip',
      'Integrated teardrop cable temple tips',
    ],
    silhouette: 'aviator-wire',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-04',
    slug: 'meridian-crown-panto',
    name: 'The Meridian Crown',
    productCode: 'FOV-VR-520',
    series: 'The Panto Renaissance',
    category: 'Optical',
    gender: 'Unisex',
    material: 'Mazzucchelli Acetate & Titanium Rim',
    materialType: 'Hybrid Metal & Acetate',
    frameShape: 'Round',
    colorFamily: 'Tortoise',
    dimensions: '47 — 22 — 145 mm',
    lensWidth: 47,
    bridgeWidth: 22,
    templeLength: 145,
    frameWidth: 139,
    lensHeight: 42,
    weight: '16.5 grams',
    price: 440,
    isNewArrival: false,
    isFeatured: true,
    inStock: true,
    colors: [
      { name: 'Caramel Amber', hex: '#9C6237', accentHex: '#C5A880' },
      { name: 'Chalk Crystal', hex: '#EDECE6', accentHex: '#8C929D' },
      { name: 'Ink Black Onyx', hex: '#111317', accentHex: '#3A4252' },
    ],
    defaultColor: 'Caramel Amber',
    badge: 'Editorial Favorite',
    homeTrialEligible: true,
    shortDesc: 'French 1940s crown-panto flat top married to modern Japanese precision titanium inner rims.',
    editorialStory:
      'The Crown Panto is the connoisseur’s silhouette. The distinctive flat upper brow adds intellectual presence, while the softly rounded lower eye contour softens facial angles.',
    features: [
      'Dual-material hybrid construction',
      'Custom knurled titanium rim lock',
      'Ergonomic contouring for high bridges',
      'Hand-stamped serial numbering inside temple',
    ],
    silhouette: 'crown-panto',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-05',
    slug: 'aeris-minimal-hex',
    name: 'The Aeris Hexagon',
    productCode: 'FOV-SB-314',
    series: 'Bespoke Minimalist Wires',
    category: 'Bespoke Titanium',
    gender: 'Women',
    material: 'Pure Beta-Titanium Ribbon',
    materialType: 'Beta-Titanium',
    frameShape: 'Round',
    colorFamily: 'Gold',
    dimensions: '49 — 20 — 145 mm',
    lensWidth: 49,
    bridgeWidth: 20,
    templeLength: 145,
    frameWidth: 136,
    lensHeight: 41,
    weight: '7.6 grams',
    price: 490,
    isNewArrival: true,
    isFeatured: true,
    inStock: true,
    colors: [
      { name: 'Polished Rose Gold', hex: '#D8A48F', accentHex: '#FAF9F6' },
      { name: 'Platinum Silver', hex: '#C2C5CD', accentHex: '#8C929D' },
      { name: 'Matte Charcoal', hex: '#2B303A', accentHex: '#0C162C' },
    ],
    defaultColor: 'Polished Rose Gold',
    badge: 'Ultralight 7.6g',
    homeTrialEligible: true,
    shortDesc: 'A faceted hexagonal lens rim constructed from a single continuous ribbon of Japanese beta-titanium.',
    editorialStory:
      'Weighing under eight grams, the Aeris is an exercise in structural reduction. No extraneous hardware exists; the frame achieves strength through its gentle geometric facets.',
    features: [
      'Continuous ribbon titanium wire',
      'Proprietary flex hinge rated for 50,000 cycles',
      'Ultra-thin 1.2mm eyewire thickness',
      'Zero nickel hypoallergenic composition',
    ],
    silhouette: 'geometric-hex',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-06',
    slug: 'valse-cat-eye-acetate',
    name: 'The Valse Sculpt',
    productCode: 'FOV-VR-608',
    series: 'Mazzucchelli Acetate Sculptures',
    category: 'Sunglasses',
    gender: 'Women',
    material: 'Sculpted 10mm Bio-Acetate',
    materialType: 'Italian Acetate',
    frameShape: 'Cat Eye',
    colorFamily: 'Black',
    dimensions: '52 — 19 — 145 mm',
    lensWidth: 52,
    bridgeWidth: 19,
    templeLength: 145,
    frameWidth: 143,
    lensHeight: 45,
    weight: '26.8 grams',
    price: 410,
    isNewArrival: false,
    isFeatured: true,
    inStock: true,
    colors: [
      { name: 'Dark Bordeaux', hex: '#4A1D24', accentHex: '#853241' },
      { name: 'Classic Havana', hex: '#4A3525', accentHex: '#A88960' },
      { name: 'Ivory Bone Crystal', hex: '#EBE7DE', accentHex: '#0C162C' },
    ],
    defaultColor: 'Dark Bordeaux',
    badge: 'Fashion Editorial',
    homeTrialEligible: true,
    shortDesc: 'Dramatic high-temple lift with softened angular facets and rich gradient lenses.',
    editorialStory:
      'Inspired by mid-century avant-garde cinema, the Valse frames the cheekbones with confident architectural planes. Hand-finished over 5 days in northern Italy.',
    features: [
      'Graduated UV400 sun lenses with anti-reflective back',
      'Deep beveled upper browline',
      'Solid bronze temple inlays',
      'Comfort-molded ergonomic bridge',
    ],
    silhouette: 'cat-eye-sculpt',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-07',
    slug: 'linear-wayfarer-acetate',
    name: 'The Linear Wayfarer',
    productCode: 'FOV-VR-230',
    series: 'Mazzucchelli Acetate Sculptures',
    category: 'Sunglasses',
    gender: 'Men',
    material: 'Mazzucchelli Hand-Cured Acetate',
    materialType: 'Italian Acetate',
    frameShape: 'Wayfarer',
    colorFamily: 'Black',
    dimensions: '51 — 21 — 145 mm',
    lensWidth: 51,
    bridgeWidth: 21,
    templeLength: 145,
    frameWidth: 143,
    lensHeight: 44,
    weight: '23.4 grams',
    price: 390,
    isNewArrival: true,
    isFeatured: true,
    inStock: true,
    colors: [
      { name: 'Deep Midnight Onyx', hex: '#111317', accentHex: '#2B303A' },
      { name: 'Dark Amber Havana', hex: '#5B4028', accentHex: '#8C673D' },
      { name: 'Smoked Olive Grey', hex: '#424B43', accentHex: '#FAF9F6' },
    ],
    defaultColor: 'Deep Midnight Onyx',
    badge: 'Iconic Wayfarer Silhouette',
    homeTrialEligible: true,
    shortDesc: 'A rigorous modern proportions update to the mid-century trapezoidal wayfarer profile.',
    editorialStory:
      'Re-engineered with an ultra-flat zero-base front bevel and softened temple flanks. Milled from 8mm dense Italian bio-acetate and hand-burnished for a mirror shine.',
    features: [
      'Polarized Category 3 mineral lenses',
      'Seven-barrel custom anchored German hinges',
      'Beveled interior temple for effortless slide',
      'Hypoallergenic cotton-cellulose core',
    ],
    silhouette: 'classic-wayfarer',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-08',
    slug: 'milano-rectangle-acetate',
    name: 'The Milano Rectangle',
    productCode: 'FOV-VR-712',
    series: 'Mazzucchelli Acetate Sculptures',
    category: 'Optical',
    gender: 'Men',
    material: 'Sculpted Italian Bio-Acetate',
    materialType: 'Italian Acetate',
    frameShape: 'Rectangle',
    colorFamily: 'Tortoise',
    dimensions: '53 — 18 — 145 mm',
    lensWidth: 53,
    bridgeWidth: 18,
    templeLength: 145,
    frameWidth: 144,
    lensHeight: 39,
    weight: '22.1 grams',
    price: 370,
    isNewArrival: false,
    isFeatured: false,
    inStock: true,
    colors: [
      { name: 'Espresso Tortoise', hex: '#4A3319', accentHex: '#C5A880' },
      { name: 'Charcoal Smoke Crystal', hex: '#2C3038', accentHex: '#8C929D' },
      { name: 'Brushed Slate', hex: '#3E4450', accentHex: '#FAF9F6' },
    ],
    defaultColor: 'Espresso Tortoise',
    badge: 'Executive Profile',
    homeTrialEligible: true,
    shortDesc: 'A crisp, low-profile rectangular frame with refined chamfered edges and bespoke temple pins.',
    editorialStory:
      'Engineered for long architectural work sessions and boardroom focus. The horizontal silhouette emphasizes natural jawline structure with understated Italian authority.',
    features: [
      'Low bridge friendly fit',
      'Dual-riveted hinge assemblies',
      'Laser-milled interior weight relief channels',
      'Anti-fog demonstration optics installed',
    ],
    silhouette: 'slender-rectangle',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-09',
    slug: 'lucent-square-beta-titanium',
    name: 'The Lucent Square',
    productCode: 'FOV-SB-440',
    series: 'Bespoke Minimalist Wires',
    category: 'Optical',
    gender: 'Women',
    material: 'Japanese Beta-Titanium Wire',
    materialType: 'Beta-Titanium',
    frameShape: 'Square',
    colorFamily: 'Champagne',
    dimensions: '50 — 19 — 145 mm',
    lensWidth: 50,
    bridgeWidth: 19,
    templeLength: 145,
    frameWidth: 137,
    lensHeight: 42,
    weight: '9.2 grams',
    price: 450,
    isNewArrival: true,
    isFeatured: true,
    inStock: true,
    colors: [
      { name: 'Satin Champagne Gold', hex: '#D6C4A5', accentHex: '#FAF9F6' },
      { name: 'Polished Rose Titanium', hex: '#D1A39B', accentHex: '#C5A880' },
      { name: 'Graphite Shadow', hex: '#343842', accentHex: '#8C929D' },
    ],
    defaultColor: 'Satin Champagne Gold',
    badge: 'New Studio Release',
    homeTrialEligible: true,
    shortDesc: 'A delicate square wireframe with softened corner radii that floats on the cheekbones.',
    editorialStory:
      'Created for those who desire clean structural definition without visual weight. Hand-spun titanium wire from Fukui allows for flexible temple contouring with zero pressure points.',
    features: [
      'Self-adjusting flexible temple arches',
      'Featherweight 9.2g complete frame weight',
      'Electroplated 18k champagne gold finish',
      'Ultra-thin Japanese silicone nosepads',
    ],
    silhouette: 'architectural-square',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-10',
    slug: 'riviera-aviator-hybrid',
    name: 'The Riviera Aviator',
    productCode: 'FOV-VR-890',
    series: 'The Panto Renaissance',
    category: 'Sunglasses',
    gender: 'Unisex',
    material: 'Mazzucchelli Acetate & Japanese Titanium',
    materialType: 'Hybrid Metal & Acetate',
    frameShape: 'Aviator',
    colorFamily: 'Tortoise',
    dimensions: '53 — 18 — 145 mm',
    lensWidth: 53,
    bridgeWidth: 18,
    templeLength: 145,
    frameWidth: 145,
    lensHeight: 47,
    weight: '17.8 grams',
    price: 430,
    isNewArrival: false,
    isFeatured: true,
    inStock: true,
    colors: [
      { name: 'Honey Havana & Gold', hex: '#A87938', accentHex: '#C5A880' },
      { name: 'Smoked Slate & Titanium', hex: '#4A505C', accentHex: '#FAF9F6' },
      { name: 'Midnight Navy & Platinum', hex: '#152136', accentHex: '#8C929D' },
    ],
    defaultColor: 'Honey Havana & Gold',
    badge: 'Coastal Resort Edition',
    homeTrialEligible: true,
    shortDesc: 'A teardrop aviator frame suspended inside sculpted Italian acetate wind-rims.',
    editorialStory:
      'Reminiscent of 1960s Mediterranean speedboats and coastal drives along the Amalfi cliffside. The acetate wind-rims provide peripheral glare blockage while titanium ensures all-day lightness.',
    features: [
      'ZEISS amber polarized lenses',
      'Wind-rim peripheral acetate shielding',
      'Reinforced bridge with laser knurling',
      'Curved comfort temple tips',
    ],
    silhouette: 'aviator-wire',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-11',
    slug: 'aurelia-cat-eye-optical',
    name: 'The Aurelia Sculpt',
    productCode: 'FOV-VR-350',
    series: 'Mazzucchelli Acetate Sculptures',
    category: 'Optical',
    gender: 'Women',
    material: 'Hand-Carved Italian Bio-Acetate',
    materialType: 'Italian Acetate',
    frameShape: 'Cat Eye',
    colorFamily: 'Champagne',
    dimensions: '51 — 18 — 145 mm',
    lensWidth: 51,
    bridgeWidth: 18,
    templeLength: 145,
    frameWidth: 140,
    lensHeight: 43,
    weight: '21.5 grams',
    price: 460,
    isNewArrival: true,
    isFeatured: false,
    inStock: true,
    colors: [
      { name: 'Champagne Crystal Lustre', hex: '#EBE2D1', accentHex: '#C5A880' },
      { name: 'Polished Noir Onyx', hex: '#111317', accentHex: '#3A4252' },
      { name: 'Caramel Tortoise Swirl', hex: '#7D5432', accentHex: '#DDD3BF' },
    ],
    defaultColor: 'Champagne Crystal Lustre',
    badge: 'Atelier Spotlight',
    homeTrialEligible: true,
    shortDesc: 'A sculpted feminine cat-eye with high-facet browlines and polished champagne crystal density.',
    editorialStory:
      'Drawing inspiration from mid-century Milanese couture, the Aurelia lifts the eye line with effortless grace. Each chamfer is hand-filed and burnished to catch ambient gallery lighting.',
    features: [
      'Facet-cut browline light catchers',
      'Five-barrel hand-pinned hinges',
      'Comfort-tapered temple paddles',
      'High-clarity optical demo lenses',
    ],
    silhouette: 'cat-eye-sculpt',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'fovea-12',
    slug: 'bauhaus-wire-rectangle',
    name: 'The Bauhaus Rectangle',
    productCode: 'FOV-SB-101',
    series: 'Architectural Titanium',
    category: 'Bespoke Titanium',
    gender: 'Unisex',
    material: 'Pure Grade-A Aerospace Titanium',
    materialType: 'Titanium',
    frameShape: 'Rectangle',
    colorFamily: 'Silver',
    dimensions: '52 — 19 — 145 mm',
    lensWidth: 52,
    bridgeWidth: 19,
    templeLength: 145,
    frameWidth: 141,
    lensHeight: 40,
    weight: '8.1 grams',
    price: 480,
    isNewArrival: false,
    isFeatured: true,
    inStock: true,
    colors: [
      { name: 'Brushed Platinum', hex: '#C2C5CD', accentHex: '#FAF9F6' },
      { name: 'Matte Gunmetal', hex: '#3B4048', accentHex: '#8C929D' },
      { name: 'Sabae Raw Titanium', hex: '#7D848F', accentHex: '#C5A880' },
    ],
    defaultColor: 'Brushed Platinum',
    badge: 'Mathematical Proportion',
    homeTrialEligible: true,
    shortDesc: 'A rectilinear architectural wireframe distilled to pure lines, zero weld marks, and lasting strength.',
    editorialStory:
      'Rooted in the Dessau Bauhaus principle of uncompromised functional purity. Machined from a single block of aerospace titanium with cold-milled tension joints and frictionless movement.',
    features: [
      'Single-block monobloc titanium bridge',
      'Zero-weld structural integrity',
      'Frictionless patented screwless hinge',
      'Medical grade hypoallergenic skin contact',
    ],
    silhouette: 'slender-rectangle',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85',
    modelImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=85',
    sideImage: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85',
    foldedImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-01',
    slug: 'architectural-titanium',
    title: 'The Architectural Titanium Series',
    subtitle: 'Cold-Milled in Sabae, Japan',
    description:
      'Aerospace-grade pure titanium shaped with mathematical discipline. Impossibly lightweight, zero oxidation, and engineered for lifetime wear.',
    aesthetic: 'Geometric reduction, featherweight lines, precision chamfers.',
    materialHighlight: 'Japanese Grade-A Titanium & Beta-Titanium alloys',
    itemCount: 14,
    featuredProductId: 'fovea-01',
    coverImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    editorialImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'col-02',
    slug: 'acetate-sculptures',
    title: 'Mazzucchelli Acetate Sculptures',
    subtitle: 'Hand-Carved in Varese, Italy',
    description:
      'Custom block acetate cured for four months. Substantial 8mm to 10mm profiles hand-buffed in organic beechwood chips for deep liquid lustre.',
    aesthetic: 'Substantial tactile volume, deep tortoiseshells, light-refracting bevels.',
    materialHighlight: 'Italian Cotton-Derived Bio-Acetate',
    itemCount: 18,
    featuredProductId: 'fovea-02',
    coverImage: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85',
    editorialImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'col-03',
    slug: 'the-panto-renaissance',
    title: 'The Panto Renaissance',
    subtitle: 'Classic Intellectual Profiles Reimagined',
    description:
      'From 1930s Oxford halls to modern creative directors. The pantoscopic and crown-panto geometry perfected with modern hinge engineering.',
    aesthetic: 'Warm amber tones, keyhole bridges, and timeless balance.',
    materialHighlight: 'Hybrid Acetate & Titanium Inner Rims',
    itemCount: 11,
    featuredProductId: 'fovea-04',
    coverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
    editorialImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'col-04',
    slug: 'bespoke-minimalist-wires',
    title: 'Bespoke Minimalist Wires',
    subtitle: 'Subtle Structural Silhouettes',
    description:
      'Fine wireframes distilled to their pure outline. Designed to disappear on the face while framing your gaze with quiet sophistication.',
    aesthetic: 'Barely-there presence, satin rose gold, brushed platinum, graphite.',
    materialHighlight: 'Ultralight Ribbon Titanium',
    itemCount: 9,
    featuredProductId: 'fovea-05',
    coverImage: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85',
    editorialImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'col-05',
    slug: 'sun-and-mineral-glass',
    title: 'Sun & Mineral Glass Editions',
    subtitle: 'Optics by Carl Zeiss Precision',
    description:
      'Dedicated sun protection crafted with medical-grade polarization, dual anti-reflective backside shields, and pure glass clarity.',
    aesthetic: 'Rich amber gradients, deep bottle greens, coastal elegance.',
    materialHighlight: 'ZEISS Polarized Mineral Glass & Lightweight Alloys',
    itemCount: 12,
    featuredProductId: 'fovea-03',
    coverImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
    editorialImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'art-01',
    slug: 'the-craft-of-sabae-titanium',
    title: 'The Unyielding Precision of Sabae Titanium',
    subtitle: 'A journey into the Japanese mountain valley that perfected optical metalworking.',
    category: 'Craftsmanship',
    date: 'September 2026',
    readTime: '5 min read',
    excerpt:
      'Why Sabae, Fukui remains the undisputed world capital for cold-milling and hand-beveling medical-grade titanium spectacles.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
    content: [
      'In the snowy valleys of Fukui Prefecture, Japanese craftsmen have worked metal for over eight centuries. In the early 1980s, Sabae artisans achieved what global metallurgy considered impossible: mastering the difficult cold-press moulding of pure titanium for spectacle frames.',
      'Titanium is reactive, stubborn, and resists standard machining. It requires precision vacuum brazing, diamond-coated micro-milling bits, and an intimate tactile understanding of metallurgical stress lines.',
      'At Fovea, every titanium temple and bridge is shaped in Sabae over 240 distinct manual steps. The result is an optical instrument that weighs less than two coins, will never tarnish, and conforms seamlessly to your facial contours.',
    ],
  },
  {
    id: 'art-02',
    slug: 'cotton-to-clarity-mazzucchelli-acetate',
    title: 'From Cotton Flower to Cured Clarity: The Story of Bio-Acetate',
    subtitle: 'Understanding the organic origins of premium cellulose acetate.',
    category: 'Materials',
    date: 'August 2026',
    readTime: '4 min read',
    excerpt:
      'Unlike petrol-based injection plastics, natural cellulose acetate breathes, warms against your skin, and holds rich pigment depth for decades.',
    image: 'https://images.unsplash.com/photo-1577744486770-020ab432da65?auto=format&fit=crop&w=1200&q=85',
    content: [
      'True luxury eyewear begins in organic cotton fields and sustainably harvested wood pulp. Cellulose acetate is synthesized from these natural polymers, mixed with organic plasticizers, and extruded into thick, vibrant blocks.',
      'In Varese, Italy, Mazzucchelli masters have mixed proprietary dye formulas since 1849. The sheets are layered, compressed, and cured in temperature-regulated vaults for up to four months to stabilize the material against warping.',
      'When you hold a Fovea frame, you feel that organic lineage: a smooth, warm tactile density that mass-produced plastic simply cannot replicate.',
    ],
  },
  {
    id: 'art-03',
    slug: 'the-optics-of-vision-zeiss-partnership',
    title: 'Clarity Without Compromise: ZEISS Optical Precision',
    subtitle: 'How custom surfacing and anti-reflective nanocoatings elevate daily visual comfort.',
    category: 'Optics & Vision',
    date: 'July 2026',
    readTime: '6 min read',
    excerpt:
      'A great frame is only as transformative as the optical clarity it delivers to the human retina. An overview of our tailored lens coatings.',
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1200&q=85',
    content: [
      'The human eye processes 80% of all sensory impressions through a millimeter-wide focal zone known as the fovea centralis. Our brand name is an intentional tribute to that miracle of sight.',
      'Every Fovea prescription is custom-surfaced using freeform digital diamond cutters, calculating lens curves down to the hundredth of a diopter. Our anti-reflective multi-coatings repel water, skin oils, and glare, offering maximum luminous transmittance in all lighting conditions.',
    ],
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'Home Trial',
    question: 'How does the Fovea Complimentary Home Trial work?',
    answer:
      'Select any 4 frames from our collection. We ship our custom velvet presentation case directly to your doorstep with complimentary express courier delivery. Take 5 full days to try them with your wardrobe, consult family, or show your optician. When finished, place the prepaid return label on the box and hand it to the courier. If you find your match, enter your prescription online and we craft your custom lenses.',
  },
  {
    id: 'faq-02',
    category: 'Home Trial',
    question: 'Is there any cost or deposit for the Home Trial?',
    answer:
      'The Home Trial is completely complimentary. We hold a temporary $1 security verification on your credit card which is immediately released upon receipt of the trial box. Return shipping is 100% pre-paid.',
  },
  {
    id: 'faq-03',
    category: 'Prescription & Lenses',
    question: 'What types of optical prescriptions can you craft?',
    answer:
      'We craft Single Vision, Digital Relax, Office Computer lenses, High-Index (1.67 and 1.74 ultra-thin), and Progressive multifocal lenses in partnership with Carl Zeiss Vision. We can also fulfill prism prescriptions and polarized sun tints with full UV400 defense.',
  },
  {
    id: 'faq-04',
    category: 'Prescription & Lenses',
    question: 'How do I submit my prescription and pupillary distance (PD)?',
    answer:
      'You can upload a photo of your doctor’s prescription during checkout, email it to concierge@fovea.com, or send it via our encrypted WhatsApp concierge line. If your PD is not listed, our opticians will provide a digital calibration tool or verify it via a high-resolution selfie.',
  },
  {
    id: 'faq-05',
    category: 'Craftsmanship',
    question: 'Where are Fovea frames manufactured?',
    answer:
      'Our titanium collections are hand-milled and finished in Sabae, Japan. Our sculpted bio-acetate frames are carved from Mazzucchelli 1849 acetate sheets in northern Italy. All lens cutting, edging, and final optical inspection occur in our private optical laboratory.',
  },
  {
    id: 'faq-06',
    category: 'Delivery & Returns',
    question: 'What is your warranty and satisfaction guarantee?',
    answer:
      'Every Fovea frame includes a 2-year comprehensive craftsmanship warranty covering hinges, welds, and titanium structures, as well as a 30-day no-questions-asked return policy. We also provide complimentary lifetime ultrasonic cleaning and screw adjustments at any authorized partner atelier.',
  },
];

export const OFFERS = [
  {
    id: 'offer-01',
    badge: 'Signature Privilege',
    title: 'The 4-Frame Home Trial Suite',
    description:
      'Experience 4 curated optical or sun frames in the quiet comfort of your home for 5 full days. Complimentary round-trip courier shipping included.',
    cta: 'Book Home Trial',
    href: '/home-trial',
    terms: 'Available across all metro territories. No purchase commitment required.',
  },
  {
    id: 'offer-02',
    badge: 'Optical Excellence',
    title: 'Complimentary ZEISS Hydrophobic Coating',
    description:
      'Every prescription order includes Carl Zeiss anti-reflective, dust-repellent, and scratch-resistant multi-coating at no additional fee.',
    cta: 'Explore Optical',
    href: '/products?category=Optical',
    terms: 'Applies automatically at lens configuration.',
  },
  {
    id: 'offer-03',
    badge: 'Private Concierge',
    title: 'Complimentary Virtual Face Styling & PD Measurement',
    description:
      'Schedule a 1-on-1 optical consultation via WhatsApp or video call with our senior eyewear stylist to find your ideal bridge width and geometry.',
    cta: 'Chat on WhatsApp',
    href: '#whatsapp',
    terms: 'Available Monday to Saturday, 9 AM to 8 PM.',
  },
];
