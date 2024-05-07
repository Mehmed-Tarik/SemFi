const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

// Get beschreibung
router.get("/", async (req, res) => {
    beschreibung = await loadBeschreibungCollection()
    res.send(await beschreibung.find({}).toArray())
})
// Get Specific beschreibung
// router.get("/:patientName/:pageNumber", async (req, res) => {
//     beschreibung = await loadBeschreibungCollection()
//     res.send(await beschreibung.find({patientName:req.params.patientName,pageNumber:parseInt(req.params.pageNumber)}).toArray())
// })
// Add beschreibung
router.post("/", async (req, res) => {
    const beschreibung = await loadBeschreibungCollection()
    await beschreibung.insertOne({
        anfallID: new mongodb.ObjectId(req.body.id),
        patientName: req.body.patientName,
        nurse: req.body.nurse,
        datum: (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + "/" +  new Date().getFullYear(),
        datumSeconds: Date.now(),
        uhrzeit: new Date().getHours() + ":" + new Date().getMinutes(),
        beschreibung: req.body.beschreibung,
        createdAt: new Date()
    })
    res.status(201).send('Beschribung is uploaded!')
})

router.put("/", async (req, res) => {
    const beschreibung = await loadBeschreibungCollection()
    await beschreibung.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                beschreibung: req.body.beschreib,
                }
        }
    )
    res.status(200).send('Beschribung Edited!')
})

// Delete beschreibung
router.delete("/:id", async (req, res) => {
    const beschreibung = await loadBeschreibungCollection()
    await beschreibung.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Beschribung Deleted!')
})

async function loadBeschreibungCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("beschreibung")
}

module.exports = router