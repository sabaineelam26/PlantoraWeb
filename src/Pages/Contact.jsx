import React, { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form:", formData);

    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <span>PLANTORA</span>
          <h1>Get In Touch</h1>
          <p>
            Have a question about plants, orders, or Plantora? We'd love to hear
            from you.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Let's Talk</h2>

            <p>
              Whether you need help choosing a plant or have a question about
              your order, our team is here to help.
            </p>

            <div className="contact-detail">
              <div className="contact-icon">📧</div>
              <div>
                <h3>Email</h3>
                <p>support@plantora.com</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Phone</h3>
                <p>+91 XXXXX XXXXX</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Address</h3>
                <p>
                  Plantora
                  <br />
                  Your Business Address
                  <br />
                  India
                </p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-icon">🕒</div>
              <div>
                <h3>Support Hours</h3>
                <p>
                  Monday – Saturday
                  <br />
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-box">
            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you with?"
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
