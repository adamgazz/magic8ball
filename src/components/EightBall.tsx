import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import {
  BALL_SIZE,
  INNER_CIRCLE_SIZE,
  EIGHT_CIRCLE_SIZE,
  COLORS,
  FONT_SIZES,
} from '../constants/theme';
import { ResponseText } from './ResponseText';

interface Props {
  currentResponse: string;
  rippleScale: Animated.Value;
  textOpacity: Animated.Value;
  textScale: Animated.Value;
}

export function EightBall({
  currentResponse,
  rippleScale,
  textOpacity,
  textScale,
}: Props) {
  return (
    <Animated.View
      style={[styles.ball, { transform: [{ scale: rippleScale }] }]}
    >
      {/* Inner blue circle */}
      <View style={styles.innerCircle}>
        <ResponseText
          text={currentResponse}
          opacity={textOpacity}
          scale={textScale}
        />
      </View>

      {/* White "8" medallion — top-left quadrant */}
      <View style={styles.eightCircle}>
        <Text style={styles.eightLabel}>8</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: COLORS.ballOuter,
    alignItems: 'center',
    justifyContent: 'center',
    // Subtle depth shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  innerCircle: {
    width: INNER_CIRCLE_SIZE,
    height: INNER_CIRCLE_SIZE,
    borderRadius: INNER_CIRCLE_SIZE / 2,
    backgroundColor: COLORS.ballInner,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eightCircle: {
    position: 'absolute',
    width: EIGHT_CIRCLE_SIZE,
    height: EIGHT_CIRCLE_SIZE,
    borderRadius: EIGHT_CIRCLE_SIZE / 2,
    backgroundColor: COLORS.eightCircle,
    alignItems: 'center',
    justifyContent: 'center',
    // Top-left quadrant
    top: BALL_SIZE * 0.14,
    left: BALL_SIZE * 0.14,
  },
  eightLabel: {
    color: COLORS.eightText,
    fontSize: FONT_SIZES.eightLabel,
    fontWeight: '900',
  },
});
