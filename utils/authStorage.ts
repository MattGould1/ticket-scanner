import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../store/store";
import { setCredentials } from "../store/slices/authSlice";

export const loadAuthState = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      store.dispatch(setCredentials({ token, user: "Matthew Gould" }));
    }
  } catch (error) {
    console.error("Error loading auth state:", error);
  }
};
