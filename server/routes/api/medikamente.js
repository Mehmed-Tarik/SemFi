const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

// Get medikamente
router.get("/", async (req, res) => {
    medikamente = await loadMedikamenteCollection()
    res.send(await medikamente.find({}).toArray())
})
// Get Specific Medikamente
router.get("/:patientName", async (req, res) => {
    medikamente = await loadMedikamenteCollection()
    res.send(await medikamente.find({patientName:req.params.patientName}).toArray())
})
// Add medikamente
router.post("/", async (req, res) => {
    const medikamente = await loadMedikamenteCollection()
    await medikamente.insertOne({
        anfallID: new mongodb.ObjectId(req.body.id),
        patientName: req.body.patientName,
        nurse: req.body.nurse,
        // pageNumber: req.body.pageNumber,
        datum: (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + "/" +  new Date().getFullYear(),
        datumSeconds: Date.now(),
        uhrzeit: new Date().getHours() + ":" + new Date().getMinutes(),
        medikament: req.body.medikament,
        createdAt: new Date()
    })
    res.status(201).send('Medikament is uploaded!')
})

router.put("/", async (req, res) => {
    const medikamente = await loadMedikamenteCollection()
    await medikamente.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                medikament: req.body.medikament,
                }
        }
    )
    res.status(200).send('Medikament Edited!')
})

// Delete medikamente
router.delete("/:id", async (req, res) => {
    const medikamente = await loadMedikamenteCollection()
    await medikamente.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Medikament Deleted!')
})

async function loadMedikamenteCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("medikamente")
}

module.exports = router