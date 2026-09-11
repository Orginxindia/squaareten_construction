/* ============================================================
   MEDIA STORE — LocalStorage Persistence for Media Library
   ============================================================ */

const INITIAL_MEDIA = [
  {
    id: 'media-001',
    name: 'Maha Residence Facade',
    url: '/assets/images/maha-hero-bg.jpg',
    type: 'image/jpeg',
    size: '1.2 MB',
    date: '12-05-2026'
  },
  {
    id: 'media-002',
    name: 'Nagudi Main Building',
    url: '/assets/images/project-nagudi-main.jpg',
    type: 'image/jpeg',
    size: '850 KB',
    date: '10-04-2024'
  },
  {
    id: 'media-003',
    name: 'Karuppiah Nagar Brochure Banner',
    url: '/assets/images/karuppiah-nagar-brochure-banner.jpg',
    type: 'image/jpeg',
    size: '2.1 MB',
    date: '15-08-2025'
  }
];

export const getMedia = () => {
  const saved = localStorage.getItem('admin_media');
  if (!saved) {
    localStorage.setItem('admin_media', JSON.stringify(INITIAL_MEDIA));
    return INITIAL_MEDIA;
  }
  return JSON.parse(saved);
};

export const saveMedia = (media) => {
  localStorage.setItem('admin_media', JSON.stringify(media));
};

export const addMediaItem = (item) => {
  const list = getMedia();
  const newItem = {
    id: `media-${Date.now()}`,
    date: new Date().toLocaleDateString('en-IN'),
    ...item
  };
  list.unshift(newItem);
  saveMedia(list);
  return newItem;
};
