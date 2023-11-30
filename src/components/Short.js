import './Short.css'
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const Short = ({ title, cover, play_url, progressRef, listName }) => {

  const shortRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  const onProgress = () => {
    if (videoRef.current) {
      progressRef.current[listName] = videoRef.current.currentTime;
    }
  }

  useEffect(() => {
    let playTimeout;

    const setupHls = () => {
      const hls = new Hls();
      hls.loadSource(play_url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, playVideo);
    };

    const playVideo = () => {
      if (videoRef.current && isPlaying) {
        // 延遲播放
        playTimeout = setTimeout(() => {
          videoRef.current.play().catch(error => {
            console.warn("error playing", error);
          });
        }, 400);
      }
    };

    if (videoRef.current) {
      if (Hls.isSupported()) {
        setupHls();
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = play_url;
        videoRef.current.addEventListener('loadedmetadata', playVideo);
      }

      videoRef.current.currentTime = progressRef.current[listName]; // 恢復播放進度
    }

    return () => {
      if (playTimeout) {
        clearTimeout(playTimeout);
      }
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', playVideo);
      }
    };
  }, [play_url, isPlaying]);




  useEffect(() => {
    const currentElement = shortRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsPlaying(true); // 當 Short 可見時播放影片
        } else {
          setIsPlaying(false);
        }
      });
    }, { threshold: 0.95 }); // 至少有95%的 Short 可見時

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("error playing", error);
      });
    }
  }, [isPlaying]);


  return (
    <div ref={shortRef} className='short'>
      <img src={cover} alt={title} className="short-cover" />

      {isPlaying && (
        <video
          ref={videoRef}
          className="short-video"
          playsInline webkit-playsinline="true"
          src={play_url} controls muted loop
          onTimeUpdate={onProgress}
          type="application/x-mpegURL"
        />
      )}

      <p className="short-title">{title}</p>
    </div>
  );
};

export default Short;