import {IMessage, messagesWithoutId} from "./types";
import {promises as fs} from 'fs';

const fileName = './db.json';
let data : IMessage[] = [];

const fileDb = {
    async init() {
        try{
            const fileContent = await  fs.readFile(fileName)
            data = await JSON.parse(fileContent.toString()) as IMessage[];
        }catch(e){
            console.error(e);
        }
    },
    async getMessages(){
        return data;
    },
    async addMessages(mes: messagesWithoutId){
        const id = crypto.randomUUID();
        const messages = {id, ...mes}
        data.push(messages);
        await this.save()
        return messages;
    },
    async save (){
        return fs.writeFile(fileName, JSON.stringify(data));
    }
}

export default fileDb;