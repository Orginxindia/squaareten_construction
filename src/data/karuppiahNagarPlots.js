/* ============================================================
   KARUPPIAH NAGAR — Plots Database (Shared)
   Contains all plot specifications from the layout documents
   ============================================================ */

const PRICE_PER_SQFT = 1250; // Pricing standard rate for Karuppiah Nagar

const rawPlots = [
  // LEFT COLUMN: Plots 1 to 17 (Bottom to Top in coordinate stacking)
  { id: '17', plotArea: 1984, roadArea: 420, totalArea: 2404, cents: '5.52 Cents', facing: 'East', status: 'available', dimensions: "61'6\" × 35'", points: '17.00,15.00 55.00,15.00 54.31,26.50 16.31,26.50', labelX: 35.66, labelY: 20.75 },
  { id: '16', plotArea: 2196, roadArea: 420, totalArea: 2616, cents: '6.01 Cents', facing: 'East', status: 'reserved', dimensions: "62'6\" × 35'", points: '16.31,26.50 54.31,26.50 53.62,38.00 15.62,38.00', labelX: 34.97, labelY: 32.25 },
  { id: '15', plotArea: 2214, roadArea: 420, totalArea: 2634, cents: '6.05 Cents', facing: 'East', status: 'available', dimensions: "63 × 35'", points: '15.62,38.00 53.62,38.00 52.93,49.50 14.93,49.50', labelX: 34.28, labelY: 43.75 },
  { id: '14', plotArea: 2231, roadArea: 420, totalArea: 2651, cents: '6.09 Cents', facing: 'East', status: 'available', dimensions: "63'6\" × 35'", points: '14.93,49.50 52.93,49.50 52.24,61.00 14.24,61.00', labelX: 33.59, labelY: 55.25 },
  { id: '13', plotArea: 2249, roadArea: 420, totalArea: 2669, cents: '6.13 Cents', facing: 'East', status: 'available', dimensions: "64 × 35'", points: '14.24,61.00 52.24,61.00 51.55,72.50 13.55,72.50', labelX: 32.90, labelY: 66.75 },
  { id: '12', plotArea: 2266, roadArea: 420, totalArea: 2686, cents: '6.17 Cents', facing: 'East', status: 'sold', dimensions: "64'6\" × 35'", points: '13.55,72.50 51.55,72.50 50.86,84.00 12.86,84.00', labelX: 32.20, labelY: 78.25 },
  { id: '11', plotArea: 2293, roadArea: 420, totalArea: 2713, cents: '6.23 Cents', facing: 'East', status: 'available', dimensions: "65 × 35'", points: '12.86,84.00 50.86,84.00 50.17,95.50 12.17,95.50', labelX: 31.52, labelY: 89.75 },
  { id: '10', plotArea: 1540, roadArea: 420, totalArea: 1960, cents: '4.50 Cents', facing: 'East', status: 'available', dimensions: "45 × 35'", points: '12.17,95.50 50.17,95.50 49.48,107.00 11.48,107.00', labelX: 30.83, labelY: 101.25 },
  { id: '9', plotArea: 1273, roadArea: 360, totalArea: 1633, cents: '3.75 Cents', facing: 'East', status: 'sold', dimensions: "43 × 31'", points: '11.48,107.00 49.48,107.00 48.88,117.00 10.88,117.00', labelX: 30.18, labelY: 112.00 },
  { id: '8', plotArea: 1220, roadArea: 360, totalArea: 1580, cents: '3.63 Cents', facing: 'East', status: 'reserved', dimensions: "40'6\" × 31'", points: '10.88,117.00 48.88,117.00 48.28,127.00 10.28,127.00', labelX: 29.58, labelY: 122.00 },
  { id: '7', plotArea: 1182, roadArea: 360, totalArea: 1542, cents: '3.54 Cents', facing: 'East', status: 'reserved', dimensions: "39'6\" × 31'", points: '10.28,127.00 48.28,127.00 47.68,137.00 9.68,137.00', labelX: 28.98, labelY: 132.00 },
  { id: '6', plotArea: 1136, roadArea: 360, totalArea: 1496, cents: '3.43 Cents', facing: 'East', status: 'available', dimensions: "38 × 31'", points: '9.68,137.00 47.68,137.00 47.08,147.00 9.08,147.00', labelX: 28.38, labelY: 142.00 },
  { id: '5', plotArea: 1106, roadArea: 360, totalArea: 1466, cents: '3.36 Cents', facing: 'East', status: 'reserved', dimensions: "36'6\" × 31'", points: '9.08,147.00 47.08,147.00 46.48,157.00 8.48,157.00', labelX: 27.78, labelY: 152.00 },
  { id: '4', plotArea: 1151, roadArea: 360, totalArea: 1511, cents: '3.47 Cents', facing: 'East', status: 'available', dimensions: "36 × 31'", points: '8.48,157.00 46.48,157.00 45.88,167.00 7.88,167.00', labelX: 27.18, labelY: 162.00 },
  { id: '3', plotArea: 1243, roadArea: 360, totalArea: 1603, cents: '3.68 Cents', facing: 'East', status: 'sold', dimensions: "39'6\" × 31'", points: '7.88,167.00 45.88,167.00 45.28,177.00 7.28,177.00', labelX: 26.58, labelY: 172.00 },
  { id: '2', plotArea: 1342, roadArea: 360, totalArea: 1702, cents: '3.91 Cents', facing: 'East', status: 'available', dimensions: "42 × 31'", points: '7.28,177.00 45.28,177.00 44.68,187.00 6.68,187.00', labelX: 25.98, labelY: 182.00 },
  { id: '1', plotArea: 3719, roadArea: 819, totalArea: 4538, cents: '10.42 Cents', facing: 'East', status: 'reserved', dimensions: "46 × 80'6\"", points: '6.68,187.00 44.68,187.00 43.00,215.00 1.00,215.00', labelX: 23.84, labelY: 201.00 },

  // RIGHT COLUMN: Plots 18 to 35A (Top to Bottom in coordinate stacking)
  { id: '18', plotArea: 2520, roadArea: 420, totalArea: 2940, cents: '6.75 Cents', facing: 'West', status: 'available', dimensions: "70 × 35'", points: '63.00,15.00 98.00,15.00 97.31,26.50 62.31,26.50', labelX: 80.16, labelY: 20.75 },
  { id: '19', plotArea: 2459, roadArea: 420, totalArea: 2879, cents: '6.61 Cents', facing: 'West', status: 'sold', dimensions: "70 × 35'", points: '62.31,26.50 97.31,26.50 96.62,38.00 61.62,38.00', labelX: 79.47, labelY: 32.25 },
  { id: '20', plotArea: 2476, roadArea: 420, totalArea: 2896, cents: '6.65 Cents', facing: 'West', status: 'available', dimensions: "70'6\" × 35'", points: '61.62,38.00 96.62,38.00 95.93,49.50 60.93,49.50', labelX: 78.78, labelY: 43.75 },
  { id: '21', plotArea: 2485, roadArea: 420, totalArea: 2905, cents: '6.67 Cents', facing: 'West', status: 'available', dimensions: "71 × 35'", points: '60.93,49.50 95.93,49.50 95.24,61.00 60.24,61.00', labelX: 78.09, labelY: 55.25 },
  { id: '22', plotArea: 2494, roadArea: 420, totalArea: 2914, cents: '6.69 Cents', facing: 'West', status: 'available', dimensions: "71 × 35'", points: '60.24,61.00 95.24,61.00 94.55,72.50 59.55,72.50', labelX: 77.39, labelY: 66.75 },
  { id: '23', plotArea: 2511, roadArea: 420, totalArea: 2931, cents: '6.73 Cents', facing: 'West', status: 'available', dimensions: "71'6\" × 35'", points: '59.55,72.50 94.55,72.50 93.86,84.00 58.86,84.00', labelX: 76.70, labelY: 78.25 },
  { id: '24', plotArea: 2520, roadArea: 420, totalArea: 2940, cents: '6.75 Cents', facing: 'West', status: 'reserved', dimensions: "72 × 35'", points: '58.86,84.00 93.86,84.00 93.17,95.50 58.17,95.50', labelX: 76.02, labelY: 89.75 },
  { id: '25', plotArea: 2520, roadArea: 420, totalArea: 2940, cents: '6.75 Cents', facing: 'West', status: 'available', dimensions: "72 × 35'", points: '58.17,95.50 93.17,95.50 92.48,107.00 57.48,107.00', labelX: 75.33, labelY: 101.25 },
  { id: '26', plotArea: 2139, roadArea: 0, totalArea: 2139, cents: '4.91 Cents', facing: 'West', status: 'available', dimensions: "147'9\" × 10'6\"", points: '57.48,107.00 102.48,107.00 102.24,111.00 57.24,111.00', labelX: 72.36, labelY: 109.00 },
  { id: '27', plotArea: 1298, roadArea: 360, totalArea: 1658, cents: '3.81 Cents', facing: 'West', status: 'reserved', dimensions: "45 × 28'", points: '57.24,111.00 92.24,111.00 91.73,119.50 56.73,119.50', labelX: 74.48, labelY: 115.25 },
  { id: '28', plotArea: 1335, roadArea: 360, totalArea: 1695, cents: '3.89 Cents', facing: 'West', status: 'reserved', dimensions: "44'6\" × 30'", points: '56.73,119.50 91.73,119.50 91.22,128.00 56.22,128.00', labelX: 73.97, labelY: 123.75 },
  { id: '29', plotArea: 1335, roadArea: 360, totalArea: 1695, cents: '3.89 Cents', facing: 'West', status: 'sold', dimensions: "44'6\" × 30'", points: '56.22,128.00 91.22,128.00 90.71,136.50 55.71,136.50', labelX: 73.46, labelY: 132.25 },
  { id: '30', plotArea: 1335, roadArea: 360, totalArea: 1695, cents: '3.89 Cents', facing: 'West', status: 'sold', dimensions: "44'6\" × 30'", points: '55.71,136.50 90.71,136.50 90.20,145.00 55.20,145.00', labelX: 72.95, labelY: 140.75 },
  { id: '31', plotArea: 1331, roadArea: 360, totalArea: 1691, cents: '3.88 Cents', facing: 'West', status: 'sold', dimensions: "44'6\" × 30'6\"", points: '55.20,145.00 90.20,145.00 89.69,153.50 54.69,153.50', labelX: 72.44, labelY: 149.25 },
  { id: '32', plotArea: 1316, roadArea: 360, totalArea: 1676, cents: '3.85 Cents', facing: 'West', status: 'sold', dimensions: "43'6\" × 30'6\"", points: '54.69,153.50 89.69,153.50 89.18,162.00 54.18,162.00', labelX: 71.94, labelY: 157.75 },
  { id: '33', plotArea: 1319, roadArea: 360, totalArea: 1679, cents: '3.85 Cents', facing: 'West', status: 'sold', dimensions: "43'6\" × 23'", points: '54.18,162.00 89.18,162.00 88.67,170.50 53.67,170.50', labelX: 71.43, labelY: 166.25 },
  { id: '34', plotArea: 1245, roadArea: 360, totalArea: 1605, cents: '3.68 Cents', facing: 'West', status: 'sold', dimensions: "43 × 40'6\"", points: '53.67,170.50 88.67,170.50 88.16,179.00 53.16,179.00', labelX: 70.91, labelY: 174.75 },
  { id: '35A', plotArea: 200, roadArea: 60, totalArea: 260, cents: '0.60 Cents', facing: 'West', status: 'available', dimensions: "40 × 6'6\"", points: '53.16,179.00 88.16,179.00 87.92,183.00 52.92,183.00', labelX: 70.54, labelY: 181.00 },
  { id: '35', plotArea: 1740, roadArea: 702, totalArea: 2442, cents: '5.61 Cents', facing: 'West', status: 'sold', dimensions: "48 × 38'6\"", points: '52.92,183.00 87.92,183.00 87.02,198.00 52.02,198.00', labelX: 69.97, labelY: 190.50 }
];

