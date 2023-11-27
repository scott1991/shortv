import './Short.css'
import { useEffect, useRef, useState } from 'react';


const Short = ({ title, cover, play_url, handleProgress, playProgress }) => {

  const shortRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = playProgress;
    }
  }, []);

  const onProgress = () => {
    if (videoRef.current){
      console.log(videoRef.current.currentTime);
      handleProgress(videoRef.current.currentTime);
    }
  }


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsPlaying(true); // 當 Short 可見時播放影片
        } else {
          setIsPlaying(false);
        }
      });
    }, { threshold: 0.9 }); // 至少有90%的 Short 可見時

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
          ref={videoRef}
          playsInline webkit-playsinline="true"
          src={play_url} controls autoPlay muted loop
          type="application/x-mpegURL"
          onProgress={onProgress}
        />
      )}

      <p className="short-title">{title}</p>

    </div>
  );
};

export default Short;