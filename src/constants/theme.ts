import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const BALL_SIZE = width * 0.85;
export const INNER_CIRCLE_SIZE = BALL_SIZE * 0.55;
export const EIGHT_CIRCLE_SIZE = BALL_SIZE * 0.25;

export const COLORS = {
  background: '#0D0D0D',
  ballOuter: '#1A1A1A',
  ballInner: '#1B3A6B',
  responseText: '#C9A84C',
  eightCircle: '#FFFFFF',
  eightText: '#1A1A1A',
  modalBackground: '#1C1C1E',
  modalHandle: '#3A3A3C',
  separator: '#2C2C2E',
  buttonEdit: '#3A7BD5',
  buttonDelete: '#D53A3A',
  buttonAdd: '#3A7BD5',
  hintText: '#555555',
  white: '#FFFFFF',
  inputBorder: '#3A3A3C',
  inputText: '#FFFFFF',
  inputPlaceholder: '#666666',
  cancelText: '#8E8E93',
  settingsButton: '#8E8E93',
};

export const FONT_SIZES = {
  response: BALL_SIZE * 0.09,
  hint: 16,
  settingsButton: 22,
  modalTitle: 18,
  listItem: 16,
  eightLabel: EIGHT_CIRCLE_SIZE * 0.45,
};
