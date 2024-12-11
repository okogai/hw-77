import express from "express";
import fileDb from "../fileDb";
import {IPost} from "../types";


const postsRouter = express.Router();

postsRouter.get("/", async (req, res) => {
    const posts = await fileDb.getItems();
    res.send(posts);
});

postsRouter.post("/", async (req, res) => {
    const {author, message, image} = req.body;
    if (!message && message !== '') {
        res.status(400).send({error: "Post must contain a message "})
        return;
    }
    const post: IPost = {
           message: message,
           author: author? author : "Anonymous",
           image: image? image : null,
    };
    const postFromDb = await fileDb.addItem(post);
    res.send(postFromDb)
});

export default postsRouter;
