import {IPost, IPostFromDb} from "./types";
import {promises as fs} from 'fs';

const fileName = './Db.json';

let data: IPost[] = [];

const fileDb = {
    init: async function () {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            console.error(e);
        }
    },
    async addItem(incomingPost: IPost) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const post: IPostFromDb = {...incomingPost, id, date};
        data.push(post);
        await this.save();
        return post;
    },
    async getItems() {
        return data;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;