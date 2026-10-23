/**
 * RAADO WATCH — Centralized Product & Theme Configuration
 * 
 * Each timepiece controls its own:
 * - Visual theme (CSS data-theme token)
 * - Color palette (backgrounds, accents, borders, typography)
 * - Gallery images & specifications
 * - Motion & animation character
 */

const WATCH_CATALOG = {
  "classic": {
    id: "classic",
    name: "Heritage Classic",
    subtitle: "Roman Numeral Dress Timepiece",
    category: "heritage",
    categoryLabel: "Heritage Dress",
    price: "$350",
    theme: "classic",
    tagline: "Warm rose gold, ivory guilloché, and genuine alligator-grain leather.",
    description: "The Heritage Classic celebrates the golden age of dress horology. Engineered with a polished 316L rose-gold PVD case, traditional Roman numeral indices, and a hand-stitched Tuscan calfskin strap. Every glance reveals understated sophistication.",
    primaryImage: "assets/images/classic-watch.jpg",
    gallery: [
      "assets/images/classic-watch.jpg",
      "assets/images/hero-watch.jpg"
    ],
    themeSettings: {
      accentColor: "#c59b27",
      bgTone: "#fbf8f2",
      cardTone: "#ffffff",
      textTone: "#241b14",
      animationStyle: "slow-cinematic",
      fontHeading: "'Cormorant Garamond', Georgia, serif"
    },
    specs: {
      "Case Diameter": "40 mm",
      "Case Thickness": "9.8 mm",
      "Case Material": "316L Stainless Steel with Rose Gold PVD",
      "Dial Color": "Ivory Sunburst with Roman Numerals",
      "Movement": "Calibre R-2800 Automatic (28,800 vph, 42h power reserve)",
      "Crystal": "Domed Scratch-Resistant Sapphire with Dual AR Coating",
      "Water Resistance": "5 ATM (50 meters / 165 feet)",
      "Strap": "20 mm Brown Alligator-Texture Calfskin Leather"
    }
  },

  "sport": {
    id: "sport",
    name: "Apex Chronograph",
    subtitle: "High-Velocity Tachymeter Sports Timepiece",
    category: "chronograph",
    categoryLabel: "Chronograph",
    price: "$420",
    theme: "sport",
    tagline: "Woven carbon fiber, racing red telemetry, and vulcanized rubber endurance.",
    description: "Conceived for speed and split-second precision, the Apex Chronograph features a triple-register dial laid over genuine woven carbon fiber. Its ceramic tachymeter bezel calculates average speed, while the fluoroelastomer strap withstands heat, sweat, and saltwater.",
    primaryImage: "assets/images/sport-watch.jpg",
    gallery: [
      "assets/images/sport-watch.jpg",
      "assets/images/hero-watch.jpg"
    ],
    themeSettings: {
      accentColor: "#e63946",
      bgTone: "#111215",
      cardTone: "#181a1f",
      textTone: "#f3f4f6",
      animationStyle: "energetic-snap",
      fontHeading: "'Plus Jakarta Sans', sans-serif"
    },
    specs: {
      "Case Diameter": "43 mm",
      "Case Thickness": "12.4 mm",
      "Case Material": "Brushed Aerospace Grade 316L Stainless Steel",
      "Dial Color": "Woven Matte Carbon Fiber with Crimson Accents",
      "Movement": "High-Precision Split-Second Quartz Chronograph",
      "Crystal": "Flat Anti-Reflective Sapphire",
      "Water Resistance": "10 ATM (100 meters / 330 feet)",
      "Strap": "22 mm Textured High-Density Fluoroelastomer Rubber"
    }
  },

  "minimalist": {
    id: "minimalist",
    name: "Nordic Minimalist",
    subtitle: "Ultra-Thin Milanese Mesh Steel",
    category: "minimal",
    categoryLabel: "Minimalist",
    price: "$290",
    theme: "minimalist",
    tagline: "Pure geometry, quiet clarity, and featherlight profile.",
    description: "Stripping away all unnecessary ornamentation, the Nordic Minimalist honors Scandinavian design clarity. With a slender 6.8 mm profile, satin-brushed silver bezel, and woven stainless steel Milanese mesh bracelet, it rests weightlessly on the wrist.",
    primaryImage: "assets/images/minimalist-watch.jpg",
    gallery: [
      "assets/images/minimalist-watch.jpg",
      "assets/images/classic-watch.jpg"
    ],
    themeSettings: {
      accentColor: "#4a5568",
      bgTone: "#f8f9fa",
      cardTone: "#ffffff",
      textTone: "#1a202c",
      animationStyle: "subtle-fade",
      fontHeading: "'Plus Jakarta Sans', sans-serif"
    },
    specs: {
      "Case Diameter": "38 mm",
      "Case Thickness": "6.8 mm Ultra-Slim",
      "Case Material": "Mirror-Polished Surgical 316L Stainless Steel",
      "Dial Color": "Matte Chalk White with Slender Silver Batons",
      "Movement": "Ultra-Thin Calibre Swiss Quartz Movement",
      "Crystal": "Hardened Sapphire Glass",
      "Water Resistance": "3 ATM (30 meters / 100 feet)",
      "Strap": "18 mm Stainless Steel Milanese Mesh with Quick-Release"
    }
  },

  "luxury-gold": {
    id: "luxury-gold",
    name: "Imperial Gold 18K",
    subtitle: "Full Gold President Bracelet & Diamond Markers",
    category: "luxury",
    categoryLabel: "Haute Horlogerie",
    price: "$890",
    theme: "luxury-gold",
    tagline: "Solid gold presence, black sunburst dial, and presidential link architecture.",
    description: "The Imperial Gold 18K represents the pinnacle of executive horology. Sculpted with a fluted gold bezel, black sunburst lacquer dial set with brilliant-cut markers, and an articulating presidential five-piece link bracelet with concealed crownclasp.",
    primaryImage: "assets/images/luxury-gold-watch.jpg",
    gallery: [
      "assets/images/luxury-gold-watch.jpg",
      "assets/images/hero-watch.jpg"
    ],
    themeSettings: {
      accentColor: "#d4af37",
      bgTone: "#0a0a0c",
      cardTone: "#141418",
      textTone: "#f5e6b8",
      animationStyle: "dramatic-shimmer",
      fontHeading: "'Cormorant Garamond', Georgia, serif"
    },
    specs: {
      "Case Diameter": "41 mm",
      "Case Thickness": "11.2 mm",
      "Case Material": "Solid 18K Yellow Gold PVD with Mirror Fluted Bezel",
      "Dial Color": "Deep Noir Sunburst with Faceted Hour Markers",
      "Movement": "Calibre R-3200 Chronometer Certified Automatic (70h reserve)",
      "Crystal": "Cyclops Magnifier Sapphire with Multi-Layer Anti-Reflection",
      "Water Resistance": "10 ATM (100 meters / 330 feet)",
      "Strap": "21 mm Articulating Presidential Semi-Circular Three-Piece Links"
    }
  },

  "diver": {
    id: "diver",
    name: "Abyss Diver 1000M",
    subtitle: "Professional Deep-Sea Marine Chronometer",
    category: "diver",
    categoryLabel: "Diver / Ocean",
    price: "$520",
    theme: "diver",
    tagline: "Deep ocean teal, unidirectional ceramic bezel, and submarine resilience.",
    description: "Engineered to withstand the abyssal pressures of deep ocean exploration, the Abyss Diver pairs a marine sunburst teal dial with photoluminescent Super-LumiNova markers. Features a helium escape valve, screw-down quadruple-gasket crown, and solid link bracelet.",
    primaryImage: "assets/images/diver-watch.jpg",
    gallery: [
      "assets/images/diver-watch.jpg",
      "assets/images/hero-watch.jpg"
    ],
    themeSettings: {
      accentColor: "#0d9488",
      bgTone: "#07131f",
      cardTone: "#0d2238",
      textTone: "#e0f2fe",
      animationStyle: "fluid-ripple",
      fontHeading: "'Plus Jakarta Sans', sans-serif"
    },
    specs: {
      "Case Diameter": "44 mm",
      "Case Thickness": "13.6 mm",
      "Case Material": "Marine-Grade 904L Corrosion-Proof Stainless Steel",
      "Dial Color": "Ocean Sunburst Teal with Grade X1 Super-LumiNova",
      "Movement": "Calibre R-4000 Heavy-Duty Automatic Shock-Absorbing",
      "Crystal": "4.5 mm Extra-Thick Domed Synthetic Sapphire",
      "Water Resistance": "100 ATM (1000 meters / 3300 feet)",
      "Strap": "22 mm Solid Oyster-Link Steel with Wet-Suit Divers Extension"
    }
  }
};

// Export for browser environments
if (typeof window !== "undefined") {
  window.WATCH_CATALOG = WATCH_CATALOG;
}
