import mongoose, {Document, Schema, Types} from "mongoose"
import {Movie} from "../models/Movie"

export interface Review extends Document {
    moovieId: Types.ObjectId | Movie,
    rating: number,
    comments: string
}

const ReviewSchema = new mongoose.Schema({
    movieId: {type: Schema.Types.ObjectId, ref:"Movie", required: true},
    rating: {type: Number, min:0, max:10, required: true},
    comments: {type: String, required: true},
})

export default mongoose.model<Review>("Review", ReviewSchema)