import React, { useState, useEffect } from 'react';

const ArtGallery = () => {
  const [images, setImages] = useState([]);
  
  // Likes state same as before, initialized once images load
  const [likes, setLikes] = useState({});

  useEffect(() => {
    // Fetch images from backend API
    fetch('https://portfolio-v5tt.onrender.com/api/artgallery')
 // Adjust URL if needed
      .then(res => res.json())
      .then(data => {
        setImages(data);

        // Initialize likes for each image id (using public_id as id here)
        const initialLikes = data.reduce((acc, img) => {
          acc[img.public_id] = 0;
          return acc;
        }, {});
        setLikes(initialLikes);
      })
      .catch(err => {
        console.error('Failed to fetch images:', err);
      });
  }, []);

  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <div
      className="gallery-container"
      style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {images.map(({ public_id, url }) => (
        <div
          key={public_id}
          className="art-card"
          style={{
            width: '400px',
            height: '500px!important',
            background: '#111',
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.7)',
            color: '#eee',
            overflow: 'hidden',
          }}
        >
          <img
            src={url}
            alt="Art Gallery"
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          />
          {/* Optional like button, uncomment if you want to keep */}
          {/* <button onClick={() => handleLike(public_id)}>❤️ {likes[public_id] || 0}</button> */}
        </div>
      ))}
    </div>
  );
};

export default ArtGallery;
