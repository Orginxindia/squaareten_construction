/* ============================================================
   PROJECT STORE — LocalStorage Persistence for Projects
   ============================================================ */

const INITIAL_PROJECTS = [
  {
    id: 'maha-groups-residence',
    name: 'Maha groups - Residence',
    location: 'Thathaneri, Madurai',
    category: 'residential',
    status: 'Completed',
    img: '/assets/images/maha-hero-bg.jpg',
    description: 'A premium contemporary double-story residential design combining horizontal wood-look accents, concrete textures, and custom geometric facade elements.',
    area: '6,800 sq.ft',
    year: '2026',
    story: 'Maha groups Residence stands as a bold landmark of contemporary residential architecture in the Thathaneri area of Madurai. Designed as a luxury multi-family or grand single-family estate, the structure features a striking modern facade. The design merges natural wood grain panels with smooth concrete finishes and white architectural features. Highlighted by large glass windows, a structured front entrance, and custom metal work on the terrace, this home blends durability with an elite design aesthetic.',
    gallery: [
      '/assets/images/maha-hero-bg.jpg',
      '/assets/images/maha-after-0.jpg',
      '/assets/images/maha-after-1.jpg',
      '/assets/images/maha-after-2.jpg',
      '/assets/images/maha-after-3.jpg',
      '/assets/images/maha-after-4.jpg'
    ],
    beforeGallery: [
      '/assets/images/project-maha-1.jpg',
      '/assets/images/project-maha-2.jpg',
      '/assets/images/maha-before-new-1.jpg',
      '/assets/images/maha-before-new-2.jpg',
      '/assets/images/maha-before-new-3.jpg'
    ],
    afterGallery: [
      '/assets/images/maha-hero-bg.jpg',
      '/assets/images/maha-after-0.jpg',
      '/assets/images/maha-after-1.jpg',
      '/assets/images/maha-after-2.jpg',
      '/assets/images/maha-after-3.jpg',
      '/assets/images/maha-after-4.jpg'
    ],
    videos: [
      '/assets/images/maha-video-1.mp4',
      '/assets/images/maha-video-2.mp4',
      '/assets/images/maha-video-3.mp4'
    ],
    features: [
      'Contemporary Facade Design',
      'Premium Wood-Look Accents',
      'Spacious Balconies & Terraces',
      'Structural Steel Elements',
      'Bespoke Exterior Lighting',
      'Landscaped Front Entry'
    ],
    mapUrl: 'https://www.google.com/maps/@9.9415931,78.1019086,3a,75y,82.61h,95.91t/data=!3m7!1e1!3m5!1stOhnT9qfmch8gVNKH1dBrg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.90703917687037%26panoid%3DtOhnT9qfmch8gVNKH1dBrg%26yaw%3D82.60680081705755!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: 'sunrise-residences',
    name: 'Sunrise Residences',
    location: 'Nagudi, Aranthangi',
    category: 'residential',
    status: 'Completed',
    img: '/assets/images/project-nagudi-main.jpg',
    description: 'Modern 2 BHK residential home featuring a spacious veranda, dedicated vehicle parking, and landscaped gardening space.',
    area: '1,600 sq.ft',
    year: '2024',
    story: 'Sunrise Residences stands as a premium example of contemporary single-story home design. Featuring a spacious 2 BHK configuration (2 rooms, 1 kitchen, 1 hall), a welcoming veranda, dedicated vehicle parking, and landscaped gardening space, the home offers a perfect balance of comfort and modern aesthetics. The exterior combines textured stone cladding with warm horizontal wood-look panels and a sleek blue-grey canopy, creating a striking architectural statement in the Nagudi neighborhood.',
    gallery: [
      '/assets/images/project-nagudi-main.jpg',
      '/assets/images/project-nagudi-2.jpg',
      '/assets/images/project-nagudi-3.jpg'
    ],
    beforeGallery: [
      '/assets/images/project-nagudi-2.jpg',
      '/assets/images/project-nagudi-3.jpg'
    ],
    afterGallery: [
      '/assets/images/project-nagudi-main.jpg'
    ],
    features: ['2 Spacious Bedrooms', 'Modern Kitchen & Hall', 'Welcoming Front Veranda', 'Dedicated Vehicle Parking', 'Landscaped Gardening Area', 'Premium Stone Cladding'],
  },
  {
    id: 'swimming-pool-mannadimangalam',
    name: 'Swimming Pool at Mannadimangalam',
    location: 'Mannadimangalam, Madurai',
    category: 'interiors',
    status: 'Completed',
    img: '/assets/images/pool-image-1.jpeg',
    description: 'A premium concrete swimming pool construction featuring custom filtration, blue mosaic tile finishing, and integrated lighting.',
    area: '1,200 sq.ft',
    year: '2024',
    story: 'Located in the scenic area of Mannadimangalam, this custom-built luxury swimming pool project is designed as a private backyard oasis. Constructed with high-durability structural concrete and finished with premium mosaic tiles, the pool features a state-of-the-art multi-stage filtration system, energy-efficient underwater LED illumination, and a modern perimeter drainage deck. The design prioritizes both safety and sophisticated styling, integrating seamlessly with the surrounding landscape to create a stunning leisure area.',
    gallery: [
      '/assets/images/pool-image-1.jpeg',
      '/assets/images/pool-image-2.jpeg',
      '/assets/images/pool-image-3.jpeg',
      '/assets/images/pool-image-4.jpeg',
      '/assets/images/pool-image-5.jpeg',
      '/assets/images/pool-image-6.jpeg'
    ],
    beforeGallery: [
      '/assets/images/pool-image-2.jpeg',
      '/assets/images/pool-image-3.jpeg',
      '/assets/images/pool-image-5.jpeg'
    ],
    afterGallery: [
      '/assets/images/pool-image-1.jpeg',
      '/assets/images/pool-image-4.jpeg',
      '/assets/images/pool-image-6.jpeg'
    ],
    videos: [
      '/assets/images/pool-video-1.mp4',
      '/assets/images/pool-video-2.mp4',
      '/assets/images/pool-video-3.mp4'
    ],
    features: [
      'Structural Concrete Build',
      'Multi-Stage Filtration System',
      'Premium Mosaic Tiling',
      'Underwater LED Illumination',
      'Anti-Slip Perimeter Deck',
      'Bespoke Water Feature'
    ],
  },
  {
    id: 'heritage-revival',
    name: 'Modern Duplex Residence',
    location: 'Thanjavur, Tamil Nadu',
    category: 'residential',
    status: 'Completed',
    img: '/assets/images/project-duplex-main.jpg',
    description: 'A premium 3 BHK modern duplex residence featuring textured stone wall cladding, a spacious glass balcony, and bespoke interiors.',
    area: '3,200 sq.ft',
    year: '2024',
    story: 'This premium modern duplex residence represents a perfect fusion of bold contemporary architecture and high-end interior styling. Spanning two levels, the home features a custom-designed facade with textured grey stone cladding and geometric plaster bands. Inside, the spaces are designed for luxury living, starting with a grand living room with polished marble flooring and a custom backlit TV unit. A stunning structural staircase with glass panel balustrades leads to the upper level under a custom pattern skylight that filters beautiful natural light. Complete with premium bathroom fixtures and modern modular storage throughout, the residence offers a refined urban sanctuary.',
    gallery: [
      '/assets/images/project-duplex-main.jpg',
      '/assets/images/project-duplex-1.jpg',
      '/assets/images/project-duplex-2.jpg',
      '/assets/images/project-duplex-3.jpg',
      '/assets/images/project-duplex-4.jpg'
    ],
    beforeGallery: [
      '/assets/images/project-duplex-2.jpg',
      '/assets/images/project-duplex-3.jpg'
    ],
    afterGallery: [
      '/assets/images/project-duplex-main.jpg',
      '/assets/images/project-duplex-1.jpg',
      '/assets/images/project-duplex-4.jpg'
    ],
    features: [
      '3 Spacious Bedrooms',
      'Textured Stone Facade',
      'Glass Balconies',
      'Structural Glass Staircase',
      'Backlit TV Unit Fretwork',
      'Modern Bathroom Vanity'
    ],
  },
  {
    id: 'thirupaalai-residence',
    name: 'Thirupaalai Residence',
    location: 'Thirupaalai, Madurai',
    category: 'residential',
    status: 'Ongoing',
    img: '/assets/images/thirupaalai-image-1.jpeg',
    description: 'A modern contemporary premium residential project under construction in Madurai featuring latest finishes and high-end architecture.',
    area: '3,800 sq.ft',
    progress: 45,
    phase: 'Interior Finishing',
    expectedCompletion: 'March 2027',
    story: 'Located in the rapidly developing area of Thirupaalai in Madurai, this premium residential project represents the absolute pinnacle of modern family living. The home is designed with a strong emphasis on open-plan layout, natural light ventilation, and contemporary architectural aesthetics. Featuring high-end concrete works, customized structural glass balustrades, premium woodwork, and a curated color palette, the residence is built to deliver unparalleled luxury. The project is currently in its interior finishing and custom installations phase, with completion planned for early 2027.',
    gallery: [
      '/assets/images/thirupaalai-image-1.jpeg',
      '/assets/images/thirupaalai-image-2.jpeg',
      '/assets/images/thirupaalai-image-3.jpeg'
    ],
    beforeGallery: [
      '/assets/images/thirupaalai-image-2.jpeg',
      '/assets/images/thirupaalai-image-3.jpeg'
    ],
    afterGallery: [
      '/assets/images/thirupaalai-image-1.jpeg'
    ],
    videos: [
      '/assets/images/thirupaalai-video-1.mp4',
      '/assets/images/thirupaalai-video-2.mp4'
    ],
    features: [
      'Modern Open-Plan Design',
      'Premium Interior Woodwork',
      'Custom Glazing & Ventilation',
      'Eco-Friendly Rainwater Systems',
      'High-End Sanitary Fittings',
      'Landscaped Outdoor Entry'
    ],
    mapUrl: 'https://www.google.com/maps/place/Thiruppalai,+Madurai,+Tamil+Nadu/data=!4m2!3m1!1s0x3b00c5ee91807d9f:0xc6822262d1838cf1?entry=tts',
  },
  {
    id: 'sedapaaty-residence',
    name: 'Sedapaaty Residence',
    location: 'Sedapatti, Madurai',
    category: 'residential',
    status: 'Ongoing',
    img: '/assets/images/sedapaaty-residence.png',
    description: 'A premium contemporary double-story residential villa combining modern architectural aesthetics, warm exterior cove lighting, a private garage, and landscaped details.',
    area: '3,500 sq.ft',
    progress: 30,
    phase: 'Foundation & Ground Work',
    expectedCompletion: 'August 2027',
    story: 'Sedapaaty Residence stands as an upcoming masterpiece of modern residential architecture by Squaareten Construction in Sedapatti, Madurai. The design features a striking double-story structure with a private garage, bespoke wooden cladding highlights, glass balconies, and elegant perimeter boundary lighting. Emphasizing premium construction standards, this villa is designed to merge visual luxury with modern structural durability. The project is currently in the initial construction phase, making steady progress towards completion.',
    gallery: ['/assets/images/sedapaaty-residence.png'],
    features: [
      'Premium Double-Story Design',
      'Private Garage Space',
      'Modern Wooden Cladding Facade',
      'Glass Balcony Railings',
      'Bespoke Exterior Cove Lighting',
      'Landscaped Planters & Boundaries'
    ]
  },
  {
    id: 'sandhaipettai-residence',
    name: 'Sandhaipettai Residence',
    location: 'Sandhaipettai, Madurai',
    category: 'residential',
    status: 'Completed',
    img: '/assets/images/sandhaipettai-image-1.jpeg',
    description: 'A premium residential project under construction in Madurai featuring modern architectural planning and engineering.',
    area: '4,200 sq.ft',
    year: '2026',
    story: 'Located in the historic area of Sandhaipettai in Madurai, this residential build represents Squaare Ten\'s commitment to premium quality structural engineering. The building features an optimized load-bearing design, high-strength concrete reinforcement, and robust foundation systems. Our team is working closely with top consultants to ensure every aspect of the project meets highest safety and efficiency standards. Custom planning allows for a layout that blends traditional spatial values with high-end modern amenities, perfectly suited for the urban landscape of Madurai.',
    gallery: [
      '/assets/images/sandhaipettai-image-1.jpeg',
      '/assets/images/sandhaipettai-image-2.jpeg',
      '/assets/images/sandhaipettai-image-3.jpeg',
      '/assets/images/sandhaipettai-image-4.jpeg',
      '/assets/images/sandhaipettai-image-5.jpeg'
    ],
    beforeGallery: [
      '/assets/images/sandhaipettai-image-2.jpeg',
      '/assets/images/sandhaipettai-image-3.jpeg'
    ],
    afterGallery: [
      '/assets/images/sandhaipettai-image-1.jpeg',
      '/assets/images/sandhaipettai-image-4.jpeg',
      '/assets/images/sandhaipettai-image-5.jpeg'
    ],
    videos: [
      '/assets/images/sandhaipettai-video-1.mp4',
      '/assets/images/sandhaipettai-video-2.mp4',
      '/assets/images/sandhaipettai-video-3.mp4',
      '/assets/images/sandhaipettai-video-4.mp4',
      '/assets/images/sandhaipettai-video-5.mp4'
    ],
    features: [
      'High-Strength Reinforced Concrete',
      'Optimized Foundation Design',
      'Modern Structural Engineering',
      'Ventilated Spatial Layout',
      'Premium Building Material Sourcing',
      'Integrated Safety Compliance'
    ],
    mapUrl: 'https://www.google.com/maps/place/Sandhaipettai,+Madurai,+Tamil+Nadu/data=!4m2!3m1!1s0x3b00c5df600b3967:0xfa7c0678d5940c3c?entry=tts',
  },
  {
    id: 'mahatma-global-gateway',
    name: 'Mahatma Global Gateway',
    location: 'Madurai, Tamil Nadu',
    category: 'renovation',
    status: 'Completed',
    img: '/assets/images/school-image-1.jpeg',
    description: 'Engineering consultancy and comprehensive interior work execution for Mahatma Global Gateway in Madurai.',
    area: 'School Campus',
    year: '2025',
    story: 'Mahatma Global Gateway represents our hallmark project in educational institution interiors and engineering consultancy in Madurai. We designed and executed state-of-the-art classroom designs, administrative offices, corridors, and campus common areas that prioritize a stimulating learning environment. The design features colorful, durable finishes, high-quality safety-first lighting, ergonomic furniture configurations, and premium acoustics. Every element was carefully engineered to balance visual appeal, institutional functionality, and strict safety guidelines.',
    gallery: [
      '/assets/images/school-image-1.jpeg',
      '/assets/images/school-image-2.jpeg',
      '/assets/images/school-image-3.jpeg',
      '/assets/images/school-image-4.jpeg',
      '/assets/images/school-image-5.jpeg',
      '/assets/images/school-image-6.jpeg'
    ],
    beforeGallery: [
      '/assets/images/school-image-2.jpeg',
      '/assets/images/school-image-3.jpeg',
      '/assets/images/school-image-5.jpeg'
    ],
    afterGallery: [
      '/assets/images/school-image-1.jpeg',
      '/assets/images/school-image-4.jpeg',
      '/assets/images/school-image-7.jpeg'
    ],
    features: [
      'Engineering Consultancy',
      'Premium School Interiors',
      'Safety-Focused Lighting',
      'Acoustic Ceiling Panels',
      'Ergonomic Learning Spaces',
      'High-Durability Finishes'
    ],
    mapUrl: 'https://www.google.com/maps/place/Mahatma+Global+Gateway/@9.964722,78.156111,15z/data=!4m2!3m1!1s0x0:0xbf2c8f0000000000?entry=tts',
  },
  {
    id: 'abi-and-co-home-appliances',
    name: 'Abi & Co - Home Appliances',
    location: 'Bypass Road, Madurai',
    category: 'commercial',
    status: 'Completed',
    img: '/assets/images/abi-exterior-1.jpg',
    description: 'A premium double-story commercial showroom and retail space featuring custom spatial layouts, glass glazing facade, and modular display interiors.',
    area: '4,500 sq.ft',
    year: '2026',
    story: 'Abi & Co showroom stands as a flagship commercial retail development on Madurai Bypass Road. We delivered the structural design, glazing facade engineering, and comprehensive interior layout zoning to support large display spaces for retail appliances. Highlighting durability and premium architectural finishes, this landmark is built to attract and withstand high client volumes.',
    gallery: ['/assets/images/abi-exterior-1.jpg'],
    features: ['Glazing Facade', 'Showroom Interiors', 'Turnkey Commercial Fit-out'],
    isCustomPage: true,
  },
  {
    id: 'bonitaa-hair-skin-care',
    name: 'Bonitaa Hair & Skin Care - Maudrai',
    location: 'Madurai, Tamil Nadu',
    category: 'interiors',
    status: 'Completed',
    img: '/assets/images/bonita-after-5.jpg',
    description: 'A premium salon and wellness space designed and executed with modern interiors, elegant finishes, and a customer-focused experience.',
    area: '1,500 sq.ft',
    year: '2026',
    story: 'Bonitaa Hair & Skin Care in Madurai is a premium salon and wellness space designed and executed with modern interiors, elegant finishes, and a customer-focused experience. The project showcases customized interior partitions, premium brand-focused color palettes, styling and grooming lounges, and advanced hair & skin care service zones.',
    gallery: [
      '/assets/images/bonita-after-5.jpg',
      '/assets/images/bonita-image-1.jpeg',
      '/assets/images/bonita-image-4.jpeg',
      '/assets/images/bonita-image-6.jpeg',
      '/assets/images/bonita-image-9.jpeg',
      '/assets/images/bonita-after-6.jpg',
      '/assets/images/bonita-after-7.jpeg',
      '/assets/images/bonita-after-8.jpg',
      '/assets/images/bonita-before-1.jpeg',
      '/assets/images/bonita-before-3.jpeg',
      '/assets/images/bonita-before-4.jpeg',
      '/assets/images/bonita-before-5.jpeg',
      '/assets/images/bonita-before-6.jpeg',
      '/assets/images/bonita-before-7.jpeg'
    ],
    beforeGallery: [
      '/assets/images/bonita-before-1.jpeg',
      '/assets/images/bonita-before-3.jpeg',
      '/assets/images/bonita-before-4.jpeg',
      '/assets/images/bonita-before-5.jpeg',
      '/assets/images/bonita-before-6.jpeg',
      '/assets/images/bonita-before-7.jpeg'
    ],
    afterGallery: [
      '/assets/images/bonita-after-5.jpg',
      '/assets/images/bonita-image-1.jpeg',
      '/assets/images/bonita-image-4.jpeg',
      '/assets/images/bonita-image-6.jpeg',
      '/assets/images/bonita-image-9.jpeg',
      '/assets/images/bonita-after-6.jpg',
      '/assets/images/bonita-after-7.jpeg',
      '/assets/images/bonita-after-8.jpg'
    ],
    videos: [
      '/assets/images/bonita-video-1.mp4',
      '/assets/images/bonita-video-6.mp4',
      '/assets/images/bonita-video-4.mp4',
      '/assets/images/bonita-video-5.mp4',
      '/assets/images/bonita-video-3.mp4'
    ],
    features: [
      'Premium Salon Interiors',
      'Modern Reception & Waiting Areas',
      'Customized Interior Finishes',
      'Brand-Focused Design Execution'
    ],
    mapUrl: 'https://www.google.com/maps/place/BONITAA+SKIN+AND+HAIR+CARE/@9.9238552,78.0175391,13z/data=!4m10!1m2!2m1!1smap+bonitaa+bypass+madurai!3m6!1s0x3b00cfd1cca47ce9:0x12c89ce66c58650a!8m2!3d9.9238552!4d78.0937568?entry=ttu',
  },
  {
    id: 'bonitaa-tiruvallur',
    name: 'Bonitaa Hair & Skin Care - Tiruvallur',
    location: 'Tiruvallur District, Tamil Nadu',
    category: 'interiors',
    status: 'Ongoing',
    img: '/assets/images/bonitaa-tiruvallur-1.jpeg',
    description: 'Ongoing interior project for a new franchise branch of Bonitaa featuring premium clinical layout, consulting areas, and advanced design execution.',
    area: 'Premium Franchise Outlet',
    progress: 35,
    phase: 'Layout Partitioning',
    expectedCompletion: 'November 2026',
    story: 'We are proud to execute the interior architecture for the new Bonitaa franchise branch in Tiruvallur District. This premium hair and skin care facility is structured with specialized treatment rooms, consulting offices, discussion halls, and a spacious reception lounge.',
    gallery: [
      '/assets/images/bonitaa-tiruvallur-1.jpeg',
      '/assets/images/bonitaa-tiruvallur-2.jpeg'
    ],
    beforeGallery: [
      '/assets/images/bonitaa-tiruvallur-2.jpeg'
    ],
    afterGallery: [
      '/assets/images/bonitaa-tiruvallur-1.jpeg'
    ],
    features: [
      'Modern Reception Lounge',
      'Specialised Treatment Rooms',
      'Consulting & Discussion Areas'
    ]
  },
  {
    id: 'karuppiah-nagar',
    name: 'Karuppiah Nagar',
    location: 'Kovilpapakudi, Madurai',
    category: 'plots',
    status: 'Ongoing',
    img: '/assets/images/karuppiah-nagar-brochure-banner.jpg',
    description: 'DTCP-Approved premium residential plots in Kovilpapakudi, Madurai. Features 30 & 40 ft wide roads, underground drainage, street lights, water connection, and 100% clear titles.',
    plotArea: '1,200 – 2,400 sq.ft',
    approval: 'DTCP Approved',
    price: 'Starting ₹15 Lakhs',
    progress: 60,
    phase: 'Plot Development',
    expectedCompletion: 'December 2026',
    story: 'Karuppiah Nagar is a premium residential plot development by Squaareten Construction Pvt Ltd, located in the rapidly growing Kovilpapakudi area of Madurai. The DTCP-approved layout features well-planned plots ranging from 1,200 to 2,400 sq.ft with 30 ft and 40 ft wide internal roads, underground drainage, street lighting, and landscaped common areas.',
    gallery: ['/assets/images/karuppiah-nagar-brochure-banner.jpg'],
    features: ['DTCP Approved Layout', '30 & 40 ft Wide Roads', 'Underground Drainage', 'Street Lighting'],
    isCustomPage: true,
  },
  {
    id: 'emerald-villa-01',
    name: 'Emerald Villa — Type A',
    location: 'Madurai, Tamil Nadu',
    category: 'residential',
    status: 'Completed',
    img: '/assets/images/project-villa.png',
    description: 'Ready-to-move 3BHK villa with premium finishes, private garden, and covered parking.',
    area: '2,800 sq.ft',
    year: '2025',
    story: 'The Emerald Villa Type A offers the perfect blend of luxury and comfort. With 3 spacious bedrooms, premium Italian marble flooring, and a private garden, this ready-to-move villa is designed for families who value quality living.',
    gallery: ['/assets/images/project-villa.png'],
    features: ['3 Bedrooms', 'Private Garden', 'Covered Parking', 'Italian Marble'],
  },
  {
    id: 'emerald-villa-02',
    name: 'Emerald Villa — Type B',
    location: 'Coimbatore, Tamil Nadu',
    category: 'residential',
    status: 'Completed',
    img: '/assets/images/project-residential.png',
    description: 'Spacious 4BHK independent house with modular kitchen, home theatre, and terrace garden.',
    area: '3,600 sq.ft',
    year: '2025',
    story: 'The Emerald Villa Type B is our flagship offering — a spacious 4BHK independent house designed for discerning buyers. With a dedicated home theatre, terrace garden, and top-of-the-line modular kitchen, this is luxury redefined.',
    gallery: ['/assets/images/project-residential.png'],
    features: ['4 Bedrooms', 'Home Theatre', 'Terrace Garden', 'Modular Kitchen'],
  }
];

