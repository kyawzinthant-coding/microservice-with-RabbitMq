import { rabbitMQService } from "../services/RabbitMQService";
import { UserStatusStore } from "./userStatusStore";

export const handleMessageReceived = async (
  senderName: string,
  senderEmail: string,
  receiverID: string,
  messageContent: string
) => {
  const receiverIsOnline =
    !UserStatusStore.getInstance().isUserOnline(receiverID);

  if (receiverIsOnline) {
    console.log("sending");
    await rabbitMQService.notifyReceiver(
      receiverID,
      messageContent,
      senderEmail,
      senderName
    );
  }
};
