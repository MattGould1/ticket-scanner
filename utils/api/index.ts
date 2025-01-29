import api from "../axios";

export type VerifyTicketArgs = {
  id: string;
};
export type VerifyTicketResponse = {
  id: string;
  purchaseDate: string;
  event: string;
  name: string;
  hasBeenUsed: boolean;
};
const verifyTicket = async (
  ticket: VerifyTicketArgs
): Promise<VerifyTicketResponse> => {
  try {
    const response = await api.post("/verifyTicket", ticket);
    return response.data;
  } catch (err) {
    // Handle the error
    console.error(err);
    throw err;
  }
};

export { verifyTicket };
