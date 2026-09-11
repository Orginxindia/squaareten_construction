/* ============================================================
   ENQUIRY STORE — LocalStorage Persistence for Customer Enquiries
   ============================================================ */

const INITIAL_ENQUIRIES = [
  {
    id: 'enq-001',
    type: 'contact',
    name: 'Karthik Raja',
    email: 'karthik.raja@outlook.com',
    phone: '9845012345',
    message: 'I am planning to construct a luxury independent duplex house in Madurai. Please call me back to schedule a site consultation.',
    date: new Date(Date.now() - 3600000 * 24 * 3).toLocaleString('en-IN'), // 3 days ago
    status: 'Pending'
  },
  {
    id: 'enq-002',
    type: 'career',
    name: 'Anjali Sharma',
    email: 'anjali.sharma@gmail.com',
    phone: '7540019283',
    position: 'Lead Architect',
    message: 'Applying for the Lead Architect opening. I have 6 years of experience in designing premium residential villas.',
    date: new Date(Date.now() - 3600000 * 24 * 1.5).toLocaleString('en-IN'), // 1.5 days ago
    status: 'Reviewed'
  },
  {
    id: 'enq-003',
    type: 'consultancy',
    name: 'Madan Kumar',
    email: 'madankumar@gmail.com',
    phone: '9123456789',
    projectType: 'commercial',
    location: 'Bypass Road, Madurai',
    budget: '50 Lakhs - 1 Crore',
    message: 'Need consulting regarding standard approvals, structural blueprint integrity, and budget estimations for a commercial showroom.',
    date: new Date(Date.now() - 3600000 * 4).toLocaleString('en-IN'), // 4 hours ago
    status: 'Contacted'
  }
];

export const getEnquiries = () => {
  const saved = localStorage.getItem('admin_enquiries');
  if (!saved) {
    localStorage.setItem('admin_enquiries', JSON.stringify(INITIAL_ENQUIRIES));
    return INITIAL_ENQUIRIES;
  }
  return JSON.parse(saved);
};

export const saveEnquiries = (enquiries) => {
  localStorage.setItem('admin_enquiries', JSON.stringify(enquiries));
};

export const addEnquiry = (enquiry) => {
  const list = getEnquiries();
  const newEnq = {
    id: `enq-${Date.now()}`,
    status: 'Pending',
    date: new Date().toLocaleString('en-IN'),
    ...enquiry
  };
  list.unshift(newEnq);
  saveEnquiries(list);
  return newEnq;
};
