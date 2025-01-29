import { BarcodeScanningResult, CameraView } from "expo-camera";
import { router, useRouter } from "expo-router";
import {
  AlertTriangle,
  ArrowLeft,
  Settings,
  Terminal,
} from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Container from "~/components/layout/Container";
import { Header } from "~/components/layout/Header";
import { ThemedText } from "~/components/ThemedText";
import { ThemedView } from "~/components/ThemedView";
import { AlertTitle, AlertDescription, Alert } from "~/components/ui/alert";
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
      console.log("hmm", ticket);
      setTicketData(ticket);

      if (ticket.hasBeenUsed) {
        setError("This ticket has already been used.");
      }
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
        showBack={false}
        rightComponent={
          <TouchableOpacity onPress={() => console.log("touch")}>
            <Settings size={24} color="white" />
          </TouchableOpacity>
        }
      />

      {error != null && (
        <ThemedView className="p-4">
          <Alert
            icon={AlertTriangle}
            variant="destructive"
            className="max-w-xl"
          >
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </ThemedView>
      )}

      {ticketData != null && (
        <ThemedView className="p-4">
          <View className="mb-4 space-y-4">
            <View>
              <ThemedText className="text-2xl font-bold">
                {ticketData.event.name}
              </ThemedText>
              <ThemedText className="text-gray-500">
                {ticketData.event.date}
              </ThemedText>
              <ThemedText className="text-gray-500">
                {ticketData.event.venue}
              </ThemedText>
            </View>

            <View>
              <ThemedText className="font-semibold">Ticket Details</ThemedText>
              <ThemedText>Type: {ticketData.ticketType}</ThemedText>
              {ticketData.seat && (
                <ThemedText>
                  Seat: Section {ticketData.seat.section}, Row{" "}
                  {ticketData.seat.row}, Seat {ticketData.seat.number}
                </ThemedText>
              )}
            </View>

            <View>
              <ThemedText className="font-semibold">Ticket Holder</ThemedText>
              <ThemedText>{ticketData.owner.name}</ThemedText>
              <ThemedText>{ticketData.owner.email}</ThemedText>
              {ticketData.owner.phone && (
                <ThemedText>{ticketData.owner.phone}</ThemedText>
              )}
            </View>

            <View>
              <ThemedText className="font-semibold">
                Purchase Information
              </ThemedText>
              <ThemedText>Purchase Date: {ticketData.purchasedDate}</ThemedText>
            </View>
          </View>
          <Button onPress={resetQRCodeScan}>
            <ThemedText>Tap to scan next ticket</ThemedText>
          </Button>
        </ThemedView>
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
