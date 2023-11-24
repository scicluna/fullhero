import * as React from 'react';
import '../../../../dist/assets/global.css'
import { FullHeroProps } from '../FullHeroWebPart';

export default function FullHero({title, titleBackground, titleColor, titlePosition, image, height}: FullHeroProps) {

  const sectionStyle = image ? { 
    backgroundImage: `url(${image.fileAbsoluteUrl})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  } : {};

  const titleBackgroundStyle = titleBackground === 'light' ? 'bg-white' : 'bg-black';
  const titleColorStyle = titleColor === 'light' ? 'text-white' : 'text-black';
  const titlePositionStyle = titlePosition === 'left' ? 'bottom-0 left-0' : 'bottom-0 right-8';
  const heightStyle = height === 'short' ? 'h-64' : height === 'medium' ? 'h-80' : 'h-96';

  return (
    <section className={`w-screen -translate-x-32 bg-red-300 ${heightStyle} flex relative`} style={sectionStyle}>
      <h1 className={`p-4 bg-opacity-10 text-5xl rounded-xl absolute w-fit ${titlePositionStyle} ${titleBackgroundStyle} ${titleColorStyle}`}>{title}</h1>
    </section>
  );
}