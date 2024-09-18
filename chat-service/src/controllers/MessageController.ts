import { Response } from "express";
import { Message } from "../database";
import { AuthRequest } from "../middleware";
import mongoose from "mongoose";
import { ApiError } from "../utils/apiError";
import { handleMessageReceived } from "../utils";

const send = async (req: AuthRequest, res: Response) => {
  try {
    const { receiverId, message } = req.body;
    const { _id, email, name } = req.user;

    validateReceiver(_id, receiverId);

    const newMessage = await Message.create({
      senderId: _id,
      receiverId,
      message,
    });

    await handleMessageReceived(name, email, receiverId, message);

    return res.json({
      status: 200,
      message: "Message sent successfully!",
      data: newMessage,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

const validateReceiver = (senderId: string, receiverId: string) => {
  if (!receiverId) {
    throw new ApiError(400, "Receiver ID is required");
  }
  if (senderId == receiverId) {
    throw new ApiError(400, "Sender and receiver cannot be the same.");
  }
};

const getConversation = async (req: AuthRequest, res: Response) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    return res.json({
      status: 200,
      message: "Messages retrieved successfully!",
      data: messages,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

export default {
  send,
  getConversation,
};
