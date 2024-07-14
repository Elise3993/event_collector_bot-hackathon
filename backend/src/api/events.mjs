import cors from "cors";
import express from "express";
import { fetchAllEventData } from "../db/events.mjs";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // 許可するオリジン
  methods: "GET", // 許可するHTTPメソッド
  optionsSuccessStatus: 204, // 一部の古いブラウザ向けのレスポンスステータス
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/v1/all_events", async (req, res) => {
  console.log("GET /api/v1/all_events");

  const events = await fetchAllEventData();
  const organizedEventInfo = events.map((event) => {
    return {
      title: event.title,
      start_date: event.start_date,
      end_date: event.end_date,
      description: event.description,
      place: event.place,
      server_name: event.server_name,
    };
  });

  res.json(organizedEventInfo);
});

export default app;
