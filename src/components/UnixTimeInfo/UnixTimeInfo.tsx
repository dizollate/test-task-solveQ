import styles from './UnixTimeInfo.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';

interface IUnixTimeInfo {
  unixTime?: number;
}

const UnixTimeInfo = React.memo(({ unixTime }: IUnixTimeInfo) => {
  const [currentTime, setCurrentTime] = useState<number>();
  const [isLiveTime, setIsLiveTime] = useState<boolean>(false);

  const timeInfo = useMemo(() => {
    if (!unixTime) {
      return null;
    }
    if (unixTime > 2147483647) {
      return 'Too big number. Please enter a number less than 2147483647';
    }
    const timeDifference = Math.floor(
      new Date(
        (currentTime || new Date().getTime()) - unixTime * 1000
      ).getTime() / 1000
    );

    const timeAdverb = timeDifference > 0 ? 'ago' : 'in';

    if (Math.abs(timeDifference) > 60) {
      return `${Math.floor(Math.abs(timeDifference) / 60)} minutes and ${
        Math.abs(timeDifference) % 60
      } seconds ${timeAdverb}`;
    } else {
      return `${Math.abs(timeDifference)} seconds ${timeAdverb}`;
    }
  }, [unixTime, currentTime]);

  useEffect(() => {
    setCurrentTime(new Date().getTime());
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    if (!isLiveTime) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isLiveTime]);

  return (
    <div className={styles.wrapper}>
      <Checkbox
        label='Update in real time'
        value={isLiveTime}
        onChange={() => setIsLiveTime(!isLiveTime)}
      />
      <div className={styles.time} style={{ opacity: !!timeInfo ? 1 : 0 }}>
        {!!timeInfo && timeInfo}
      </div>
    </div>
  );
});

export default UnixTimeInfo;
