import create from "zustand";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { axiosInstance } from "../utils/axios";

const useUserStore = create((set, get) => ({
  username: "Ram",
  token: "",
  setUser: async (user) => {
    try {
      set((state) => ({ name: user.name, token: user.token }));
      await AsyncStorage.setItem("user:token", user.token);
    } catch (error) {
      console.error(error);
      // Error saving data
    }
  },
  setToken: async (token) => {
    try {
      set((state) => ({ token: token }));
      await AsyncStorage.setItem("user:token", token);

      const { data } = await axiosInstance.get("/users/whoami/");
        console.log("TOKENNNNN", data)
      set((state) => ({
        token,
        id: data.id,
        avatar: data.avatar,
        role: data.role,
        irohaName: data.iroha_name,
        name: data.username,
        email: data.email,
      }));

      console.log("STATEEE", get())
    } catch (error) {
      console.error("SETTOKEN",JSON.stringify(error));
      // Error saving data
    }
  },
  isLoggedIn: () => {
    return !!get().token;
  },
  logout: async () => {
    try {
        set((state) => ({ name: "", token: "" }));
        await AsyncStorage.removeItem("user:token");
      } catch (error) {
        console.error(error);
        // Error saving data
      }
  },
  login: async (loginData) => {
    await axiosInstance.post("/users/token", {
      email: loginData.email,
      password: loginData.password,
    });
  },
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
}));

export default useUserStore;
