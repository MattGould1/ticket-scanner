import { BarcodeScanningResult, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import Container from "~/components/layout/Container";
import { ThemedText } from "~/components/ThemedText";
import { ThemedView } from "~/components/ThemedView";
import { Button } from "~/components/ui/button";

export default function LoginScreen() {
  // const router = useRouter();
  // @TODO implement permission checks, if they refuse, allow them to request again
  // const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<BarcodeScanningResult | null>(
    null
  );

  const handleQRCodeScanned = (result: BarcodeScanningResult) => {
    setScanned(true);
    setScannedData(result);
  };

  const resetQRCodeScan = () => {
    setScanned(false);
    setScannedData(null);
  };

  return (
    <ThemedView>
      <Container fullScreen={true} center={true}>
        {scannedData != null && (
          <Container>
            <ThemedView>
              <ThemedText>Scanned Type: {scannedData.type}</ThemedText>
              <ThemedText>Scanned Data: {scannedData.data}</ThemedText>
              <Button onPress={resetQRCodeScan}>Tap to scan again</Button>
            </ThemedView>
          </Container>
        )}
        {scanned == false && (
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleQRCodeScanned}
            style={styles.logo}
          ></CameraView>
        )}
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
    width: "100%",
    height: 400,
  },
});
