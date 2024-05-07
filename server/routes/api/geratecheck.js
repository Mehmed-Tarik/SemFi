const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

// Get geratecheck
router.get("/:patientName/:month", async (req, res) => {
    geratecheck = await loadGeratecheckCollection()
    res.send(await geratecheck.find({patientName:req.params.patientName,month:parseInt(req.params.month)}).toArray())
})
// Get report
router.get("/report/:id/:patientName", async (req, res) => {
    geratecheck = await loadGeratecheckCollection()
    res.send(await geratecheck.find({_id: new mongodb.ObjectId(req.params.id),patientName:req.params.patientName}).toArray())
})
// GET DATA FOR OVERVIEW
router.get('/overview/over/:patientName/:von/:bis', async (req,res) => {
    geratecheck = await loadGeratecheckCollection()
    res.send(await geratecheck.find({patientName:req.params.patientName,
                   datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                   $lt: new Date(req.params.bis).getTime()}}).toArray())
})
// Add Nurses
router.post("/", async (req, res) => {
    const geratecheck = await loadGeratecheckCollection()
    await geratecheck.insertOne({
        patientName: req.body.patientName,
        datum: (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + "/" +  new Date().getFullYear(),
        datumSeconds: Date.now(),
        uhrzeit: new Date().getHours() + ":" + new Date().getMinutes(),
        nurse: req.body.nurse,
        month: req.body.month,
        xbuttons: req.body.xbuttons,
        isReport: false,
        reportMessage: '',
        createdAt: new Date()
    })
    res.status(201).send('Data Successfully Uploaded')
})
// Update Pflege
router.put("/", async (req, res) => {
    const geratecheck = await loadGeratecheckCollection()
    await geratecheck.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                datum: req.body.editDate,
                xbuttons: req.body.xbuttons,
                }
        }
    )
    res.status(200).send('Data Successfully Edited')
})

// Update Report
router.put("/:id/:report/:isReport", async (req, res) => {
    let reportBoolValue = (req.params.isReport === "true");
    const geratecheck = await loadGeratecheckCollection()
    await geratecheck.updateOne(
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
    const geratecheck = await loadGeratecheckCollection()
    await geratecheck.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Data Deleted')
})

async function loadGeratecheckCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("geratecheck")
}

module.exports = router