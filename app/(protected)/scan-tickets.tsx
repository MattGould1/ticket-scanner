import { BarcodeScanningResult, CameraView } from "expo-camera";
import { AlertTriangle, ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
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
import { GET_EVENTS, verifyEventAttendee } from "~/utils/api";
import ActionCard from "~/components/cards/ActionCard";
import { useColorScheme } from "~/lib/useColorScheme";
import { useQuery } from "@apollo/client";
import {
  Event,
  GetEventsQuery,
  GetEventsQueryVariables,
  VerifyEventAttendeeMutation,
} from "~/utils/gql/graphql";

export default function ScanTicketScreen() {
  const [scanned, setScanned] = useState(false);
  const [verifiedEventAttendee, setVerifiedEventAttendeeData] = useState<
    VerifyEventAttendeeMutation["verifyEventAttendee"] | null
  >(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { colorScheme } = useColorScheme();

  const {
    loading,
    error: eventsError,
    data: eventsData,
  } = useQuery<GetEventsQuery, GetEventsQueryVariables>(GET_EVENTS, {
    fetchPolicy: "network-only",
    onError: (error) => {
      console.error("Failed to fetch events:", error);
      setError("Failed to load events data");
    },
  });

  const handleQRCodeScanned = async (result: BarcodeScanningResult) => {
    if (currentEvent == null) {
      setError("Please select an event first.");
      return;
    }

    setScanned(true);

    try {
      // @TODO get ticket id from a real QR code
      const verified = await verifyEventAttendee({
        eventId: currentEvent.id,
        eventAttendeeId: result.data,
      });

      setVerifiedEventAttendeeData(verified);

      if (verified.alreadyCheckedIn) {
        setError("This ticket has already been used.");
      }
    } catch (err) {
      // @todo handle errors better, maybe this is an invalid ticket etc etc
      setError("Invalid ticket.");
    }
  };

  const resetQRCodeScan = () => {
    setScanned(false);
    setVerifiedEventAttendeeData(null);
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

          <Button className="w-full mt-4" onPress={resetQRCodeScan}>
            <Text className="text-white">Tap to scan next ticket</Text>
          </Button>
        </View>
      )}

      {eventsData && currentEvent == null && (
        <View>
          {eventsData?.getEvents.events.map((event) => (
            <Pressable
              key={event.id}
              onPress={() => {
                setCurrentEvent(event);
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

      {verifiedEventAttendee != null && currentEvent != null && (
        <View className="p-4">
          <ActionCard
            title={verifiedEventAttendee.eventAttendee.name}
            content={
              <View className="p-4">
                <View className="mb-4 space-y-4">
                  <View>
                    <Text className="text-2xl font-bold">
                      {currentEvent.name}
                    </Text>
                    <Text>
                      {currentEvent.startDate} - {currentEvent.endDate}
                    </Text>
                    <Text>{currentEvent.venue}</Text>
                  </View>

                  <View>
                    <Text className="font-semibold">Ticket Details</Text>
                    <Text>
                      Type: {verifiedEventAttendee.eventAttendee.ticketId}
                    </Text>

                    <Text>
                      Seat: Section TODO, Row TODO, Seat TODO get the ticket
                      info etc
                    </Text>
                  </View>

                  <View>
                    <Text className="font-semibold">Ticket Holder</Text>
                    <Text>{verifiedEventAttendee.eventAttendee.name}</Text>
                    <Text>{verifiedEventAttendee.eventAttendee.email}</Text>
                    {verifiedEventAttendee.eventAttendee.phone && (
                      <Text>{verifiedEventAttendee.eventAttendee.phone}</Text>
                    )}
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

      {scanned == false && currentEvent != null && (
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
              onPress={() => setCurrentEvent(null)}
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
    height: "100%",
  },
  cameraText: {
    position: "absolute",
    bottom: 0,
  },
});
