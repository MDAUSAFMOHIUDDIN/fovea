export interface ArticleAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Style' | 'Guides' | 'Eyewear' | 'Care' | 'Home Trial' | 'Fovea Stories' | 'Materials';
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  secondaryImage?: string;
  author: ArticleAuthor;
  pullQuote?: {
    text: string;
    attribution: string;
  };
  keyTakeaways?: string[];
  content: {
    heading?: string;
    paragraphs: string[];
    callout?: string;
  }[];
  relatedFrameIds?: string[]; // IDs in PRODUCTS
  tags: string[];
}

export const JOURNAL_CATEGORIES = [
  'All',
  'Style',
  'Guides',
  'Eyewear',
  'Materials',
  'Care',
  'Home Trial',
  'Fovea Stories',
] as const;

export type JournalCategory = typeof JOURNAL_CATEGORIES[number];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'the-craft-of-sabae-titanium',
    title: 'The Unyielding Precision of Sabae Titanium',
    subtitle: 'A journey into the Japanese mountain valley that perfected optical metalworking over 800 years of mastery.',
    category: 'Eyewear',
    date: 'September 24, 2026',
    readTime: '5 min read',
    excerpt: 'Why Sabae, Fukui remains the undisputed world capital for cold-milling and hand-beveling medical-grade aerospace titanium spectacles.',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Kenji Takahashi',
      role: 'Master Metallurgist & Optical Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85',
      bio: 'Third-generation craftsman in Fukui Prefecture overseeing Fovea’s monobloc titanium milling and vacuum braze metallurgy.',
    },
    pullQuote: {
      text: 'Titanium does not yield to haste. You do not force it into geometry; you mill it cold with patience measured in microns.',
      attribution: 'Kenji Takahashi, Sabae Atelier',
    },
    keyTakeaways: [
      'Pure Grade-A beta-titanium offers triple the tensile strength of surgical steel at half the physical mass.',
      'Over 240 manual steps are executed by Sabae artisans before a frame meets final hand-burnishing.',
      'Zero-weld monobloc construction prevents mechanical stress fractures across decades of daily wear.',
    ],
    content: [
      {
        heading: 'The Mountain Valley of Metal Masters',
        paragraphs: [
          'In the snowy valleys of Fukui Prefecture, Japanese craftsmen have worked metal for over eight centuries, originally forging ceremonial katana blades. In the early 1980s, Sabae artisans achieved what global metallurgy considered impossible: mastering the difficult cold-press moulding of pure titanium for spectacle frames.',
          'Titanium is reactive, stubborn, and resists standard machining. Exposed to air at high temperatures, it absorbs oxygen and embrittles. Sabae artisans overcame this through high-vacuum brazing and micro-milling with diamond-treated carbide tooling.',
        ],
      },
      {
        heading: 'Why Pure Titanium Transcends Steel and Aluminum',
        paragraphs: [
          'Spectacles sit upon your face for sixteen hours each day. Surgical steel, while durable, carries significant mass that fatigues the nasal cartilage. Standard aluminum lacks tensile memory, bowing irreversibly upon accidental impact.',
          'Japanese beta-titanium possesses an extraordinary elastic coefficient. When flexed, it returns precisely to its calibrated resting alignment without fatiguing the micro-hinges. It is entirely biocompatible, hypoallergenic, and impervious to human perspiration, saltwater, and cosmetics.',
        ],
        callout: 'Every Fovea titanium bridge and temple undergoes acoustic resonance testing to verify internal structural uniformity.',
      },
      {
        heading: 'The Geometry of Featherweight Presence',
        paragraphs: [
          'At Fovea, our Sabae frames average between 7.8 and 9.4 grams without demo lenses. This featherweight footprint is not an aesthetic vanity; it is an ergonomic breakthrough. When eyewear achieves balance between the nasal bridge and the cranial temporal contact points, it ceases to feel like an applied object and becomes a natural extension of human sight.',
        ],
      },
    ],
    relatedFrameIds: ['fovea-01', 'fovea-05', 'fovea-12'],
    tags: ['Titanium', 'Sabae Japan', 'Metallurgy', 'Ergonomics'],
  },
  {
    id: 'art-02',
    slug: 'choosing-the-right-frame-for-your-face-shape',
    title: 'Proportion, Balance, and Bone Structure: The Frame Selection Guide',
    subtitle: 'An architect’s guide to understanding temple width, bridge posture, and facial geometry.',
    category: 'Guides',
    date: 'September 18, 2026',
    readTime: '7 min read',
    excerpt: 'Move beyond rigid face-shape rules. Discover how optical proportions, browline angles, and pupillary balance create effortless harmony.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Elena Rostova',
      role: 'Principal Optical Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
      bio: 'Editorial eyewear consultant advising Fovea’s bespoke client styling suite and private face-mapping consultations.',
    },
    pullQuote: {
      text: 'Great eyewear does not disguise your face. It provides an architectural counterpoint that frames your gaze with clarity.',
      attribution: 'Elena Rostova, Principal Stylist',
    },
    keyTakeaways: [
      'The top browline of your frame should follow or gently echo the natural curve of your eyebrows without intersecting them.',
      'Bridge width determines vertical posture: keyhole bridges elevate the visual line, while saddle bridges ground longer features.',
      'Your pupils should sit comfortably within the horizontal center or inner third of each lens aperture.',
    ],
    content: [
      {
        heading: 'Rethinking Facial Topography',
        paragraphs: [
          'For decades, retail optical stores forced people into simplistic categories: oval, square, round, heart. But human faces are living architecture—a subtle dialogue between cheekbone height, nasal bridge projection, and jawline definition.',
          'Rather than hunting for a "rule," look for architectural balance. If your jaw possesses strong angular planes, a softly curved panto or pantoscopic round creates warmth and visual rhythm. Conversely, if your features are soft and rounded, crisp rectilinear titanium edges lend structural definition.',
        ],
      },
      {
        heading: 'The Three Critical Millimeters: Lens, Bridge, Temple',
        paragraphs: [
          'Every Fovea frame is laser-inscribed with three numbers—for example, 49 — 20 — 145. Understanding what these numbers signify transforms frame discovery from guesswork into precision.',
          'The first number represents lens width across its widest horizontal diameter. The second number—bridge width—is arguably the most critical: a bridge two millimeters too narrow will pinch and ride high, distorting your optical center. The third number is temple length, ensuring comfortable wrap around the mastoid bone behind your ear.',
        ],
        callout: 'Our 4-Frame Home Trial allows you to try different bridge widths in your home lighting before committing to prescription lenses.',
      },
      {
        heading: 'Contrast Versus Color Tone',
        paragraphs: [
          'Match frame intensity to your skin’s undertone. Warm golden undertones harmonize deeply with amber havana, champagne crystal, and warm brushed brass. Cool undertones come alive against deep midnight black, polished slate, and raw platinum titanium.',
        ],
      },
    ],
    relatedFrameIds: ['fovea-02', 'fovea-04', 'fovea-08'],
    tags: ['Frame Fit', 'Face Shape', 'Bridge Proportions', 'Style Guide'],
  },
  {
    id: 'art-03',
    slug: 'cotton-to-clarity-mazzucchelli-acetate',
    title: 'From Cotton Flower to Cured Clarity: The Story of Bio-Acetate',
    subtitle: 'Understanding the organic origins of premium cellulose acetate cured for four months in Northern Italy.',
    category: 'Materials',
    date: 'September 10, 2026',
    readTime: '6 min read',
    excerpt: 'Unlike petroleum injection plastics, natural cellulose acetate breathes, warms against your skin, and holds rich color depth for decades.',
    image: 'https://images.unsplash.com/photo-1577744486770-020ab432da65?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Matteo Vianello',
      role: 'Atelier Director of Acetate Sculpture',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85',
      bio: 'Craftsman hailing from the Veneto optical district, curating Fovea’s organic resin palettes and tumble-buffing methods.',
    },
    pullQuote: {
      text: 'When you touch bio-acetate, your fingers feel organic warmth. It is living cotton and wood fiber cured into an heirloom.',
      attribution: 'Matteo Vianello, Mazzucchelli Curator',
    },
    keyTakeaways: [
      'Derived from renewable organic cotton linters and certified wood pulp rather than crude petroleum.',
      'Cured for 120 days in climate-controlled vaults to relieve molecular tension and prevent thermal warping.',
      'Hand-buffed in organic beechwood chips with pumice for 72 hours to achieve liquid surface lustre.',
    ],
    content: [
      {
        heading: 'The Botanical Roots of True Optical Luxury',
        paragraphs: [
          'Pick up an ordinary pair of injection-molded sunglasses and you will immediately notice the cold, sterile snap of synthetic plastic. These are made in seconds by forcing liquid petroleum resin into metallic moulds. Their color is applied via surface varnish that peels with sun exposure.',
          'Fovea frames begin thousands of miles away in fields of renewable cotton linters and FSC-certified spruce forests. The purified cellulose fibers are blended with organic plasticizers, resulting in a buttery, crystal-clear dough that can be infused with natural minerals and earth pigments.',
        ],
      },
      {
        heading: 'The Four-Month Curing Ritual in Varese',
        paragraphs: [
          'In Castiglione Olona near Lake Varese, artisans slice the dyed acetate into substantial slabs. But fresh acetate contains volatile organic solvents that must evaporate gradually. If rushed, the material warps unpredictably once exposed to human body heat.',
          'Fovea slabs rest in subterranean drying chambers for four months. Here, temperature and humidity oscillate in gentle micro-cycles, allowing the polymer chains to lock into relaxed, unyielding equilibrium.',
        ],
      },
      {
        heading: 'Tumble Buffing with Beechwood and Pumice',
        paragraphs: [
          'After CNC diamond milling, our frames are placed into rotating hexagonal barrels filled with calibrated cubes of German beechwood and volcanic pumice powder. Over 72 continuous hours of friction, the beechwood absorbs microscopic tool marks, bestowing the frame with a deep, liquid optical sheen.',
        ],
      },
    ],
    relatedFrameIds: ['fovea-02', 'fovea-07', 'fovea-11'],
    tags: ['Bio-Acetate', 'Italy', 'Mazzucchelli', 'Sustainability'],
  },
  {
    id: 'art-04',
    slug: 'the-optics-of-vision-zeiss-precision',
    title: 'Clarity Without Compromise: ZEISS Optical Precision',
    subtitle: 'How digital freeform surfacing and hydrophobic nanocoatings protect daily visual acuity.',
    category: 'Care',
    date: 'August 28, 2026',
    readTime: '6 min read',
    excerpt: 'A great frame is only as transformative as the optical clarity it delivers to the human retina. An overview of our tailored lens coatings.',
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Dr. Sarah Lin, OD',
      role: 'Consulting Optometrist & Vision Scientist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=85',
      bio: 'Ophthalmic researcher focusing on macular health, digital eye strain mitigation, and personalized refractive surfacing.',
    },
    pullQuote: {
      text: 'The human retina is capable of staggering definition. Your lens coatings should reveal that acuity, not scatter it in glare.',
      attribution: 'Dr. Sarah Lin, OD',
    },
    keyTakeaways: [
      'Digital freeform point-by-point diamond cutting eliminates peripheral aberrations and swimming distortions.',
      'Nine ultra-thin microscopic coating layers boost light transmittance to 99.6% while repelling oils and dust.',
      'Full UV400 defense stops invisible high-energy UVA/UVB wavelengths from reaching the crystalline lens.',
    ],
    content: [
      {
        heading: 'The Biology of the Fovea Centralis',
        paragraphs: [
          'The human eye processes 80% of all sensory impressions through a millimeter-wide focal zone at the center of the retina known as the fovea centralis. Our brand name is an intentional tribute to that miracle of sight.',
          'Standard optical lenses cast light onto the eye using uniform spherical curves invented over a century ago. While adequate for reading large print, they introduce subtle optical coma and spherical aberration toward the frame’s perimeter.',
        ],
      },
      {
        heading: 'Freeform Diamond Surfacing',
        paragraphs: [
          'Every Fovea prescription is custom-surfaced using digital freeform generators guided by multi-axis diamond cutting heads. By calculating individual corneal distance, pantoscopic tilt, and wrap angle, the lens delivers edge-to-edge sharpness.',
          'This customized geometry is especially transformative for progressive lenses and high-index prescriptions, granting instant adaptation without spatial vertigo.',
        ],
      },
      {
        heading: 'Nine Nanocoatings for Everyday Resistance',
        paragraphs: [
          'Our partnership with Carl Zeiss Vision ensures that every prescription is fortified with nine vacuum-deposited nanolayers. These include anti-static barriers that repel atmospheric micro-dust, oleophobic shields that resist fingerprint smudging, and an ultra-hard mineral topcoat providing scratch resilience comparable to sapphire glass.',
        ],
      },
    ],
    relatedFrameIds: ['fovea-03', 'fovea-09', 'fovea-10'],
    tags: ['Zeiss Optics', 'Lens Technology', 'Vision Care', 'Prescription'],
  },
  {
    id: 'art-05',
    slug: 'the-art-of-the-home-trial',
    title: 'The Art of the Home Trial: Discovering Eyewear in Your Natural Light',
    subtitle: 'Why living with frames for five days in your home environment transforms your personal optical relationship.',
    category: 'Home Trial',
    date: 'August 14, 2026',
    readTime: '4 min read',
    excerpt: 'Store mirrors with fluorescent spotlights can never reveal how a frame lives with your morning coffee, wardrobe, and natural daylight.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Elena Rostova',
      role: 'Principal Optical Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
      bio: 'Editorial eyewear consultant advising Fovea’s bespoke client styling suite and private face-mapping consultations.',
    },
    pullQuote: {
      text: 'You wear your glasses around people you love and spaces you cherish. That is where you should choose them.',
      attribution: 'Elena Rostova',
    },
    keyTakeaways: [
      'Natural morning daylight reveals the true undertones of tortoiseshell and champagne acetates.',
      'Five full days give your nasal bridge time to feel the true weight balance of Japanese titanium.',
      'Complimentary express round-trip courier shipping eliminates any purchase pressure or rush.',
    ],
    content: [
      {
        heading: 'The Flaw of the Quick Optical Shop Visit',
        paragraphs: [
          'Anyone who has purchased glasses in a conventional high-street optical boutique knows the discomfort: harsh downlighting overhead, fluorescent mirrors that wash out skin tones, and an impatient salesperson standing shoulder-to-shoulder with you.',
          'You try on six frames in three minutes. You make an expensive decision under sensory duress, only to realize days later that the bridge pinches your nose or the hue clashes with your autumn coats.',
        ],
      },
      {
        heading: 'Creating an Intimate Salon at Home',
        paragraphs: [
          'Fovea built the 4-Frame Home Trial to return quiet agency to the client. When our velvet-lined presentation case arrives at your door, open it slowly. Try your selections across different moments of your day.',
          'Wear them while working at your monitor. Wear them as you prepare an evening dinner. Seek the candid opinions of partners, friends, and family. Notice how a Japanese titanium wireframe disappears into weightlessness after four continuous hours of wear.',
        ],
      },
      {
        heading: 'Seamless Consultation via Encrypted Chat',
        paragraphs: [
          'During your 5 days, our atelier stylists are available via encrypted WhatsApp. Send high-resolution mirror photos, and our opticians will assess pupillary centering, temple cant, and bridge fit in real time.',
        ],
      },
    ],
    relatedFrameIds: ['fovea-01', 'fovea-02', 'fovea-04', 'fovea-07'],
    tags: ['Home Trial', 'Styling', 'Atelier Service', 'Optical Fitting'],
  },
  {
    id: 'art-06',
    slug: 'eyewear-care-and-longevity-rituals',
    title: 'Caring for Fine Eyewear: Rituals for Decade-Long Longevity',
    subtitle: 'Daily maintenance practices, lukewarm cleansing, and ultrasonic care for titanium and bio-acetate.',
    category: 'Care',
    date: 'July 30, 2026',
    readTime: '5 min read',
    excerpt: 'Simple optical habits that safeguard your multi-coatings, protect screw tension, and keep bio-acetate supple.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Matteo Vianello',
      role: 'Atelier Director of Acetate Sculpture',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85',
      bio: 'Craftsman hailing from the Veneto optical district, curating Fovea’s organic resin palettes and tumble-buffing methods.',
    },
    pullQuote: {
      text: 'A clean lens is an invisible window. Treat your eyewear as an instrument of precision, and it will serve you for decades.',
      attribution: 'Matteo Vianello',
    },
    keyTakeaways: [
      'Never wipe dry lenses: microscopic dust particles act as sandpaper across optical nanocoatings.',
      'Rinse frames under lukewarm tap water with pH-neutral dish soap before wiping with microfiber.',
      'Avoid high-heat car dashboards: sustained temperatures above 60°C can craze anti-reflective coatings.',
    ],
    content: [
      {
        heading: 'The Microscopic Threat of Dry Wiping',
        paragraphs: [
          'The most common way people damage optical lenses is by breathing on them and wiping them with a shirttail or rough paper napkin. Even high-end cotton shirts trap microscopic silica particles from city air. When rubbed dry against a lens, these tiny mineral grains gouge the scratch-resistant topcoat.',
          'Always rinse your glasses under a gentle stream of lukewarm tap water first. This flushes away loose grit before any cloth touches the surface.',
        ],
      },
      {
        heading: 'The Cleansing Ritual with Neutral Surfactants',
        paragraphs: [
          'Apply a single drop of lotion-free, pH-neutral liquid dish soap across your fingertips and gently lather both sides of the lenses and nose pads. Nose pads accumulate skin sebum, makeup, and salt that can stiffen silicone cushions over time.',
          'Rinse thoroughly and pat dry with the clean Fovea microfiber cloth included in your presentation case. Launder your microfiber cloth weekly in warm water without fabric softener.',
        ],
      },
      {
        heading: 'Thermal Protection for Bio-Acetate',
        paragraphs: [
          'Because Mazzucchelli acetate is an organic cotton derivative, extreme heat alters its molecular memory. Never leave your spectacles inside a closed automobile under summer sun, and avoid wearing fine eyewear into cedar saunas or steam rooms.',
        ],
      },
    ],
    relatedFrameIds: ['fovea-08', 'fovea-06', 'fovea-03'],
    tags: ['Care Guide', 'Lens Cleaning', 'Maintenance', 'Longevity'],
  },
  {
    id: 'art-07',
    slug: 'the-monochrome-palette-architectural-eyewear',
    title: 'The Modern Monochrome: Why Deep Onyx and Brushed Slate Endure',
    subtitle: 'An aesthetic exploration into minimalist color theory, industrial design, and timeless facial framing.',
    category: 'Style',
    date: 'July 15, 2026',
    readTime: '4 min read',
    excerpt: 'Exploring how subtle matte finishes, graphite reflections, and deep onyx pigments interact with ambient architecture.',
    image: 'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Kenji Takahashi',
      role: 'Master Metallurgist & Optical Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85',
      bio: 'Third-generation craftsman in Fukui Prefecture overseeing Fovea’s monobloc titanium milling and vacuum braze metallurgy.',
    },
    pullQuote: {
      text: 'Black is never simply black. In eyewear, it is a dance of surface textures—from mirror piano gloss to brushed graphite velvet.',
      attribution: 'Kenji Takahashi',
    },
    keyTakeaways: [
      'Satin and matte surfaces soften stark contrast, allowing dark frames to blend into paler complexions.',
      'Polished midnight black creates bold typographic graphic lines that accentuate eye definition.',
      'Graphite and brushed titanium reflect ambient gallery lighting with quiet understated luxury.',
    ],
    content: [
      {
        heading: 'The Visual Weight of the Outline',
        paragraphs: [
          'In architectural drafting, line weight communicates structural hierarchy. The same principle dictates how eyewear interacts with the human face. A dark, resolute frame commands immediate respect and focus, directing visual attention directly to your eyes during conversation.',
          'However, an overly heavy black frame can overwhelm delicate bone structure. That is why Fovea bevels the inner rim perimeter, reducing visual bulk while maintaining a sharp front profile.',
        ],
      },
      {
        heading: 'Surface Finishes: Matte Versus Gloss',
        paragraphs: [
          'High-gloss piano acetate reflects daylight in sharp pinpoint highlights, lending a glamorous, couture aesthetic. Brushed slate and matte gunmetal absorb ambient light, providing an intellectual, understated presence favoured by architects, authors, and industrial designers.',
        ],
      },
    ],
    relatedFrameIds: ['fovea-08', 'fovea-12', 'fovea-06'],
    tags: ['Aesthetics', 'Color Theory', 'Minimalism', 'Style'],
  },
  {
    id: 'art-08',
    slug: 'the-genesis-of-fovea-story',
    title: 'The Fovea Origin: An Obsession with Human Acuity',
    subtitle: 'How an optometrist and an industrial designer joined forces to eliminate compromise in optical craft.',
    category: 'Fovea Stories',
    date: 'June 22, 2026',
    readTime: '6 min read',
    excerpt: 'The founding story of Fovea: rejecting disposable optical manufacturing to honor the central focal marvel of human sight.',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Elena Rostova',
      role: 'Principal Optical Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
      bio: 'Editorial eyewear consultant advising Fovea’s bespoke client styling suite and private face-mapping consultations.',
    },
    pullQuote: {
      text: 'We believed spectacles should be treated as high-precision instruments of personal identity, not seasonal plastic disposables.',
      attribution: 'Fovea Atelier Manifesto',
    },
    keyTakeaways: [
      'Founded to bridge the disconnect between medical optical precision and fine architectural luxury.',
      'Direct-to-client distribution ensures museum-grade titanium remains accessible without 10x high-street markups.',
      'Every client is supported with complimentary home trials and lifetime partner atelier servicing.',
    ],
    content: [
      {
        heading: 'The Frustration with the Status Quo',
        paragraphs: [
          'For over four decades, global eyewear manufacturing has been consolidated into a handful of conglomerate monopolies. High-street retail stores are flooded with licensed fashion brand names stamped onto low-cost injection plastic frames made in automated mass production factories.',
          'The consumer pays five hundred dollars for a label, yet receives hardware that loosens within three months, nose pads that discolor, and lenses with generic coatings.',
        ],
      },
      {
        heading: 'Building from First Principles',
        paragraphs: [
          'Fovea was born from a fundamental refusal of this paradigm. We traveled directly to Sabae, Japan and Varese, Italy, forging direct relationships with master workshops that have practiced metallurgical and acetate arts for generations.',
          'By eliminating middlemen, luxury license fees, and overpriced retail storefronts, we invest our resources where they truly matter: in cold-milled aerospace titanium, four-month cured bio-acetate, and Carl Zeiss precision optical surfacing.',
        ],
      },
    ],
    relatedFrameIds: ['fovea-01', 'fovea-04', 'fovea-05'],
    tags: ['Atelier', 'Fovea Heritage', 'Founding Story', 'Craftsmanship'],
  },
];
