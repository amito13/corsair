import type{ Request, Response } from "express";
import { chatWithAgent } from "../../agent/agent";

export async function chatController(
  req: Request,
  res: Response
) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    const response = await chatWithAgent(message);

    return res.status(200).json({
      success: true,
      response,
    });

  } catch (error) {
    console.error("Chat API Error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}