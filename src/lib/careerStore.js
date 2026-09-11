/* ============================================================
   CAREER STORE — LocalStorage Persistence for Job Openings
   ============================================================ */

const INITIAL_POSITIONS = [
  {
    id: 'lead-architect',
    title: 'Lead Architect',
    location: 'Madurai, TN',
    experience: '5+ Years',
    type: 'Full-time',
    description: 'Lead high-end architectural concepts and custom luxury villa designs. Translate client vision into structural drawings, spatial layouts, and execution blueprints while coordinating design languages with the engineering team.'
  },
  {
    id: 'project-engineer',
    title: 'Project Engineer',
    location: 'Chennai, TN',
    experience: '4+ Years',
    type: 'Full-time',
    description: 'Manage site execution structural integrity, materials schedules, and concrete framework alignment. Ensure all physical civil construction conforms exactly to blueprint measurements and engineering criteria.'
  },
  {
    id: 'interior-designer',
    title: 'Interior Designer',
    location: 'Coimbatore, TN',
    experience: '3+ Years',
    type: 'Full-time',
    description: 'Curate luxury material boards, spatial layout aesthetics, custom cabinetry detailing, and mood lighting configurations for premium residential and commercial contracts.'
  },
  {
    id: 'site-supervisor',
    title: 'Site Supervisor',
    location: 'Madurai, TN',
    experience: '5+ Years',
    type: 'Full-time',
    description: 'Oversee daily site operations, coordination of labor teams, quality inspections of structural materials, and enforce site safety protocols to ensure timely and precise framework delivery.'
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    location: 'Madurai, TN',
    experience: '6+ Years',
    type: 'Full-time',
    description: 'Coordinate project constraints, client reviews, material supply logs, and project budget matrices. Synchronize multi-disciplinary engineering and design teams for smooth landmark handovers.'
  }
];

export const getCareers = () => {
  const saved = localStorage.getItem('admin_careers');
  if (!saved) {
    localStorage.setItem('admin_careers', JSON.stringify(INITIAL_POSITIONS));
    return INITIAL_POSITIONS;
  }
  return JSON.parse(saved);
};

export const saveCareers = (careers) => {
  localStorage.setItem('admin_careers', JSON.stringify(careers));
};
