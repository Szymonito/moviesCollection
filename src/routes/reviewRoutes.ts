import express, {Request, Response} from "express";
import ReviewModel, {Review} from "../models/Review"

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try{
        const reviews: Array<Review> = await ReviewModel.find()
        res.json(reviews)
    } catch (err) {
        res.status(500).json({message: `Nie udalo sie pobrac recenzji:  ${err}`})
    }
})

router.get('/movie/:movieId', async (req: Request, res: Response) => {
    try {
        const {movieId} = req.params
        const reviews: Array<Review> = await ReviewModel.find({movieId})
        if(!reviews || !reviews.length) {
            res.status(404).json({message:"brak recenzji"})
        }
        res.json(reviews)
    } catch (err) {
        res.status(500).json({error: `Nie udalo sie pobrac recenzji:  ${err}`})
    }
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const {movieId, rating, comments} = req.body
        console.log(req.body)
        const newReview: Review | null = new ReviewModel({movieId, rating, comments})
        await newReview.save()
        res.status(201).json({message:"dodane recenzje"})
    } catch (err) {
        res.status(500).json({error: `Nie dodano recenzji:  ${err}`})
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const updatedReview: Review | null = await ReviewModel.findByIdAndUpdate(id, req.body, {new: true})
        if(!updatedReview) {
            res.status(404).json({message:"brak recenzji"})
            return
        }
        res.json({message:`zaktualizowano recenzje: ${updatedReview}`})
    } catch (err) {
        res.status(500).json({error: `Nie zaktualizowano recenzji:  ${err}`})
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const deletedReview = await ReviewModel.findByIdAndDelete(id)
        if(!deletedReview) {
            res.status(404).json({message:"nie ma takiego filmu/recenzji"})
            return
        }
        res.json({message: `Usuniete polecenie ${deletedReview}`})
    } catch (err) {
        const error = err instanceof Error ? err: new Error("nieznany bvlad")
        res.status(500).json({error: `Nie udalo sie usunac fimllmu: ${error.message}`})
    }
})

export default router