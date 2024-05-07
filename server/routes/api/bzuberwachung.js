const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

// Get bzuberwachung
router.get("/", async (req, res) => {
    bzuberwachung = await loadBzuberwachungCollection()
    res.send(await bzuberwachung.find({}).toArray())
})
// Get Specific bzuberwachung
router.get("/:patientName/:viewall", async (req, res) => {
    let seeAll = (req.params.viewall === "true")
    bzuberwachung = await loadBzuberwachungCollection()
    if(seeAll) {
        let bzuberwachungAll = bzuberwachung.find({patientName:req.params.patientName})
        res.send(await bzuberwachungAll.toArray())
    } else {
        let bzuberwachungSeven = bzuberwachung.find({patientName:req.params.patientName ,
            createdAt: { $lt: new Date(),    
            $gte: new Date(new Date().setDate(new Date().getDate()-7))}})
            res.send(await bzuberwachungSeven.toArray())
    }
})
// Get report
router.get("/report/:id/:patientName", async (req, res) => {
    bzuberwachung = await loadBzuberwachungCollection()
    res.send(await bzuberwachung.find({_id: new mongodb.ObjectId(req.params.id),patientName:req.params.patientName}).toArray())
})
// GET DATA FOR OVERVIEW
router.get('/overview/over/:patientName/:von/:bis', async (req,res) => {
    console.log("sto nece baaa");
    console.log(req.params.patientName);
    console.log(req.params.von);
    console.log(req.params.bis);
    bzuberwachung = await loadBzuberwachungCollection()
    res.send(await bzuberwachung.find({patientName:req.params.patientName,
                   datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                   $lt: new Date(req.params.bis).getTime()}}).toArray())
})
// Add bzuberwachung
router.post("/", async (req, res) => {
    const bzuberwachung = await loadBzuberwachungCollection()
    await bzuberwachung.insertOne({
        patientName: req.body.patientName,
        nurse: req.body.nurse,
        // datum: new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear(),
        datum: (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + "/" +  new Date().getFullYear(),
        datumSeconds: Date.now(),
        uhrzeit: new Date().getHours() + ":" + new Date().getMinutes(),
        bzMol: req.body.bzMol,
        insulin: req.body.insulin,
        ie: req.body.ie,
        lokal: req.body.lokal,
        bemerkungen: req.body.bemerkungen,
        isReport: false,
        reportMessage: '',
        createdAt: new Date()
        // (new Date().getMonth() + 1 < 9 ? '0' + new Date().getMonth() : new Date().getMonth()) + "/" + (new Date().getDate() < 9 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + new Date().getFullYear()
    })
    res.status(201).send('Data Successfully Uploaded')
})

// Update Bz
router.put("/", async (req, res) => {
    const bzuberwachung = await loadBzuberwachungCollection()
    await bzuberwachung.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                datum: req.body.editDate,
                bzMol: req.body.bzMol,
                insulin: req.body.insulin,
                ie: req.body.ie,
                lokal: req.body.lokal,
                bemerkungen: req.body.bemerkungen,
                }
        }
    )
    res.status(200).send('Data Successfully Edited')
})

// Update Report
router.put("/:id/:report/:isReport", async (req, res) => {
    let reportBoolValue = (req.params.isReport === "true");
    const bzuberwachung = await loadBzuberwachungCollection()
    await bzuberwachung.updateOne(
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

// Delete bzuberwachung
router.delete("/:id", async (req, res) => {
    const bzuberwachung = await loadBzuberwachungCollection()
    await bzuberwachung.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Data Deleted')
})

async function loadBzuberwachungCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("bzuberwachung")
}

module.exports = router