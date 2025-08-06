import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './contact.css';

const Contact = () => {
  const form = useRef();
  const [showOverlay, setShowOverlay] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_etlygpa',
      'template_t59x80l',
      form.current,
      '15bwCmISuER0TyVbI'
    )
      .then((result) => {
        console.log('Message sent:', result.text);
        alert('Message Sent Successfully!');
      }, (error) => {
        console.log('Error:', error.text);
        alert('Something went wrong.');
      });
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className='cardcontainer'>

      {/* Card 1 */}
      <div className="card" onClick={toggleOverlay} style={{ cursor: 'pointer' }}>
        <div className="card-link">
          <img
            src='https://res.cloudinary.com/dcm17uxik/image/upload/v1754327265/Flat_Design_-_Joystick_-_Bansi_Krishna_ctw096.jpg'
            className='card-img'
            alt="Card 1"
          />
        </div>
      </div>

      {/* Card 2 */}
      <div className="card">
        <a href="https://www.instagram.com/awaizshaik25/" target="_blank" rel="noopener noreferrer" className="card-link">
          <img
            src='https://res.cloudinary.com/dcm17uxik/image/upload/v1754319411/Best_27_Company_Culture_Decks_To_Copy_-_Tettra_fd8tmw.jpg'
            className='card-img'
            alt="Card 2"
          />
        </a>
      </div>

      {/* Card 3 */}
      <div className="card">
        <a href="https://example.com/card3" target="_blank" rel="noopener noreferrer" className="card-link">
          <img
            src='https://res.cloudinary.com/dcm17uxik/image/upload/v1754319256/Linkedin_aovjdg.jpg'
            className='card-img'
            alt="Card 3"
          />
        </a>
      </div>

      {/* Mailer Section */}
      <div className="mailer">
        <div className="mailer-container">
          <div className='mail'>
            <img
              src='https://res.cloudinary.com/dcm17uxik/image/upload/v1748945549/icons8-gmail-96_ddbklc.png'
              className='mail-logo'
              alt="Gmail Icon"
            />
            <h3>shaikawaiz2501@gmail.com</h3>
          </div>

          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="user_email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

   {/* Overlay Modal */}
{/* Overlay Modal */}
{showOverlay && (
  <div className="overlay">
    <div className="overlay-content">
      <button className="close-btn" onClick={toggleOverlay}>✖</button>
      <div className="overlay-buttons">
        {[
          { label: 'One', url: 'https://snakegame-fccdc.web.app', imgSrc: 'https://res.cloudinary.com/dcm17uxik/image/upload/v1754328169/b7133929-e797-42fd-b4fa-166dba1b29f1_l9mazf.jpg' },
          { label: 'Two', url: 'https://flappybird-dc165.web.app', imgSrc: 'https://res.cloudinary.com/dcm17uxik/image/upload/v1754330041/ba5f3fdf-b5a0-48ac-b88a-77ff28e7c088_wfhxlg.gif' },
          { label: 'Three', url: 'https://brickbreaker-fc0ff.web.app', imgSrc: 'https://res.cloudinary.com/dcm17uxik/image/upload/v1754330948/bf8bd3d1-34bc-4cc0-b670-c80dfffa6323_ocx0iz.jpg' },
    
        ].map(({ label, url, imgSrc }, idx) => (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="overlay-button"
          >
            <img src={imgSrc} alt={`Btn ${label}`} className="overlay-img" />
          </a>
        ))}
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default Contact;
