import React from 'react';
import './About.css';

const ResumeCard = () => {
  return (
    <div className="card-horizontal">
      <div className="card-content">
        
        <p>
        With a strong foundation in both front-end and back-end technologies,build scalable web applications with intuitive designs and intelligent data-driven features My work blends functionality with form, ensuring smooth user experiences backed by solid logic and smart solutions. Outside of coding, I’m inspired by art, music, and the idea of using technology to make a positive impact.
        </p>
        <a href="/resume.pdf" download className="resume-btn">
          Download Resume
        </a>
      </div>
      <img
        src="https://res.cloudinary.com/dcm17uxik/image/upload/v1752590249/WhatsApp_Image_2025-07-15_at_10.09.18_8334d601_duxboj.jpg"
        alt="Profile"
        className="card-img-right"
      />
    </div>
  );
};

export default ResumeCard;
