import React from 'react'
import Div from '../Div'

export default function TextWidget({logoSrc, logoAlt, text}) {
  return (
    <Div className="cs-text_widget">
      <img src={logoSrc} alt={logoAlt} style={{ maxHeight: '35px', width: 'auto' }} />
      <p>{text}</p>
    </Div>
  )
}
