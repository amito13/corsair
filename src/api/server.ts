import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.route";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (_, res) => {
  res.json({
    message: "AI Agent API is running 🚀",
  });
});


app.use("/api/chat", chatRoute);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});