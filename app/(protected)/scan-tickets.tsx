import { BarcodeScanningResult, CameraView } from "expo-camera";
import { router, useRouter } from "expo-router";
import {
  AlertTriangle,
  ArrowLeft,
  Settings,
  Terminal,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Container from "~/components/layout/Container";
import { Header } from "~/components/layout/Header";
import { Text } from "~/components/ui/text";
import { AlertTitle, AlertDescription, Alert } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  GET_EVENTS,
  verifyEventAttendee,
  verifyTicket,
  VerifyTicketResponse,
} from "~/utils/api";
import ActionCard from "~/components/cards/ActionCard";
import { useColorScheme } from "~/lib/useColorScheme";
import { useQuery } from "@apollo/client";

export default function ScanTicketScreen() {
  const [scanned, setScanned] = useState(false);
  const [ticketData, setTicketData] = useState<VerifyTicketResponse | null>(
    null
  );
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { colorScheme } = useColorScheme();

  const {
    loading,
    error: eventsError,
    data: eventsData,
  } = useQuery(GET_EVENTS, {
    fetchPolicy: "network-only",
    onError: (error) => {
      console.error("Failed to fetch events:", error);
      setError("Failed to load events data");
    },
  });

  const handleQRCodeScanned = async (result: BarcodeScanningResult) => {
    if (currentEventId == null) {
      setError("Please select an event first.");
      return;
    }

    setScanned(true);

    try {
      // @TODO get ticket id from a real QR code
      const ticket = await verifyEventAttendee({
        eventId: currentEventId,
        eventAttendeeId: "679c448e471d4d80ca6a781c",
      });

      console.log("ticket", ticket);

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
      <Header title="Scan Tickets" showBack={false} showMenu={true} />

      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

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

      {eventsData && currentEventId == null && (
        <View>
          {eventsData?.getEvents.events.map((event) => (
            <Pressable
              key={event.id}
              onPress={() => {
                setCurrentEventId(event.id);
              }}
              className="m-4 p-4 bg-blue-500 rounded-lg"
            >
              <Text className="text-white text-center font-semibold">
                {event.name}
              </Text>
              <Text className="text-white text-center">
                {new Date(event.startDate).toLocaleDateString()} -{" "}
                {new Date(event.endDate).toLocaleDateString()}
              </Text>
            </Pressable>
          ))}
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
                    <Text>{ticketData.event.date}</Text>
                    <Text>{ticketData.event.venue}</Text>
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

      {scanned == false && currentEventId != null && (
        <Container fullScreen={true}>
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleQRCodeScanned}
            style={styles.logo}
          ></CameraView>
          <View style={styles.cameraText} className="p-4 bg-default">
            <TouchableOpacity
              className="text-base text-foreground"
              onPress={() => setCurrentEventId(null)}
            >
              <ArrowLeft size={24} />
            </TouchableOpacity>
          </View>
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
    // height: 400,
    height: "100%",
  },
  cameraText: {
    position: "absolute",

    // left: 0,
    // right: 0,
    bottom: 0,
  },
});
