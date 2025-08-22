import React, { useState } from 'react';
import './PrivacyPolicy.css';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect several types of information in order to provide and improve our services: 
    - Personal information you provide directly such as name, email address, date of birth, and payment details.
    - Information collected automatically such as IP address, browser type, pages visited, and usage data through cookies and tracking technologies.
    - Information from third-party services if you choose to connect with external platforms (e.g., social media login).`
  },
  {
    title: '2. Use of Information',
    content: `The information we collect is used for the following purposes:
    - To provide, operate, and maintain the website and services.
    - To personalize your experience and deliver content tailored to your preferences.
    - To communicate with you regarding account, product updates, support, and promotional offers.
    - To improve our services by analyzing usage patterns and feedback.
    - To comply with legal obligations and prevent fraudulent activities.`
  },
  {
    title: '3. Sharing of Information',
    content: `We do not sell your personal data to third parties. We may share information with:
    - Service providers who assist us in operating the website and performing business functions, under contractual obligation to keep data confidential.
    - Legal authorities when required by law or in response to valid requests.
    - Other users when you voluntarily share information through interactive features.
    We will ensure data protection and limit access only to necessary parties.`
  },
  {
    title: '4. Cookies and Tracking Technologies',
    content: `Our website uses cookies and similar technologies to enhance your browsing experience:
    - Cookies help remember user preferences, login sessions, and provide analytics.
    - You can control cookie preferences through your browser settings.
    - Disabling cookies might affect website functionality or user experience.`
  },
  {
    title: '5. Data Security',
    content: `We implement industry-standard safeguards, including encryption, secure servers, and access control measures to protect your personal information.
    However, no method of transmission over the Internet can be guaranteed to be 100% secure. You acknowledge this risk when using our services.`
  },
  {
    title: '6. Your Rights',
    content: `Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict the use of your personal data.
    You can request to update or delete your information by contacting our support team.
    We also provide options to opt out of marketing communications and tracking.`
  },
  {
    title: '7. Retention of Data',
    content: `We retain your personal data only as long as necessary to provide services, comply with legal requirements, resolve disputes, and enforce agreements.`
  },
  {
    title: '8. Changes to This Privacy Policy',
    content: `We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.
    Your continued use after changes signifies your acceptance of the updated policy.`
  },
  {
    title: '9. Contact Us',
    content: `For questions or concerns regarding privacy, please contact us at privacy@example.com.`
  }
];

function PrivacyPolicy() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleSection = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="privacy-wrapper">
      <h1>Privacy Policy</h1>
      <div className="privacy-section-list">
        {sections.map(({ title, content }, index) => (
          <div
            key={index}
            className={`privacy-section ${expandedIndex === index ? 'expanded' : ''}`}
          >
            <button
              className="privacy-title"
              onClick={() => toggleSection(index)}
            >
              {title}
              <span className="privacy-arrow">{expandedIndex === index ? '▲' : '▼'}</span>
            </button>
            {expandedIndex === index && (
              <p className="privacy-content">{content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrivacyPolicy;
