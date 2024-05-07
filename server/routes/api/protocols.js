const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

// Get Protocols
router.get("/", async (req, res) => {
    protocols = await loadProtocolsCollection()
    res.send(await protocols.find({}).toArray())
})

// Add Protocols
router.post("/", async (req, res) => {
    const protocols = await loadProtocolsCollection()
    await protocols.insertOne({
        name: req.body.name,
        createdAt: new Date()
    })
    res.status(201).send()
})

// Delete Protocols
router.delete("/:id", async (req, res) => {
    const protocols = await loadProtocolsCollection()
    await protocols.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadProtocolsCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("protocols")
}

module.exports = router