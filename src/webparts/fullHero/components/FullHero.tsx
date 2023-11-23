import * as React from 'react';
import '../../../../dist/assets/global.css'
import { FullHeroProps } from '../FullHeroWebPart';

export default function FullHero({title, image}: FullHeroProps) {

  const sectionStyle = image ? { 
    backgroundImage: `url(${image.fileAbsoluteUrl})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  } : {};

  return (
    <section className="w-full h-64 bg-red-300" style={sectionStyle}>
      <h1>{title}</h1>
    </section>
  );
}