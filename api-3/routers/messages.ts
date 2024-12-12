import express from "express";
import fileDb from "../fileDb";
import {messagesWithoutId} from "../types";
import {imagesUpload} from "../multer";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getMessages();
    const reverseMessages = messages.reverse()
    res.send(reverseMessages);
})

messagesRouter.post('/', imagesUpload.single('image') ,async (req, res) => {
    if(!req.body.message){
        res.status(400).send({error:"Invalid message"});
        return
    }

    const messages: messagesWithoutId = {
        author: req.body.author === '' ? 'Anonymous' : req.body.author,
        message: req.body.message,
        image: req.file ?  req.file.filename : null,
    }

    const saveMessages = await fileDb.addMessages(messages);
    res.send(saveMessages);
})

export default messagesRouter;