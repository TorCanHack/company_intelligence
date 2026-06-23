// Imports real African (mostly Nigerian) companies sourced from a research
// document the user supplied. Additive only — never truncates, safe to re-run
// (skips companies whose slug already exists). Each founder gets a new `people`
// row since none of these names are known to overlap with existing founders.
const pool = require('../db');

const NEW_SECTORS = [
  { name: 'Agritech', slug: 'agritech' },
  { name: 'Climate-Tech', slug: 'climate-tech' },
  { name: 'Construction', slug: 'construction' },
  { name: 'Robotics & AI', slug: 'robotics-ai' },
  { name: 'Food & Beverage', slug: 'food-beverage' },
  { name: 'Aerospace', slug: 'aerospace' },
];

// role is null where the source document gave no explicit title.
const COMPANIES = [
  {
    slug: 'pastel', name: 'Pastel', sectorSlug: 'fintech', country: 'Nigeria', city: 'Lagos', foundedYear: 2021,
    employeeRange: '11-50',
    description: 'A B2B fintech and RegTech platform building next-generation enterprise AI, fraud detection, anti-money laundering (AML), and customer due-diligence tools for African financial institutions, alongside bookkeeping and retail financing apps for MSMEs.',
    website: null,
    founders: [
      { name: 'Izunna Okonkwo', role: null },
      { name: 'Olamide Oladeji', role: null },
      { name: 'Abuzar Royesh', role: null },
    ],
  },
  {
    slug: 'middleman', name: 'Middleman', sectorSlug: 'logistics', country: 'Nigeria', city: 'Lagos', foundedYear: 2023,
    employeeRange: '2-10',
    description: 'Middleman helps African businesses import from Asia with confidence, powered by AI sourcing, secure payments, verified procurement agents, and reliable shipping.',
    website: 'https://www.middleman.co',
    founders: [],
  },
  {
    slug: 'raenest', name: 'Raenest', sectorSlug: 'fintech', country: 'Nigeria', city: 'Lagos', foundedYear: 2022,
    employeeRange: '51-200',
    description: 'A cross-border financial management platform that provides multi-currency wallets, global bank accounts, virtual cards, and payment processing infrastructure tailored for African freelancers, remote workers, startups, and corporate enterprises.',
    website: null,
    founders: [
      { name: 'Victor Alade', role: null },
      { name: 'Sodruldeen Mustapha', role: null },
      { name: 'Richard Oyome', role: null },
    ],
  },
  {
    slug: 'bujeti', name: 'Bujeti', sectorSlug: 'fintech', country: 'Nigeria', city: 'Lagos', foundedYear: 2021,
    employeeRange: '11-50',
    description: 'An all-in-one financial management and spend control platform that unifies corporate cards, expense tracking, automated vendor payments, budgeting, and tax management tools for African businesses.',
    website: null,
    founders: [
      { name: 'Cossi Achille Arouko', role: 'CEO' },
      { name: 'Samy Chiba', role: 'COO' },
    ],
  },
  {
    slug: 'hello-tractor', name: 'Hello Tractor', sectorSlug: 'agritech', country: 'United States', city: 'Washington, D.C.', foundedYear: 2014,
    employeeRange: '11-50',
    description: 'An agritech platform that operates an "Uber-like" marketplace connecting smallholder farmers with tractor owners for on-demand mechanisation services. The company equips tractors with proprietary IoT telematics devices for remote tracking, fleet analytics, and anti-fraud management. Major operational regional hubs in Abuja, Nigeria and Nairobi, Kenya.',
    website: null,
    founders: [{ name: 'Jehiel Oliver', role: null }],
  },
  {
    slug: 'thriveagric', name: 'ThriveAgric', sectorSlug: 'agritech', country: 'Nigeria', city: 'Abuja', foundedYear: 2016,
    employeeRange: '51-200',
    description: 'An agritech platform spanning smallholder farmer development & training, input financing and services, post-harvest services, access to premium markets, social and financial inclusion, commodity aggregation and trading, and extension services.',
    website: 'https://thriveagric.com',
    founders: [],
  },
  {
    slug: 'rel', name: 'Rel', sectorSlug: 'agritech', country: 'Nigeria', city: 'Uyo', foundedYear: 2017,
    employeeRange: '51-200',
    description: 'A climate-tech and sustainable agriculture company that manufactures proprietary crop-processing machinery and related infrastructure.',
    website: null,
    founders: [
      { name: 'Ikenna Nzewi', role: null },
      { name: 'Uzoma Ayogu', role: null },
      { name: 'Isaiah Udotong', role: null },
    ],
  },
  {
    // Source PDF splits across a page break here — city/founded_year/employee_range/
    // founders/website were lost in the cut and are left blank rather than guessed.
    slug: 'leaf-earth', name: 'Leaf Earth', sectorSlug: 'climate-tech', country: 'Nigeria', city: null, foundedYear: null,
    employeeRange: null,
    description: 'Leverages large-scale pyrolysis to convert agricultural waste (palm kernel shells) into premium biochar for long-term carbon sequestration and soil enrichment. Has a corporate holding base in Delaware, USA.',
    website: null,
    founders: [],
  },
  {
    slug: 'farmcrowdy', name: 'Farmcrowdy', sectorSlug: 'agritech', country: 'Nigeria', city: 'Lagos', foundedYear: 2016,
    employeeRange: '11-50',
    description: 'A pioneering digital agriculture platform that evolved from a prominent peer-to-peer crowdfunding marketplace into a B2B agritech ecosystem focusing on farm input aggregation, food processing, logistics, and wholesale market access for smallholder farmers.',
    website: null,
    founders: [
      { name: 'Onyeka Akumah', role: null },
      { name: 'Ifeanyi Anazodo', role: null },
      { name: 'Akindele Phillips', role: null },
      { name: 'Christopher Abiodun', role: null },
      { name: 'Temitope Omotolani', role: null },
    ],
  },
  {
    slug: 'babban-gona', name: 'Babban Gona', sectorSlug: 'agritech', country: 'Nigeria', city: 'Kaduna', foundedYear: 2012,
    employeeRange: '500-1000',
    description: 'A high-impact agricultural franchise and social enterprise that aggregates smallholder farmers into mini-cooperatives, providing them with end-to-end credit, training, climate-smart inputs, storage, and direct premium market access. Primary operations focused across Northern Nigeria.',
    website: null,
    founders: [
      { name: 'Kola Masha', role: null },
      { name: 'Lola Masha', role: null },
    ],
  },
  {
    slug: 'tomato-jos', name: 'Tomato Jos', sectorSlug: 'agritech', country: 'Nigeria', city: 'Kaduna', foundedYear: 2014,
    employeeRange: null,
    description: 'A vertically integrated agro-processing social enterprise that operates commercial tomato farmlands and a state-of-the-art processing plant to manufacture packaged tomato paste sachets, replacing foreign imports with locally sourced harvests.',
    website: null,
    founders: [
      { name: 'Mira Mehta', role: null },
      { name: 'Shane Kiernan', role: null },
    ],
  },
  {
    slug: 'crop2cash', name: 'Crop2Cash', sectorSlug: 'agritech', country: 'Nigeria', city: 'Ibadan', foundedYear: 2018,
    employeeRange: '11-50',
    description: 'An agritech and finance infrastructure platform that provides an uncollateralized operating system for agricultural lending. It uses USSD, Android-based digital profiles, and AI-powered IVR advisory tools to unlock financial inclusion, input credit, and climate-smart seeds for smallholder farmers.',
    website: null,
    founders: [
      { name: 'Michael Ogundare', role: null },
      { name: 'Seyi Alabi', role: null },
      { name: 'Emem Essien', role: null },
    ],
  },
  {
    slug: 'hervest', name: 'Hervest', sectorSlug: 'agritech', country: 'Nigeria', city: 'Lagos', foundedYear: 2020,
    employeeRange: '11-50',
    description: 'A women-focused fintech and agritech platform providing inclusive financial services through automated target savings, global dollar investments, and impact-led micro-credit financing specifically structured for smallholder female farmers and women-led SMEs.',
    website: null,
    founders: [
      { name: 'Solape Akinpelu', role: null },
      { name: 'Yomi Ogunleye', role: null },
    ],
  },
  {
    slug: 'powerstove-energy', name: 'Powerstove Energy', sectorSlug: 'climate-tech', country: 'Nigeria', city: 'Abuja', foundedYear: 2018,
    employeeRange: '51-200',
    description: 'A climate-tech and clean energy hardware startup that manufactures IoT-enabled, smokeless biomass cookstoves. The stoves use thermoelectric technology to convert heat from cooking into electricity for phone charging and lighting, while tracking usage data to distribute automated carbon credits.',
    website: null,
    // Source document literally lists both "Okey Esse (CEO)" and "Esse Okey" as separate
    // founders — looks like a possible name-duplication artifact in the source, kept as given.
    founders: [
      { name: 'Okey Esse', role: 'CEO' },
      { name: 'Esse Okey', role: null },
    ],
  },
  {
    slug: 'airsmat', name: 'Airsmat Inc', sectorSlug: 'climate-tech', country: 'Nigeria', city: 'Lagos', foundedYear: 2019,
    employeeRange: '11-50',
    description: 'A climate-tech and agritech company that transforms agricultural waste into high-quality biochar-based fertilisers. The company operates proprietary AI-driven software, satellite-enabled soil monitoring systems, and a digital Monitoring, Reporting, and Verification (dMRV) platform to generate traceable, high-integrity carbon credits while boosting regional crop yields.',
    website: null,
    founders: [
      { name: 'Soji Sanyaolu', role: null },
      { name: 'Ibikunle Adeoluwa', role: null },
      { name: 'Osikhena (Rex) Evidence', role: null },
    ],
  },
  {
    slug: 'afrimash', name: 'Afrimash Company Limited', sectorSlug: 'agritech', country: 'Nigeria', city: 'Ibadan', foundedYear: 2015,
    employeeRange: null,
    description: 'An agricultural e-commerce marketplace platform that connects small, medium, and commercial-scale farmers directly with verified suppliers of agricultural inputs. The platform offers premium products including poultry, crops, livestock feed, and machinery, integrated alongside digital advisory, credit financing, and crop off-taking marketplace services.',
    website: 'https://afrimash.com/',
    founders: [
      { name: 'Ayo Oyedotun', role: 'CEO' },
      { name: 'Akin Oyedotun', role: 'Co-Founder & CTO' },
    ],
  },
  {
    slug: 'kalibotics', name: 'Kalibotics', sectorSlug: 'robotics-ai', country: 'Nigeria', city: 'Abuja', foundedYear: 2019,
    employeeRange: null,
    description: 'An AI-powered hardware and software robotics startup that builds custom robotic architectures, autonomous surveillance drones, intelligent computer-vision systems, and educational tech toolkits. The company operates a specialized software platform (AIC) and a rugged hardware compute stack (KCBox) designed to help clients seamlessly connect artificial intelligence capabilities directly to motor components, sensors, and actuators without requiring bespoke pipeline development.',
    website: 'https://kalibotics.com/',
    founders: [
      { name: 'Olugbenga Ojo', role: null },
      { name: 'Mayowa Abejirin', role: null },
    ],
  },
  {
    slug: 'kitovu', name: 'Kitovu Technology Company', sectorSlug: 'agritech', country: 'Nigeria', city: 'Iseyin', foundedYear: 2016,
    employeeRange: '11-50',
    description: 'An agriculture-focused data science and climate-smart hardware platform that provides smallholder farmers with customized agronomic advisories, precision input delivery, and automated post-harvest infrastructure. Operates proprietary platforms including YieldMax for satellite-driven soil and crop health insights, eProcure for digital B2B commodity supply matching, and StorageX for Electronic Warehouse Receipts technology.',
    website: 'https://www.kitovu.com.ng/about-us',
    founders: [
      { name: 'Emeka Nwachinemere', role: null },
      { name: 'Miracle Nduka', role: null },
    ],
  },
  {
    slug: 'awesome-fresh', name: 'Awesome Fresh', sectorSlug: 'agritech', country: 'Nigeria', city: 'Jos', foundedYear: 2017,
    employeeRange: '2-10',
    description: 'An agricultural aggregation, logistics, and cold-chain company that streamlines the movement of fresh produce from rural farms to institutional buyers. The company functions as a supply-chain stabilizer, offering large-scale food processors, retailers, and hospitality businesses a predictable, structured inventory of agricultural raw materials while opening guaranteed market pathways for local farmers. Distribution channels extend to Lagos and Abuja.',
    website: null,
    founders: [],
  },
  {
    slug: 'birdpreneur-ventures', name: 'BirdPreneur Ventures', sectorSlug: 'agritech', country: 'Nigeria', city: null, foundedYear: 2015,
    employeeRange: '11-50',
    description: 'A digital aviculture and agritech platform focused on optimizing the poultry value chain in Nigeria. The company bridges critical resource gaps for smallholder farmers by offering cooperative financing, structured training on smart farming techniques, disease-preventative farm insurance, and direct sales pipelines connecting rural farms to urban bulk poultry buyers.',
    website: null,
    founders: [{ name: 'Michael Iyanro', role: null }],
  },
  {
    slug: 'sweetkiwi-holdings', name: 'Sweetkiwi Holdings', sectorSlug: 'food-beverage', country: 'United States', city: 'Dallas', foundedYear: 2011,
    employeeRange: '11-50',
    description: 'A healthy consumer packaged goods and dessert tech brand that manufactures nutrient-dense, whipped frozen Greek yogurt. The products are formulated with high protein, prebiotic fiber, live probiotic cultures, and immune-boosting superfoods to offer consumers a gut-healthy alternative to traditional ice cream.',
    website: null,
    founders: [
      { name: 'Ehime Eigbe', role: 'Founder & CEO' },
      { name: 'Michael Akindele', role: 'Co-Founder' },
    ],
  },
  {
    slug: 'rucove', name: 'Rucove', sectorSlug: 'agritech', country: 'Nigeria', city: 'Lagos', foundedYear: 2021,
    employeeRange: '2-10',
    description: 'An agricultural B2B e-commerce and trade marketplace platform designed to facilitate international agro-export and import operations. The platform coordinates logistics data, market connectivity, and supply chain tracking networks to allow global buyers and entrepreneurs to buy, sell, and invest in diverse crop cycles directly from African growers.',
    website: null,
    founders: [{ name: 'Blessing Ijoma', role: null }],
  },
  {
    slug: 'beat-drone', name: 'Beat Drone', sectorSlug: 'aerospace', country: 'Nigeria', city: 'Lagos', foundedYear: 2016,
    employeeRange: '11-50',
    description: 'An indigenous aerospace and industrial drone technology company that designs, assembles, and deploys Unmanned Aerial Vehicles (UAVs). The company operates a dual-use technical suite spanning multisector drone-as-a-service applications — including precision multispectral agricultural mapping and chemical spraying, critical pipeline monitoring for Oil & Gas infrastructure, and thermal tactical intelligence arrays tailored for government security commands.',
    website: null,
    founders: [{ name: 'Odionye Confidence', role: null }],
  },
  {
    slug: 'farmcorps', name: 'FarmCorps', sectorSlug: 'agritech', country: 'Nigeria', city: 'Lagos', foundedYear: 2019,
    employeeRange: '11-50',
    description: 'An agricultural technology platform that bridges the grain supply gap by connecting clusters of smallholder farmers with major commercial agro-processing and food companies. The platform provides an end-to-end bundled service consisting of production forward-contracts, high-quality inputs (as credit), data-driven agronomic advisory, drought-resistant seeds, and crop insurance to drive climate-resilient food production.',
    website: null,
    founders: [{ name: 'Job Oyabisi', role: null }],
  },
  {
    slug: 'farmplify', name: 'Farmplify', sectorSlug: 'agritech', country: 'Nigeria', city: 'Lagos', foundedYear: 2021,
    employeeRange: '11-50',
    description: 'An agriculture investment, asset management, and digital marketplace company. The company operates an end-to-end platform enabling individuals, institutions, and diaspora investors to securely fund managed agribusiness assets. It utilizes digital tracing and blockchain framework mechanics to streamline logistics and minimize post-harvest food waste across Sub-Saharan supply lines.',
    website: null,
    founders: [{ name: 'Joshua Bamidele', role: null }],
  },
  {
    slug: 'ayosifamhub', name: 'AyosifamHub', sectorSlug: 'agritech', country: 'Nigeria', city: 'Ilorin', foundedYear: 2018,
    employeeRange: '11-50',
    description: 'An agri-tech e-commerce marketplace and agro-allied processing company specializing in the cassava and potato value chains. The platform connects rural smallholder farmers with large-scale processors and investors, while offering packaged premium food staples like high-quality nutritious garri, sorghum flour, and unripe plantain flour.',
    website: 'https://ayosifamhub.com.ng/',
    founders: [{ name: 'Funmilayo Famuyiwa', role: null }],
  },
  {
    slug: 'uzoebo-nigeria', name: 'Uzoebo Nigeria', sectorSlug: 'agritech', country: 'Nigeria', city: 'Enugu', foundedYear: 2019,
    employeeRange: '101-250',
    description: 'A hybrid agri-tech and e-commerce marketplace platform that coordinates the aggregation, branding, storage, and distribution of source-identified raw and processed agricultural products. The platform eliminates middleman fees and helps smallholder cooperatives (predominantly women and youth) secure predictable market visibility.',
    website: null,
    founders: [{ name: 'Chikwado Ugwu', role: null }],
  },
  {
    slug: 'verdant-agri-tech', name: 'Verdant Agri-Tech', sectorSlug: 'agritech', country: 'Nigeria', city: 'Abuja', foundedYear: 2014,
    employeeRange: '11-50',
    description: 'A mobile agricultural data, advisory, and fintech social enterprise. The platform provides smallholder farmers with localized weather forecasts, precise crop management insights, market pricing tracking, and financial literacy pathways using basic mobile and web applications to boost yields while curbing carbon footprints.',
    website: 'https://verdant.ng/',
    founders: [{ name: 'Nasir Yammama', role: null }],
  },
  {
    slug: 'l-and-l-foods', name: 'L&L Foods', sectorSlug: 'food-beverage', country: 'Nigeria', city: 'Lagos', foundedYear: 2015,
    employeeRange: '11-50',
    description: 'A fast-moving consumer goods (FMCG) and food processing company that sources raw agricultural commodities from local smallholder farmer networks and transforms them into branded, high-quality snacks. The company’s flagship product line is "Mr. Ekpa," a premium brand of packaged peanut and cashew snacks spanning salted, frosted, and flour-coated varieties.',
    website: null,
    // Names share "Ladipo" across both founders — possible source data-entry artifact, kept as given.
    founders: [
      { name: 'Ladipo Lawani', role: null },
      { name: 'Lanre Ladipo', role: null },
    ],
  },
  {
    slug: 'adold-engineering', name: 'Adold Engineering Company Limited', sectorSlug: 'construction', country: 'Nigeria', city: 'Lagos', foundedYear: 1976,
    employeeRange: '201-500',
    description: 'A major tier-one civil engineering, general contracting, and infrastructure development company. The company handles end-to-end services in structural design, engineering procurement, building construction, road and bridge rehabilitation, and upstream/downstream facility fabrication for the Oil & Gas sector. Operational yards in Ikeja.',
    website: null,
    founders: [],
  },
  {
    slug: 'netconstruct', name: 'NetConstruct', sectorSlug: 'construction', country: 'Nigeria', city: 'Abuja', foundedYear: 2001,
    employeeRange: '51-200',
    description: 'A premier real estate development, infrastructure engineering, and facility management corporation. The company operates a robust property portfolio focused on turning massive land expanses into master-planned, secure residential estates featuring modern architectural triplexes, townhouses, sustainable water treatment grids, and smart facility management services.',
    website: null,
    founders: [{ name: 'Folabi Oseni', role: null }],
  },
  {
    slug: 'elalan-construction', name: 'Elalan Construction Company', sectorSlug: 'construction', country: 'Nigeria', city: 'Lagos', foundedYear: 1982,
    employeeRange: '1001-5000',
    description: 'An international award-winning construction, civil engineering, and turnkey project development firm. The company operates a comprehensive design-and-build value chain — enabling the turnkey delivery of ultra-luxury residential skyscrapers, commercial office towers, industrial factories, and deep facility management frameworks.',
    website: 'https://www.elalan.com/',
    founders: [
      { name: 'Andrea Geday', role: null },
      { name: 'Alexander Stefanidis', role: null },
    ],
  },
  {
    slug: 'cappa-and-dalberto', name: "Cappa & D'Alberto", sectorSlug: 'construction', country: 'Nigeria', city: 'Lagos', foundedYear: 1932,
    employeeRange: '1001-5000',
    description: 'A major tier-one building and civil engineering contracting corporation. As the oldest indigenous construction firm in Nigeria, the company handles the design, structural engineering, and turnkey delivery of ultra-luxury residential towers, high-security corporate complexes, medical facilities, and heritage preservation works, backed by specialized in-house aluminium curtain walling and facility management divisions.',
    website: null,
    founders: [
      { name: 'Pietro Carlo Cappa', role: null },
      { name: 'Vigino D’Alberto', role: null },
    ],
  },
  {
    slug: 'itb-nigeria', name: 'ITB Nigeria Limited', sectorSlug: 'construction', country: 'Nigeria', city: 'Lagos', foundedYear: 1995,
    employeeRange: '1001-5000',
    description: 'A major tier-one civil engineering, mechanical, electrical, and plumbing (MEPF) contractor, and structural building company. The company operates a fully integrated design-and-build ecosystem specializing in high-rise luxury skyscrapers, Grade-A commercial offices, industrial factories, and maritime port engineering.',
    website: 'https://www.itbng.com/',
    founders: [
      { name: 'Gilbert Chagoury', role: null },
      { name: 'Ronald Chagoury', role: null },
    ],
  },
  {
    slug: 'dantata-and-sawoe', name: 'Dantata & Sawoe', sectorSlug: 'construction', country: 'Nigeria', city: 'Abuja', foundedYear: 1976,
    employeeRange: '1001-5000',
    description: 'A major tier-one civil engineering, general contracting, and heavy infrastructure development firm. The company manages a massive nationwide portfolio specializing in the design and construction of national highways, structural flyovers, center-pivot irrigation systems, deep drainage networks, and commercial airports.',
    website: 'https://www.dantata-sawoe.com/',
    founders: [{ name: 'Alhaji Abdulkadir Dantata', role: null }],
  },
  {
    slug: 'reynolds-rcc', name: 'Reynolds Construction Company (Nigeria) Limited (RCC)', sectorSlug: 'construction', country: 'Nigeria', city: 'Abuja', foundedYear: 1969,
    employeeRange: '1001-5000',
    description: 'A premier tier-one civil engineering, heavy road construction, and hydrotechnical infrastructure contracting giant. The company specializes in delivering massive public and private works — including national expressways, structural bridges, large-scale irrigation grids, automated water treatment networks, and dam constructions.',
    website: 'https://rccnigeria.com/',
    founders: [],
  },
  {
    slug: 'saidi-nigeria', name: 'Saidi Nigeria Limited', sectorSlug: 'construction', country: 'Nigeria', city: 'Abuja', foundedYear: 1997,
    employeeRange: '51-200',
    description: 'A multidisciplinary construction, fabrication, and civil engineering firm. The company operates cross-cutting portfolios delivering structural building design, urban road construction, public-sector office rehabilitation, and engineering consultancy services to corporate entities and government ministries.',
    website: null,
    founders: [{ name: 'The Saidi Family Syndicate', role: null }],
  },
  {
    slug: 'arab-contractors-nigeria', name: 'Arab Contractors Nigeria Ltd.', sectorSlug: 'construction', country: 'Nigeria', city: 'Lagos', foundedYear: 1991,
    employeeRange: '10001+',
    description: 'A world-class government-owned engineering conglomerate and tier-one civil contractor. The company handles massive-scale public and commercial installations spanning high-performance road and highway networks, maritime port developments, bridge configurations, water treatment plants, and smart residential district infrastructure throughout the Middle East and over 29 African countries.',
    website: null,
    founders: [{ name: 'Osman Ahmed Osman', role: null }],
  },
  {
    slug: 'brunelli-construction', name: 'Brunelli Construction Company (Nigeria) Limited', sectorSlug: 'construction', country: 'Nigeria', city: null, foundedYear: 1972,
    employeeRange: '51-200',
    description: 'A long-standing tier-two civil engineering and maritime infrastructure development company. The firm operates as a highly specialized engineering contractor that designs and executes complex marine installations — including jetties, diaphragm walls, canal dredging pipelines, shore protection arrays, urban drainage networks, and heavy-duty concrete electric poles.',
    website: null,
    founders: [],
  },
];

