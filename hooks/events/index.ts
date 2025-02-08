import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import { GetEventsQuery, GetEventsQueryVariables } from "@/utils/gql/graphql";
import { GET_EVENTS } from "~/utils/api";
import client from "~/utils/apollo-client";
import { useState } from "react";
import { ApolloError } from "@apollo/client";

/**
 * Get events and store them in async storage, if online always fetch from server
 *
 * if offline fetch from async storage.
 *
 * Allow verification of attendees offline but keep in a store to update the server later.
 */
export const getEvents = async (): Promise<{
  events: GetEventsQuery;
  errors?: ApolloError;
} | null> => {
  const networkState = Network.useNetworkState();

  if (networkState.isInternetReachable) {
    const { error, data } = await client.query<
      GetEventsQuery,
      GetEventsQueryVariables
    >({
      query: GET_EVENTS,
      fetchPolicy: "network-only",
    });
    await AsyncStorage.setItem("events", JSON.stringify(data));
    return {
      events: data,
      errors: error,
    };
  } else {
    const events = await AsyncStorage.getItem("events");

    if (!events) return null;

    return {
      events: JSON.parse(events),
    };
  }
};
