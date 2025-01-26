import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import Container from "~/components/layout/Container";
import { ThemedView } from "~/components/ThemedView";
import FormCard from "~/components/cards/FormCard";
import { ThemedText } from "~/components/ThemedText";
import { Button } from "../components/ui/button";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const { setColorScheme } = useColorScheme();
  setColorScheme("dark");

  const navigateToQRCodeScan = () => {
    router.push("/qr-scan");
  };

  const cardContent = (
    <View style={styles.container}>
      <Button onPress={navigateToQRCodeScan}>
        <ThemedText>Scan</ThemedText>
      </Button>
    </View>
  );

  return (
    <ThemedView>
      <Container fullScreen={true} center={true}>
        <Image
          source={require("@/assets/images/logo.svg")}
          style={styles.logo}
        ></Image>

        <FormCard
          title="Scan QR Code"
          description="Scan your QR Code"
          children={cardContent}
        ></FormCard>
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
  container: {
    height: 400,
  },
});
