import React, { useState, useEffect } from 'react';
import './projects.css';
import { GrOverview } from "react-icons/gr";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // ✅ Import Autoplay
import 'swiper/css';


const Projects = ({ visibleCards = [] }) => {
  const [projects, setProjects] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
        const data = await res.json();
        setProjects(data);
        console.log('Fetched projects:', data);
      } catch (err) {
        console.error('Error fetching projects:', err);
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
            // Show all projects visible by default, ignoring visibleCards for now
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

      {/* Overlay */}
      {expandedProject && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlay-content">
            <button
              className="close-button"
              onClick={() => setExpandedProject(null)}
              aria-label="Close overlay"
            >
              &times;
            </button>
            <div className="content-wrapper">
              <div className="image-section">
               <Swiper
  spaceBetween={10}
  slidesPerView={1}
  autoplay={{
    delay: 1000,
    disableOnInteraction: false,
  }}
  modules={[Autoplay]}
  className="swiper-container"
>
  {expandedProject.gallery?.images.map((img, index) => (
    <SwiperSlide key={index}>
      <img src={img.url} alt={`Slide ${index + 1}`} className="swiper-img" />
    </SwiperSlide>
  ))}
</Swiper>

              </div>
              <div className="text-section">
                <h2>{expandedProject.title}</h2>
                <p>{expandedProject.gallery?.detailDescription}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
