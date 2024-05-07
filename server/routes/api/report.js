const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

// Get Report
router.get("/", async (req, res) => {
    reports = await loadReportsCollection()
    res.send(await reports.find({}).toArray())
})

// Add Report
router.post("/", async (req, res) => {
    const reports = await loadReportsCollection()
    await reports.insertOne({
        _id: mongodb.ObjectId(req.body.id),
        protokolName: req.body.protokolName,
        patientName: req.body.patientName,
        nurse: req.body.nurse,
        page: req.body.page,
        createdAt: new Date()
    })
    res.status(201).send('Report Successfully Uploaded')
})

// Delete Report
router.delete("/:id", async (req, res) => {
    const reports = await loadReportsCollection()
    await reports.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadReportsCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("reports")
}

module.exports = router