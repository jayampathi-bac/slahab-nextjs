'use client';
import React from 'react';
import { Icon } from '@iconify/react';
import Div from '../Div';

export default function Team({
  memberImage,
  memberName,
  memberDesignation,
  memberSocial,
}) {
  return (
    <Div className="cs-team cs-style1">
      <Div className="cs-member_thumb">
        <img src={memberImage} alt={memberName} />
        <Div className="cs-member_overlay" />
      </Div>
      <Div className="cs-member_info">
        {/* Name is plain text — no team-details page exists yet */}
        <h2 className="cs-member_name">{memberName}</h2>
        <Div className="cs-member_designation">{memberDesignation}</Div>
      </Div>
      {/* Social icons are display-only (unclickable) until real profile URLs are provided */}
      <Div className="cs-member_social cs-primary_color">
        {memberSocial?.linkedin && (
          <span style={{ cursor: 'default' }}>
            <Icon icon="fa6-brands:linkedin-in" />
          </span>
        )}
        {memberSocial?.twitter && (
          <span style={{ cursor: 'default' }}>
            <Icon icon="fa-brands:twitter" />
          </span>
        )}
        {memberSocial?.youtube && (
          <span style={{ cursor: 'default' }}>
            <Icon icon="fa-brands:youtube" />
          </span>
        )}
        {memberSocial?.facebook && (
          <span style={{ cursor: 'default' }}>
            <Icon icon="fa-brands:facebook-f" />
          </span>
        )}
      </Div>
    </Div>
  );
}
