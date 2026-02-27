import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { AddEditResponseModal } from './AddEditResponseModal';
import { ResponseListItem } from './ResponseListItem';

interface Props {
  visible: boolean;
  responses: string[];
  onClose: () => void;
  onAdd: (text: string) => void;
  onEdit: (index: number, text: string) => void;
  onDelete: (index: number) => void;
}

type EditState = { visible: boolean; index: number; text: string };

const INITIAL_EDIT: EditState = { visible: false, index: -1, text: '' };

export function ResponseListModal({
  visible,
  responses,
  onClose,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const [editState, setEditState] = useState<EditState>(INITIAL_EDIT);

  function openAdd() {
    setEditState({ visible: true, index: -1, text: '' });
  }

  function openEdit(index: number) {
    setEditState({ visible: true, index, text: responses[index] });
  }

  function handleSave(text: string) {
    if (editState.index === -1) {
      onAdd(text);
    } else {
      onEdit(editState.index, text);
    }
    setEditState(INITIAL_EDIT);
  }

  function handleCancelEdit() {
    setEditState(INITIAL_EDIT);
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.handle} />
          <View style={styles.headerRow}>
            <Text style={styles.title}>Responses</Text>
            <TouchableOpacity onPress={onClose} style={styles.doneBtn}>
              <Text style={styles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* List */}
        <FlatList
          data={responses}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item, index }) => (
            <ResponseListItem
              text={item}
              index={index}
              isOnly={responses.length === 1}
              onEdit={openEdit}
              onDelete={onDelete}
            />
          )}
          contentContainerStyle={styles.listContent}
        />

        {/* Add button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
            <Text style={styles.addBtnText}>+ Add Response</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Nested edit/add modal */}
      <AddEditResponseModal
        visible={editState.visible}
        initialText={editState.text}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.modalBackground,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.separator,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.modalHandle,
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  doneBtn: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  doneBtnText: {
    color: COLORS.buttonAdd,
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    flexGrow: 1,
  },
  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.separator,
  },
  addBtn: {
    backgroundColor: COLORS.buttonAdd,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
