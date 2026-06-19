// Seeds fictional, composite Nigerian companies — NOT real businesses or real financial data.
// Safe to re-run: truncates domain tables before inserting.
const pool = require('../db');

const SECTORS = [
  { name: 'Fintech', slug: 'fintech' },
  { name: 'Health', slug: 'health' },
  { name: 'Energy', slug: 'energy' },
];

const INVESTORS = [
  { name: 'Vantage Capital Partners', type: 'VC', country: 'Nigeria' },
  { name: 'Sahel Ventures', type: 'VC', country: 'Nigeria' },
  { name: 'Bridgeway Capital', type: 'VC', country: 'Nigeria' },
  { name: 'Quantum Frontier Capital', type: 'VC', country: 'United States' },
  { name: 'Atlas Emerging Markets Fund', type: 'PE', country: 'United Kingdom' },
  { name: 'Niche Growth Fund', type: 'PE', country: 'Nigeria' },
  { name: 'Horizon Angels Network', type: 'Angel', country: 'Nigeria' },
  { name: 'Delta Seed Collective', type: 'Angel', country: 'Nigeria' },
  { name: 'Meridian Development Finance', type: 'DFI', country: 'Multilateral' },
  { name: 'Lakeshore Strategic Holdings', type: 'CVC', country: 'Nigeria' },
];

const src = (slug, n = 1) => `https://example.com/research/${slug}-${n}`;

// holderType/stake pairs must sum to 100 per company — checked at seed time.
const capTable = (entries) => entries;

