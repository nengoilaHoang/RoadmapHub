import React, { useState } from 'react';
import './TermsService.css';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `Welcome to our website. By accessing or using our services, you agree to be bound by these Terms of Service
    and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or
    accessing this site. These terms may be updated occasionally without prior notice, and you should review them regularly.`
  },
  {
    title: '2. Use License',
    content: `Permission is granted to temporarily download one copy of the materials (information or software) on the website
    for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
    this license you may not modify or copy the materials, use them for any commercial purpose, or remove any copyright or
    proprietary notices. Any unauthorized use may result in termination of your access and legal action.`
  },
  {
    title: '3. User Conduct',
    content: `Users agree not to engage in any activity that disrupts or interferes with the website's operation or security, including
    but not limited to attempting unauthorized access, transmitting viruses or malware, or infringing intellectual property rights.
    You are responsible for maintaining the confidentiality of your account credentials and activities under your account.`
  },
  {
    title: '4. Disclaimers and Limitation of Liability',
    content: `All materials and information are provided “as is” without warranties of any kind, express or implied. The website
    does not guarantee the accuracy, completeness, or usefulness of the content. In no event shall the website or its owners
    be liable for any damages arising out of the use or inability to use the website or services, including but not limited to
    damages for loss of data or profit, or business interruption.`
  },
  {
    title: '5. Governing Law',
    content: `These terms and conditions are governed by and construed in accordance with the laws of the country in which the website
    operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`
  },
  {
    title: '6. Changes to Terms',
    content: `We reserve the right to revise these terms at any time. Updated terms will be posted on this page and will become effective
     immediately upon posting. Your continued use of the website after changes indicates acceptance of the revised terms.`
  },
  {
    title: '7. Contact Information',
    content: `If you have any questions or concerns about these Terms of Service, please contact us at support@example.com.`
  }
];

function TermsOfService() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleSection = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="tos-wrapper">
      <h1>Terms of Service</h1>
      <div className="tos-section-list">
        {sections.map(({ title, content }, index) => (
          <div
            key={index}
            className={`tos-section ${expandedIndex === index ? 'expanded' : ''}`}
          >
            <button className="tos-title" onClick={() => toggleSection(index)}>
              {title}
              <span className="tos-arrow">{expandedIndex === index ? '▲' : '▼'}</span>
            </button>
            {expandedIndex === index && <p className="tos-content">{content}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TermsOfService;
