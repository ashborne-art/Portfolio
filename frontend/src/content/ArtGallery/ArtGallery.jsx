import React, { useState, useEffect } from 'react';

const ArtGallery = () => {
  const [images, setImages] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetch('https://portfolio-v5tt.onrender.com/api/artgallery')
      .then(res => {
        // Check if the response is successful (status code 200-299)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Check if the received data is actually an array
        if (Array.isArray(data)) {
          setImages(data);
          const initialLikes = data.reduce((acc, img) => {
            acc[img.public_id] = 0;
            return acc;
          }, {});
          setLikes(initialLikes);
        } else {
          console.error('Received data is not an array:', data);
          // If data isn't an array, set images to an empty array to prevent rendering errors
          setImages([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch images:', err);
        // You can also update the UI to show an error message to the user here
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
        </div>
      ))}
    </div>
  );
};

export default ArtGallery;
