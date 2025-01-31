import { gql } from "@apollo/client";
import client from "~/utils/apollo-client"; // You'll need to create this

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
}: VerifyTicketArgs): Promise<any> => {
  try {
    const { data } = await client.mutate({
      mutation: VERIFY_EVENT_ATTENDEE,
      variables: { eventId, eventAttendeeId },
    });
    return data.verifyEventAttendee;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { VERIFY_EVENT_ATTENDEE, verifyEventAttendee, GET_EVENTS };
