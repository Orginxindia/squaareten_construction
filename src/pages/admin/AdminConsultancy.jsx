/* ============================================================
   ADMIN CONSULTANCY — Consultancy Management Panel
   ============================================================ */
import { useState, useEffect } from 'react';
import { getConsultancyData, saveConsultancyData } from '../../lib/consultancyStore';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminConsultancy() {
  const [data, setData] = useState({ heroTitle: '', heroSubtitle: '', feeStructure: [] });
  const [toast, setToast] = useState('');
  const [newFee, setNewFee] = useState({ type: '', fee: '' });

  useEffect(() => {
    setData(getConsultancyData());
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSaveText = () => {
    if (!data.heroTitle || !data.heroSubtitle) {
      showToast('Title and subtitle cannot be empty.');
      return;
    }
    saveConsultancyData(data);
    showToast('Consultancy general content updated successfully!');
  };

  const handleAddFee = (e) => {
    e.preventDefault();
    if (!newFee.type || !newFee.fee) {
      showToast('Please enter both fee type and rate.');
      return;
    }
    const updatedFees = [...data.feeStructure, newFee];
    const nextData = { ...data, feeStructure: updatedFees };
    setData(nextData);
    saveConsultancyData(nextData);
    setNewFee({ type: '', fee: '' });
    showToast('Fee structure added successfully!');
  };

  const handleDeleteFee = (idx) => {
    const updatedFees = data.feeStructure.filter((_, i) => i !== idx);
    const nextData = { ...data, feeStructure: updatedFees };
    setData(nextData);
    saveConsultancyData(nextData);
    showToast('Fee structure item deleted.');
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <h2 className="admin-page__title">Consultancy Management</h2>
            <p className="admin-page__subtitle">Manage consulting options, hero banners, and fees pricing matrix</p>
          </div>
        </div>

        {toast && <div className="admin-toast">{toast}</div>}

        <div className="admin-dashboard-grid" style={{ alignItems: 'start' }}>
          
          {/* General Copy/Texts */}
          <div className="admin-table-card" style={{ padding: '2rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <h3 className="admin-table-card__title" style={{ marginBottom: '1.25rem' }}>Hero Banner Content</h3>
            
            <div className="admin-form-group" style={{ marginBottom: '1.25rem' }}>
              <label>Hero Heading</label>
              <input
                className="admin-input"
                value={data.heroTitle}
                onChange={e => setData({ ...data, heroTitle: e.target.value })}
                placeholder="Consulting Page Hero Title"
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Hero Description</label>
              <textarea
                className="admin-input"
                style={{ minHeight: '120px', resize: 'vertical' }}
                value={data.heroSubtitle}
                onChange={e => setData({ ...data, heroSubtitle: e.target.value })}
                placeholder="Hero supporting text..."
              />
            </div>

            <button className="admin-btn admin-btn--primary" onClick={handleSaveText}>
              Save Content Changes
            </button>
          </div>

          {/* Fee Matrix */}
          <div className="admin-table-card">
            <h3 className="admin-table-card__title" style={{ padding: '1.5rem 1.5rem 0 1.5rem' }}>Advisory Fee Structure</h3>
            
            <div style={{ padding: '1.5rem' }}>
              <table className="admin-table" style={{ width: '100%', marginBottom: '1.5rem' }}>
                <thead>
                  <tr>
                    <th>Service / Consultancy Type</th>
                    <th>Standard Charges</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.feeStructure && data.feeStructure.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>
                        No fee structures defined.
                      </td>
                    </tr>
                  ) : (
                    data.feeStructure && data.feeStructure.map((fee, idx) => (
                      <tr key={idx}>
                        <td><strong>{fee.type}</strong></td>
                        <td><span style={{ color: '#c9a86a', fontWeight: 'bold' }}>{fee.fee}</span></td>
                        <td>
                          <button
                            className="admin-btn admin-btn--sm admin-btn--danger"
                            onClick={() => handleDeleteFee(idx)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <form onSubmit={handleAddFee} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                <h4 style={{ color: 'var(--color-text)', marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                  Add Fee Item
                </h4>
                <div className="admin-form-group" style={{ marginBottom: '1rem' }}>
                  <label>Service Description</label>
                  <input
                    className="admin-input"
                    value={newFee.type}
                    onChange={e => setNewFee({ ...newFee, type: e.target.value })}
                    placeholder="e.g. Detailed Material Audits & Quality Control"
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: '1.25rem' }}>
                  <label>Standard Charges Rate</label>
                  <input
                    className="admin-input"
                    value={newFee.fee}
                    onChange={e => setNewFee({ ...newFee, fee: e.target.value })}
                    placeholder="e.g. ₹25,000 or 1% of materials budget"
                  />
                </div>
                <button type="submit" className="admin-btn admin-btn--outline">
                  + Add Fee Structure
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
