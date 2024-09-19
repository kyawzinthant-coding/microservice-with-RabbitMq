import amqp, { Channel, Connection } from "amqplib";
import config from "../config/config";
import { User } from "../database";
import { ApiError } from "../utils";

class RabbitMQService {
  private requestQueue = "USER_DETAILS_REQUEST";
  private responseQueue = "USER_DETAILS_RESPONSE";
  private connection!: Connection;
  private channel!: Channel;

  constructor() {
    this.init();
  }

  async init() {
    try {
      this.connection = await amqp.connect(config.MESSAGE_BROKER_URL!);
      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(this.requestQueue);
      await this.channel.assertQueue(this.responseQueue);

      this.listenForRequests();
    } catch (error) {
      console.error("RabbitMQ init error", error);
    }
  }

  private async listenForRequests() {
    this.channel.consume(this.requestQueue, async (msg) => {
      console.log("Received message:", msg?.content.toString());
      if (msg && msg.content) {
        try {
          const { userId } = JSON.parse(msg.content.toString());
          const userDetail = await getUserDetails(userId);

          this.channel.sendToQueue(
            this.responseQueue,
            Buffer.from(JSON.stringify(userDetail)),
            { correlationId: msg.properties.correlationId }
          );

          this.channel.ack(msg);
        } catch (error) {
          console.error("Error processing message", error);
        }
      }
    });
  }
}

const getUserDetails = async (userId: string) => {
  const userDetails = await User.findById(userId).select("-password");
  console.log("userDetails", userDetails);
  if (!userDetails) {
    throw new ApiError(404, "User not found");
  }

  return userDetails;
};

export const rabbitMQService = new RabbitMQService();
