import { useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';

const SHAKE_THRESHOLD = 1.8;
const WINDOW_SIZE = 5;
const COOLDOWN_MS = 1500;
const UPDATE_INTERVAL_MS = 100;

export function useShakeDetection(onShake: () => void) {
  const samplesRef = useRef<number[]>([]);
  const lastShakeRef = useRef<number>(0);
  const onShakeRef = useRef(onShake);

  // Keep ref current without re-subscribing
  useEffect(() => {
    onShakeRef.current = onShake;
  }, [onShake]);

  useEffect(() => {
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const samples = samplesRef.current;

      samples.push(magnitude);
      if (samples.length > WINDOW_SIZE) samples.shift();

      const peak = Math.max(...samples);
      const now = Date.now();

      if (peak > SHAKE_THRESHOLD && now - lastShakeRef.current > COOLDOWN_MS) {
        lastShakeRef.current = now;
        samplesRef.current = []; // clear window after trigger
        onShakeRef.current();
      }
    });

    return () => subscription.remove();
  }, []); // stable — never re-runs
}
