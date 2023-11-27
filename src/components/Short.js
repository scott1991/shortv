import './Short.css'
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const Short = ({ title, cover, play_url, handleProgress, playProgress }) => {

  const shortRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  const onProgress = () => {
    if (videoRef.current) {
      handleProgress(videoRef.current.currentTime);
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(play_url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          if (isPlaying) {
            videoRef.current.play();
          }
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = play_url;
        videoRef.current.addEventListener('loadedmetadata', function () {
          if (isPlaying) {
            videoRef.current.play();
          }
        });
      }

      videoRef.current.currentTime = playProgress; // 恢復播放進度
    }
  }, [play_url, isPlaying]);



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
        <video
          ref={videoRef}
          className="short-video"
          playsInline webkit-playsinline="true"
          src={play_url} controls autoPlay muted loop
          onTimeUpdate={onProgress}
          type="application/x-mpegURL"
        />
      )}

      <p className="short-title">{title}</p>
    </div>
  );
};

export default Short;