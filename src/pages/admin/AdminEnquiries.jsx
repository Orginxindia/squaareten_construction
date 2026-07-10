/* ============================================================
   ADMIN ENQUIRIES — Form Submissions Inbox Management
   ============================================================ */
import { useState, useEffect } from 'react';
import { getEnquiries, saveEnquiries } from '../../lib/enquiryStore';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    setEnquiries(getEnquiries());
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleUpdateStatus = (id, newStatus) => {
    const nextEnquiries = enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e);
    setEnquiries(nextEnquiries);
    saveEnquiries(nextEnquiries);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
    showToast(`Status updated to ${newStatus}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    const nextEnquiries = enquiries.filter(e => e.id !== id);
    setEnquiries(nextEnquiries);
    saveEnquiries(nextEnquiries);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry(null);
    }
    showToast('Enquiry deleted successfully.');
  };

  const filtered = enquiries.filter(e => {
    const q = search.toLowerCase();
    const matchesSearch = 
      e.name.toLowerCase().includes(q) || 
      e.email.toLowerCase().includes(q) || 
      e.phone.includes(q) || 
      (e.message && e.message.toLowerCase().includes(q));
    
    const matchesType = typeFilter === 'all' || e.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <h2 className="admin-page__title">Enquiries Inbox</h2>
            <p className="admin-page__subtitle">Review and manage contact, career, and consultancy form submissions</p>
          </div>
        </div>

        {toast && <div className="admin-toast">{toast}</div>}

        <div className="admin-search-bar">
          <div className="admin-search" style={{ flex: 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="admin-search__input"
              placeholder="Search enquiries by name, contact info, or message content..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="admin-input"
            style={{ width: '200px' }}
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="all">All Form Types</option>
            <option value="contact">Contact General</option>
            <option value="career">Career Application</option>
            <option value="consultancy">Consultancy Request</option>
          </select>
        </div>

        <div className={`admin-dashboard-grid ${selectedEnquiry ? 'admin-dashboard-grid--split' : ''}`}>
          
          <div className="admin-table-card">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Customer Details</th>
                    <th>Contact Info</th>
                    <th>Received Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                        No enquiries found in inbox
                      </td>
                    </tr>
                  ) : (
                    filtered.map(e => (
                      <tr
                        key={e.id}
                        onClick={() => setSelectedEnquiry(e)}
                        style={{ cursor: 'pointer', background: selectedEnquiry?.id === e.id ? 'rgba(201,168,106,0.06)' : '' }}
                      >
                        <td>
                          <span
                            className="admin-status"
                            style={{
                              background: e.type === 'career' ? 'rgba(66,153,225,0.15)' : e.type === 'consultancy' ? 'rgba(56,178,172,0.15)' : 'rgba(201,168,106,0.15)',
                              color: e.type === 'career' ? '#4299e1' : e.type === 'consultancy' ? '#38b2ac' : '#c9a86a',
                              textTransform: 'uppercase',
                              fontSize: '10px'
                            }}
                          >
                            {e.type}
                          </span>
                        </td>
                        <td><strong>{e.name}</strong></td>
                        <td>
                          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{e.email}</div>
                          <div style={{ fontSize: '0.85rem' }}>{e.phone}</div>
                        </td>
                        <td>{e.date}</td>
                        <td>
                          <span className={`admin-status admin-status--${e.status.toLowerCase()}`}>
                            {e.status}
                          </span>
                        </td>
                        <td>
                          <div className="admin-actions" onClick={e => e.stopPropagation()}>
                            <button
                              className="admin-btn admin-btn--sm"
                              onClick={() => setSelectedEnquiry(e)}
                            >
                              View
                            </button>
                            <button
                              className="admin-btn admin-btn--sm admin-btn--danger"
                              onClick={() => handleDelete(e.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {selectedEnquiry && (
            <div className="admin-table-card" style={{ padding: '1.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text)' }}>Enquiry Details</h3>
                <button
                  style={{ color: '#888', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer' }}
                  onClick={() => setSelectedEnquiry(null)}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255,255,255,0.85)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', display: 'block' }}>Type</span>
                  <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{selectedEnquiry.type} Submission</span>
                </div>
                
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', display: 'block' }}>Sender Name</span>
                  <span style={{ fontWeight: 'bold', color: '#fff' }}>{selectedEnquiry.name}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', display: 'block' }}>Email Address</span>
                    <a href={`mailto:${selectedEnquiry.email}`} style={{ textDecoration: 'underline' }}>{selectedEnquiry.email}</a>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', display: 'block' }}>Phone Number</span>
                    <a href={`tel:${selectedEnquiry.phone}`} style={{ textDecoration: 'underline' }}>{selectedEnquiry.phone}</a>
                  </div>
                </div>

                {selectedEnquiry.type === 'career' && (
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', display: 'block' }}>Applied Position</span>
                    <span style={{ color: '#c9a86a', fontWeight: 'bold' }}>{selectedEnquiry.position}</span>
                  </div>
                )}

                {selectedEnquiry.type === 'consultancy' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' }}>Project Type</span>
                      <div style={{ textTransform: 'capitalize', fontWeight: 'semibold', fontSize: '0.85rem' }}>{selectedEnquiry.projectType}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' }}>Budget</span>
                      <div style={{ color: '#c9a86a', fontWeight: 'semibold', fontSize: '0.85rem' }}>{selectedEnquiry.budget}</div>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <span style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' }}>Proposed Location</span>
                      <div style={{ fontSize: '0.85rem' }}>{selectedEnquiry.location}</div>
                    </div>
                  </div>
                )}

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', display: 'block' }}>Message / Cover Letter</span>
                  <div style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedEnquiry.message}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Management Status</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className={`admin-btn admin-btn--sm ${selectedEnquiry.status === 'Pending' ? 'admin-btn--primary' : 'admin-btn--outline'}`}
                      onClick={() => handleUpdateStatus(selectedEnquiry.id, 'Pending')}
                    >
                      Pending
                    </button>
                    <button
                      className={`admin-btn admin-btn--sm ${selectedEnquiry.status === 'Reviewed' ? 'admin-btn--primary' : 'admin-btn--outline'}`}
                      onClick={() => handleUpdateStatus(selectedEnquiry.id, 'Reviewed')}
                    >
                      Reviewed
                    </button>
                    <button
                      className={`admin-btn admin-btn--sm ${selectedEnquiry.status === 'Contacted' ? 'admin-btn--primary' : 'admin-btn--outline'}`}
                      onClick={() => handleUpdateStatus(selectedEnquiry.id, 'Contacted')}
                    >
                      Contacted
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </AdminLayout>
  );
}
