const express = require("express");
const crypto = require("crypto");
const app = express();
const port = 3000;

const { connect_to_db, ObjectId } = require("./db");

let { clanovi} = require("./data");

const prepopulate_db = async (db) => {
    const c = db.collection("clanovi");
    const clanoviWithoutIds = clanovi.map(member => {
        const { _id, ...rest } = member; // Destructure to exclude the _id field
        return rest;
    });
    console.log(clanoviWithoutIds)
    
    await c.insertMany(clanoviWithoutIds);
}

(async () => {
    app.use(express.static("../client_v2/dist/client_v2/browser"));

    const db = await connect_to_db();
    await db.collection("clanovi").drop();
    await prepopulate_db(db);
    
    app.get("/api/clanovi", async (req, res) => {
        const clanovi_ = await db.collection("clanovi").find({}).toArray();
        console.log(clanovi_[0])
        res.send(clanovi_);
    });
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.post("/api/clanovi", async (req, res) => {
        let clan = req.body;
        // movie["id"] = crypto.randomUUID();
        // movies.push(movie);

        const resp = await db.collection("clanovi").insertOne(clan);
        clan["_id"] = resp.insertedId;

        res.send({ message: "Successfully created", clan });
    });
    
    app.delete("/api/clanovi/:id", async (req, res) => {
        // const id = req.params.id;
        // movies = movies.filter((item) => item.id !== id);

        const _id = new ObjectId(req.params.id);
        await db.collection("clanovi").deleteOne({ _id });

        res.send({ message: "Successfully deleted" });
    });

    app.put('/api/clanovi/:id', async (req, res) => {
        try {
            const id = req.params.id;
            
            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: 'Invalid ID format' });
            }
    
            const _id = new ObjectId(id);
            const updatedUser = req.body;
    
            // Ensure we do not update the _id field
            delete updatedUser._id;
    
            const result = await db.collection('clanovi').updateOne({ _id }, { $set: updatedUser });
    
            if (result.modifiedCount === 1) {
                // Fetch the updated document to send it back
                const user = await db.collection('clanovi').findOne({ _id });
                res.send({ message: 'Successfully updated', user });
            } else {
                res.status(404).send({ message: 'User not found or no changes made' });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).send({ message: 'Internal Server Error', error: error.message });
        }
    });
    app.listen(port, () => {
        console.log(`Server is listening at ${port}`);
    });
})();

