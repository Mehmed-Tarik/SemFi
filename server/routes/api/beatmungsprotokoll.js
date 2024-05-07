const { Router } = require("express")
const mongodb = require("mongodb")


const router = Router()

// Get Nurses
router.get("/", async (req, res) => {
    beatmungsprotokoll = await loadBeatmungsprotokollCollection()
    res.send(await beatmungsprotokoll.find({}).toArray())
})
router.get("/:patientName/:viewall", async (req, res) => {
    let seeAll = (req.params.viewall === "true")
    beatmungsprotokoll = await loadBeatmungsprotokollCollection()
    if(seeAll) {
        let beatmungsprotokollAll = beatmungsprotokoll.find({patientName:req.params.patientName})
        res.send(await beatmungsprotokollAll.toArray())
    } else {
        let beatmungsprotokollSeven = beatmungsprotokoll.find({patientName:req.params.patientName ,
            createdAt: { $lt: new Date(),    
            $gte: new Date(new Date().setDate(new Date().getDate()-7))}})
            res.send(await beatmungsprotokollSeven.toArray())
    }
})
// Get report
router.get("/report/:id/:patientName", async (req, res) => {
    beatmungsprotokoll = await loadBeatmungsprotokollCollection()
    res.send(await beatmungsprotokoll.find({_id: new mongodb.ObjectId(req.params.id),patientName:req.params.patientName}).toArray())
})
// GET DATA FOR OVERVIEW
router.get('/overview/over/:patientName/:von/:bis', async (req,res) => {
    beatmungsprotokoll = await loadBeatmungsprotokollCollection()
    res.send(await beatmungsprotokoll.find({patientName:req.params.patientName,
                   datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                   $lt: new Date(req.params.bis).getTime()}}).toArray())
})
// Add Nurses
router.post("/", async (req, res) => {
    const beatmungsprotokoll = await loadBeatmungsprotokollCollection()
    await beatmungsprotokoll.insertOne({
        patientName: req.body.patientName,
        datum: (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + "/" +  new Date().getFullYear(),
        datumSeconds: Date.now(),
        uhrzeit: new Date().getHours() + ":" + new Date().getMinutes(),
        nurse: req.body.nurse,
        vti: req.body.vti,
        vte: req.body.vte,
        af: req.body.af,
        ie: req.body.ie,
        pinsp: req.body.pinsp,
        pexp: req.body.pexp,
        o2: req.body.o2,
        spo2: req.body.spo2,
        puls: req.body.puls,
        isReport: false,
        reportMessage: '',
        createdAt: new Date()
    })
    res.status(201).send('Data Successfully Uploaded')
})

// Update Beatmung
router.put("/", async (req, res) => {
    const beatmungsprotokoll = await loadBeatmungsprotokollCollection()
    await beatmungsprotokoll.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                datum: req.body.editDate,
                uhrzeit: req.body.uhrzeit,
                vti: req.body.vti,
                vte: req.body.vte,
                af: req.body.af,
                ie: req.body.ie,
                pinsp: req.body.pinsp,
                pexp: req.body.pexp,
                o2: req.body.o2,
                spo2: req.body.spo2,
                puls: req.body.puls,
                }
        }
    )
    res.status(200).send('Data Successfully Edited!')
})

// Update Report
router.put("/:id/:report/:isReport", async (req, res) => {
    let reportBoolValue = (req.params.isReport === "true");
    const beatmungsprotokoll = await loadBeatmungsprotokollCollection()
    await beatmungsprotokoll.updateOne(
        {_id: new mongodb.ObjectId(req.params.id)},
        {   
            $set: {
                isReport: reportBoolValue,
                reportMessage: req.params.report
                }
        }
    )
    res.status(200).send('Report Updated!')
})

// Delete Nurses
router.delete("/:id", async (req, res) => {
    const beatmungsprotokoll = await loadBeatmungsprotokollCollection()
    await beatmungsprotokoll.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Dara Deleted!')
})

async function loadBeatmungsprotokollCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("beatmungsprotokoll")
}

module.exports = router