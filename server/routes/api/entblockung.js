const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

router.get("/:patientName/:viewall", async (req, res) => {
    let seeAll = (req.params.viewall === "true")
    entblockung = await loadEntblockungCollection()
    if(seeAll) {
        let entblockungAll = entblockung.find({patientName:req.params.patientName})
        res.send(await entblockungAll.toArray())
    } else {
        let entblockungSeven = entblockung.find({patientName:req.params.patientName ,
            createdAt: { $lt: new Date(),    
            $gte: new Date(new Date().setDate(new Date().getDate()-7))}})
            res.send(await entblockungSeven.toArray())
    }
    
})
// Get report
router.get("/report/:id/:patientName", async (req, res) => {
    entblockung = await loadEntblockungCollection()
    res.send(await entblockung.find({_id: new mongodb.ObjectId(req.params.id),patientName:req.params.patientName}).toArray())
})
// GET DATA FOR OVERVIEW
router.get('/overview/over/:patientName/:von/:bis', async (req,res) => {
    entblockung = await loadEntblockungCollection()
    res.send(await entblockung.find({patientName:req.params.patientName,
                   datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                   $lt: new Date(req.params.bis).getTime()}}).toArray())
})
// Add Nurses
router.post("/", async (req, res) => {
    const entblockung = await loadEntblockungCollection()
    await entblockung.insertOne({
        patientName: req.body.patientName,
        datum: (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + "/" +  new Date().getFullYear(),
        datumSeconds: Date.now(),
        nurse: req.body.nurse,
        von: req.body.von,
        bis: req.body.bis,
        dauer: req.body.dauer,
        spo2_begin: req.body.spo2_begin,
        hf_begin: req.body.hf_begin,
        spo2_ende: req.body.spo2_ende,
        hf_ende: req.body.hf_ende,
        bemerkung: req.body.bemerkung,
        isReport: false,
        reportMessage: '',
        createdAt: new Date()
    })
    res.status(201).send('Data Successfully Uploaded')
})
// Update Pflege
router.put("/", async (req, res) => {
    const entblockung = await loadEntblockungCollection()
    await entblockung.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                datum: req.body.editDate,
                von: req.body.von,
                bis: req.body.bis,
                dauer: req.body.dauer,
                spo2_begin: req.body.spo2_begin,
                hf_begin: req.body.hf_begin,
                spo2_ende: req.body.spo2_ende,
                hf_ende: req.body.hf_ende,
                bemerkung: req.body.bemerkung,
                }
        }
    )
    res.status(200).send('Data Successfully Edited')
})

// Update Report
router.put("/:id/:report/:isReport", async (req, res) => {
    let reportBoolValue = (req.params.isReport === "true");
    const entblockung = await loadEntblockungCollection()
    await entblockung.updateOne(
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
    const entblockung = await loadEntblockungCollection()
    await entblockung.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Data Deleted')
})

async function loadEntblockungCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("entblockung")
}

module.exports = router