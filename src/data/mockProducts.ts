export interface Configuration {
  id: string;
  name: string;
  description: string;
  price: number;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    graphics?: string;
  };
  default?: boolean;
}

export interface ProductConfigurations {
  configurations: Configuration[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specifications: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  configurations?: ProductConfigurations;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  productCount: number;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: 'hardware',
    name: 'Hardware',
    icon: 'Monitor',
    description: 'Computers, servers, components',
    productCount: 6,
    subcategories: [
      { id: 'ordinateurs-portables', name: 'Laptops', description: 'Professional laptops', productCount: 2 },
      { id: 'ordinateurs-fixes', name: 'Desktop Computers', description: 'Desktop PCs and workstations', productCount: 1 },
      { id: 'serveurs', name: 'Servers', description: 'Enterprise servers', productCount: 1 },
      { id: 'composants', name: 'Components', description: 'RAM, drives, cards', productCount: 2 }
    ]
  },
  {
    id: 'software',
    name: 'Software',
    icon: 'Code',
    description: 'Software and applications',
    productCount: 4,
    subcategories: [
      { id: 'bureautique', name: 'Office', description: 'Office, productivity', productCount: 1 },
      { id: 'graphisme', name: 'Graphics', description: 'Design and creation', productCount: 1 },
      { id: 'securite', name: 'Security', description: 'Antivirus, protection', productCount: 1 },
      { id: 'gestion', name: 'Management', description: 'ERP, CRM, accounting', productCount: 1 }
    ]
  },
  {
    id: 'accessoires',
    name: 'Accessories',
    icon: 'MousePointer',
    description: 'Peripherals and accessories',
    productCount: 4,
    subcategories: [
      { id: 'peripheriques', name: 'Peripherals', description: 'Mice, keyboards, monitors', productCount: 2 },
      { id: 'connectique', name: 'Connectivity', description: 'Cables, adapters', productCount: 1 },
      { id: 'stockage', name: 'Storage', description: 'External drives, USB keys', productCount: 1 }
    ]
  },
  {
    id: 'reseaux',
    name: 'Networking',
    icon: 'Wifi',
    description: 'Network equipment',
    productCount: 4,
    subcategories: [
      { id: 'switches', name: 'Switches', description: 'Network switches', productCount: 1 },
      { id: 'routeurs', name: 'Routers', description: 'Routers and firewalls', productCount: 1 },
      { id: 'wifi', name: 'WiFi', description: 'WiFi access points', productCount: 1 },
      { id: 'cables', name: 'Cables', description: 'Network cables', productCount: 1 }
    ]
  },
  {
    id: 'cybersecurite',
    name: 'Cybersecurity',
    icon: 'Shield',
    description: 'Security solutions',
    productCount: 3,
    subcategories: [
      { id: 'firewalls', name: 'Firewalls', description: 'Next-generation firewalls', productCount: 1 },
      { id: 'antivirus', name: 'Antivirus', description: 'Endpoint protection', productCount: 1 },
      { id: 'chiffrement', name: 'Encryption', description: 'Encryption solutions', productCount: 1 }
    ]
  },
  {
    id: 'licences-services',
    name: 'Licenses & Services',
    icon: 'FileText',
    description: 'Software licenses and IT services',
    productCount: 2,
    subcategories: [
      { id: 'licences', name: 'Licenses', description: 'Software licenses', productCount: 1 },
      { id: 'services', name: 'Services', description: 'Support and maintenance', productCount: 1 }
    ]
  }
];

