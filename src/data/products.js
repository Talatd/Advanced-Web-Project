// Mock product data - can be replaced with database queries later
// Each product has an ownerId field that links it to a specific user
// This ensures data isolation between users
export const products = [
  {
    id: 1,
    ownerId: 1, // Admin user
    name: "Wireless Noise-Cancelling Headphones",
    brand: "SoundMax",
    price: 299.99,
    originalPrice: 399.99,
    category: "Electronics",
    subcategory: "Audio",
    rating: 4.7,
    reviewCount: 1284,
    stock: 45,
    description: "Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation technology. With 30-hour battery life and ultra-comfortable ear cushions, these headphones are perfect for music lovers, gamers, and professionals alike.",
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Bluetooth 5.3",
      "Hi-Res Audio certified",
      "Foldable design",
      "Built-in microphone",
      "Touch controls",
      "Multi-device pairing"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 40kHz",
      "Impedance": "32 Ohm",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.3, 3.5mm AUX",
      "Battery": "800mAh Li-ion",
      "Charging": "USB-C, 10min quick charge = 3hrs playback"
    },
    image: "/products/headphones.jpg",
    images: ["/products/headphones.jpg", "/products/headphones-2.jpg", "/products/headphones-3.jpg"],
    tags: ["wireless", "noise-cancelling", "bluetooth", "premium"],
    dateAdded: "2024-01-15",
    sku: "SM-WH-001"
  },
  {
    id: 2,
    ownerId: 1, // Admin user
    name: "Ultra-Slim Laptop 15 Pro",
    brand: "TechNova",
    price: 1299.99,
    originalPrice: 1499.99,
    category: "Electronics",
    subcategory: "Computers",
    rating: 4.8,
    reviewCount: 856,
    stock: 20,
    description: "The Ultra-Slim Laptop 15 Pro combines stunning performance with an incredibly thin and lightweight design. Powered by the latest processor and featuring a vibrant 15.6-inch OLED display, it's the ultimate productivity machine.",
    features: [
      "15.6-inch 4K OLED Display",
      "Latest Gen Processor",
      "16GB DDR5 RAM",
      "512GB NVMe SSD",
      "Backlit Keyboard",
      "Fingerprint Reader",
      "Thunderbolt 4 ports",
      "All-day battery life"
    ],
    specifications: {
      "Processor": "Intel Core i7-13700H",
      "RAM": "16GB DDR5 4800MHz",
      "Storage": "512GB PCIe Gen 4 NVMe",
      "Display": "15.6\" 4K OLED, 400 nits",
      "GPU": "Intel Iris Xe Graphics",
      "Battery": "72Wh, up to 12 hours",
      "Weight": "1.6 kg",
      "OS": "Windows 11 Pro"
    },
    image: "/products/laptop.jpg",
    images: ["/products/laptop.jpg", "/products/laptop-2.jpg"],
    tags: ["laptop", "ultrabook", "4k", "oled", "professional"],
    dateAdded: "2024-02-01",
    sku: "TN-LP-015"
  },
  {
    id: 3,
    ownerId: 1, // Admin user
    name: "Smart Fitness Watch X3",
    brand: "FitPro",
    price: 199.99,
    originalPrice: 249.99,
    category: "Wearables",
    subcategory: "Smartwatches",
    rating: 4.5,
    reviewCount: 2103,
    stock: 150,
    description: "Track your fitness journey with the Smart Fitness Watch X3. Featuring advanced health monitoring sensors, GPS tracking, and a stunning AMOLED display, this smartwatch helps you stay on top of your health and fitness goals.",
    features: [
      "1.4-inch AMOLED Display",
      "Heart Rate Monitoring",
      "Blood Oxygen (SpO2) Sensor",
      "Built-in GPS",
      "50m Water Resistance",
      "Sleep Tracking",
      "100+ Workout Modes",
      "7-day Battery Life"
    ],
    specifications: {
      "Display": "1.4\" AMOLED, 454x454",
      "Sensors": "Heart Rate, SpO2, Accelerometer, Gyroscope",
      "Connectivity": "Bluetooth 5.2, Wi-Fi",
      "Water Resistance": "5 ATM (50m)",
      "Battery": "420mAh, up to 7 days",
      "Compatibility": "iOS 14+, Android 8+",
      "Weight": "45g (without strap)",
      "Strap": "Silicone, 22mm quick-release"
    },
    image: "/products/smartwatch.jpg",
    images: ["/products/smartwatch.jpg", "/products/smartwatch-2.jpg"],
    tags: ["smartwatch", "fitness", "health", "gps"],
    dateAdded: "2024-01-20",
    sku: "FP-SW-X3"
  },
  {
    id: 4,
    ownerId: 1, // Admin user
    name: "4K Ultra HD Action Camera",
    brand: "AdventureCam",
    price: 349.99,
    originalPrice: null,
    category: "Electronics",
    subcategory: "Cameras",
    rating: 4.6,
    reviewCount: 967,
    stock: 75,
    description: "Capture every adventure in stunning 4K Ultra HD. This rugged action camera features advanced stabilization, waterproof housing, and wide-angle lens to make your footage look professional even in extreme conditions.",
    features: [
      "4K @ 60fps Video",
      "20MP Photo",
      "HyperSmooth Stabilization",
      "Waterproof to 10m without housing",
      "Voice Control",
      "Live Streaming",
      "Slow Motion (240fps at 1080p)",
      "GPS & Motion Sensors"
    ],
    specifications: {
      "Video Resolution": "4K60, 2.7K120, 1080p240",
      "Photo Resolution": "20MP",
      "Sensor": "1/2.3\" CMOS",
      "Lens": "Wide angle 155°",
      "Display": "2\" Touch LCD + 1.4\" front",
      "Battery": "1720mAh, ~90min 4K recording",
      "Storage": "microSD up to 256GB",
      "Weight": "158g"
    },
    image: "/products/action-camera.jpg",
    images: ["/products/action-camera.jpg", "/products/action-camera-2.jpg"],
    tags: ["camera", "4k", "action", "waterproof", "adventure"],
    dateAdded: "2024-03-10",
    sku: "AC-4K-001"
  },
  {
    id: 5,
    ownerId: 1, // Admin user
    name: "Ergonomic Mechanical Keyboard",
    brand: "TypeMaster",
    price: 159.99,
    originalPrice: 189.99,
    category: "Electronics",
    subcategory: "Peripherals",
    rating: 4.9,
    reviewCount: 3421,
    stock: 200,
    description: "Elevate your typing experience with the Ergonomic Mechanical Keyboard. Featuring premium mechanical switches, customizable RGB backlighting, and an ergonomic split design that reduces wrist strain during long typing sessions.",
    features: [
      "Cherry MX Brown Switches",
      "Per-key RGB Backlighting",
      "Split Ergonomic Design",
      "Programmable Keys",
      "Detachable Wrist Rest",
      "USB-C Connection",
      "N-Key Rollover",
      "Aluminum Frame"
    ],
    specifications: {
      "Switch Type": "Cherry MX Brown (Tactile)",
      "Key Rollover": "N-Key (NKRO)",
      "Backlighting": "Per-key RGB, 16.8M colors",
      "Connection": "USB-C (detachable cable)",
      "Layout": "Full-size, Split ergonomic",
      "Material": "Aluminum top plate, ABS base",
      "Weight": "980g",
      "Cable Length": "1.8m braided"
    },
    image: "/products/keyboard.jpg",
    images: ["/products/keyboard.jpg", "/products/keyboard-2.jpg"],
    tags: ["keyboard", "mechanical", "ergonomic", "rgb", "gaming"],
    dateAdded: "2024-02-15",
    sku: "TM-KB-ERG"
  },
  {
    id: 6,
    ownerId: 2, // John Doe (regular user)
    name: "Portable Bluetooth Speaker",
    brand: "SoundMax",
    price: 89.99,
    originalPrice: 119.99,
    category: "Electronics",
    subcategory: "Audio",
    rating: 4.4,
    reviewCount: 1876,
    stock: 300,
    description: "Take your music anywhere with this compact yet powerful Bluetooth speaker. Delivering rich 360° sound with deep bass, it's perfect for outdoor adventures, beach trips, and backyard parties.",
    features: [
      "360° Surround Sound",
      "IPX7 Waterproof",
      "24-hour Battery Life",
      "Built-in Microphone",
      "Stereo Pairing",
      "USB-C Charging",
      "Carabiner Clip",
      "Dustproof (IP6X)"
    ],
    specifications: {
      "Driver": "2x 10W full-range + passive radiator",
      "Frequency Response": "60Hz - 20kHz",
      "Bluetooth": "5.0, 30m range",
      "Battery": "5000mAh, 24hrs playback",
      "Charging": "USB-C, 3hrs full charge",
      "Waterproof": "IPX7 (30min submersion at 1m)",
      "Weight": "540g",
      "Dimensions": "180 x 70 x 70mm"
    },
    image: "/products/speaker.jpg",
    images: ["/products/speaker.jpg"],
    tags: ["speaker", "bluetooth", "portable", "waterproof"],
    dateAdded: "2024-01-05",
    sku: "SM-BS-360"
  },
  {
    id: 7,
    ownerId: 2, // John Doe (regular user)
    name: "Smart Home Hub Pro",
    brand: "HomeTech",
    price: 129.99,
    originalPrice: null,
    category: "Smart Home",
    subcategory: "Hubs",
    rating: 4.3,
    reviewCount: 654,
    stock: 90,
    description: "Control your entire smart home ecosystem from one central hub. Compatible with all major smart home protocols and voice assistants, the Smart Home Hub Pro makes home automation simple and seamless.",
    features: [
      "Zigbee, Z-Wave, Wi-Fi, Thread support",
      "Voice Assistant Compatible",
      "7-inch Touch Display",
      "Built-in Speaker",
      "Security Camera Feed",
      "Energy Monitoring Dashboard",
      "Automation Routines",
      "Remote Access"
    ],
    specifications: {
      "Display": "7\" IPS Touch, 1280x800",
      "Protocols": "Zigbee 3.0, Z-Wave Plus, Wi-Fi 6, Thread, BLE",
      "Processor": "Quad-core A53, 2GB RAM",
      "Storage": "16GB eMMC",
      "Speaker": "2x 5W stereo",
      "Microphone": "4x MEMS array",
      "Power": "12V DC adapter",
      "Dimensions": "200 x 130 x 20mm"
    },
    image: "/products/smart-hub.jpg",
    images: ["/products/smart-hub.jpg"],
    tags: ["smart-home", "hub", "automation", "zigbee"],
    dateAdded: "2024-03-01",
    sku: "HT-HB-PRO"
  },
  {
    id: 8,
    ownerId: 2, // John Doe (regular user)
    name: "Professional Drone X500",
    brand: "SkyView",
    price: 899.99,
    originalPrice: 1099.99,
    category: "Electronics",
    subcategory: "Drones",
    rating: 4.7,
    reviewCount: 432,
    stock: 15,
    description: "Capture breathtaking aerial footage with the Professional Drone X500. Equipped with a 4K gimbal camera, intelligent flight modes, and obstacle avoidance, it's perfect for both hobbyists and professional content creators.",
    features: [
      "4K/60fps Gimbal Camera",
      "3-Axis Stabilization",
      "45-min Flight Time",
      "Obstacle Avoidance (6 directions)",
      "10km Video Transmission",
      "Intelligent Flight Modes",
      "Return to Home",
      "Foldable Design"
    ],
    specifications: {
      "Camera": "1/2\" CMOS, 48MP, 4K60",
      "Gimbal": "3-Axis mechanical",
      "Max Speed": "72 km/h",
      "Max Altitude": "6000m",
      "Flight Time": "45 minutes",
      "Transmission": "OcuSync 3.0, 10km",
      "Weight": "795g (with battery)",
      "Folded Size": "178 x 82 x 68mm"
    },
    image: "/products/drone.jpg",
    images: ["/products/drone.jpg", "/products/drone-2.jpg"],
    tags: ["drone", "4k", "camera", "aerial", "professional"],
    dateAdded: "2024-02-28",
    sku: "SV-DR-X500"
  },
  {
    id: 9,
    ownerId: 3, // Demo user
    name: "Wireless Charging Pad Duo",
    brand: "ChargeTech",
    price: 49.99,
    originalPrice: 69.99,
    category: "Accessories",
    subcategory: "Chargers",
    rating: 4.2,
    reviewCount: 2567,
    stock: 500,
    description: "Charge two devices simultaneously with this sleek wireless charging pad. Supporting the latest fast-charging standards, it's compatible with all Qi-enabled devices and features a premium fabric-wrapped design.",
    features: [
      "Dual 15W Fast Charging",
      "Qi2 Compatible",
      "LED Charging Indicator",
      "Foreign Object Detection",
      "Anti-slip Surface",
      "Ultra-thin Design",
      "Case-friendly (up to 5mm)",
      "USB-C Input"
    ],
    specifications: {
      "Output Power": "2x 15W (30W total)",
      "Input": "USB-C, 36W PD adapter included",
      "Standard": "Qi2 / Qi",
      "Charging Distance": "Up to 5mm through case",
      "Material": "Fabric top, Aluminum base",
      "LED": "Soft white charging indicator",
      "Dimensions": "200 x 100 x 8mm",
      "Weight": "180g"
    },
    image: "/products/charger.jpg",
    images: ["/products/charger.jpg"],
    tags: ["charger", "wireless", "qi", "fast-charging"],
    dateAdded: "2024-01-10",
    sku: "CT-WC-DUO"
  },
  {
    id: 10,
    ownerId: 3, // Demo user
    name: "Gaming Mouse Ultra",
    brand: "TypeMaster",
    price: 79.99,
    originalPrice: 99.99,
    category: "Electronics",
    subcategory: "Peripherals",
    rating: 4.6,
    reviewCount: 4231,
    stock: 180,
    description: "Dominate the competition with the Gaming Mouse Ultra. Featuring a high-precision 25K DPI sensor, ultra-lightweight design, and customizable buttons, it's engineered for esports and competitive gaming.",
    features: [
      "25,600 DPI Optical Sensor",
      "Ultra-lightweight (58g)",
      "8 Programmable Buttons",
      "RGB Lighting",
      "100-hour Battery Life",
      "Wireless & Wired Modes",
      "On-board Memory",
      "PTFE Glide Feet"
    ],
    specifications: {
      "Sensor": "PixArt PAW3395, 25,600 DPI",
      "Polling Rate": "1000Hz (wired), 1000Hz (wireless)",
      "Switches": "Optical, 80M click lifecycle",
      "Buttons": "8 programmable",
      "Battery": "500mAh, 100+ hours",
      "Connection": "2.4GHz wireless, USB-C wired",
      "Weight": "58g (without cable)",
      "Grip Style": "Claw/Fingertip"
    },
    image: "/products/mouse.jpg",
    images: ["/products/mouse.jpg"],
    tags: ["mouse", "gaming", "wireless", "esports", "rgb"],
    dateAdded: "2024-03-05",
    sku: "TM-MS-ULT"
  }
];

