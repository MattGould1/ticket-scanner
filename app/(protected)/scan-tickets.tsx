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
import { Text } from "~/components/ui/text";
import { AlertTitle, AlertDescription, Alert } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { verifyTicket, VerifyTicketResponse } from "~/utils/api";
import ActionCard from "~/components/cards/ActionCard";

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
    <View>
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
        <View className="p-4">
          <Alert
            icon={AlertTriangle}
            variant="destructive"
            className="max-w-xl"
          >
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </View>
      )}

      {ticketData != null && (
        <View className="p-4">
          <ActionCard
            title={ticketData.owner.name}
            content={
              <View className="p-4">
                <View className="mb-4 space-y-4">
                  <View>
                    <Text className="text-2xl font-bold">
                      {ticketData.event.name}
                    </Text>
                    <Text className="text-gray-500">
                      {ticketData.event.date}
                    </Text>
                    <Text className="text-gray-500">
                      {ticketData.event.venue}
                    </Text>
                  </View>

                  <View>
                    <Text className="font-semibold">Ticket Details</Text>
                    <Text>Type: {ticketData.ticketType}</Text>
                    {ticketData.seat && (
                      <Text>
                        Seat: Section {ticketData.seat.section}, Row{" "}
                        {ticketData.seat.row}, Seat {ticketData.seat.number}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Text className="font-semibold">Ticket Holder</Text>
                    <Text>{ticketData.owner.name}</Text>
                    <Text>{ticketData.owner.email}</Text>
                    {ticketData.owner.phone && (
                      <Text>{ticketData.owner.phone}</Text>
                    )}
                  </View>

                  <View>
                    <Text className="font-semibold">Purchase Information</Text>
                    <Text>Purchase Date: {ticketData.purchasedDate}</Text>
                  </View>
                </View>
              </View>
            }
            action={
              <Button className="w-full" onPress={resetQRCodeScan}>
                <Text className="text-white">Tap to scan next ticket</Text>
              </Button>
            }
          ></ActionCard>
        </View>
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
    </View>
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
