'use client';
import React from 'react';
import Link from 'next/link';
import Div from '../Div';

export default function Post({ url, src, alt, date, title }) {
  const disabled = !url || url === '#'

  return (
    <Div className="cs-post cs-style1">
      {disabled ? (
        <span className="cs-post_thumb" style={{ cursor: 'default' }}>
          <img src={src} alt={alt} />
          <Div className="cs-post_overlay" />
        </span>
      ) : (
        <Link href={url} className="cs-post_thumb">
          <img src={src} alt={alt} />
          <Div className="cs-post_overlay" />
        </Link>
      )}
      <Div className="cs-post_info">
        <Div className="cs-posted_by">{date}</Div>
        <h2 className="cs-post_title">
          {disabled ? <span>{title}</span> : <Link href={url}>{title}</Link>}
        </h2>
      </Div>
    </Div>
  );
}
