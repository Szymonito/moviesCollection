import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./database";
import movieRoutes from "./routes/movieRoutes";
import reviewRoutes from "./routes/reviewRoutes";

(async () => {
    try {
        await connectDB()
        console.log("Connected to DB")
    } catch(e: unknown) {
        if (e instanceof Error) {
            console.error(`Blad polaczenia z mongodb: ${e}`);
        } else {
            console.log(`Nie moge okreslic bledu polaczenia: ${e}`)
        }
        process.exit(1)
    }
})()

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.use("/movies", movieRoutes);
app.use("/revies", reviewRoutes);

app.get("/", (req, res) => {
    res.json({message: "API Express + TypeScript dziala"});
});

export default app;