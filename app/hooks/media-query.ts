import { useState, useEffect } from 'react';

const MQ_MAX_WIDTH = '(max-width: 767px)';

export const useMQ = (): {
  isSP: boolean;
  isPC: boolean;
} => {
  const [isSP, setIsSP] = useState<boolean>(false);

  useEffect(() => {
    const resize = () => {
      const mq = window.matchMedia(MQ_MAX_WIDTH).matches;
      setIsSP(mq);
    }
    // 画面サイズが変わる度に判定する
    window.addEventListener('resize', () => {
      resize();
    });
  }, []);

  return {
    isSP,
    isPC: !isSP,
  }
};
