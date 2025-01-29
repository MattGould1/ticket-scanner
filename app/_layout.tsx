import "../global.css";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme as useLibColorScheme } from "~/lib/useColorScheme";

import { Provider } from "react-redux";
import { store } from "~/store/store";
import { AuthProvider } from "~/contexts/AuthContext";
import { loadAuthState } from "~/utils/authStorage";
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [initialized, setInitialized] = useState(false);

  const { setColorScheme, colorScheme } = useLibColorScheme();

  useEffect(() => {
    const init = async () => {
      try {
        await loadAuthState();
      } finally {
        setInitialized(true);
      }
    };

    setColorScheme("dark");

    init();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <AuthProvider>
          <Slot />
          <StatusBar style="auto" />
        </AuthProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
