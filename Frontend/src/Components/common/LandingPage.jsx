
import React from "react";
import { Link, Outlet } from "react-router-dom"; 
import "../../assets/landingPage.css";
import "../../assets/responsive.css";
import "../../assets/style.css";
import about2image from "../../assets/image/about-img2.png";
import sliderImage from "../../assets/image/slider-img.png";

const LandingPage = () => {
  const styles = {
    pageWrapper: {
      width: '99vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%)'
    },
    header: {
      padding: '10px 0',
      background: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      height: '50px'
    },
    logo: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#4834d4',
      textDecoration: 'none',
      padding: '5px 15px',
      display: 'inline-block',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.15)',
      letterSpacing: '1px',
      WebkitTextFillColor: '#4834d4',
      borderBottom: '3px solid #4834d4',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        color: '#686de0',
        borderBottom: '3px solid #686de0'
      }
    },
    navButtons: {
      display: 'flex',
      gap: '20px'
    },
    buttonPrimary: {
      padding: '8px 20px',
      backgroundColor: '#667eea',
      color: '#ffffff',
      borderRadius: '20px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      border: 'none',
      '&:hover': {
        backgroundColor: '#764ba2',
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)'
      }
    },
    buttonOutline: {
      padding: '8px 20px',
      border: '2px solid #667eea',
      color: '#667eea',
      borderRadius: '20px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#667eea',
        color: '#ffffff',
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)'
      }
    },
    heroSection: {
      paddingTop: '100px',
      display: 'flex',
      alignItems: 'center',
      minHeight: '90vh',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    heroContent: {
      flex: 1,
      paddingRight: '50px'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '800',
      color: '#2d3748',
      marginBottom: '20px',
      lineHeight: '1.2'
    },
    heroText: {
      fontSize: '1.2rem',
      color: '#4a5568',
      marginBottom: '30px',
      lineHeight: '1.6'
    },
    heroImage: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    },
    aboutSection: {
      padding: '100px 0',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    aboutContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '50px',
      padding: '0 20px'
    },
    aboutImage: {
      flex: 1,
      '& img': {
        maxWidth: '100%',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }
    },
    aboutContent: {
      flex: 1
    },
    aboutTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '20px'
    },
    aboutText: {
      fontSize: '1.1rem',
      color: '#4a5568',
      lineHeight: '1.8',
      marginBottom: '30px'
    },
    readMoreLink: {
      display: 'inline-block',
      padding: '12px 30px',
      backgroundColor: '#667eea',
      color: '#ffffff',
      borderRadius: '25px',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#764ba2',
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)'
      }
    }
  };
  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <nav style={styles.navbar}>
          <Link to="/" style={styles.logo}>Expense Tracker</Link>
          <div style={styles.navButtons}>
            <Link to="/login" style={styles.buttonOutline}>Login</Link>
            <Link to="/signup" style={styles.buttonPrimary}>Sign Up</Link>
          </div>
        </nav>
      </header>

      <Outlet /> 

      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to Expense Tracker</h1>
          <p style={styles.heroText}>
            {/* Your message here */}
          </p>
          <div style={styles.navButtons}>
            <Link to="/contactus" style={styles.buttonPrimary}>Contact Us</Link>
            <Link to="/about" style={styles.buttonOutline}>Learn More</Link>
          </div>
        </div>
        <div style={styles.heroImage}>
          <img src={sliderImage} alt="Hero" style={styles.image} />
        </div>
      </section>
      <Outlet/>

      <section style={styles.aboutSection}>
        <div style={styles.aboutContainer}>
          <div style={styles.aboutImage}>
            <img src={about2image} alt="About Us" />
          </div>
          <div style={styles.aboutContent}>
            <h2 style={styles.aboutTitle}>About Us</h2>
            <p style={styles.aboutText}>
              Expense Tracker is a versatile platform...
            </p>
            <Link to="/about" style={styles.readMoreLink}>Read More</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
