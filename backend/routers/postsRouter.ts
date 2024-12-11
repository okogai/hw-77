import express from "express";
import fileDb from "../fileDb";
import {IPost} from "../types";
import { imagesUpload } from "../multer";

const postsRouter = express.Router();

postsRouter.get("/", async (_req, res) => {
    const posts = await fileDb.getItems();
    res.send(posts);
});

postsRouter.post("/",imagesUpload.single('image'), async (req, res) => {
    const {author, message} = req.body;
    if (!message && message !== '') {
        res.status(400).send({error: "Post must contain a message "})
        return;
    }
    const post: IPost = {
           message: message,
           author: author? author : "Anonymous",
           image: req.file ? `images/${req.file.filename}` : null,
    };
    const postFromDb = await fileDb.addItem(post);
    res.send(postFromDb)
});

export default postsRouter;
