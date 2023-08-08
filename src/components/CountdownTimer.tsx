import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import {ThemeType, useTheme} from "../styles/theme"

export type CountdownTimerProps = {
    duration: number;
    onComplete?: () => void;
    timeFormat?: 'seconds' | 'minutes';
};

const CountdownTimer = ({ duration, onComplete, timeFormat = 'seconds' }: CountdownTimerProps ) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleComplete = () => {
    setIsPlaying(false);
    if (onComplete) {
      onComplete();
    }
  };

  const formatTime = (remainingTime: number) => {
    if (timeFormat === 'minutes') {
      if (remainingTime >= 60) {
        return [`${Math.floor(remainingTime / 60)}`, 'mins'];
      } else {
        return [`${remainingTime}`, 'secs'];
      }
    } else {
      return [`${remainingTime}`, 'secs'];
    }
  };

  return (
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[20, 15, 10, 0]}
        onComplete={handleComplete}
        size={50}
        strokeWidth={4}
      >
        {({ remainingTime }) => {
          const [time, label] = formatTime(remainingTime);
          return (
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{time}</Text>
              <Text style={styles.label}>{label}</Text>
            </View>
          );
        }}
      </CountdownCircleTimer>
  );
};

const getStyles = (theme: ThemeType) => StyleSheet.create({
  timeContainer: {
    alignItems: 'center',
  },
  time: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.color,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.color,
  },
});

export default CountdownTimer;
