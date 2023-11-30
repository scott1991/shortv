import './Short.css'
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import PropTypes from 'prop-types';

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
    const currentVideo = videoRef.current;
    const setupHls = () => {
      const hls = new Hls();
      hls.loadSource(play_url);
      hls.attachMedia(currentVideo);
      hls.on(Hls.Events.MANIFEST_PARSED, playVideo);
    };

    const playVideo = () => {
      if (currentVideo && isPlaying) {
        // 延遲播放
        playTimeout = setTimeout(() => {
          currentVideo.play().catch(error => {
            console.warn("error playing", error);
          });
        }, 400);
      }
    };

    if (currentVideo) {
      if (Hls.isSupported()) {
        setupHls();
      } else if (currentVideo.canPlayType('application/vnd.apple.mpegurl')) {
        currentVideo.src = play_url;
        currentVideo.addEventListener('loadedmetadata', playVideo);
      }

      currentVideo.currentTime = progressRef.current[listName]; // 恢復播放進度
    }

    return () => {
      if (playTimeout) {
        clearTimeout(playTimeout);
      }
      if (currentVideo) {
        currentVideo.removeEventListener('loadedmetadata', playVideo);
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


Short.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  play_url: PropTypes.string.isRequired,
  progressRef:PropTypes.shape({
    following: PropTypes.number,
    forYou: PropTypes.number
  }).isRequired,
  listName: PropTypes.string  
};

export default Short;