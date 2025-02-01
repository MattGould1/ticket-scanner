import { gql } from "@apollo/client";
import client from "~/utils/apollo-client"; // You'll need to create this
import {
  VerifyEventAttendeeMutation,
  VerifyEventAttendeeMutationResult,
  VerifyEventAttendeeMutationVariables,
} from "../gql/graphql";

const GET_EVENTS = gql`
  query getEvents($pagination: PaginationInput) {
    getEvents(pagination: $pagination) {
      events {
        id
        name
        startDate
        endDate
        venue
        description
        image
        teamId
      }
      total
    }
  }
`;

const VERIFY_EVENT_ATTENDEE = gql`
  mutation verifyEventAttendee($eventId: String!, $eventAttendeeId: String!) {
    verifyEventAttendee(eventId: $eventId, eventAttendeeId: $eventAttendeeId) {
      eventAttendee {
        id
        name
        email
        phone
        checkedInAt
        ticketId
      }
      alreadyCheckedIn
    }
  }
`;

export type VerifyTicketArgs = {
  eventId: string;
  eventAttendeeId: string;
};
const verifyEventAttendee = async ({
  eventId,
  eventAttendeeId,
}: VerifyEventAttendeeMutationVariables): Promise<
  VerifyEventAttendeeMutation["verifyEventAttendee"]
> => {
  try {
    const { data } = await client.mutate<
      VerifyEventAttendeeMutation,
      VerifyEventAttendeeMutationVariables
    >({
      mutation: VERIFY_EVENT_ATTENDEE,
      variables: { eventId, eventAttendeeId },
    });

    if (data == null) {
      throw new Error("No data returned from verifyEventAttendee");
    }
    return data.verifyEventAttendee;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { VERIFY_EVENT_ATTENDEE, verifyEventAttendee, GET_EVENTS };