export const getProjects = () => {
  const saved = localStorage.getItem('admin_projects');
  if (!saved) {
    localStorage.setItem('admin_projects', JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  }
  let parsed = JSON.parse(saved);
  let modified = false;

  // 1. Remove initial projects that are no longer in INITIAL_PROJECTS
  const initialIds = INITIAL_PROJECTS.map(p => p.id);
  const nextParsed = parsed.filter(p => {
    if (!p.id.startsWith('proj-') && !initialIds.includes(p.id)) {
      modified = true;
      return false;
    }
    return true;
  });
  parsed = nextParsed;

  // 2. Sync changes from INITIAL_PROJECTS
  parsed = parsed.map(p => {
    const initial = INITIAL_PROJECTS.find(ip => ip.id === p.id);
    if (initial) {
      const hasChanges = Object.keys(initial).some(key => {
        if (Array.isArray(initial[key])) {
          return JSON.stringify(p[key]) !== JSON.stringify(initial[key]);
        }
        return p[key] !== initial[key];
      });
      if (hasChanges) {
        modified = true;
        return { ...p, ...initial };
      }
    }
    return p;
  });

  // 3. Add any new initial projects
  INITIAL_PROJECTS.forEach(ip => {
    if (!parsed.some(p => p.id === ip.id)) {
      parsed.push(ip);
      modified = true;
    }
  });

  if (modified) {
    localStorage.setItem('admin_projects', JSON.stringify(parsed));
  }
  return parsed;
};

export const saveProjects = (projects) => {
  localStorage.setItem('admin_projects', JSON.stringify(projects));
};
