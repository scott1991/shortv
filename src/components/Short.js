import './Short.css'
import { useEffect, useRef, useState } from 'react';


const Short = ({ title, cover, play_url }) => {

  const shortRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // if (shortRef.current) {
    //   shortRef.current.ondragstart = () => false;
    // } 

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsPlaying(true); // 當 Short 可見時播放影片
        } else {
          setIsPlaying(false);
        }
      });
    }, { threshold: 0.9 }); // 至少有50%的 Short 可見時觸發

    if (shortRef.current) {
      observer.observe(shortRef.current);
    }

    return () => {
      if (shortRef.current) {
        observer.unobserve(shortRef.current);
      }
    };
  }, []);

  return (
    <div ref={shortRef} className='short'>
      <img src={cover} alt={title} className="short-cover" />
      {isPlaying && (
        <video className="short-video"
          playsInline webkit-playsinline="true"
          src={play_url} controls autoPlay muted loop
          type="application/x-mpegURL"
        />
      )}
      <p className="short-title">{title}</p>
    </div>
  );
};

export default Short;