const COMPANIES = [
  // --- Fintech ---
  {
    slug: 'kowrii', name: 'Kowrii', sectorSlug: 'fintech', city: 'Lagos', foundedYear: 2019,
    employeeRange: '51-200', status: 'active',
    description: 'Mobile wallet and bill-payment platform serving underbanked consumers across southern Nigeria.',
    founders: [
      { name: 'Tunde Adeyemi', role: 'Co-founder & CEO', bio: 'Previously led product at a regional payments processor.' },
      { name: 'Ifeoma Nwankwo', role: 'Co-founder & CTO', bio: 'Built core ledger systems for two prior fintech startups.' },
    ],
    rounds: [
      { roundType: 'Seed', amount: 900000, currency: 'USD', announcedDate: '2020-03-12', valuationPost: 4500000, confidence: 'reported', investors: [{ name: 'Horizon Angels Network', isLead: true }] },
      { roundType: 'Series A', amount: 6500000, currency: 'USD', announcedDate: '2022-06-20', valuationPre: 18000000, valuationPost: 24500000, confidence: 'verified', investors: [{ name: 'Vantage Capital Partners', isLead: true }, { name: 'Quantum Frontier Capital', isLead: false }] },
    ],
    capTable: [
      { holderName: 'Tunde Adeyemi', holderType: 'founder', stakePct: 28, asOfDate: '2023-01-15', confidence: 'estimated' },
      { holderName: 'Ifeoma Nwankwo', holderType: 'founder', stakePct: 22, asOfDate: '2023-01-15', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 12, asOfDate: '2023-01-15', confidence: 'estimated' },
      { holderName: 'Vantage Capital Partners', holderType: 'investor', stakePct: 24, asOfDate: '2023-01-15', confidence: 'reported' },
      { holderName: 'Quantum Frontier Capital', holderType: 'investor', stakePct: 9, asOfDate: '2023-01-15', confidence: 'reported' },
      { holderName: 'Horizon Angels Network', holderType: 'investor', stakePct: 5, asOfDate: '2023-01-15', confidence: 'estimated' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 24500000, unit: 'USD', currency: 'USD', asOfDate: '2022-06-20', confidence: 'verified' },
      { metricType: 'implied_valuation', value: 38000000, unit: 'USD', currency: 'USD', asOfDate: '2024-11-01', confidence: 'modeled' },
    ],
    sources: [{ publisher: 'Lagos Business Wire', publishedAt: '2022-06-21', note: 'Series A announcement coverage.' }],
  },
  {
    slug: 'brixly-capital', name: 'Brixly Capital', sectorSlug: 'fintech', city: 'Lagos', foundedYear: 2018,
    employeeRange: '11-50', status: 'active',
    description: 'Embedded lending infrastructure giving SMEs working-capital credit lines through partner apps.',
    founders: [
      { name: 'Chiamaka Eze', role: 'Founder & CEO', bio: 'Former credit risk lead at a Tier 1 Nigerian bank.' },
      { name: 'Segun Okafor', role: 'Co-founder & COO', bio: 'Operations background across consumer lending platforms.' },
    ],
    rounds: [
      { roundType: 'Pre-seed', amount: 350000, currency: 'USD', announcedDate: '2019-02-10', valuationPost: 2000000, confidence: 'estimated', investors: [{ name: 'Delta Seed Collective', isLead: true }] },
      { roundType: 'Seed', amount: 2100000, currency: 'USD', announcedDate: '2021-09-05', valuationPre: 6000000, valuationPost: 8100000, confidence: 'reported', investors: [{ name: 'Sahel Ventures', isLead: true }] },
    ],
    capTable: [
      { holderName: 'Chiamaka Eze', holderType: 'founder', stakePct: 35, asOfDate: '2022-04-01', confidence: 'estimated' },
      { holderName: 'Segun Okafor', holderType: 'founder', stakePct: 25, asOfDate: '2022-04-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 10, asOfDate: '2022-04-01', confidence: 'estimated' },
      { holderName: 'Sahel Ventures', holderType: 'investor', stakePct: 22, asOfDate: '2022-04-01', confidence: 'reported' },
      { holderName: 'Delta Seed Collective', holderType: 'investor', stakePct: 8, asOfDate: '2022-04-01', confidence: 'estimated' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 8100000, unit: 'USD', currency: 'USD', asOfDate: '2021-09-05', confidence: 'reported' },
    ],
    sources: [{ publisher: 'Naija Tech Digest', publishedAt: '2021-09-06', note: 'Seed round coverage.' }],
  },
  {
    slug: 'nairavault', name: 'NairaVault', sectorSlug: 'fintech', city: 'Abuja', foundedYear: 2020,
    employeeRange: '11-50', status: 'active',
    description: 'Automated savings and micro-investment app targeting salaried professionals.',
    founders: [
      { name: 'Bisola Adekunle', role: 'Founder & CEO', bio: 'Ex-asset management analyst turned product builder.' },
    ],
    rounds: [
      { roundType: 'Seed', amount: 1200000, currency: 'USD', announcedDate: '2022-01-18', valuationPost: 6000000, confidence: 'reported', investors: [{ name: 'Bridgeway Capital', isLead: true }, { name: 'Horizon Angels Network', isLead: false }] },
    ],
    capTable: [
      { holderName: 'Bisola Adekunle', holderType: 'founder', stakePct: 58, asOfDate: '2022-06-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 12, asOfDate: '2022-06-01', confidence: 'estimated' },
      { holderName: 'Bridgeway Capital', holderType: 'investor', stakePct: 22, asOfDate: '2022-06-01', confidence: 'reported' },
      { holderName: 'Horizon Angels Network', holderType: 'investor', stakePct: 8, asOfDate: '2022-06-01', confidence: 'estimated' },
    ],
    valuationSignals: [
      { metricType: 'revenue_multiple', value: 4.2, unit: 'x_revenue', asOfDate: '2024-02-01', confidence: 'modeled' },
    ],
    sources: [{ publisher: 'Capital Markets Africa', publishedAt: '2022-01-19', note: 'Seed round brief.' }],
  },
  {
    slug: 'payharbor', name: 'PayHarbor', sectorSlug: 'fintech', city: 'Lagos', foundedYear: 2017,
    employeeRange: '201-500', status: 'active',
    description: 'Payment gateway and settlement infrastructure for online merchants and marketplaces.',
    founders: [
      { name: 'Olumide Bankole', role: 'Co-founder & CEO', bio: 'Built payments switches for two prior ventures.' },
      { name: 'Grace Effiong', role: 'Co-founder & CPO', bio: 'Product leader focused on merchant onboarding experience.' },
    ],
    rounds: [
      { roundType: 'Series A', amount: 5000000, currency: 'USD', announcedDate: '2019-05-14', valuationPost: 20000000, confidence: 'verified', investors: [{ name: 'Vantage Capital Partners', isLead: true }] },
      { roundType: 'Series B', amount: 22000000, currency: 'USD', announcedDate: '2023-03-09', valuationPre: 65000000, valuationPost: 87000000, confidence: 'verified', investors: [{ name: 'Atlas Emerging Markets Fund', isLead: true }, { name: 'Quantum Frontier Capital', isLead: false }] },
    ],
    capTable: [
      { holderName: 'Olumide Bankole', holderType: 'founder', stakePct: 19, asOfDate: '2023-06-01', confidence: 'estimated' },
      { holderName: 'Grace Effiong', holderType: 'founder', stakePct: 14, asOfDate: '2023-06-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 14, asOfDate: '2023-06-01', confidence: 'estimated' },
      { holderName: 'Atlas Emerging Markets Fund', holderType: 'investor', stakePct: 25, asOfDate: '2023-06-01', confidence: 'reported' },
      { holderName: 'Vantage Capital Partners', holderType: 'investor', stakePct: 18, asOfDate: '2023-06-01', confidence: 'reported' },
      { holderName: 'Quantum Frontier Capital', holderType: 'investor', stakePct: 10, asOfDate: '2023-06-01', confidence: 'reported' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 87000000, unit: 'USD', currency: 'USD', asOfDate: '2023-03-09', confidence: 'verified' },
      { metricType: 'implied_valuation', value: 110000000, unit: 'USD', currency: 'USD', asOfDate: '2025-01-15', confidence: 'modeled' },
    ],
    sources: [{ publisher: 'West Africa Deal Tracker', publishedAt: '2023-03-10', note: 'Series B announcement.' }],
  },
  {
    slug: 'switchpoint', name: 'Switchpoint', sectorSlug: 'fintech', city: 'Port Harcourt', foundedYear: 2021,
    employeeRange: '11-50', status: 'active',
    description: 'POS and offline-payment network for retail agents in secondary cities.',
    founders: [
      { name: 'Ekene Obi', role: 'Founder & CEO', bio: 'Former agent-network operations manager.' },
      { name: 'Halima Suleiman', role: 'Co-founder & Head of Growth', bio: 'Scaled distribution for a telco-backed fintech pilot.' },
    ],
    rounds: [
      { roundType: 'Pre-seed', amount: 250000, currency: 'USD', announcedDate: '2021-11-01', valuationPost: 1500000, confidence: 'estimated', investors: [{ name: 'Delta Seed Collective', isLead: true }] },
      { roundType: 'Seed', amount: 1800000, currency: 'USD', announcedDate: '2023-08-22', valuationPre: 5000000, valuationPost: 6800000, confidence: 'reported', investors: [{ name: 'Sahel Ventures', isLead: true }] },
    ],
    capTable: [
      { holderName: 'Ekene Obi', holderType: 'founder', stakePct: 40, asOfDate: '2023-09-01', confidence: 'estimated' },
      { holderName: 'Halima Suleiman', holderType: 'founder', stakePct: 22, asOfDate: '2023-09-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 10, asOfDate: '2023-09-01', confidence: 'estimated' },
      { holderName: 'Sahel Ventures', holderType: 'investor', stakePct: 20, asOfDate: '2023-09-01', confidence: 'reported' },
      { holderName: 'Delta Seed Collective', holderType: 'investor', stakePct: 8, asOfDate: '2023-09-01', confidence: 'estimated' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 6800000, unit: 'USD', currency: 'USD', asOfDate: '2023-08-22', confidence: 'reported' },
    ],
    sources: [{ publisher: 'Niger Delta Business Journal', publishedAt: '2023-08-23', note: 'Seed round coverage.' }],
  },
  {
    slug: 'ledgerline', name: 'Ledgerline', sectorSlug: 'fintech', city: 'Lagos', foundedYear: 2016,
    employeeRange: '51-200', status: 'active',
    description: 'B2B treasury and cross-border settlement rails for mid-market importers.',
    founders: [
      { name: 'Femi Osagie', role: 'Founder & CEO', bio: 'Spent a decade in correspondent banking before founding Ledgerline.' },
    ],
    rounds: [
      { roundType: 'Series A', amount: 8000000, currency: 'USD', announcedDate: '2020-10-02', valuationPre: 22000000, valuationPost: 30000000, confidence: 'verified', investors: [{ name: 'Vantage Capital Partners', isLead: true }, { name: 'Niche Growth Fund', isLead: false }] },
      { roundType: 'Debt', amount: 4500000000, currency: 'NGN', amountUsd: 3000000, fxRateToUsd: 0.00067, announcedDate: '2024-04-11', confidence: 'reported', investors: [{ name: 'Meridian Development Finance', isLead: true }] },
    ],
    capTable: [
      { holderName: 'Femi Osagie', holderType: 'founder', stakePct: 41, asOfDate: '2024-05-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 11, asOfDate: '2024-05-01', confidence: 'estimated' },
      { holderName: 'Vantage Capital Partners', holderType: 'investor', stakePct: 30, asOfDate: '2024-05-01', confidence: 'reported' },
      { holderName: 'Niche Growth Fund', holderType: 'investor', stakePct: 18, asOfDate: '2024-05-01', confidence: 'reported' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 30000000, unit: 'USD', currency: 'USD', asOfDate: '2020-10-02', confidence: 'verified' },
    ],
    sources: [{ publisher: 'Trade Finance Africa', publishedAt: '2024-04-12', note: 'Debt facility announcement.' }],
  },

  // --- Health ---
  {
    slug: 'vitalis-health', name: 'Vitalis Health', sectorSlug: 'health', city: 'Lagos', foundedYear: 2019,
    employeeRange: '51-200', status: 'active',
    description: 'Telemedicine platform connecting patients in underserved areas to licensed physicians.',
    founders: [
      { name: 'Dr. Amara Chukwu', role: 'Co-founder & CEO', bio: 'Practicing physician before moving into digital health.' },
      { name: 'Daniel Okonkwo', role: 'Co-founder & CTO', bio: 'Built telehealth video infrastructure at a prior startup.' },
    ],
    rounds: [
      { roundType: 'Seed', amount: 1500000, currency: 'USD', announcedDate: '2020-07-15', valuationPost: 7000000, confidence: 'reported', investors: [{ name: 'Horizon Angels Network', isLead: true }, { name: 'Meridian Development Finance', isLead: false }] },
      { roundType: 'Series A', amount: 9000000, currency: 'USD', announcedDate: '2023-02-28', valuationPre: 25000000, valuationPost: 34000000, confidence: 'verified', investors: [{ name: 'Atlas Emerging Markets Fund', isLead: true }] },
    ],
    capTable: [
      { holderName: 'Dr. Amara Chukwu', holderType: 'founder', stakePct: 26, asOfDate: '2023-06-01', confidence: 'estimated' },
      { holderName: 'Daniel Okonkwo', holderType: 'founder', stakePct: 21, asOfDate: '2023-06-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 13, asOfDate: '2023-06-01', confidence: 'estimated' },
      { holderName: 'Atlas Emerging Markets Fund', holderType: 'investor', stakePct: 26, asOfDate: '2023-06-01', confidence: 'reported' },
      { holderName: 'Horizon Angels Network', holderType: 'investor', stakePct: 9, asOfDate: '2023-06-01', confidence: 'estimated' },
      { holderName: 'Meridian Development Finance', holderType: 'investor', stakePct: 5, asOfDate: '2023-06-01', confidence: 'reported' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 34000000, unit: 'USD', currency: 'USD', asOfDate: '2023-02-28', confidence: 'verified' },
    ],
    sources: [{ publisher: 'Health Africa Report', publishedAt: '2023-03-01', note: 'Series A coverage.' }],
  },
  {
    slug: 'carepoint-diagnostics', name: 'CarePoint Diagnostics', sectorSlug: 'health', city: 'Ibadan', foundedYear: 2018,
    employeeRange: '201-500', status: 'active',
    description: 'Network of diagnostic labs with a logistics layer for rural sample collection.',
    founders: [
      { name: 'Dr. Yusuf Aliyu', role: 'Founder & CEO', bio: 'Pathologist who previously ran a hospital diagnostics unit.' },
    ],
    rounds: [
      { roundType: 'Seed', amount: 800000, currency: 'USD', announcedDate: '2019-04-09', valuationPost: 4000000, confidence: 'estimated', investors: [{ name: 'Delta Seed Collective', isLead: true }] },
      { roundType: 'Series A', amount: 7200000, currency: 'USD', announcedDate: '2022-11-17', valuationPre: 20000000, valuationPost: 27200000, confidence: 'verified', investors: [{ name: 'Niche Growth Fund', isLead: true }, { name: 'Meridian Development Finance', isLead: false }] },
    ],
    capTable: [
      { holderName: 'Dr. Yusuf Aliyu', holderType: 'founder', stakePct: 47, asOfDate: '2023-01-10', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 11, asOfDate: '2023-01-10', confidence: 'estimated' },
      { holderName: 'Niche Growth Fund', holderType: 'investor', stakePct: 27, asOfDate: '2023-01-10', confidence: 'reported' },
      { holderName: 'Meridian Development Finance', holderType: 'investor', stakePct: 10, asOfDate: '2023-01-10', confidence: 'reported' },
      { holderName: 'Delta Seed Collective', holderType: 'investor', stakePct: 5, asOfDate: '2023-01-10', confidence: 'estimated' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 27200000, unit: 'USD', currency: 'USD', asOfDate: '2022-11-17', confidence: 'verified' },
    ],
    sources: [{ publisher: 'MedAfrica Insight', publishedAt: '2022-11-18', note: 'Series A brief.' }],
  },
  {
    slug: 'mendwell', name: 'Mendwell', sectorSlug: 'health', city: 'Lagos', foundedYear: 2020,
    employeeRange: '11-50', status: 'active',
    description: 'Tech-enabled health insurance plans bundled with primary-care subscriptions for informal-sector workers.',
    founders: [
      { name: 'Chidinma Okeke', role: 'Co-founder & CEO', bio: 'Former actuary at a regional insurer.' },
      { name: 'Babatunde Lawal', role: 'Co-founder & CPO', bio: 'Designed claims workflows for a hospital-tech startup.' },
    ],
    rounds: [
      { roundType: 'Pre-seed', amount: 400000, currency: 'USD', announcedDate: '2020-09-01', valuationPost: 2200000, confidence: 'estimated', investors: [{ name: 'Horizon Angels Network', isLead: true }] },
      { roundType: 'Seed', amount: 2600000, currency: 'USD', announcedDate: '2022-12-05', valuationPre: 7000000, valuationPost: 9600000, confidence: 'reported', investors: [{ name: 'Sahel Ventures', isLead: true }] },
    ],
    capTable: [
      { holderName: 'Chidinma Okeke', holderType: 'founder', stakePct: 33, asOfDate: '2023-02-01', confidence: 'estimated' },
      { holderName: 'Babatunde Lawal', holderType: 'founder', stakePct: 24, asOfDate: '2023-02-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 11, asOfDate: '2023-02-01', confidence: 'estimated' },
      { holderName: 'Sahel Ventures', holderType: 'investor', stakePct: 24, asOfDate: '2023-02-01', confidence: 'reported' },
      { holderName: 'Horizon Angels Network', holderType: 'investor', stakePct: 8, asOfDate: '2023-02-01', confidence: 'estimated' },
    ],
    valuationSignals: [
      { metricType: 'revenue_multiple', value: 5.1, unit: 'x_revenue', asOfDate: '2024-09-01', confidence: 'modeled' },
    ],
    sources: [{ publisher: 'InsurTech Africa Weekly', publishedAt: '2022-12-06', note: 'Seed round coverage.' }],
  },
  {
    slug: 'pharmalink', name: 'PharmaLink', sectorSlug: 'health', city: 'Kano', foundedYear: 2017,
    employeeRange: '51-200', status: 'active',
    description: 'B2B distribution platform connecting pharmacies directly to verified manufacturers.',
    founders: [
      { name: 'Aisha Mohammed', role: 'Founder & CEO', bio: 'Pharmacist by training, ran a regional distribution business before founding PharmaLink.' },
    ],
    rounds: [
      { roundType: 'Seed', amount: 1100000, currency: 'USD', announcedDate: '2018-08-20', valuationPost: 5000000, confidence: 'estimated', investors: [{ name: 'Delta Seed Collective', isLead: true }] },
      { roundType: 'Series A', amount: 6000000, currency: 'USD', announcedDate: '2021-05-13', valuationPre: 16000000, valuationPost: 22000000, confidence: 'reported', investors: [{ name: 'Bridgeway Capital', isLead: true }] },
    ],
    capTable: [
      { holderName: 'Aisha Mohammed', holderType: 'founder', stakePct: 49, asOfDate: '2021-09-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 12, asOfDate: '2021-09-01', confidence: 'estimated' },
      { holderName: 'Bridgeway Capital', holderType: 'investor', stakePct: 27, asOfDate: '2021-09-01', confidence: 'reported' },
      { holderName: 'Delta Seed Collective', holderType: 'investor', stakePct: 12, asOfDate: '2021-09-01', confidence: 'estimated' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 22000000, unit: 'USD', currency: 'USD', asOfDate: '2021-05-13', confidence: 'reported' },
    ],
    sources: [{ publisher: 'Northern Business Monitor', publishedAt: '2021-05-14', note: 'Series A coverage.' }],
  },
  {
    slug: 'wellgate-clinics', name: 'Wellgate Clinics', sectorSlug: 'health', city: 'Abuja', foundedYear: 2021,
    employeeRange: '11-50', status: 'active',
    description: 'Franchised primary-care clinic network with standardized pricing and digital records.',
    founders: [
      { name: 'Dr. Kelechi Umeh', role: 'Founder & CEO', bio: 'Public health background, previously consulted for state hospital networks.' },
      { name: 'Funmilayo Bello', role: 'Co-founder & COO', bio: 'Scaled clinic operations for a healthtech franchise model.' },
    ],
    rounds: [
      { roundType: 'Pre-seed', amount: 300000, currency: 'USD', announcedDate: '2021-06-01', valuationPost: 1800000, confidence: 'estimated', investors: [{ name: 'Delta Seed Collective', isLead: true }] },
    ],
    capTable: [
      { holderName: 'Dr. Kelechi Umeh', holderType: 'founder', stakePct: 52, asOfDate: '2022-01-01', confidence: 'estimated' },
      { holderName: 'Funmilayo Bello', holderType: 'founder', stakePct: 28, asOfDate: '2022-01-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 8, asOfDate: '2022-01-01', confidence: 'estimated' },
      { holderName: 'Delta Seed Collective', holderType: 'investor', stakePct: 12, asOfDate: '2022-01-01', confidence: 'estimated' },
    ],
    valuationSignals: [],
    sources: [{ publisher: 'FCT Business Register', publishedAt: '2021-06-02', note: 'Pre-seed round note.' }],
  },

  // --- Energy ---
  {
    slug: 'solnova-power', name: 'Solnova Power', sectorSlug: 'energy', city: 'Abuja', foundedYear: 2017,
    employeeRange: '51-200', status: 'active',
    description: 'Solar mini-grid developer and operator serving unelectrified rural communities.',
    founders: [
      { name: 'Obinna Maduike', role: 'Co-founder & CEO', bio: 'Energy engineer with a background in rural electrification projects.' },
      { name: 'Zainab Bello', role: 'Co-founder & CFO', bio: 'Structured project finance for renewable infrastructure deals.' },
    ],
    rounds: [
      { roundType: 'Seed', amount: 2000000, currency: 'USD', announcedDate: '2018-03-22', valuationPost: 9000000, confidence: 'reported', investors: [{ name: 'Meridian Development Finance', isLead: true }] },
      { roundType: 'Series A', amount: 14000000, currency: 'USD', announcedDate: '2021-07-08', valuationPre: 40000000, valuationPost: 54000000, confidence: 'verified', investors: [{ name: 'Atlas Emerging Markets Fund', isLead: true }, { name: 'Meridian Development Finance', isLead: false }] },
    ],
    capTable: [
      { holderName: 'Obinna Maduike', holderType: 'founder', stakePct: 24, asOfDate: '2021-12-01', confidence: 'estimated' },
      { holderName: 'Zainab Bello', holderType: 'founder', stakePct: 18, asOfDate: '2021-12-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 10, asOfDate: '2021-12-01', confidence: 'estimated' },
      { holderName: 'Atlas Emerging Markets Fund', holderType: 'investor', stakePct: 30, asOfDate: '2021-12-01', confidence: 'reported' },
      { holderName: 'Meridian Development Finance', holderType: 'investor', stakePct: 18, asOfDate: '2021-12-01', confidence: 'reported' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 54000000, unit: 'USD', currency: 'USD', asOfDate: '2021-07-08', confidence: 'verified' },
      { metricType: 'implied_valuation', value: 70000000, unit: 'USD', currency: 'USD', asOfDate: '2024-06-01', confidence: 'modeled' },
    ],
    sources: [{ publisher: 'Energy Frontier Africa', publishedAt: '2021-07-09', note: 'Series A announcement.' }],
  },
  {
    slug: 'greenline-energy', name: 'Greenline Energy', sectorSlug: 'energy', city: 'Lagos', foundedYear: 2019,
    employeeRange: '11-50', status: 'active',
    description: 'Pay-as-you-go solar home systems distributed through a rural agent network.',
    founders: [
      { name: 'Adaeze Nnamdi', role: 'Founder & CEO', bio: 'Former operations lead at a regional solar distributor.' },
    ],
    rounds: [
      { roundType: 'Seed', amount: 1300000, currency: 'USD', announcedDate: '2020-02-14', valuationPost: 6000000, confidence: 'reported', investors: [{ name: 'Sahel Ventures', isLead: true }] },
    ],
    capTable: [
      { holderName: 'Adaeze Nnamdi', holderType: 'founder', stakePct: 56, asOfDate: '2020-06-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 12, asOfDate: '2020-06-01', confidence: 'estimated' },
      { holderName: 'Sahel Ventures', holderType: 'investor', stakePct: 32, asOfDate: '2020-06-01', confidence: 'reported' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 6000000, unit: 'USD', currency: 'USD', asOfDate: '2020-02-14', confidence: 'reported' },
    ],
    sources: [{ publisher: 'Renewables West Africa', publishedAt: '2020-02-15', note: 'Seed round coverage.' }],
  },
  {
    slug: 'voltbridge', name: 'VoltBridge', sectorSlug: 'energy', city: 'Port Harcourt', foundedYear: 2020,
    employeeRange: '11-50', status: 'active',
    description: 'Smart metering and pay-as-you-go financing layer for solar equipment resellers.',
    founders: [
      { name: 'Chukwuemeka Igwe', role: 'Co-founder & CEO', bio: 'IoT engineer turned energy-access entrepreneur.' },
      { name: 'Ronke Adeyinka', role: 'Co-founder & Head of Finance', bio: 'Structured asset financing for distributed energy hardware.' },
    ],
    rounds: [
      { roundType: 'Pre-seed', amount: 280000, currency: 'USD', announcedDate: '2020-10-19', valuationPost: 1600000, confidence: 'estimated', investors: [{ name: 'Delta Seed Collective', isLead: true }] },
      { roundType: 'Seed', amount: 2200000, currency: 'USD', announcedDate: '2023-05-30', valuationPre: 6000000, valuationPost: 8200000, confidence: 'reported', investors: [{ name: 'Lakeshore Strategic Holdings', isLead: true }] },
    ],
    capTable: [
      { holderName: 'Chukwuemeka Igwe', holderType: 'founder', stakePct: 38, asOfDate: '2023-08-01', confidence: 'estimated' },
      { holderName: 'Ronke Adeyinka', holderType: 'founder', stakePct: 24, asOfDate: '2023-08-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 11, asOfDate: '2023-08-01', confidence: 'estimated' },
      { holderName: 'Lakeshore Strategic Holdings', holderType: 'investor', stakePct: 20, asOfDate: '2023-08-01', confidence: 'reported' },
      { holderName: 'Delta Seed Collective', holderType: 'investor', stakePct: 7, asOfDate: '2023-08-01', confidence: 'estimated' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 8200000, unit: 'USD', currency: 'USD', asOfDate: '2023-05-30', confidence: 'reported' },
    ],
    sources: [{ publisher: 'Niger Delta Business Journal', publishedAt: '2023-05-31', note: 'Seed round coverage.' }],
  },
  {
    slug: 'terraform-gas', name: 'Terraform Gas', sectorSlug: 'energy', city: 'Lagos', foundedYear: 2016,
    employeeRange: '201-500', status: 'active',
    description: 'LPG cylinder distribution and refill network replacing kerosene in urban households.',
    founders: [
      { name: 'Ibrahim Lawal', role: 'Founder & CEO', bio: 'Spent eight years in downstream oil and gas logistics.' },
    ],
    rounds: [
      { roundType: 'Series A', amount: 9500000, currency: 'USD', announcedDate: '2019-09-26', valuationPre: 28000000, valuationPost: 37500000, confidence: 'verified', investors: [{ name: 'Niche Growth Fund', isLead: true }] },
      { roundType: 'Series B', amount: 26000000, currency: 'USD', announcedDate: '2023-01-31', valuationPre: 80000000, valuationPost: 106000000, confidence: 'verified', investors: [{ name: 'Atlas Emerging Markets Fund', isLead: true }, { name: 'Niche Growth Fund', isLead: false }] },
    ],
    capTable: [
      { holderName: 'Ibrahim Lawal', holderType: 'founder', stakePct: 30, asOfDate: '2023-04-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 11, asOfDate: '2023-04-01', confidence: 'estimated' },
      { holderName: 'Atlas Emerging Markets Fund', holderType: 'investor', stakePct: 32, asOfDate: '2023-04-01', confidence: 'reported' },
      { holderName: 'Niche Growth Fund', holderType: 'investor', stakePct: 27, asOfDate: '2023-04-01', confidence: 'reported' },
    ],
    valuationSignals: [
      { metricType: 'last_round_valuation', value: 106000000, unit: 'USD', currency: 'USD', asOfDate: '2023-01-31', confidence: 'verified' },
      { metricType: 'implied_valuation', value: 130000000, unit: 'USD', currency: 'USD', asOfDate: '2025-03-01', confidence: 'modeled' },
    ],
    sources: [{ publisher: 'Energy Frontier Africa', publishedAt: '2023-02-01', note: 'Series B announcement.' }],
  },
  {
    slug: 'amber-grid', name: 'Amber Grid', sectorSlug: 'energy', city: 'Ibadan', foundedYear: 2021,
    employeeRange: '11-50', status: 'active',
    description: 'Battery storage and microgrid controllers for industrial parks facing unreliable grid supply.',
    founders: [
      { name: 'Tobi Fashola', role: 'Co-founder & CEO', bio: 'Power systems engineer focused on industrial energy resilience.' },
      { name: 'Ngozi Eke', role: 'Co-founder & Head of Partnerships', bio: 'Built utility and regulator relationships across three states.' },
    ],
    rounds: [
      { roundType: 'Pre-seed', amount: 500000, currency: 'USD', announcedDate: '2022-02-08', valuationPost: 3000000, confidence: 'estimated', investors: [{ name: 'Horizon Angels Network', isLead: true }] },
    ],
    capTable: [
      { holderName: 'Tobi Fashola', holderType: 'founder', stakePct: 45, asOfDate: '2022-06-01', confidence: 'estimated' },
      { holderName: 'Ngozi Eke', holderType: 'founder', stakePct: 28, asOfDate: '2022-06-01', confidence: 'estimated' },
      { holderName: 'Employee Option Pool', holderType: 'employee_pool', stakePct: 10, asOfDate: '2022-06-01', confidence: 'estimated' },
      { holderName: 'Horizon Angels Network', holderType: 'investor', stakePct: 17, asOfDate: '2022-06-01', confidence: 'estimated' },
    ],
    valuationSignals: [],
    sources: [{ publisher: 'Industrial Energy Watch', publishedAt: '2022-02-09', note: 'Pre-seed round note.' }],
  },
];

const assertCapTableSumsTo100 = (company) => {
  const sum = company.capTable.reduce((total, entry) => total + Number(entry.stakePct), 0);
  if (Math.abs(sum - 100) > 0.01) {
    throw new Error(`Cap table for ${company.slug} sums to ${sum}, expected 100`);
  }
};

const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query('begin');
    await client.query('truncate sectors, investors, companies restart identity cascade');

    const sectorIdBySlug = new Map();
    for (const sector of SECTORS) {
      const { rows } = await client.query(
        'insert into sectors (name, slug) values ($1, $2) returning id',
        [sector.name, sector.slug]
      );
      sectorIdBySlug.set(sector.slug, rows[0].id);
    }

    const investorIdByName = new Map();
    for (const investor of INVESTORS) {
      const { rows } = await client.query(
        'insert into investors (name, type, country) values ($1, $2, $3) returning id',
        [investor.name, investor.type, investor.country]
      );
      investorIdByName.set(investor.name, rows[0].id);
    }

    for (const company of COMPANIES) {
      assertCapTableSumsTo100(company);

      const { rows: companyRows } = await client.query(
        `insert into companies
           (name, slug, sector_id, country, city, founded_year, description, employee_range, status, website, last_verified_at)
         values ($1, $2, $3, 'Nigeria', $4, $5, $6, $7, $8, $9, now())
         returning id`,
        [
          company.name,
          company.slug,
          sectorIdBySlug.get(company.sectorSlug),
          company.city,
          company.foundedYear,
          company.description,
          company.employeeRange,
          company.status,
          src(company.slug, 'site').replace('/research/', '/'),
        ]
      );
      const companyId = companyRows[0].id;

      for (const [index, founder] of company.founders.entries()) {
        await client.query(
          `insert into founders (company_id, name, role, bio, is_current, display_order)
           values ($1, $2, $3, $4, true, $5)`,
          [companyId, founder.name, founder.role, founder.bio, index]
        );
      }

      for (const [roundIndex, round] of company.rounds.entries()) {
        const amountUsd = round.amountUsd ?? (round.currency === 'USD' ? round.amount : null);
        const fxRate = round.fxRateToUsd ?? 1;
        const { rows: roundRows } = await client.query(
          `insert into funding_rounds
             (company_id, round_type, amount, currency, amount_usd, fx_rate_to_usd,
              valuation_pre_money, valuation_post_money, announced_date, confidence, source_url)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           returning id`,
          [
            companyId,
            round.roundType,
            round.amount,
            round.currency,
            amountUsd,
            fxRate,
            round.valuationPre ?? null,
            round.valuationPost ?? null,
            round.announcedDate,
            round.confidence,
            src(company.slug, `round-${roundIndex + 1}`),
          ]
        );
        const roundId = roundRows[0].id;

        for (const dealInvestor of round.investors) {
          const investorId = investorIdByName.get(dealInvestor.name);
          if (!investorId) {
            throw new Error(`Unknown investor "${dealInvestor.name}" referenced by ${company.slug}`);
          }
          await client.query(
            `insert into deal_investors (funding_round_id, investor_id, is_lead) values ($1, $2, $3)`,
            [roundId, investorId, dealInvestor.isLead]
          );
        }
      }

      for (const entry of company.capTable) {
        await client.query(
          `insert into cap_table_entries
             (company_id, holder_name, holder_type, stake_pct, as_of_date, confidence, source_url)
           values ($1, $2, $3, $4, $5, $6, $7)`,
          [companyId, entry.holderName, entry.holderType, entry.stakePct, entry.asOfDate, entry.confidence, src(company.slug, 'cap-table')]
        );
      }

      for (const signal of company.valuationSignals) {
        await client.query(
          `insert into valuation_signals
             (company_id, metric_type, value, unit, currency, as_of_date, confidence, source_url)
           values ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [companyId, signal.metricType, signal.value, signal.unit, signal.currency ?? null, signal.asOfDate, signal.confidence, src(company.slug, 'valuation')]
        );
      }

      for (const [sourceIndex, source] of company.sources.entries()) {
        await client.query(
          `insert into sources (company_id, url, publisher, published_at, note) values ($1, $2, $3, $4, $5)`,
          [companyId, src(company.slug, `source-${sourceIndex + 1}`), source.publisher, source.publishedAt, source.note]
        );
      }
    }

    await client.query('commit');
    console.log(`Seeded ${SECTORS.length} sectors, ${INVESTORS.length} investors, ${COMPANIES.length} companies.`);
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
  }
};

seed()
  .then(() => pool.end())
  .catch((error) => {
    console.error('Seed failed:', error.message);
    pool.end();
    process.exit(1);
  });
