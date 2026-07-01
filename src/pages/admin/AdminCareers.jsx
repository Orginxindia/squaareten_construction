/* ============================================================
   ADMIN CAREERS — Job Openings Management Panel
   ============================================================ */
import { useState, useEffect } from 'react';
import { getCareers, saveCareers } from '../../lib/careerStore';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminCareers() {
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editCareer, setEditCareer] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({
    title: '',
    location: '',
    experience: '',
    type: 'Full-time',
    description: '',
  });

  useEffect(() => {
    setCareers(getCareers());
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openAdd = () => {
    setEditCareer(null);
    setForm({
      title: '',
      location: 'Madurai, TN',
      experience: '2+ Years',
      type: 'Full-time',
      description: '',
    });
    setShowForm(true);
  };

  const openEdit = (c) => {
    setEditCareer(c);
    setForm({
      title: c.title,
      location: c.location,
      experience: c.experience,
      type: c.type,
      description: c.description || '',
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title || !form.location || !form.experience) {
      showToast('Please enter title, location and experience.');
      return;
    }

    const careerData = {
      id: editCareer ? editCareer.id : `role-${Date.now()}`,
      title: form.title,
      location: form.location,
      experience: form.experience,
      type: form.type,
      description: form.description,
    };

    let nextCareers;
    if (editCareer) {
      nextCareers = careers.map(c => c.id === editCareer.id ? careerData : c);
      showToast('Role listing updated successfully!');
    } else {
      nextCareers = [careerData, ...careers];
      showToast('Role listing created successfully!');
    }

    setCareers(nextCareers);
    saveCareers(nextCareers);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this job listing?')) return;
    const nextCareers = careers.filter(c => c.id !== id);
    setCareers(nextCareers);
    saveCareers(nextCareers);
    showToast('Job listing deleted.');
  };

  const filtered = careers.filter(c => {
    const q = search.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
  });

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <h2 className="admin-page__title">Career Management</h2>
            <p className="admin-page__subtitle">Manage open job listings on the Careers page</p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Position
          </button>
        </div>

        {toast && <div className="admin-toast">{toast}</div>}

        <div className="admin-search" style={{ marginBottom: '1.5rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="admin-search__input"
            placeholder="Search listings by title or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-table-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Experience Required</th>
                  <th>Job Type</th>
                  <th>Brief Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                      No positions found
                    </td>
                  </tr>
                ) : (
                  filtered.map(c => (
                    <tr key={c.id}>
                      <td><strong>{c.title}</strong></td>
                      <td>{c.location}</td>
                      <td>{c.experience}</td>
                      <td>
                        <span className="admin-status" style={{ background: 'rgba(66,153,225,0.15)', color: '#4299e1' }}>
                          {c.type}
                        </span>
                      </td>
                      <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.description}
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-btn admin-btn--sm" onClick={() => openEdit(c)}>Edit</button>
                          <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(c.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
            <div className="admin-modal" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
              <div className="admin-modal__header">
                <h3>{editCareer ? 'Edit Position' : 'Add New Position'}</h3>
                <button className="admin-modal__close" onClick={() => setShowForm(false)}>✕</button>
              </div>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label>Job Title *</label>
                  <input
                    className="admin-input"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Lead Structural Engineer"
                  />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Location *</label>
                    <input
                      className="admin-input"
                      value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Madurai, TN"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Experience Required *</label>
                    <input
                      className="admin-input"
                      value={form.experience}
                      onChange={e => setForm({ ...form, experience: e.target.value })}
                      placeholder="e.g. 5+ Years"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Employment Type</label>
                  <select
                    className="admin-input"
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Job Description *</label>
                  <textarea
                    className="admin-input"
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Enter structural duties, materials supervision responsibilities, required qualifications..."
                  />
                </div>

                <div className="admin-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button className="admin-btn admin-btn--outline" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                  <button className="admin-btn admin-btn--primary" type="button" onClick={handleSave}>Save Position</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
