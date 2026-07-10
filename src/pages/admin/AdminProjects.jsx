/* ============================================================
   ADMIN PROJECTS — Project Management Panel
   ============================================================ */
import { useState, useEffect } from 'react';
import { getProjects, saveProjects } from '../../lib/projectStore';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({
    name: '',
    location: '',
    category: 'residential',
    status: 'Completed',
    img: '',
    description: '',
    area: '',
    year: '',
    story: '',
    progress: '',
    phase: '',
    expectedCompletion: '',
    featuresText: '',
  });

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openAdd = () => {
    setEditProject(null);
    setForm({
      name: '',
      location: '',
      category: 'residential',
      status: 'Completed',
      img: '/assets/images/project-villa.png',
      description: '',
      area: '',
      year: new Date().getFullYear().toString(),
      story: '',
      progress: '',
      phase: '',
      expectedCompletion: '',
      featuresText: '',
    });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditProject(p);
    setForm({
      name: p.name,
      location: p.location,
      category: p.category,
      status: p.status,
      img: p.img || '/assets/images/project-villa.png',
      description: p.description || '',
      area: p.area || '',
      year: p.year || '',
      story: p.story || '',
      progress: p.progress !== undefined ? String(p.progress) : '',
      phase: p.phase || '',
      expectedCompletion: p.expectedCompletion || '',
      featuresText: p.features ? p.features.join(', ') : '',
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.location) {
      showToast('Please enter project name and location.');
      return;
    }

    const projectData = {
      id: editProject ? editProject.id : `proj-${Date.now()}`,
      name: form.name,
      location: form.location,
      category: form.category,
      status: form.status,
      img: form.img,
      description: form.description,
      area: form.area,
      year: form.year,
      story: form.story,
      progress: form.progress ? Number(form.progress) : undefined,
      phase: form.phase || undefined,
      expectedCompletion: form.expectedCompletion || undefined,
      features: form.featuresText ? form.featuresText.split(',').map(f => f.trim()).filter(Boolean) : [],
    };

    let nextProjects;
    if (editProject) {
      nextProjects = projects.map(p => p.id === editProject.id ? projectData : p);
      showToast('Project updated successfully!');
    } else {
      nextProjects = [projectData, ...projects];
      showToast('Project created successfully!');
    }

    setProjects(nextProjects);
    saveProjects(nextProjects);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const nextProjects = projects.filter(p => p.id !== id);
    setProjects(nextProjects);
    saveProjects(nextProjects);
    showToast('Project deleted successfully.');
  };

  const filtered = projects.filter(p => {
    const q = search.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <h2 className="admin-page__title">Project Management</h2>
            <p className="admin-page__subtitle">Manage Squaareten construction portfolio</p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Project
          </button>
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
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="admin-input"
            style={{ width: '200px' }}
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="interiors">Interior</option>
            <option value="plots">Plots</option>
          </select>
        </div>

        <div className="admin-table-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Project Name</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Year/Completion</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                      No projects found
                    </td>
                  </tr>
                ) : (
                  filtered.map(p => (
                    <tr key={p.id}>
                      <td>
                        <img
                          src={p.img || '/assets/images/project-villa.png'}
                          alt={p.name}
                          style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}
                          onError={(e) => { e.target.src = '/assets/images/project-villa.png'; }}
                        />
                      </td>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.location}</td>
                      <td>
                        <span className="admin-status" style={{ background: 'rgba(201,168,106,0.15)', color: '#c9a86a', textTransform: 'capitalize' }}>
                          {p.category}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-status admin-status--${p.status.toLowerCase()}`}>
                          {p.status}
                        </span>
                      </td>
                      <td>{p.status === 'Completed' ? p.year : p.expectedCompletion || 'Ongoing'}</td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-btn admin-btn--sm" onClick={() => openEdit(p)}>Edit</button>
                          <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(p.id)}>Delete</button>
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
            <div className="admin-modal" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
              <div className="admin-modal__header">
                <h3>{editProject ? 'Edit Project' : 'Add Project'}</h3>
                <button className="admin-modal__close" onClick={() => setShowForm(false)}>✕</button>
              </div>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label>Project Name *</label>
                  <input
                    className="admin-input"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Thirupaalai Duplex Villa"
                  />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Location *</label>
                    <input
                      className="admin-input"
                      value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Madurai Bypass Road"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Category</label>
                    <select
                      className="admin-input"
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="interiors">Interior</option>
                      <option value="plots">Plots</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Status</label>
                    <select
                      className="admin-input"
                      value={form.status}
                      onChange={e => setForm({ ...form, status: e.target.value })}
                    >
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Project Image URL</label>
                    <input
                      className="admin-input"
                      value={form.img}
                      onChange={e => setForm({ ...form, img: e.target.value })}
                      placeholder="e.g. /assets/images/project-villa.png"
                    />
                  </div>
                </div>

                {form.status === 'Ongoing' ? (
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Progress (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="admin-input"
                        value={form.progress}
                        onChange={e => setForm({ ...form, progress: e.target.value })}
                        placeholder="e.g. 45"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Current Phase</label>
                      <input
                        className="admin-input"
                        value={form.phase}
                        onChange={e => setForm({ ...form, phase: e.target.value })}
                        placeholder="e.g. Brickwork"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Expected Completion</label>
                      <input
                        className="admin-input"
                        value={form.expectedCompletion}
                        onChange={e => setForm({ ...form, expectedCompletion: e.target.value })}
                        placeholder="e.g. March 2027"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Built-Up Area</label>
                      <input
                        className="admin-input"
                        value={form.area}
                        onChange={e => setForm({ ...form, area: e.target.value })}
                        placeholder="e.g. 3,200 sq.ft"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Year Built</label>
                      <input
                        className="admin-input"
                        value={form.year}
                        onChange={e => setForm({ ...form, year: e.target.value })}
                        placeholder="e.g. 2025"
                      />
                    </div>
                  </div>
                )}

                <div className="admin-form-group">
                  <label>Short Description</label>
                  <input
                    className="admin-input"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Short 1-sentence synopsis shown on projects grid cards..."
                  />
                </div>

                <div className="admin-form-group">
                  <label>Project Story / Editorial details</label>
                  <textarea
                    className="admin-input"
                    style={{ minHeight: '80px', resize: 'vertical' }}
                    value={form.story}
                    onChange={e => setForm({ ...form, story: e.target.value })}
                    placeholder="The full storytelling overview of the project shown on the details page..."
                  />
                </div>

                <div className="admin-form-group">
                  <label>Key Features (comma-separated)</label>
                  <input
                    className="admin-input"
                    value={form.featuresText}
                    onChange={e => setForm({ ...form, featuresText: e.target.value })}
                    placeholder="e.g. 3 Spacious Bedrooms, Covered Parking, Italian Marble, Home Automation"
                  />
                </div>

                <div className="admin-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button className="admin-btn admin-btn--outline" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                  <button className="admin-btn admin-btn--primary" type="button" onClick={handleSave}>Save Project</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