const run = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const sector of NEW_SECTORS) {
      await client.query(
        'insert into sectors (name, slug) values ($1, $2) on conflict (slug) do nothing',
        [sector.name, sector.slug]
      );
    }

    const sectorRows = await client.query('select id, slug from sectors');
    const sectorIdBySlug = Object.fromEntries(sectorRows.rows.map((r) => [r.slug, r.id]));

    let inserted = 0;
    let skipped = 0;
    let foundersInserted = 0;

    for (const company of COMPANIES) {
      const { rows } = await client.query(
        `insert into companies (name, slug, sector_id, country, city, founded_year, description, website, employee_range)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         on conflict (slug) do nothing
         returning id`,
        [
          company.name, company.slug, sectorIdBySlug[company.sectorSlug], company.country,
          company.city, company.foundedYear, company.description, company.website, company.employeeRange,
        ]
      );

      if (rows.length === 0) {
        skipped += 1;
        continue;
      }

      inserted += 1;
      const companyId = rows[0].id;

      for (const [index, founder] of company.founders.entries()) {
        const person = await client.query(
          'insert into people (full_name) values ($1) returning id',
          [founder.name]
        );
        await client.query(
          'insert into founders (company_id, person_id, name, role, display_order) values ($1, $2, $3, $4, $5)',
          [companyId, person.rows[0].id, founder.name, founder.role, index]
        );
        foundersInserted += 1;
      }
    }

    await client.query('COMMIT');
    console.log(`Companies inserted: ${inserted}, skipped (already existed): ${skipped}, founders inserted: ${foundersInserted}`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

run()
  .then(() => pool.end())
  .catch((error) => {
    console.error('Import failed:', error);
    pool.end();
    process.exit(1);
  });
