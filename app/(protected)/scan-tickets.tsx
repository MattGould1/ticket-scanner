import { BarcodeScanningResult, CameraView } from "expo-camera";
import { router, useRouter } from "expo-router";
import { ArrowLeft, Settings } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Container from "~/components/layout/Container";
import { Header } from "~/components/layout/Header";
import { ThemedText } from "~/components/ThemedText";
import { ThemedView } from "~/components/ThemedView";
import { Button } from "~/components/ui/button";
import { verifyTicket, VerifyTicketResponse } from "~/utils/api";

export default function ScanTicketScreen() {
  const [scanned, setScanned] = useState(false);
  const [ticketData, setTicketData] = useState<VerifyTicketResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleQRCodeScanned = async (result: BarcodeScanningResult) => {
    setScanned(true);

    try {
      // @TODO get ticket id from a real QR code
      const ticket = await verifyTicket({ id: "ticket-id" });

      if (ticket.hasBeenUsed) {
        setError("This ticket has already been used.");
        return;
      }

      setTicketData(ticket);
    } catch (err) {
      setError("Something went wrong verifying this ticket. Please try again.");
    }
  };

  const resetQRCodeScan = () => {
    setScanned(false);
    setTicketData(null);
    setError(null);
  };

  return (
    <ThemedView>
      <Header
        title="Scan Tickets"
        showBack={true}
        rightComponent={
          <TouchableOpacity onPress={() => console.log("touch")}>
            <Settings size={24} color="white" />
          </TouchableOpacity>
        }
      />

      {ticketData != null && (
        <Container padding={4}>
          <ThemedView>
            <ThemedText>Scanned Type: {scannedData.type}</ThemedText>
            <ThemedText>Scanned Data: {scannedData.data}</ThemedText>
            <Button onPress={resetQRCodeScan}>
              <ThemedText>Tap to scan next ticket</ThemedText>
            </Button>
          </ThemedView>
        </Container>
      )}

      {scanned == false && (
        <Container fullScreen={true} center={true}>
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleQRCodeScanned}
            style={styles.logo}
          ></CameraView>
        </Container>
      )}
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
