/* ============================================================
   ADMIN MEDIA — Media Assets Management Library
   ============================================================ */
import { useState, useEffect } from 'react';
import { getMedia, saveMedia, addMediaItem } from '../../lib/mediaStore';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminMedia() {
  const [media, setMedia] = useState([]);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({ name: '', url: '', size: '500 KB', type: 'image/jpeg' });

  useEffect(() => {
    setMedia(getMedia());
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    showToast('Asset URL copied to clipboard!');
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this media asset?')) return;
    const nextMedia = media.filter(m => m.id !== id);
    setMedia(nextMedia);
    saveMedia(nextMedia);
    showToast('Asset deleted.');
  };

  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.url) {
      showToast('Please enter asset name and URL.');
      return;
    }
    const item = addMediaItem({
      name: uploadForm.name,
      url: uploadForm.url,
      type: uploadForm.type,
      size: uploadForm.size
    });
    setMedia([item, ...media]);
    setShowUpload(false);
    setUploadForm({ name: '', url: '', size: '500 KB', type: 'image/jpeg' });
    showToast('Media asset registered successfully!');
  };

  // Mock File Upload conversion for testing
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadForm(prev => ({
        ...prev,
        name: file.name.split('.')[0],
        url: reader.result, // base64 representation
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type
      }));
    };
    reader.readAsDataURL(file);
  };

  const filtered = media.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <h2 className="admin-page__title">Media Library</h2>
            <p className="admin-page__subtitle">Upload, replace, and copy asset URLs for construction projects and brochures</p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={() => setShowUpload(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload Asset
          </button>
        </div>

        {toast && <div className="admin-toast">{toast}</div>}

        <div className="admin-search" style={{ marginBottom: '2rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="admin-search__input"
            placeholder="Search media by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-media-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: '4rem 2rem', color: '#888', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              No media assets found
            </div>
          ) : (
            filtered.map(m => (
              <div key={m.id} className="admin-media-card" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ height: '160px', background: '#0a0a0a', borderBottom: '1px solid var(--color-border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {m.type.startsWith('image/') ? (
                    <img
                      src={m.url}
                      alt={m.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/assets/images/project-villa.png'; }}
                    />
                  ) : (
                    <div style={{ fontSize: '2.5rem' }}>📄</div>
                  )}
                  <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', color: '#c9a86a', fontWeight: 'bold' }}>
                    {m.size}
                  </div>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={m.name}>
                      {m.name}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
                      {m.type} • Uploaded {m.date}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                      className="admin-btn admin-btn--sm admin-btn--outline"
                      style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem' }}
                      onClick={() => handleCopyUrl(m.url)}
                    >
                      Copy URL
                    </button>
                    <button
                      className="admin-btn admin-btn--sm admin-btn--danger"
                      style={{ fontSize: '0.75rem', padding: '0.4rem' }}
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {showUpload && (
          <div className="admin-modal-overlay" onClick={() => setShowUpload(false)}>
            <div className="admin-modal" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
              <div className="admin-modal__header">
                <h3>Upload / Register Asset</h3>
                <button className="admin-modal__close" onClick={() => setShowUpload(false)}>✕</button>
              </div>
              <div className="admin-modal__body">
                <form onSubmit={handleAddMedia} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div className="admin-form-group">
                    <label>Select Local File</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="admin-input"
                      onChange={handleFileUpload}
                      style={{ padding: '0.4rem' }}
                    />
                  </div>

                  <div style={{ textAlign: 'center', color: '#888', fontSize: '0.8rem', margin: '-0.5rem 0' }}>— OR ENTER URL —</div>

                  <div className="admin-form-group">
                    <label>Asset Name *</label>
                    <input
                      className="admin-input"
                      value={uploadForm.name}
                      onChange={e => setUploadForm({ ...uploadForm, name: e.target.value })}
                      placeholder="e.g. Master Plan Layout Design"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Image / Document URL *</label>
                    <input
                      className="admin-input"
                      value={uploadForm.url}
                      onChange={e => setUploadForm({ ...uploadForm, url: e.target.value })}
                      placeholder="e.g. /assets/images/project-interior.png"
                      required
                    />
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>File Type</label>
                      <input
                        className="admin-input"
                        value={uploadForm.type}
                        onChange={e => setUploadForm({ ...uploadForm, type: e.target.value })}
                        placeholder="e.g. image/png"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Approx. Size</label>
                      <input
                        className="admin-input"
                        value={uploadForm.size}
                        onChange={e => setUploadForm({ ...uploadForm, size: e.target.value })}
                        placeholder="e.g. 1.2 MB"
                      />
                    </div>
                  </div>

                  <div className="admin-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                    <button className="admin-btn admin-btn--outline" type="button" onClick={() => setShowUpload(false)}>Cancel</button>
                    <button className="admin-btn admin-btn--primary" type="submit">Add to Library</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
