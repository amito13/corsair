import axios from "axios";

const API_URL = "http://localhost:3000/api";

export async function sendMessage(message: string) {
  const response = await axios.post(
    `${API_URL}/chat`,
    {
      message,
    }
  );

  return response.data;
}