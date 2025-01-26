import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { ThemedText } from "~/components/ThemedText";
import Container from "~/components/layout/Container";
import { ThemedView } from "~/components/ThemedView";
import FormCard from "~/components/cards/FormCard";
// import { Image } from "react-native-svg";

export default function LoginScreen() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  setColorScheme("dark");

  return (
    <ThemedView>
      <Container fullScreen={true} center={true}>
        <Image
          source={require("@/assets/images/logo.svg")}
          style={styles.logo}
        ></Image>

        <FormCard></FormCard>
      </Container>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
