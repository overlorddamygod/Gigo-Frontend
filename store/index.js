import create from 'zustand'
import { AsyncStorage } from 'react-native';

const useUserStore = create((set, get) => ({
  name: "Ram",
  token: "sadasd",
  setUser: async (user) => {
    try {
        set((state) => ({ name: user.name, token: user.token }));
        await AsyncStorage.setItem(
          'user:token',
            user.token
        );
      } catch (error) {
        console.error(error)
        // Error saving data
      }
  },
  removeUser: async () => {
    try {
        set((state) => ({ name: "", token: "" }));
        await AsyncStorage.removeItem('user:token');
    } catch (error) {
        console.error(error)
        // Error saving data
    }
  },
  isLoggedIn: () => {
    return !!get().token;
  }
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
}))

export default useUserStore;