export const products: Product[] = [
  // Hardware - Ordinateurs Portables
  {
    id: 'dell-latitude-5520',
    name: 'Dell Latitude 5520',
    brand: 'Dell',
    category: 'hardware',
    subcategory: 'ordinateurs-portables',
    price: 1299,
    originalPrice: 1499,
    image: '/products/dell-latitude.jpg',
    description: 'Professional Dell Latitude 5520 laptop with Intel Core i7 processor, 16GB RAM, 512GB SSD. Ideal for businesses.',
    specifications: [
      'Intel Core i7-1165G7 processor',
      '16GB DDR4 RAM',
      '512GB NVMe SSD',
      '15.6" Full HD display',
      'Windows 11 Pro',
      '3-year warranty'
    ],
    inStock: true,
    rating: 4.5,
    reviews: 127
  },
  {
    id: 'hp-elitebook-840',
    name: 'HP EliteBook 840 G8',
    brand: 'HP',
    category: 'hardware',
    subcategory: 'ordinateurs-portables',
    price: 1499,
    image: '/products/hp-elitebook.jpg',
    description: 'Ultra-lightweight HP EliteBook 840 G8 laptop with Intel Core i7 processor and 14" Full HD display.',
    specifications: [
      'Intel Core i7-1165G7 processor',
      '16GB DDR4 RAM',
      '512GB NVMe SSD',
      '14" Full HD display',
      'Windows 11 Pro',
      '3-year warranty'
    ],
    inStock: true,
    rating: 4.3,
    reviews: 89
  },

  // Hardware - Ordinateurs Fixes
  {
    id: 'hp-elitedesk-800',
    name: 'HP EliteDesk 800 G5',
    brand: 'HP',
    category: 'hardware',
    subcategory: 'ordinateurs-fixes',
    price: 899,
    image: '/products/hp-elitedesk.jpg',
    description: 'Compact and powerful HP EliteDesk 800 G5 mini PC for modern office environments.',
    specifications: [
      'Intel Core i5-9500 processor',
      '8GB DDR4 RAM',
      '256GB SSD',
      'Windows 11 Pro',
      'Complete connectivity',
      '3-year warranty'
    ],
    inStock: true,
    rating: 4.3,
    reviews: 89,
    configurations: {
      configurations: [
        {
          id: 'basic',
          name: 'Basic Configuration',
          description: 'Ideal for office work and daily tasks',
          price: 899,
          specs: {
            processor: 'Intel Core i5-9500',
            ram: '8GB DDR4',
            storage: '256GB SSD'
          },
          default: true
        },
        {
          id: 'standard',
          name: 'Standard Configuration',
          description: 'Perfect for multitasking and professional applications',
          price: 1049,
          specs: {
            processor: 'Intel Core i7-9700',
            ram: '16GB DDR4',
            storage: '512GB SSD'
          }
        },
        {
          id: 'premium',
          name: 'Premium Configuration',
          description: 'High performance for intensive tasks',
          price: 1249,
          specs: {
            processor: 'Intel Core i9-9900',
            ram: '32GB DDR4',
            storage: '1TB SSD'
          }
        }
      ]
    }
  },

  // Hardware - Serveurs
  {
    id: 'dell-poweredge-r740',
    name: 'Dell PowerEdge R740',
    brand: 'Dell',
    category: 'hardware',
    subcategory: 'serveurs',
    price: 3499,
    image: '/products/dell-poweredge.jpg',
    description: 'High-performance Dell PowerEdge R740 rack server for businesses.',
    specifications: [
      '2x Intel Xeon Silver 4214',
      '32GB DDR4 ECC RAM',
      '4x 1TB SAS HDD',
      'Redundant Power Supply',
      'iDRAC Enterprise',
      '3-year warranty'
    ],
    inStock: true,
    rating: 4.7,
    reviews: 45
  },

  // Hardware - PC Gaming
  {
    id: 'gaming-pc-custom',
    name: 'PC Gaming Custom',
    brand: 'BDTECH',
    category: 'hardware',
    subcategory: 'ordinateurs-fixes',
    price: 1299,
    image: '/products/gaming-pc.jpg',
    description: 'Customizable high-performance gaming PC for gaming and content creation. Optimized configuration for AAA games.',
    specifications: [
      'RGB gaming case',
      '750W 80+ Gold power supply',
      'Liquid cooling',
      'Windows 11 Pro',
      '2-year warranty',
      'Technical support included'
    ],
    inStock: true,
    rating: 4.8,
    reviews: 89,
    configurations: {
      configurations: [
        {
          id: 'gaming-basic',
          name: 'Basic Gaming',
          description: 'Perfect for 1080p gaming and office work',
          price: 1299,
          specs: {
            processor: 'Intel Core i5-12400F',
            ram: '16GB DDR4 3200MHz',
            storage: '512GB SSD NVMe',
            graphics: 'NVIDIA RTX 3060 12GB'
          },
          default: true
        },
        {
          id: 'gaming-standard',
          name: 'Standard Gaming',
          description: 'Optimal performance for 1440p gaming',
          price: 1649,
          specs: {
            processor: 'Intel Core i7-12700F',
            ram: '32GB DDR4 3200MHz',
            storage: '1TB SSD NVMe',
            graphics: 'NVIDIA RTX 3070 8GB'
          }
        },
        {
          id: 'gaming-premium',
          name: 'Premium Gaming',
          description: 'Ultimate for 4K gaming and streaming',
          price: 2099,
          specs: {
            processor: 'Intel Core i9-12900F',
            ram: '64GB DDR4 3200MHz',
            storage: '2TB SSD NVMe',
            graphics: 'NVIDIA RTX 3080 10GB'
          }
        }
      ]
    }
  },

  // Hardware - Composants
  {
    id: 'cisco-switch-2960',
    name: 'Cisco Catalyst 2960',
    brand: 'Cisco',
    category: 'hardware',
    subcategory: 'composants',
    price: 2499,
    image: '/products/cisco-switch.jpg',
    description: 'Cisco Catalyst 2960-X 48-port network switch for enterprise network infrastructure.',
    specifications: [
      '48 Gigabit Ethernet ports',
      '4 SFP ports',
      'PoE+ support',
      'SNMP management',
      'Limited lifetime warranty',
      'Technical support included'
    ],
    inStock: false,
    rating: 4.7,
    reviews: 203
  },
  {
    id: 'kingston-ram-32gb',
    name: 'Kingston DDR4 32GB',
    brand: 'Kingston',
    category: 'hardware',
    subcategory: 'composants',
    price: 129,
    image: '/products/kingston-ram.jpg',
    description: 'Kingston DDR4 32GB (2x16GB) 3200MHz memory kit for desktop computers.',
    specifications: [
      'DDR4 3200MHz',
      '2x 16GB modules',
      'CL22 timing',
      '1.2V voltage',
      'Lifetime warranty',
      'Tested compatibility'
    ],
    inStock: true,
    rating: 4.6,
    reviews: 234
  },

  // Software - Bureautique
  {
    id: 'microsoft-office-365',
    name: 'Microsoft Office 365',
    brand: 'Microsoft',
    category: 'software',
    subcategory: 'bureautique',
    price: 12.50,
    image: '/products/office-365.jpg',
    description: 'Office 365 Business Premium suite with Word, Excel, PowerPoint, Outlook and cloud services.',
    specifications: [
      'Word, Excel, PowerPoint, Outlook',
      '1TB OneDrive per user',
      'Teams included',
      '24/7 technical support',
      'Automatic updates',
      'Annual license'
    ],
    inStock: true,
    rating: 4.6,
    reviews: 1542
  },

  // Software - Graphisme
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud',
    brand: 'Adobe',
    category: 'software',
    subcategory: 'graphisme',
    price: 59.99,
    image: '/products/adobe-cc.jpg',
    description: 'Complete Adobe Creative Cloud suite with Photoshop, Illustrator, InDesign and over 20 creative applications.',
    specifications: [
      'Photoshop, Illustrator, InDesign',
      'Premiere Pro, After Effects',
      'Adobe Stock included',
      '100GB cloud storage',
      'Automatic updates',
      'Technical support included'
    ],
    inStock: true,
    rating: 4.4,
    reviews: 892
  },

  // Software - Sécurité
  {
    id: 'kaspersky-endpoint',
    name: 'Kaspersky Endpoint Security',
    brand: 'Kaspersky',
    category: 'software',
    subcategory: 'securite',
    price: 35.99,
    image: '/products/kaspersky.jpg',
    description: 'Kaspersky endpoint security solution for businesses.',
    specifications: [
      'Anti-malware protection',
      'Application control',
      'Data encryption',
      'Centralized management',
      '24/7 support',
      'Annual license'
    ],
    inStock: true,
    rating: 4.2,
    reviews: 567
  },

  // Software - Gestion
  {
    id: 'sage-comptabilite',
    name: 'Sage Comptabilité',
    brand: 'Sage',
    category: 'software',
    subcategory: 'gestion',
    price: 89.99,
    image: '/products/sage.jpg',
    description: 'Sage accounting software for SMEs and businesses.',
    specifications: [
      'Complete accounting management',
      'Automated invoicing',
      'Financial reports',
      'Multi-currency',
      'Technical support',
      'Perpetual license'
    ],
    inStock: true,
    rating: 4.1,
    reviews: 234
  },

  // Accessoires - Périphériques
  {
    id: 'logitech-mx-master-3',
    name: 'Logitech MX Master 3',
    brand: 'Logitech',
    category: 'accessoires',
    subcategory: 'peripheriques',
    price: 89.99,
    image: '/products/mx-master-3.jpg',
    description: 'Wireless Logitech MX Master 3 mouse with Darkfield technology for exceptional precision.',
    specifications: [
      'Darkfield 4000 DPI sensor',
      'Rechargeable battery',
      'Bluetooth/Unifying connection',
      '7 programmable buttons',
      'Ergonomic design',
      '2-year warranty'
    ],
    inStock: true,
    rating: 4.8,
    reviews: 567
  },
  {
    id: 'dell-dock-wd19',
    name: 'Dell Dock WD19',
    brand: 'Dell',
    category: 'accessoires',
    subcategory: 'peripheriques',
    price: 299,
    image: '/products/dell-dock.jpg',
    description: 'Dell WD19 docking station with complete connectivity for Dell laptops.',
    specifications: [
      'Thunderbolt 3 connection',
      '3 DisplayPort ports',
      '6 USB 3.1 ports',
      'Gigabit Ethernet',
      'Audio in/out',
      '130W power supply'
    ],
    inStock: true,
    rating: 4.2,
    reviews: 134
  },

  // Accessoires - Connectique
  {
    id: 'cable-cat6-100m',
    name: 'Câble Cat6 100m',
    brand: 'Belden',
    category: 'accessoires',
    subcategory: 'connectique',
    price: 89.99,
    image: '/products/cable-cat6.jpg',
    description: 'Cat6 network cable 100m for professional installation.',
    specifications: [
      'Cat6 UTP 100m',
      '250MHz bandwidth',
      'Up to 1Gbps speed',
      'Shielded cable',
      '10-year warranty',
      'TIA/EIA certification'
    ],
    inStock: true,
    rating: 4.5,
    reviews: 89
  },

  // Accessoires - Stockage
  {
    id: 'seagate-2tb-external',
    name: 'Seagate 2TB External',
    brand: 'Seagate',
    category: 'accessoires',
    subcategory: 'stockage',
    price: 79.99,
    image: '/products/seagate-external.jpg',
    description: 'Seagate 2TB external hard drive USB 3.0 for backup.',
    specifications: [
      '2TB capacity',
      'USB 3.0 interface',
      '120MB/s speed',
      'Windows/Mac compatible',
      '2-year warranty',
      'Automatic backup'
    ],
    inStock: true,
    rating: 4.3,
    reviews: 456
  },

  // Réseaux - Switches
  {
    id: 'netgear-gs724t',
    name: 'Netgear GS724T',
    brand: 'Netgear',
    category: 'reseaux',
    subcategory: 'switches',
    price: 399,
    image: '/products/netgear-switch.jpg',
    description: 'Managed Netgear GS724T 24-port Gigabit switch with VLAN and QoS.',
    specifications: [
      '24 Gigabit Ethernet ports',
      '2 SFP ports',
      'Web management',
      'VLAN support',
      'Advanced QoS',
      'Lifetime warranty'
    ],
    inStock: false,
    rating: 4.1,
    reviews: 76
  },

  // Réseaux - Routeurs
  {
    id: 'cisco-rv340',
    name: 'Cisco RV340',
    brand: 'Cisco',
    category: 'reseaux',
    subcategory: 'routeurs',
    price: 299,
    image: '/products/cisco-rv340.jpg',
    description: 'Cisco RV340 VPN router for small businesses.',
    specifications: [
      '4 Gigabit Ethernet ports',
      'SSL/IPSec VPN',
      'Integrated firewall',
      'Web management',
      '24/7 support',
      '1-year warranty'
    ],
    inStock: true,
    rating: 4.4,
    reviews: 123
  },

  // Réseaux - WiFi
  {
    id: 'ubiquiti-unifi-ap',
    name: 'Ubiquiti UniFi AP AC Pro',
    brand: 'Ubiquiti',
    category: 'reseaux',
    subcategory: 'wifi',
    price: 149,
    image: '/products/unifi-ap.jpg',
    description: 'Professional Ubiquiti UniFi AC Pro WiFi access point for enterprise networks.',
    specifications: [
      '802.11ac Dual-Band WiFi',
      'Up to 1300 Mbps speed',
      '802.3af PoE',
      'Centralized management',
      '3x3 MIMO antennas',
      '2-year warranty'
    ],
    inStock: true,
    rating: 4.6,
    reviews: 298
  },

  // Réseaux - Câbles
  {
    id: 'cable-fibre-om4',
    name: 'Câble Fibre OM4',
    brand: 'Corning',
    category: 'reseaux',
    subcategory: 'cables',
    price: 199,
    image: '/products/fibre-om4.jpg',
    description: 'OM4 fiber optic cable 50m for high-speed connections.',
    specifications: [
      'OM4 multimode',
      '50m length',
      'Up to 100Gbps speed',
      'LC-LC connectors',
      '20-year warranty',
      'ISO certification'
    ],
    inStock: true,
    rating: 4.7,
    reviews: 67
  },

  // Cybersécurité - Firewalls
  {
    id: 'fortinet-fortigate-60f',
    name: 'FortiGate 60F',
    brand: 'Fortinet',
    category: 'cybersecurite',
    subcategory: 'firewalls',
    price: 899,
    image: '/products/fortigate-60f.jpg',
    description: 'Next-generation FortiGate 60F firewall with advanced threat protection.',
    specifications: [
      'Up to 3.4 Gbps throughput',
      'IPS/IDS protection',
      'SSL/IPSec VPN',
      'Web filtering',
      'Integrated antivirus',
      '1-year license included'
    ],
    inStock: true,
    rating: 4.7,
    reviews: 234
  },

  // Cybersécurité - Antivirus
  {
    id: 'symantec-endpoint-protection',
    name: 'Symantec Endpoint Protection',
    brand: 'Symantec',
    category: 'cybersecurite',
    subcategory: 'antivirus',
    price: 45.99,
    image: '/products/symantec-ep.jpg',
    description: 'Symantec endpoint security solution with advanced malware protection.',
    specifications: [
      'Anti-malware protection',
      'Application control',
      'Data encryption',
      'Centralized management',
      '24/7 support',
      'Annual license'
    ],
    inStock: true,
    rating: 4.3,
    reviews: 445
  },

  // Cybersécurité - Chiffrement
  {
    id: 'bitlocker-enterprise',
    name: 'BitLocker Enterprise',
    brand: 'Microsoft',
    category: 'cybersecurite',
    subcategory: 'chiffrement',
    price: 25.99,
    image: '/products/bitlocker.jpg',
    description: 'BitLocker Enterprise encryption solution for Windows.',
    specifications: [
      'AES 256-bit encryption',
      'Centralized management',
      'Automatic recovery',
      'Active Directory integration',
      'Technical support',
      'Per-user license'
    ],
    inStock: true,
    rating: 4.5,
    reviews: 178
  },

  // Licences & Services - Licences
  {
    id: 'windows-server-licence',
    name: 'Windows Server Licence',
    brand: 'Microsoft',
    category: 'licences-services',
    subcategory: 'licences',
    price: 899,
    image: '/products/windows-server.jpg',
    description: 'Windows Server 2022 Standard license for servers.',
    specifications: [
      'Windows Server 2022 Standard',
      'Perpetual license',
      '16 cores support',
      '2 virtual instances',
      'Technical support included',
      '1-year warranty'
    ],
    inStock: true,
    rating: 4.6,
    reviews: 89
  },

  // Licences & Services - Services
  {
    id: 'support-it-premium',
    name: 'Support IT Premium',
    brand: 'BDTECH Solutions',
    category: 'licences-services',
    subcategory: 'services',
    price: 299,
    image: '/products/support-premium.jpg',
    description: 'Premium IT support service BDTECH Solutions with 24/7 intervention and preventive maintenance.',
    specifications: [
      '24/7 technical support',
      'On-site intervention',
      'Preventive maintenance',
      'System monitoring',
      'Cloud backup',
      'Annual contract'
    ],
    inStock: true,
    rating: 4.9,
    reviews: 67
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsBySubcategory = (category: string, subcategory: string): Product[] => {
  return products.filter(product => product.category === category && product.subcategory === subcategory);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getSubcategoryById = (categoryId: string, subcategoryId: string): Subcategory | undefined => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find(sub => sub.id === subcategoryId);
}; 