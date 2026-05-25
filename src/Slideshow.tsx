import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, Audio } from 'remotion';
import { useEffect, useState } from 'react';

interface SlideData {
  imgSrc: string;
  text: string;
  audioSrc: string;
  startFrame: number;
  endFrame: number;
}

export const Slideshow = () => {
  const { fps } = useVideoConfig();
  
  const slides: SlideData[] = [
    {
      imgSrc: 'assets/img1.jpg',
      text: 'Willkommen',
      audioSrc: 'assets/tts1.mp3',
      startFrame: 0,
      endFrame: 150
    },
    {
      imgSrc: 'assets/img2.jpg',
      text: 'Natur',
      audioSrc: 'assets/tts2.mp3',
      startFrame: 150,
      endFrame: 300
    },
    {
      imgSrc: 'assets/img3.jpg',
      text: 'Abenteuer',
      audioSrc: 'assets/tts3.mp3',
      startFrame: 300,
      endFrame: 450
    },
    {
      imgSrc: 'assets/img4.jpg',
      text: 'Erinnerungen',
      audioSrc: 'assets/tts4.mp3',
      startFrame: 450,
      endFrame: 600
    },
    {
      imgSrc: 'assets/img5.jpg',
      text: 'Ende',
      audioSrc: 'assets/tts5.mp3',
      startFrame: 600,
      endFrame: 750
    }
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {/* Background music - looped */}
      <Audio 
        src={staticFile('assets/track.wav')}
        volume={0.3}
        loop={true}
      />
      
      {slides.map((slide, index) => {
        return (
          <Sequence
            key={index}
            from={slide.startFrame}
            durationInFrames={slide.endFrame - slide.startFrame}
          >
            <Slide
              imgSrc={slide.imgSrc}
              text={slide.text}
              audioSrc={slide.audioSrc}
              startFrame={slide.startFrame}
              endFrame={slide.endFrame}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

interface SlideProps {
  imgSrc: string;
  text: string;
  audioSrc: string;
  startFrame: number;
  endFrame: number;
}

const Slide: React.FC<SlideProps> = ({ imgSrc, text, audioSrc, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Fade in/out
  const opacity = interpolate(
    frame,
    [0, 15, endFrame - startFrame - 15, endFrame - startFrame],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  // Slide in from right
  const translateX = interpolate(
    frame,
    [0, 30],
    [100, 0],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* Background image */}
      <img
        src={staticFile(imgSrc)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity,
          transform: `translateX(${translateX}px)`
        }}
      />
      
      {/* Text overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          right: '10%',
          textAlign: 'center',
          color: 'white',
          fontSize: '4rem',
          fontWeight: 'bold',
          textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          opacity,
          transform: `translateX(${translateX}px)`
        }}
      >
        {text}
      </div>
      
      {/* TTS Audio for this slide */}
      <Audio 
        src={staticFile(audioSrc)}
        startFrom={0}
        endAt={endFrame - startFrame}
      />
    </AbsoluteFill>
  );
};
