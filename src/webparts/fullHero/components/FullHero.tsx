import * as React from 'react';
import '../../../../dist/assets/global.css'
import { FullHeroProps } from '../FullHeroWebPart';

export default function FullHero({title, titleBackground, titleColor, titlePosition, image, height}: FullHeroProps) {

  const sectionHeight = height === 'short' ? '20vh' : height === 'medium' ? '35vh' : height === 'tall' ? '50vh' : '90vh';

  const sectionStyle = image ? { 
    backgroundImage: `url(${image.fileAbsoluteUrl})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    height: sectionHeight
  } : {};

  const titleBackgroundStyle = titleBackground === 'light' ? 'bg-white' : 'bg-black';
  const titleColorStyle = titleColor === 'light' ? 'text-white' : 'text-black';
  const titlePositionStyle = titlePosition === 'left' ? 'bottom-0 left-0' : 'bottom-0 right-8';
  
  return (
    <section className={`w-full bg-red-300 flex relative`} style={sectionStyle}>
      <h1 className={`p-4 bg-opacity-10 text-5xl rounded-xl absolute w-fit ${titlePositionStyle} ${titleBackgroundStyle} ${titleColorStyle}`}>{title}</h1>
    </section>
  );
}