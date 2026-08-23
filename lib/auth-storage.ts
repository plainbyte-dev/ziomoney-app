import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_LOGGED_IN_KEY = 'ziomoney:has-logged-in-before';

export async function hasLoggedInBefore(): Promise<boolean> {
  const value = await AsyncStorage.getItem(HAS_LOGGED_IN_KEY);
  return value === 'true';
}

export async function markLoggedIn(): Promise<void> {
  await AsyncStorage.setItem(HAS_LOGGED_IN_KEY, 'true');
}
