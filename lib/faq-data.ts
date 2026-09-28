export interface FAQItemDetailed {
  id: string;
  category:
    | 'Products'
    | 'Home Trial'
    | 'Orders'
    | 'Payments'
    | 'Delivery'
    | 'Returns & Warranty'
    | 'Product Care'
    | 'Account & Wishlist';
  question: string;
  answer: string;
  tags?: string[];
}

export const FAQ_CATEGORIES = [
  'All',
  'Products',
  'Home Trial',
  'Orders',
  'Payments',
  'Delivery',
  'Returns & Warranty',
  'Product Care',
  'Account & Wishlist',
] as const;

export type FAQCategory = typeof FAQ_CATEGORIES[number];

export const FOVEA_FAQS: FAQItemDetailed[] = [
  // Products
  {
    id: 'faq-prod-01',
    category: 'Products',
    question: 'Where are Fovea optical frames and sunglasses crafted?',
    answer:
      'Our titanium silhouettes are cold-milled and finished in Sabae, Fukui Prefecture, Japan—a mountain valley renowned for eight centuries of metallurgy. Our sculpted bio-acetate frames are carved from Italian cotton-cellulose sheets in Varese, Northern Italy. All custom prescription surfacing, edging, and quality inspection are completed under certified optical standards.',
    tags: ['craft', 'origin', 'materials', 'titanium', 'acetate'],
  },
  {
    id: 'faq-prod-02',
    category: 'Products',
    question: 'What types of optical and sun lenses do you configure?',
    answer:
      'We configure Single Vision (distance or reading), Digital Relax anti-fatigue lenses, Office Computer lenses, High-Index ultra-thin profiles (1.67 and 1.74 index), and Digital Freeform Progressive multifocals. All lenses are produced in partnership with Carl Zeiss Vision with hydrophobic and anti-reflective nanocoatings.',
    tags: ['lenses', 'prescription', 'zeiss', 'progressives', 'coatings'],
  },
  {
    id: 'faq-prod-03',
    category: 'Products',
    question: 'How do I know which frame dimensions will fit my face comfortably?',
    answer:
      'Every Fovea frame page lists three essential optical measurements in millimeters (Lens Width — Bridge Width — Temple Length). Compare these against any current comfortable glasses you own, or consult our frame selection guide. You may also sample any 4 frames at home through our complimentary Home Trial suite.',
    tags: ['fit', 'sizing', 'dimensions', 'bridge'],
  },
  {
    id: 'faq-prod-04',
    category: 'Products',
    question: 'Are Fovea frames suitable for sensitive skin and allergies?',
    answer:
      'Yes. Our beta-titanium and pure titanium are 100% medical-grade, nickel-free, and hypoallergenic. Our bio-acetate is synthesized from renewable cotton linters and organic wood pulp without harmful phthalates or synthetic chemical varnishes.',
    tags: ['hypoallergenic', 'sensitive skin', 'materials', 'nickel-free'],
  },

  // Home Trial
  {
    id: 'faq-trial-01',
    category: 'Home Trial',
    question: 'How does the Fovea complimentary 4-frame Home Trial work?',
    answer:
      'Select any 4 optical or sun frames from across our archive. We dispatch our custom velvet presentation case directly to your address with complimentary round-trip courier shipping. Take 5 full days to try them with your wardrobe, in natural home daylight, and with family. When finished, place the prepaid return label on the box and hand it to the courier.',
    tags: ['home trial', 'process', 'shipping', 'box'],
  },
  {
    id: 'faq-trial-02',
    category: 'Home Trial',
    question: 'Is there any security deposit or fee for the Home Trial?',
    answer:
      'The Home Trial is completely complimentary. We hold a temporary verification pre-authorization of $1 on your payment card, which is immediately released upon receipt and verification of the returned presentation suite. Return courier shipping is 100% pre-paid by Fovea.',
    tags: ['cost', 'deposit', 'free', 'pre-auth'],
  },
  {
    id: 'faq-trial-03',
    category: 'Home Trial',
    question: 'Do the Home Trial frames come with my custom prescription installed?',
    answer:
      'Trial frames are fitted with optical-grade anti-reflective demonstration plano lenses so you can accurately evaluate weight, balance, and aesthetic contours. Once you identify your favored frame, you enter your prescription parameters online or via WhatsApp, and we surface your bespoke lenses.',
    tags: ['prescription', 'lenses', 'demo lenses'],
  },
  {
    id: 'faq-trial-04',
    category: 'Home Trial',
    question: 'Can I extend my Home Trial beyond 5 days?',
    answer:
      'If you need additional time to visit your optician or obtain an updated pupillary distance reading, simply message our atelier concierge on WhatsApp (+91 96188 90557) or via email. We are pleased to provide complimentary extensions upon request.',
    tags: ['extension', 'timing', 'duration'],
  },

  // Orders
  {
    id: 'faq-ord-01',
    category: 'Orders',
    question: 'How do I submit my optical prescription and pupillary distance (PD)?',
    answer:
      'You can upload a photograph or PDF of your doctor’s prescription during checkout, email it to concierge@fovea.com, or share it directly through our verified WhatsApp line. If your PD measurement is not listed, our opticians provide a digital calibration tool or verify it via a high-resolution selfie.',
    tags: ['prescription', 'pd', 'upload', 'doctor'],
  },
  {
    id: 'faq-ord-02',
    category: 'Orders',
    question: 'Can I modify or cancel my order after placing it?',
    answer:
      'Non-prescription frame orders and Home Trial reservations can be modified or cancelled within 24 hours of placement. Custom prescription lenses enter digital freeform diamond edging after optical verification; please contact our concierge immediately if you need to adjust prescription parameters.',
    tags: ['cancellation', 'modification', 'timing'],
  },
  {
    id: 'faq-ord-03',
    category: 'Orders',
    question: 'How do I check the manufacturing and fulfillment status of my eyewear?',
    answer:
      'Upon order confirmation, you will receive a tracking link via SMS and email. You will receive real-time notifications as your frame passes through laboratory edging, laser alignment, microscopic inspection, and courier dispatch.',
    tags: ['tracking', 'status', 'dispatch'],
  },

  // Payments
  {
    id: 'faq-pay-01',
    category: 'Payments',
    question: 'Which payment methods are accepted at Fovea?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, UPI, Net Banking, and flexible interest-free split payment plans. All transactions are protected by end-to-end 256-bit SSL encryption.',
    tags: ['payment methods', 'upi', 'cards', 'apple pay', 'security'],
  },
  {
    id: 'faq-pay-02',
    category: 'Payments',
    question: 'Can I use optical insurance, FSA, or HSA funds for Fovea prescription eyewear?',
    answer:
      'Yes. Prescription eyewear, prescription sunglasses, and optical lenses are eligible medical expenses under most vision insurance policies, Health Savings Accounts (HSA), and Flexible Spending Accounts (FSA). We provide itemized optical invoices with standard insurance diagnostic billing codes upon request.',
    tags: ['insurance', 'hsa', 'fsa', 'invoice'],
  },

  // Delivery
  {
    id: 'faq-del-01',
    category: 'Delivery',
    question: 'What are the delivery timelines for Home Trials and prescription eyewear?',
    answer:
      'Complimentary Home Trial presentation boxes are dispatched via priority express courier and typically arrive within 2 to 4 business days. Custom prescription eyewear requires 5 to 8 business days for precision freeform surfacing, coating application, and bench calibration prior to express courier delivery.',
    tags: ['timeline', 'delivery time', 'express', 'shipping'],
  },
  {
    id: 'faq-del-02',
    category: 'Delivery',
    question: 'Is shipping insured against damage or loss during transit?',
    answer:
      'Every Fovea dispatch is fully insured from our atelier to your doorstep. In the rare event of transit damage or courier delay, our concierge will immediately dispatch an expedited replacement at zero cost to you.',
    tags: ['insurance', 'damage', 'courier'],
  },

  // Returns & Warranty
  {
    id: 'faq-ret-01',
    category: 'Returns & Warranty',
    question: 'What is Fovea’s return and exchange policy?',
    answer:
      'We offer a 30-day, no-questions-asked return and exchange policy on all non-prescription frames. If you are not completely enchanted with the fit or weight, return it in original condition for a full refund. For custom prescription lenses, we offer a 30-day Optical Comfort Guarantee: if your prescription feels uncomfortable, our opticians will re-craft your lenses at no extra charge.',
    tags: ['returns', 'exchanges', '30 days', 'refund'],
  },
  {
    id: 'faq-ret-02',
    category: 'Returns & Warranty',
    question: 'What does the Fovea 2-Year Craftsmanship Warranty cover?',
    answer:
      'Every Fovea frame includes a comprehensive 2-year warranty covering material defects, hinge mechanisms, titanium weld points, and coating delamination. Additionally, all clients receive complimentary lifetime screw adjustments, ultrasonic cleaning, and nose pad replacements at our partner ateliers.',
    tags: ['warranty', 'guarantee', '2 years', 'repairs'],
  },

  // Product Care
  {
    id: 'faq-care-01',
    category: 'Product Care',
    question: 'How should I clean and maintain my titanium and bio-acetate frames daily?',
    answer:
      'Always rinse your spectacles under lukewarm running water to flush away microscopic dust particles before wiping. Apply a single drop of lotion-free, pH-neutral liquid soap across the lenses and pads, rinse, and dry with the provided Fovea microfiber cloth. Never wipe dry lenses with clothing or rough paper napkins.',
    tags: ['cleaning', 'maintenance', 'care', 'microfiber'],
  },
  {
    id: 'faq-care-02',
    category: 'Product Care',
    question: 'Can extreme heat damage my acetate frames or lens coatings?',
    answer:
      'Yes. High temperatures (such as inside a car parked in direct sunlight or in a sauna) can cause bio-acetate to soften and warp, and may cause anti-reflective nanocoatings to craze. Always store your eyewear inside its hard protective case in a temperate environment.',
    tags: ['heat', 'temperature', 'storage', 'case'],
  },

  // Account & Wishlist
  {
    id: 'faq-acc-01',
    category: 'Account & Wishlist',
    question: 'How do I save frames to my Wishlist and compare them across devices?',
    answer:
      'Click the heart icon on any frame card or product page to add it instantly to your personal curation. Your saved frames persist in your browser session and can be shared directly with your stylist via our WhatsApp concierge link.',
    tags: ['wishlist', 'saved frames', 'devices'],
  },
  {
    id: 'faq-acc-02',
    category: 'Account & Wishlist',
    question: 'Can I share my curated Home Trial selection with friends or family for feedback?',
    answer:
      'Yes. In your Home Trial drawer or review screen, click "Share Selection" to generate an encrypted link or WhatsApp summary containing your 4 selected frames with high-resolution imagery and dimensions.',
    tags: ['share', 'home trial', 'friends'],
  },
];
