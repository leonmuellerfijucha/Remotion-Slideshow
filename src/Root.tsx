import { Composition } from 'remotion';
import { Slideshow } from './Slideshow';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Slideshow"
        component={Slideshow}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
