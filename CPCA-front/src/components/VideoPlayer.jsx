import { useEffect, useRef, useState } from "react";

export default function VideoPlayer() {
  const cloudinaryRef = useRef();
  const videoRef = useRef();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: "colbycloud-examples",
    });
  }, []);

  const handlePlay = () => {
    setShowModal(true);
  };

  return (
    <div>
      <video
        data-cld-public-id=""
        ref={videoRef}
        
        controls
        onClick={handlePlay}
        
        // Add these styles
      />
      {showModal && (
        <div className="modal">
          <iframe
            
            src="https://www.youtube.com/embed/c-I5S_zTwAc?si=cHvMhWiLkMoq65VB"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
 );
}