// ===== Service layer functions - filter by userId for data isolation =====

/**
 * Get all products belonging to a specific user
 * This is the core of our data access control
 */
export function getProductsByUser(userId) {
  return products.filter(p => p.ownerId === userId);
}

/**
 * Get a single product by ID - only if it belongs to the user
 */
export function getProductByIdForUser(id, userId) {
  const product = products.find(p => p.id === parseInt(id));
  if (!product || product.ownerId !== userId) {
    return null; // Product doesn't exist OR doesn't belong to this user
  }
  return product;
}

/**
 * Get products by category - only for this user's products
 */
export function getProductsByCategoryForUser(category, userId) {
  return products.filter(p => p.category === category && p.ownerId === userId);
}

/**
 * Search products - only within this user's products
 */
export function searchProductsForUser(query, userId) {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.ownerId === userId && (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  );
}

/**
 * Get unique categories for this user's products
 */
export function getCategoriesForUser(userId) {
  const userProducts = products.filter(p => p.ownerId === userId);
  return [...new Set(userProducts.map(p => p.category))];
}

/**
 * Get unique brands for this user's products
 */
export function getBrandsForUser(userId) {
  const userProducts = products.filter(p => p.ownerId === userId);
  return [...new Set(userProducts.map(p => p.brand))];
}

/**
 * Get product summary for AI - only this user's products
 * This prevents the AI from revealing other users' data
 */
export function getProductsSummaryForAIByUser(userId) {
  return products
    .filter(p => p.ownerId === userId)
    .map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      originalPrice: p.originalPrice,
      category: p.category,
      subcategory: p.subcategory,
      rating: p.rating,
      reviewCount: p.reviewCount,
      stock: p.stock,
      description: p.description,
      features: p.features,
      specifications: p.specifications,
      tags: p.tags
    }));
}
