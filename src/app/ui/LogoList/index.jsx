'use client';
import React from 'react';
import Div from '../Div';

const partnerLogos = [
  { src: '/images/slahab/partners/omc.svg', alt: 'OMC — Organisation Mondiale Coiffure' },
  { src: '/images/slahab/partners/intercoiffure.svg', alt: 'Intercoiffure Mondial — ICD Sri Lanka' },
  { src: '/images/slahab/partners/cinnamon.svg', alt: 'Cinnamon Hotels & Resorts' },
  { src: '/images/slahab/partners/jetwing.svg', alt: 'Jetwing Travels' },
  { src: '/images/slahab/partners/cidesco.svg', alt: 'CIDESCO International' },
];

export default function LogoList() {
  return (
    <Div className="cs-partner_logo_wrap">
      {partnerLogos.map((logo, index) => (
        <div className="cs-partner_logo" key={index}>
          <img src={logo.src} alt={logo.alt} style={{ width: '140px', height: '56px', objectFit: 'contain' }} />
        </div>
      ))}
    </Div>
  );
}
