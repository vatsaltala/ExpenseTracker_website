import React from "react";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: '100vh',
      width: '99vw',
      marginLeft: '0px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 0',
      overflow: 'hidden'
    },
    contentWrapper: {
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '0',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    header: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3rem',
      padding: '20px 40px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '0',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    },
    title: {
      color: '#ffffff',
      fontSize: '3.5rem',
      fontWeight: '700',
      margin: 0,
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
      letterSpacing: '1px'
    },
    nav: {
      display: 'flex',
      gap: '20px'
    },
    buttonOutline: {
      padding: '12px 30px',
      border: '2px solid rgba(255,255,255,0.8)',
      borderRadius: '15px',
      backgroundColor: 'transparent',
      color: '#ffffff',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      fontSize: '1.1rem',
      '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.1)',
        transform: 'translateY(-2px)'
      }
    },
    buttonPrimary: {
      padding: '12px 30px',
      border: 'none',
      borderRadius: '15px',
      backgroundColor: '#ffffff',
      color: '#764ba2',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      fontSize: '1.1rem',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 20px rgba(255,255,255,0.2)'
      }
    },
    card: {
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      marginBottom: '40px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)'
      }
    },
    cardHeader: {
      width: '100%',
      padding: '30px',
      background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 100%)'
    },
    headerPrimary: {
      background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      color: '#fff'
    },
    headerInfo: {
      background: 'linear-gradient(45deg, #2196F3 0%, #00BCD4 100%)',
      color: '#fff'
    },
    headerSuccess: {
      background: 'linear-gradient(45deg, #4CAF50 0%, #8BC34A 100%)',
      color: '#fff'
    },
    cardTitle: {
      margin: 0,
      fontSize: '2rem',
      fontWeight: '600',
      letterSpacing: '0.5px'
    },
    cardBody: {
      padding: '30px'
    },
    lead: {
      fontSize: '1.2rem',
      lineHeight: '1.8',
      color: '#4a5568',
      marginBottom: '20px',
      '& strong': {
        color: '#764ba2'
      }
    },
    featureList: {
      width: '100%',
      listStyle: 'none',
      padding: 0,
      margin: '20px 0'
    },
    featureItem: {
      width: '100%',
      padding: '20px',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      fontSize: '1.1rem',
      color: '#4a5568',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      '&:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        transform: 'translateX(10px)',
        color: '#764ba2'
      }
    },
    grid: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      padding: '20px 0'
    },
    roleSection: {
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '30px',
      borderRadius: '15px',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(102, 126, 234, 0.2)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        borderColor: '#764ba2'
      }
    },
    roleTitle: {
      fontSize: '1.4rem',
      color: '#2d3748',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      borderBottom: '2px solid rgba(102, 126, 234, 0.2)',
      paddingBottom: '15px'
    },
    roleList: {
      width: '100%',
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    roleItem: {
      width: '100%',
      padding: '15px 0',
      color: '#4a5568',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      '&:hover': {
        color: '#764ba2',
        transform: 'translateX(10px)'
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>About Expense Tracker</h1>
        <nav style={styles.nav}>
          <button onClick={() => navigate(-1)} style={styles.buttonOutline}>Home</button>
          <Link to="/contactus" style={styles.buttonPrimary}>Contact Us</Link>
        </nav>
      </div>
      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          <div style={{...styles.cardHeader, ...styles.headerPrimary}}>
            <h3 style={styles.cardTitle}>About Expense Tracker</h3>
            </div>
          <div style={styles.cardBody}>
            <p style={styles.lead}>
                <strong>Expense Tracker</strong> is an intuitive platform that empowers users to effortlessly manage income, expenses, and budgets in one place.
                
              </p>
            <p style={styles.lead}>
            The system promotes financial awareness through smart categorization, insightful analytics, and a user-friendly interface designed for all.
            </p>
            <h5 style={styles.roleTitle}>Key Features:</h5>
            <ul style={styles.featureList}>
              {[   "Track Income & Expenses",
                   "Category-Based Budgeting",
                   "Monthly Reports & Charts",
                   "Multi-User Access with Roles",
                   "Data Export to CSV or PDF"].map((feature, index) => (
                <li key={index} style={styles.featureItem}>🔹 {feature}</li>
              ))}
              </ul>
            </div>
          </div>

        <div style={styles.card}>
          <div style={{...styles.cardHeader, ...styles.headerInfo}}>
            <h3 style={styles.cardTitle}>User Roles & Responsibilities</h3>
            </div>
          <div style={styles.cardBody}>
            <div style={styles.grid}>
              {[
                { title: '👤 Admin', items: ['Manage user roles & permissions', 'Resolve disputes', 'Monitor platform'] },
                { title: '👥 Regular User', items: ['add income & expenses', 'track expenses', 'set budget'] },
           
              ].map((role, index) => (
                <div key={index} style={styles.roleSection}>
                  <h5 style={styles.roleTitle}>{role.title}</h5>
                  <ul style={styles.roleList}>
                    {role.items.map((item, i) => (
                      <li key={i} style={styles.roleItem}>✔ {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default About;
