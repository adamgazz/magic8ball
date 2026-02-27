import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONT_SIZES } from '../constants/theme';

interface Props {
  text: string;
  index: number;
  isOnly: boolean;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export function ResponseListItem({ text, index, isOnly, onEdit, onDelete }: Props) {
  function handleDelete() {
    if (isOnly) {
      Alert.alert('Cannot Delete', 'You must keep at least one response.');
      return;
    }
    Alert.alert('Delete Response', `Remove "${text}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDelete(index),
      },
    ]);
  }

  return (
    <View style={styles.row}>
      <Text style={styles.text} numberOfLines={2}>
        {text}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => onEdit(index)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}
        >
          <Text style={styles.buttonText}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
        >
          <Text style={styles.buttonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.separator,
  },
  text: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONT_SIZES.listItem,
    marginRight: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: COLORS.buttonEdit,
  },
  deleteButton: {
    backgroundColor: COLORS.buttonDelete,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
