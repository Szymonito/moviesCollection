import mongoose, {Document} from 'mongoose';

export interface Movie extends Document {
    title: string;
    description: string;
    length: number;
}

const MovieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    length: {type: String, required: true},
})

export default mongoose.model<Movie>("Movie", MovieSchema);