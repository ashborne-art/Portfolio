import React, { useEffect, useState } from 'react';
import './Skills.css';
import axios from 'axios';

const Skills = () => {
  const [devSkills, setDevSkills] = useState([]);
  const [langSkills, setLangSkills] = useState([]);
  const [toolsSkills, setToolsSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/skills');
        setDevSkills(res.data.DevSkills || []);
        setLangSkills(res.data.LangSkills || []);
        setToolsSkills(res.data.ToolsSkills || []);
      } catch (err) {
        console.error('Error fetching skills:', err);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className='skills-container'>
      <h2 className='skills-title'>Web Development Tools</h2>
      <div className='cardscontainer'>
        {devSkills.map(skill => (
          <div className='tooltip' key={skill._id}>
            <img src={skill.url} alt={skill.name} className='logo' />
            <span className='tooltiptext'>{skill.name}</span>
          </div>
        ))}
      </div>

      <h2 className='skills-title'>Programming Languages</h2>
      <div className='cardscontainer'>
        {langSkills.map(skill => (
          <div className='tooltip' key={skill._id}>
            <img src={skill.url} alt={skill.name} className='logo' />
            <span className='tooltiptext'>{skill.name}</span>
          </div>
        ))}
      </div>

      <h2 className='skills-title'>Tools</h2>
      <div className='cardscontainer'>
        {toolsSkills.map(skill => (
          <div className='tooltip' key={skill._id}>
            <img src={skill.url} alt={skill.name} className='logo' />
            <span className='tooltiptext'>{skill.name}</span>
          </div>
        ))}
      </div>

      <h2 className='skills-title'>Problem Solving Progress</h2>
      <div className="progress-container">
        <div className="progress-circle" data-tooltip="LeetCode">
          <div className="circle" style={{ '--percent': 75 }}>
            <div className="inner-text">
              <img src="https://res.cloudinary.com/dcm17uxik/image/upload/v1748872978/icons8-leetcode-96_te0tle.png" alt="LeetCode" />
              <p>100+</p>
            </div>
          </div>
        </div>

        <div className="progress-circle" data-tooltip="HackerRank">
          <div className="circle" style={{ '--percent': 45 }}>
            <div className="inner-text">
              <img src="https://res.cloudinary.com/dcm17uxik/image/upload/v1748874524/icons8-hackerrank-96_zhqxbo.png" alt="HackerRank" />
              <p>50+</p>
            </div>
          </div>
        </div>

        <div className="progress-circle" data-tooltip="GeeksforGeeks">
          <div className="circle" style={{ '--percent': 45 }}>
            <div className="inner-text">
              <img src="https://res.cloudinary.com/dcm17uxik/image/upload/v1748874523/icons8-geeksforgeeks-96_os7h8n.png" alt="GFG" />
              <p>50+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
