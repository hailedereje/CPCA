import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useTrackTimeMutation } from "@/api";

const useTrackTime = ({ courseId, chapterId, contentId, type, onComplete }) => {
  const contentRef = useRef(null);
  const [trackTime] = useTrackTimeMutation();
  const [startTime, setStartTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          onComplete();
        }
      }
    };

    const interval = setInterval(() => {
      const now = Date.now();
      setTimeSpent(prevTime => prevTime + (now - startTime));
      setStartTime(now);
    }, 1000);

    contentRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      contentRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [startTime, onComplete]);

  useEffect(() => {
    const handleUnload = async () => {
      const endTime = Date.now();
      const sessionTime = endTime - startTime + timeSpent;
      await trackTime({ courseId, chapterId, contentId, type, sessionTime, lastAccessed: endTime });
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      handleUnload();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [courseId, chapterId, contentId, type, startTime, timeSpent]);

  return contentRef;
};

export default useTrackTime;
