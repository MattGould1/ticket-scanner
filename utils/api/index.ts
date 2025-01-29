import api from "../axios";

export type VerifyTicketArgs = {
  id: string;
};
export type VerifyTicketResponse = {
  id: string;
  purchasedDate: string;
  event: {
    id: string;
    name: string;
    date: string;
    venue: string;
  };
  owner: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  seat?: {
    section: string;
    row: string;
    number: string;
  };
  ticketType: string;
  hasBeenUsed: boolean;
};
const verifyTicket = async (
  ticket: VerifyTicketArgs
): Promise<VerifyTicketResponse> => {
  try {
    return {
      id: "ticket-id",
      purchasedDate: "2025-01-01",
      event: {
        id: "event-id",
        name: "Event Name",
        date: "2025-01-01",
        venue: "Event Venue",
      },
      seat: {
        section: "A",
        row: "1",
        number: "1",
      },
      owner: {
        id: "owner-id",
        name: "Owner Name",
        email: "owner@example.com",
      },
      ticketType: "Ticket Type",
      hasBeenUsed: true,
    };
    // const response = await api.post("/verifyTicket", ticket);
    // return response.data;
  } catch (err) {
    // Handle the error
    console.error(err);
    throw err;
  }
};

export { verifyTicket };
