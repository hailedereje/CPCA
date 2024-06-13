import { useEffect } from 'react';

const useScrollBottom = (ref ,onBottomReach) => {
  console.log("useScrollBottom")

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          onBottomReach();
        }
      }
    };

    if (ref.current) {
      const { scrollHeight, clientHeight } = ref.current;
      console.log(ref.current)
      if (scrollHeight <= clientHeight) {
        onBottomReach();
      } else {
        ref.current.addEventListener('scroll', handleScroll);
      }
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref, onBottomReach]);

  return ref;
};

export default useScrollBottom;
