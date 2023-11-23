import * as React from 'react';
import '../../../../dist/assets/global.css'
import { FullHeroProps } from '../FullHeroWebPart';

export default function FullHero({title}: FullHeroProps) {
    return (
      <section className="w-full bg-red-300" >
        <h1>{title}</h1>
      </section>
    );
}