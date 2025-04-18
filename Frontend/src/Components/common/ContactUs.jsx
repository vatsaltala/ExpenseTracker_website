
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ← You also forgot this import!

const ContactUs = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    console.log("formData...", data);
    try {
      const res = await axios.post("http://localhost:3000/issue/addissue", data);
      console.log(res);
      if (res.status === 201) {
        alert("Issue submitted successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
      mainContainer: {
        width: '100vw',
        minHeight: '100vh',
        padding: '20px',
        background: `
          linear-gradient(135deg, #667eea 0%, #764ba2 100%),
          repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px)
        `,
        backgroundBlendMode: 'overlay',
        position: 'relative',
        marginLeft: '0px',
        // width: '99vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      },
      contentWrapper: {
        width: '90%',
        maxWidth: '1400px',
        position: 'relative',
        padding: '40px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
        margin: '20px auto',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      },
      header: {
        marginBottom: '40px',
        textAlign: 'center',
        position: 'relative'
      },
      title: {
        color: '#ffffff',
        fontSize: '3rem',
        fontWeight: '700',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
      },
      navButtons: {
        position: 'absolute',
        top: '0',
        right: '0',
        display: 'flex',
        gap: '10px'
      },
      buttonOutline: {
        padding: '12px 24px',
        border: '2px solid #ffffff',
        borderRadius: '12px',
        backgroundColor: 'transparent',
        color: '#ffffff',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transform: 'translateY(-2px)'
        }
      },
      buttonPrimary: {
        padding: '12px 24px',
        border: 'none',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        color: '#8E37D7',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        '&:hover': {
          backgroundColor: '#f0f0f0',
          transform: 'translateY(-2px)',
          boxShadow: '0 5px 15px rgba(255, 255, 255, 0.3)'
        }
      },
      formContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '30px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0'
      },
      card: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        padding: '35px',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
        }
      },
      formGroup: {
        marginBottom: '20px'
      },
      label: {
        display: 'block',
        marginBottom: '8px',
        color: '#344767',
        fontSize: '0.875rem',
        fontWeight: '600'
      },
      input: {
        width: '100%',
        padding: '14px 18px',
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        fontSize: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        transition: 'all 0.3s ease',
        '&:focus': {
          borderColor: '#8E37D7',
          outline: 'none',
          boxShadow: '0 0 0 3px rgba(142, 55, 215, 0.2)'
        }
      },
      textarea: {
        width: '100%',
        padding: '12px 16px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '1rem',
        minHeight: '120px',
        resize: 'vertical',
        transition: 'all 0.3s ease'
      },
      submitButton: {
        width: '100%',
        padding: '16px',
        backgroundColor: '#8E37D7',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: '#6B8DD6',
          transform: 'translateY(-2px)',
          boxShadow: '0 5px 15px rgba(142, 55, 215, 0.4)'
        }
      },
      contactInfo: {
        fontSize: '1.1rem',
        lineHeight: '2.2',
        color: '#2c3e50',
        '& p': {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateX(10px)',
            color: '#8E37D7'
          }
        }
      },
      socialButtons: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginTop: '20px'
      },
      socialButton: {
        padding: '12px 24px',
        borderRadius: '12px',
        backgroundColor: '#6B8DD6',
        color: '#fff',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        fontWeight: '500',
        '&:hover': {
          backgroundColor: '#8E37D7',
          transform: 'translateY(-2px)',
          boxShadow: '0 5px 15px rgba(107, 141, 214, 0.4)'
        }
      }
    };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Get in Touch with Us</h1>
          <div style={styles.navButtons}>
            <button onClick={() => navigate(-1)} style={styles.buttonOutline}>Home</button>
            <Link to="/about" style={styles.buttonPrimary}>About</Link>
          </div>
        </div>

        <div style={styles.formContainer}>
          {/* Contact Form */}
          <div style={styles.card}>
            <h4 style={{ marginBottom: '20px', color: '#2c3e50' }}>Send Us a Message</h4>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Name</label>
                <input style={styles.input} type="text" placeholder="Enter your name" {...register("name")} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Email</label>
                <input style={styles.input} type="email" placeholder="Enter your email" {...register("email")} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Message</label>
                <textarea style={styles.textarea} placeholder="Write your message" {...register("message")}></textarea>
              </div>
              <button style={styles.submitButton} type="submit">Send Message</button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div style={{ ...styles.card, marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '20px', color: '#2c3e50' }}>Our Contact Information</h4>
              <div style={styles.contactInfo}>
                <p>📍 <strong>Address:</strong> CG Road, Navrangpura, Ahmedabad, India</p>
                <p>📧 <strong>Email:</strong> support@expensetracker.com</p>
                <p>📞 <strong>Phone:</strong> +1 234 567 890</p>
                <p>🕘 <strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div style={styles.card}>
              <h4 style={{ marginBottom: '20px', color: '#2c3e50' }}>Follow Us</h4>
              <div style={styles.socialButtons}>
                <a href="#" style={styles.socialButton}>Facebook</a>
                <a href="#" style={styles.socialButton}>Twitter</a>
                <a href="#" style={styles.socialButton}>Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