export const allPlots = rawPlots.map(plot => {
  const price = plot.totalArea * PRICE_PER_SQFT;
  const lakhs = price / 100000;
  return {
    ...plot,
    price,
    priceStr: `₹${lakhs.toFixed(2)} Lakhs`,
    area: plot.totalArea,
    areaStr: `${plot.totalArea.toLocaleString()} sq.ft`,
  };
});

// PHASE 2 PLOT DATABASE
const rawPlotsPhase2 = [
  { id: '8', plotArea: 2260.150, roadArea: 605.340, totalArea: 2865.49, cents: '7.56 Cents', facing: 'East', status: 'available', dimensions: '21.34 × 23.6 ft', points: '5,15 50,15 50,62 5,62', labelX: 27.5, labelY: 38.5 },
  { id: '7', plotArea: 1745.020, roadArea: 487.540, totalArea: 2232.56, cents: '5.13 Cents', facing: 'East', status: 'available', dimensions: '21.35 × 12.36 ft', points: '5,62 50,62 50,110 5,110', labelX: 27.5, labelY: 86 },
  { id: '6', plotArea: 1237.429, roadArea: 387.140, totalArea: 1624.569, cents: '3.73 Cents', facing: 'East', status: 'available', dimensions: '15.39 × 9.00 ft', points: '5,110 50,110 50,158 5,158', labelX: 27.5, labelY: 134 },
  { id: '5', plotArea: 1109.270, roadArea: 576.831, totalArea: 1686.101, cents: '5.27 Cents', facing: 'East', status: 'available', dimensions: '13.88 × 12.35 ft', points: '5,158 50,158 50,205 5,205', labelX: 27.5, labelY: 182 },
  { id: '1', plotArea: 2855.335, roadArea: 595.185, totalArea: 3450.52, cents: '6.55 Cents', facing: 'West', status: 'available', dimensions: '16.91 × 12.99 ft', points: '60,15 105,15 105,62 60,62', labelX: 82.5, labelY: 38.5 },
  { id: '2', plotArea: 2232.560, roadArea: 487.540, totalArea: 2720.10, cents: '5.13 Cents', facing: 'West', status: 'available', dimensions: '16.52 × 12.36 ft', points: '60,62 105,62 105,110 60,110', labelX: 82.5, labelY: 86 },
  { id: '3', plotArea: 2064.680, roadArea: 450.590, totalArea: 2515.27, cents: '4.74 Cents', facing: 'West', status: 'available', dimensions: '16.23 × 9.15 ft', points: '60,110 105,110 105,158 60,158', labelX: 82.5, labelY: 134 },
  { id: '4', plotArea: 1449.290, roadArea: 836.266, totalArea: 2285.556, cents: '6.80 Cents', facing: 'West', status: 'available', dimensions: '16.59 × 6.16 ft', points: '60,158 105,158 105,205 60,205', labelX: 82.5, labelY: 182 }
];

export const allPlotsPhase2 = rawPlotsPhase2.map(plot => {
  const price = plot.totalArea * PRICE_PER_SQFT;
  const lakhs = price / 100000;
  return {
    ...plot,
    price,
    priceStr: `₹${lakhs.toFixed(2)} Lakhs`,
    area: plot.totalArea,
    areaStr: `${plot.totalArea.toLocaleString()} sq.ft`,
  };
});
