import React, { useState, useEffect } from 'react';
import './projects.css';
import { GrOverview } from "react-icons/gr";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('https://portfolio-v5tt.onrender.com/api/projects');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const closeOverlay = () => {
    setIsClosing(true);
    setTimeout(() => {
      setExpandedProject(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="project-section">
      <p>Some of my featured projects and recognitions.</p>
      <div className="achievements-grid">
        {projects.map((item, idx) => (
          <div
            key={item._id}
            className={`achievement-card visible`}
            style={{ animationDelay: `${idx * 0.1}s` }}
            onMouseEnter={() => setHoveredCard(item._id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setExpandedProject(item)}
          >
            <div
              className="achievement-img"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,${hoveredCard === item._id ? 0.5 : 0.3}), rgba(0,0,0,${hoveredCard === item._id ? 0.7 : 0.5})), url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
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
                  <FiExternalLink className="logogit" />
                  <span>Live Demo</span>
                </a>
                <button
                  className="logogit-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedProject(item);
                  }}
                >
                  <GrOverview />
                  <span>Details</span>
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
