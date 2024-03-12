import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/info", async (req: Request, res: Response) => {
  try {
    const { city } = req.query; // Extract city from query parameters
    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    const location = `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=9cUvLGu3raDxnwXyajUWeFsymHZxUHIE`;
    const tempResult = await fetch(location);
    const result:any = await tempResult.json();

    const temperature = result.timelines.minutely[0].values.temperature;
    console.log(temperature);
    res.json({ temperature });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
