import express, { Request, Response } from "express";
import MovieModel, {Movie} from "../models/Movie"

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    try{
        const movies: Array<Movie> = await MovieModel.find()
        res.json(movies)
    } catch (err) {
        res.status(500).json({error: `Nie udalo sie pobrac filmow: ${err}`})
    }
})

router.post('/', (req: Request, res: Response) => {
    try{
        const {title, desciption, length} = req.body
        const newMovie: Movie | null = new MovieModel({title, desciption, length})
        await newMovie.save()
        res.status(201).json({message:"Movie created"})
    } catch (err) {
        res.status(500).json({error: `Nie dodano filmu`})
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const updatedMovie: Movie | null = await MovieModel.findByIdAndUpdate(id, req.body, {new: true})
        if(!updatedMovie) {
            res.status(404).json({error: `Movie not found: ${id}`})
            return
        }
        res.json({message:"Movie updated"})
    } catch (err) {
        res.status(500).json({error: `Nie zaktualizowano filmu`})
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const deletedMovie = await MovieModel.findByIdAndDelete(id)
        if(!deletedMovie) {
            res.status(404).json({error: `Movie not found: ${id}`})
            return
        }
        res.json({message:"Movie deleted"})
    } catch (err) {
        const error = err instanceof Error ? err : new Error("Nieznany vblad")
        res.status(500).json({error: `Nie udalo sie usunac filmu: ${error.message}`})
    }
})

export default router