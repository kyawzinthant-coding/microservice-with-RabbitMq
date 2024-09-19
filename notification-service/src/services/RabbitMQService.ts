import amqp, { Channel } from "amqplib";
import { FCMService } from "./FCMService";
import { EmailService } from "./EmailService";
import { UserStatusStore } from "../utils";
import config from "../config/config";

class RabbitMQService {
  private channel!: Channel;
  private fcmService = new FCMService();
  private emailService = new EmailService();
  private userStatusStore = new UserStatusStore();

  constructor() {
    this.init();
  }

  async init() {
    const connection = await amqp.connect(config.msgBrokerURL!);
    this.channel = await connection.createChannel();
    await this.consumeNotification();
  }

  async consumeNotification() {
    console.log("Consuming notifications");
    await this.channel.assertQueue(config.queue.notifications);
    this.channel.consume(config.queue.notifications, async (msg) => {
      if (msg) {
        const { type, userId, message, userEmail, userToken, fromName } =
          JSON.parse(msg.content.toString());

        console.log(type, userId, message, userEmail, userToken, fromName);

        if (type === "MESSAGE_RECEIVED") {
          const isUserOnline = this.userStatusStore.isUserOnline(userId);

          if (isUserOnline && userToken) {
            await this.fcmService.sendPushNotification(userToken, message);
          } else if (userEmail) {
            await this.emailService.sendEmail(
              userEmail,
              `New Message from ${fromName}`,
              message
            );
          }
        }

        this.channel.ack(msg);
      }
    });
  }
}

export const rabbitMQService = new RabbitMQService();
