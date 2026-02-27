import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export function useEightBallAnimation() {
  const rippleScale = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.8)).current;

  /**
   * Fade text out, then call onComplete so the parent can update the response string
   * before triggerReveal() runs.
   */
  const resetBall = useCallback(
    (onComplete: () => void) => {
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        textScale.setValue(0.8);
        onComplete();
      });
    },
    [textOpacity, textScale],
  );

  /**
   * Pulse the ripple ring, then spring the text in.
   */
  const triggerReveal = useCallback(() => {
    // Ripple pulse
    Animated.sequence([
      Animated.timing(rippleScale, {
        toValue: 1.08,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(rippleScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Text fade + spring (slight delay so ripple leads)
    Animated.sequence([
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(textScale, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [rippleScale, textOpacity, textScale]);

  return { rippleScale, textOpacity, textScale, resetBall, triggerReveal };
}
