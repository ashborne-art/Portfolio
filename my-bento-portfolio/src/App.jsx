import React, { useState, useEffect } from 'react';
import ArtGallery from './content/ArtGallery/ArtGallery';
import Skills from './content/Skill/Skills';
import Projects from './content/Project/Project';
import ResumeCard from './content/About/About';
import './App.css';
import Contact from './content/contact/contact';
import Achievement from './content/Achievement/Achievement';

const sections = [
  { id: 'about', title: 'About Me', icon: 'fa-user' },
  { id: 'gallery', title: 'Art Gallery', icon: 'fa-image' },
  { id: 'contact', title: 'Contact', icon: 'fa-code' },
  { id: 'skills', title: 'Skills', icon: 'fa-tools' },
  { id: 'projects', title: 'Projects', icon: 'fa-trophy' },
  { id: 'achievements', title: 'Achievements', icon: 'fa-star' }
];

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);

  const showSection = (id) => {
    setActiveSection(id);
    document.body.style.overflow = 'hidden';

    if (id === 'projects') {
      setVisibleCards([]);
      setTimeout(() => {
        const newVisibleCards = projectsData.map(item => item.id);
        setVisibleCards(newVisibleCards);
      }, 100);
    }
  };

  const closeSection = () => {
    setActiveSection(null);
    document.body.style.overflow = 'auto';
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('expanded-content')) {
      closeSection();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeSection) {
        closeSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  useEffect(() => {
    if (!window.customElements.get('spline-viewer')) {
      import('https://unpkg.com/@splinetool/viewer@1.10.27/build/spline-viewer.js');
    }
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Shaik Muhammad Awaiz</h1>
      </header>

      {/* New container for the bento grid */}
      <div className="bento-grid-container">
        <div className="bento-grid">
          {/* Box 1 - Spline Viewer */}
          <div className="box1 box"> {/* Added 'box' class here */}
            <div className="box-content" style={{ width: '100%', height: '100%', position: 'relative', padding: 0 }}>
              <spline-viewer
                url="https://prod.spline.design/vSDNQ9lonLBwqR0y/scene.splinecode"
                style={{ width: '100%', height: '100%', borderRadius: '20px'}}
                interaction="none"
                tabIndex="-1"
              ></spline-viewer>
            </div>
          </div>

          {/* Box 2 - Gallery */}
          <div className="box box2" onClick={() => showSection('gallery')}>
            <i className={`fas ${sections.find(s => s.id === 'gallery').icon} floating`}></i>
            <h2>{sections.find(s => s.id === 'gallery').title}</h2>
          </div>

          {/* Box 3 - Contact */}
          <div className="box box3" onClick={() => showSection('contact')}>
            <i className={`fas ${sections.find(s => s.id === 'contact').icon} floating`}></i>
            <h2>{sections.find(s => s.id === 'contact').title}</h2>
          </div>

          {/* Box 4 - Skills */}
          <div className="box box4" onClick={() => showSection('skills')}>
            <i className={`fas ${sections.find(s => s.id === 'skills').icon} floating`}></i>
            <h2>{sections.find(s => s.id === 'skills').title}</h2>
          </div>

          {/* Box 5 - Projects */}
          <div className="box box5" onClick={() => showSection('projects')}>
            <i className={`fas ${sections.find(s => s.id === 'projects').icon} floating`}></i>
            <h2>{sections.find(s => s.id === 'projects').title}</h2>
          </div>

          {/* Box 6 - About Me */}
          <div className="box box6" onClick={() => showSection('about')}>
            <i className={`fas ${sections.find(s => s.id === 'about').icon} floating`}></i>
            <h2>{sections.find(s => s.id === 'about').title}</h2>
            
          </div>

          {/* Box 7 - Achievements */}
          <div className="box box7" onClick={() => showSection('achievements')}>
            <i className={`fas ${sections.find(s => s.id === 'achievements').icon} floating`}></i>
            <h2>{sections.find(s => s.id === 'achievements').title}</h2>
          </div>
        </div>
      </div>

      {/* Expanded Sections */}
      {sections.map((section) => (
        <div
          key={section.id}
          className={`expanded-content ${activeSection === section.id ? 'active' : ''}`}
          onClick={handleBackdropClick}
        >
          {activeSection === section.id && (
            <>
              <button className="close-btn" onClick={closeSection}>
                <div className="close-icon">×</div>
              </button>

              <h1>{section.title}</h1>

              {section.id === 'projects' ? (
                <Projects visibleCards={visibleCards} />
              ) : section.id === 'gallery' ? (
                <ArtGallery />
              ) : section.id === 'skills' ? (
                <Skills />
              ) : section.id === 'about' ? (
                <div>
                 <p>full stack dev,problem solver,ML engineer</p>
                   <ResumeCard />
                </div>
               
              ) : section.id === 'contact' ? (
                <>
                  <p>
                    This is detailed information about my contact section. Click the close button or press ESC to return
                    to the portfolio grid.
                  </p>
                  <div>
                    <Contact />
                  </div>
                </>

              ) : section.id === 'achievements' ? (
                <>
                <p>
                  This is detailed information about my achievements section. Click the close button or press ESC to
                  return to the portfolio grid.
                </p>
                <div>
                  <Achievement />
                </div>
                </>
              ) : null}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;