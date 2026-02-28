import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { COLORS, FONT_SIZES, INNER_CIRCLE_SIZE } from '../constants/theme';

interface Props {
  text: string;
  opacity: Animated.Value;
  scale: Animated.Value;
}

export function ResponseText({ text, opacity, scale }: Props) {
  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, transform: [{ scale }] },
      ]}
    >
      <Text style={styles.text} numberOfLines={8} minimumFontSize={10} adjustsFontSizeToFit>
        {text}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: INNER_CIRCLE_SIZE * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.responseText,
    fontSize: FONT_SIZES.response,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
