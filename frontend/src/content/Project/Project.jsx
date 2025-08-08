import React, { useState, useEffect } from 'react';
import './projects.css';
import { GrOverview } from "react-icons/gr";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Projects = ({ visibleCards = [] }) => {
  const [projects, setProjects] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('https://portfolio-v5tt.onrender.com/api/projects');
        
        // ✅ 1. Check if the response is successful
        if (!res.ok) {
          console.error('Server responded with an error:', res.status, res.statusText);
          // Optionally, handle different errors. For a 404, you might just set projects to an empty array.
          setProjects([]);
          return; // Exit the function to prevent further errors
        }

        const data = await res.json();

        // ✅ 2. Check if the received data is an array
        if (Array.isArray(data)) {
          setProjects(data);
          console.log('Fetched projects:', data);
        } else {
          console.error('Received data is not an array:', data);
          setProjects([]); // Fallback to an empty array
        }
      } catch (err) {
        // This block handles network errors or errors from res.json()
        console.error('Error fetching projects:', err);
        setProjects([]); // Ensure state is an empty array on error
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="project-section">
      <p>Some of my featured projects and recognitions.</p>
      <div className="achievements-grid">
        {projects.map((item, idx) => (
          <div
            key={item._id}
            className="achievement-card visible"
            style={{ animationDelay: `${idx * 0.1}s`, cursor: 'pointer' }}
            onMouseEnter={() => setHoveredCard(item._id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setExpandedProject(item)}
          >
            <div
              className="achievement-img"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,${hoveredCard === item._id ? 0.5 : 0.3}), rgba(0,0,0,${hoveredCard === item._id ? 0.7 : 0.5})), url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            <div className="achievement-content">
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="project-actions">
                <a
                  href={item.projectLink || "#"}
                  className="logogit-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src='https://res.cloudinary.com/dcm17uxik/image/upload/v1748869058/icons8-github-96_mqgltx.png'
                    className='logogit'
                    alt="GitHub"
                  />
                  <span>View Project</span>
                </a>
                <button
                  className="logogit-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedProject(item);
                  }}
                  aria-label="Project Overview"
                >
                  <GrOverview />
                  <span>_Overview</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {expandedProject && (
        <div className="overlay" onClick={closeOverlay}>
          <div
            className="overlay-card"
            style={{ width: '1500px', height: '800px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className="overlay-close" onClick={closeOverlay}>
              &times;
            </button>

            {/* Left Side - Images */}
            <div className="overlay-images-vertical">
              {expandedProject.gallery?.images?.slice(0, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Preview ${idx + 1}`}
                  className="overlay-image-vertical"
                />
              ))}
            </div>

            {/* Right Side - Title & Description */}
            <div className="overlay-right">
              <h2 className="overlay-title">{expandedProject.title}</h2>
              <div className="overlay-description">
                <p>{expandedProject.gallery?.detailDescription}</p>
              </div>
              <div>
                 <div className="tech-stack-container">
  {expandedProject.techStack?.map((tech, idx) => (
    <span key={idx} className="tech-box">
      {tech}
    </span>
  ))}
</div>

                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
