import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './FireworkAnimation.css';

const FireworkAnimation = () => {
  useEffect(() => {
    gsap.to(".center",  {
    duration: 2,
    rotation: 360,
    repeat: -1,
    transformOrigin: "50%"
  });

  gsap.to(".dot",  {
    duration: 1,
    opacity: 0,
    yoyo: true,
    repeat: -1,
    transformOrigin: "50%"
  });

  gsap.to(".violet-strips", {
    scale: 1.25,
    duration: 1,
    repeat: -1,
    delay: 0,
    yoyo: true,
    transformOrigin: "50%"
  });

    gsap.to(".orange-strips", {
        scale: 0.8,
        duration: 1,
        repeat: -1,
        delay: 0,
        yoyo: true,
        opacity: 0.7,
        transformOrigin: "50%"
      });
  }, []);

  return (
      <svg id="firework" data-name="firework" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <g className="orange-strips">
              <path className="cls-1" d="M256,151a15,15,0,0,1-15-15V15a15,15,0,0,1,30,0V136A15,15,0,0,1,256,151Z"/>
              <path className="cls-1" d="M256,512a15,15,0,0,1-15-15V376a15,15,0,0,1,30,0V497A15,15,0,0,1,256,512Z"/>
              <path className="cls-1"
                    d="M160.55,181.75,75.68,96.9A15,15,0,1,1,96.89,75.69l84.87,84.85a15,15,0,0,1-21.21,21.21Z"/>
              <path className="cls-4"
                    d="M415.11,436.31l-84.87-84.85a15,15,0,0,1,21.21-21.21l84.87,84.85a15,15,0,1,1-21.21,21.21Z"/>
              <path className="cls-1" d="M136,271H15a15,15,0,0,1,0-30H136a15,15,0,0,1,0,30Z"/>
              <path className="cls-4" d="M497,271H376a15,15,0,0,1,0-30H497a15,15,0,0,1,0,30Z"/>
              <path className="cls-1"
                    d="M75.68,436.31a15,15,0,0,1,0-21.21l84.87-84.85a15,15,0,0,1,21.21,21.21L96.89,436.31A15,15,0,0,1,75.68,436.31Z"/>
              <path className="cls-4"
                    d="M330.24,181.75a15,15,0,0,1,0-21.21l84.87-84.85A15,15,0,1,1,436.32,96.9l-84.87,84.85a15,15,0,0,1-21.21,0Z"/>
              <path className="cls-4" d="M271,497V376a15,15,0,0,0-15-15V512A15,15,0,0,0,271,497Z"/>
              <path className="cls-4" d="M271,136V15A15,15,0,0,0,256,0V151A15,15,0,0,0,271,136Z"/>
          </g>
          <g className="violet-strips">
              <path className="cls-2"
                    d="M197.14,150.37l-22.5-55.63a15,15,0,0,1,27.84-11.25L225,139.12a15,15,0,0,1-27.84,11.25Z"/>
              <path className="cls-3"
                    d="M309.52,428.52,287,372.88a15,15,0,0,1,27.84-11.25l22.5,55.64a15,15,0,0,1-27.84,11.25Z"/>
              <path className="cls-2"
                    d="M179.8,435.49a15,15,0,0,1-7.94-19.66l23.47-55.23a15,15,0,0,1,27.59,11.72l-23.46,55.23A15,15,0,0,1,179.8,435.49Z"/>
              <path className="cls-3"
                    d="M297,159.34a15,15,0,0,1-7.94-19.66l23.46-55.23a15,15,0,0,1,27.6,11.72L316.67,151.4A15,15,0,0,1,297,159.33Z"/>
              <path className="cls-2"
                    d="M139.69,222.92,84.44,199.49a15,15,0,0,1,11.72-27.63l55.25,23.44a15,15,0,0,1-11.72,27.62Z"/>
              <path className="cls-3"
                    d="M415.84,340.14,360.59,316.7a15,15,0,0,1,11.72-27.62l55.25,23.43a15,15,0,0,1-11.72,27.63Z"/>
              <path className="cls-2"
                    d="M75.18,329a15,15,0,0,1,8.29-19.52l55.64-22.47a15,15,0,1,1,11.25,27.81L94.72,337.33A15,15,0,0,1,75.18,329Z"/>
              <path className="cls-3"
                    d="M353.35,216.65a15,15,0,0,1,8.3-19.51l55.63-22.47a15,15,0,1,1,11.25,27.8L372.9,225A15,15,0,0,1,353.35,216.65Z"/>
          </g>

          <circle className="cls-5 dot" cx="345.91" cy="478.52" r="15"/>
          <circle className="cls-6 dot" cx="166.09" cy="33.48" r="15"/>
          <circle className="cls-5 dot" cx="476.92" cy="349.77" r="15"/>
          <circle className="cls-6 dot" cx="35.08" cy="162.23" r="15"/>
          <circle className="cls-5 dot" cx="478.52" cy="166.09" r="15"/>
          <circle className="cls-6 dot" cx="33.48" cy="345.91" r="15"/>

          <circle className="dot cls-5" cx="349.77" cy="35.08" r="15"/>
          <circle className="dot cls-6 dot" cx="162.23" cy="476.92" r="15"/>

          <g className="center">
              <path className="cls-6"
                    d="M256,331a15,15,0,0,1-15-15,45.05,45.05,0,0,0-45-45,15,15,0,0,1,0-30,45.05,45.05,0,0,0,45-45,15,15,0,0,1,30,0,45.05,45.05,0,0,0,45,45,15,15,0,0,1,0,30,45.05,45.05,0,0,0-45,45A15,15,0,0,1,256,331Z"/>
              <path className="cls-5 dot"
                    d="M271,316a45.05,45.05,0,0,1,45-45,15,15,0,0,0,0-30,45.05,45.05,0,0,1-45-45,15,15,0,0,0-15-15V331A15,15,0,0,0,271,316Z"/>
          </g>
      </svg>
  );
}

export default FireworkAnimation;
