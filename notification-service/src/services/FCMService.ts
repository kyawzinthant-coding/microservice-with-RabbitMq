import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export class FCMService {
  async sendPushNotification(token: string, message: string) {
    const payLoad = {
      notification: {
        title: "New Message",
        body: message,
      },
      token: token,
    };

    try {
      await admin.messaging().send(payLoad);
      console.log("Push notification sent: %s");
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  }
}
