const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

// Get Nurses ein-ausfuhr
router.get("/", async (req, res) => {
    einausfuhr = await loadEinAusfuhrCollection()
    res.send(await einausfuhr.find({}).toArray())
})
router.get("/:patientName/:pageNumber", async (req, res) => {
    einausfuhr = await loadEinAusfuhrCollection()
    res.send(await einausfuhr.find({patientName:req.params.patientName,pageNumber:parseInt(req.params.pageNumber)}).toArray())
})
// Add Nurses
router.post("/", async (req, res) => {
    const einausfuhr = await loadEinAusfuhrCollection()
    await einausfuhr.insertOne({
        patientName: req.body.patientName,
        datum: req.body.datum,
        uhrzeit: req.body.uhrzeit,
        nurse: req.body.nurse,
        einfuhr: req.body.einfuhr,
        kcal: req.body.kcal,
        flussigkeit: req.body.flussigkeit,
        ausfuhr: req.body.ausfuhr,
        pageNumber: req.body.pageNumber,
        createdAt: new Date()
    })
    res.status(201).send()
})

// Delete Nurses
router.delete("/:id", async (req, res) => {
    const einausfuhr = await loadEinAusfuhrCollection()
    await einausfuhr.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadEinAusfuhrCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("einausfuhr")
}

module.exports = router