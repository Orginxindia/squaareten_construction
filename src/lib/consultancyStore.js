/* ============================================================
   CONSULTANCY STORE — LocalStorage Persistence for Consultancy content
   ============================================================ */

const INITIAL_CONSULTANCY = {
  heroTitle: "Premium Advisory & Strategic Construction Consulting",
  heroSubtitle: "Transforming ambitious visions into concrete landmark structures with advanced structural engineering, cost control planning, and regulatory guidance.",
  feeStructure: [
    { type: 'Basic Site Survey & Report', fee: '₹15,000' },
    { type: 'Comprehensive Structural Design & Blueprinting', fee: '₹45,000' },
    { type: 'Turnkey Construction Consulting (Includes material auditing)', fee: '1.5% of total project cost' }
  ]
};

export const getConsultancyData = () => {
  const saved = localStorage.getItem('admin_consultancy');
  if (!saved) {
    localStorage.setItem('admin_consultancy', JSON.stringify(INITIAL_CONSULTANCY));
    return INITIAL_CONSULTANCY;
  }
  return JSON.parse(saved);
};

export const saveConsultancyData = (data) => {
  localStorage.setItem('admin_consultancy', JSON.stringify(data));
};
