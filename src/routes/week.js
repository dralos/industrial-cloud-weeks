const express = require("express");
const connectToDb = require("../db/database");
const { max_profit } = require("../logic/business-logic");

const router = express.Router();

router.get("/", async (req, res) => {
    let db = await connectToDb()
    let collection = db.collection("weeks");
    let results = await collection.find({})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});


router.post('/calculate', async (req, res) => {

    const data = req.body.data;

    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: 'Invalid data. Please provide a non-empty array of numbers.' });
    }

    try {
        const maxProfit = max_profit(data);
        let db = await connectToDb()
        let collection = await db.collection("weeks");
        let newDocument = { week_data: data , profit: maxProfit} ;
        newDocument.date = new Date();
        let result = await collection.insertOne(newDocument);
        res.send({ id: result.id, maxProfit }).status(204);
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save data to MongoDB' });
    }
});


module.exports = router;