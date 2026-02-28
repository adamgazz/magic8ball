import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { EightBall } from './src/components/EightBall';
import { ResponseListModal } from './src/components/ResponseListModal';
import { COLORS } from './src/constants/theme';
import { useEightBallAnimation } from './src/hooks/useEightBallAnimation';
import { useResponseList } from './src/hooks/useResponseList';
import { useShakeDetection } from './src/hooks/useShakeDetection';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentResponse, setCurrentResponse] = useState('');
  const [listModalVisible, setListModalVisible] = useState(false);

  const { responses, addResponse, editResponse, deleteResponse, pickRandom, isLoaded } =
    useResponseList();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  const { rippleScale, textOpacity, textScale, resetBall, triggerReveal } =
    useEightBallAnimation();

  const handleShake = useCallback(() => {
    resetBall(() => {
      const response = pickRandom();
      setCurrentResponse(response);
      triggerReveal();
    });
  }, [resetBall, pickRandom, triggerReveal]);

  useShakeDetection(handleShake);

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Settings button */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => setListModalVisible(true)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Ball */}
      <View style={styles.ballContainer}>
        <EightBall
          currentResponse={currentResponse}
          rippleScale={rippleScale}
          textOpacity={textOpacity}
          textScale={textScale}
        />
      </View>

      {/* Hint / debug area */}
      <View style={styles.bottomArea}>
        {!currentResponse && (
          <Text style={styles.hint}>Shake to reveal your answer</Text>
        )}
        <TouchableOpacity style={styles.tapBtn} onPress={handleShake}>
          <Text style={styles.tapText}>Tap to shake</Text>
        </TouchableOpacity>
      </View>

      {/* Response list modal */}
      <ResponseListModal
        visible={listModalVisible}
        responses={responses}
        onClose={() => setListModalVisible(false)}
        onAdd={addResponse}
        onEdit={editResponse}
        onDelete={deleteResponse}
      />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  settingsBtn: {
    padding: 4,
  },
  settingsIcon: {
    color: COLORS.settingsButton,
    fontSize: 22,
  },
  ballContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomArea: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  hint: {
    color: COLORS.hintText,
    fontSize: 16,
    fontStyle: 'italic',
  },
  tapBtn: {
    borderWidth: 1,
    borderColor: COLORS.hintText,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  tapText: {
    color: COLORS.hintText,
    fontSize: 14,
  },
});
