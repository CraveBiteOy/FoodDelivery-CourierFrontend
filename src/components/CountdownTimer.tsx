import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export type CountdownTimerProps = {
    duration: number;
    onComplete?: () => void;
};

const CountdownTimer = ({ duration, onComplete }: CountdownTimerProps ) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleComplete = () => {
    setIsPlaying(false);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <View>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[20, 15, 10, 0]}
        onComplete={handleComplete}
        size={50}
        strokeWidth={5}
      >
        {({ remainingTime }) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer>
    </View>
  );
};

export default CountdownTimer;
