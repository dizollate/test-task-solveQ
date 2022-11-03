import React, { useState } from 'react';
import styles from './App.module.css';
import UnixTimeInfo from './components/UnixTimeInfo/UnixTimeInfo';

function App() {
  const [unixTimeValue, setUnixTimeValue] = useState<number>();
  const [unixTimeToConvert, setUnixTimeToConvert] = useState<number>();

  const convertTime = () => {
    setUnixTimeToConvert(unixTimeValue);
  };

  return (
    <div className={styles.wrapper}>
      <h1>How far are you from now?</h1>
      <input
        className={styles.inputUnixTime}
        type='number'
        placeholder='Enter unix timestamp'
        onChange={(e) => setUnixTimeValue(Number(e.target.value))}
      />
      <button
        onClick={convertTime}
        className={styles.button}
        disabled={!unixTimeValue}
      >
        To know!
      </button>

      <UnixTimeInfo unixTime={unixTimeToConvert} />
    </div>
  );
}

export default App;
