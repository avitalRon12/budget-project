import React from 'react';
import { Link } from 'react-router-dom';
import './../Styles/AboutUs.css'; 

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us - WiseWallet Pro</h1>
        <p>
          Welcome to WiseWallet Pro, your trusted partner in budget management
          and financial empowerment for businesses of all sizes. At WiseWallet
          Pro, we are committed to providing innovative solutions that help
          companies achieve their financial goals and thrive in today's dynamic
          business landscape.
        </p>
      </header>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify and streamline budget management for small
          and large companies alike. We understand the challenges that businesses
          face when it comes to financial planning, tracking expenses, and making
          informed financial decisions. WiseWallet Pro is here to empower you with
          the tools and insights you need to take control of your finances and drive
          your company's success.
        </p>
      </section>

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          WiseWallet Pro is a team of dedicated professionals with a passion for
          finance and technology. Our diverse group of experts, including financial
          analysts, software engineers, and user experience designers, works tirelessly
          to create a budget management app that is both powerful and user-friendly.
          With years of experience in the financial industry, we know what it takes to
          help businesses thrive.
        </p>
      </section>

      <section className="about-section">
        <h2>Why Choose WiseWallet Pro?</h2>
        <ul>
          <li>
            <h4>Comprehensive Budget Management</h4>
            <p>
              WiseWallet Pro offers a wide range of features to help you create,
              track, and manage budgets with ease. From expense categorization to
              forecasting tools, we've got you covered.
            </p>
          </li>
          <li>
            <h4>Scalable for All Businesses</h4>
            <p>
              Whether you're a small startup or a large corporation, WiseWallet Pro
              can adapt to your needs. Our app is designed to grow with your business.
            </p>
          </li>
          <li>
            <h4>Real-time Insights</h4>
            <p>
              Make data-driven decisions with confidence. WiseWallet Pro provides
              real-time financial insights and reports to help you stay on top of
              your company's financial health.
            </p>
          </li>
          <li>
            <h4>Ease of Use</h4>
            <p>
              We believe that powerful financial tools should be accessible to everyone.
              That's why we've designed WiseWallet Pro to be intuitive and user-friendly,
              even for those without a background in finance.
            </p>
          </li>
          <li>
            <h4>Security First</h4>
            <p>
              Your financial data is sensitive, and we take its security seriously.
              WiseWallet Pro employs robust encryption and security measures to ensure
              your information is safe at all times.
            </p>
          </li>
          <li>
            <h4>Dedicated Support</h4>
            <p>
              Our customer support team is here to assist you every step of the way.
              Have a question or need assistance? We're just a message away.
            </p>
          </li>
        </ul>
      </section>
      <section className="about-section">
        <h2>So are you ready to begin?</h2>
        <h2>
          <Link to="/register" className="about-link">
            Let's begin!
          </Link>
        </h2>
      </section>
    </div>
  )};
export default AboutUs;
