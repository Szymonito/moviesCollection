import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
console.log(MONGODB_URI);

const connectDB = async (): Promise<void> => {
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("Polaczenie z baza zostalo nawiazane")
    } catch(err: unknown){
        if(err instanceof Error) {
            console.error("Blad polaczenia z baza danych", err)
        } else {
            console.error("Nieznany blad", err)
        }
        process.exit(1);
    }
}

export default connectDB;