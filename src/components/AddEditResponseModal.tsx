import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/theme';

const MAX_LENGTH = 60;

interface Props {
  visible: boolean;
  initialText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

export function AddEditResponseModal({ visible, initialText, onSave, onCancel }: Props) {
  const [text, setText] = useState(initialText);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setText(initialText);
      // Small delay so the modal has rendered before focusing
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [visible, initialText]);

  function handleSave() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSave(trimmed);
  }

  const isEditing = initialText !== '';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{isEditing ? 'Edit Response' : 'Add Response'}</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={text}
            onChangeText={setText}
            maxLength={MAX_LENGTH}
            placeholder="Enter response…"
            placeholderTextColor={COLORS.inputPlaceholder}
            returnKeyType="done"
            onSubmitEditing={handleSave}
            autoCorrect={false}
          />
          <Text style={styles.charCount}>
            {text.length}/{MAX_LENGTH}
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveBtn, !text.trim() && styles.saveBtnDisabled]}
              onPress={handleSave}
              disabled={!text.trim()}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.modalBackground,
    borderRadius: 16,
    padding: 24,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2C2C2E',
    color: COLORS.inputText,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  charCount: {
    color: COLORS.cancelText,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 6,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: '#2C2C2E',
    alignItems: 'center',
  },
  cancelText: {
    color: COLORS.cancelText,
    fontSize: 16,
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: COLORS.buttonAdd,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
