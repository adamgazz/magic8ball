import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = '@magic8ball_responses';

export async function loadResponses(): Promise<string[] | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    return JSON.parse(raw) as string[];
  } catch {
    return null;
  }
}

export async function saveResponses(responses: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
  } catch {
    // silently fail — in-memory state is still correct
  }
}
