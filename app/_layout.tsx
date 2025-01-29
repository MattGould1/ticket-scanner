import "../global.css";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "~/lib/useColorScheme";
import { Provider } from "react-redux";
import { store } from "~/store/store";
import { AuthProvider } from "~/contexts/AuthContext";
import { loadAuthState } from "~/utils/authStorage";
import React from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Theme,
  DefaultTheme,
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { NAV_THEME } from "~/lib/constants";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hasMounted = useRef(false);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [initialized, setInitialized] = useState(false);
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  const { colorScheme, isDarkColorScheme, setColorScheme } = useColorScheme();

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }

    setColorScheme("dark");
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);

    hasMounted.current = true;

    const init = async () => {
      try {
        await loadAuthState();
      } finally {
        setInitialized(true);
      }
    };

    init();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, []);

  if (!isColorSchemeLoaded) {
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
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <GestureHandlerRootView>
        <Provider store={store}>
          <AuthProvider>
            <Slot />
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          </AuthProvider>
        </Provider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
