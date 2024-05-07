const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

router.get("/:patientName/:viewall", async (req, res) => {
    let seeAll = (req.params.viewall === "true")
    bewegung = await loadBewegungCollection()
    if(seeAll) {
        let bewegungAll = bewegung.find({patientName:req.params.patientName})
        res.send(await bewegungAll.toArray())
    } else {
        let bewegungSeven = bewegung.find({patientName:req.params.patientName ,
            createdAt: { $lt: new Date(),    
            $gte: new Date(new Date().setDate(new Date().getDate()-7))}})
            console.log(bewegungSeven);
            res.send(await bewegungSeven.toArray())
    }
    
})
// Get report
router.get("/report/:id/:patientName", async (req, res) => {
    bewegung = await loadBewegungCollection()
    res.send(await bewegung.find({_id: new mongodb.ObjectId(req.params.id),patientName:req.params.patientName}).toArray())
})
// GET DATA FOR OVERVIEW
router.get('/overview/over/:patientName/:von/:bis', async (req,res) => {
    bewegung = await loadBewegungCollection()
    res.send(await bewegung.find({patientName:req.params.patientName,
                   datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                   $lt: new Date(req.params.bis).getTime()}}).toArray())
})
// Add Nurses
router.post("/", async (req, res) => {
    console.log("tuj sam i ovo radi!!!");
    const bewegung = await loadBewegungCollection()
    await bewegung.insertOne({
        patientName: req.body.patientName,
        datum: (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + "/" +  new Date().getFullYear(),
        datumSeconds: Date.now(),
        uhrzeit: new Date().getHours() + ":" + new Date().getMinutes(),
        nurse: req.body.nurse,
        xButtons: req.body.xButtons,
        bemerkungen: req.body.bemerkungen,
        isReport: false,
        reportMessage: '',
        createdAt: new Date()
    })
    res.status(201).send('Data Successfully Uploaded')
})
// Update Pflege
router.put("/", async (req, res) => {
    const bewegung = await loadBewegungCollection()
    await bewegung.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                datum: req.body.editDate,
                xButtons: req.body.xButtons,
                bemerkungen: req.body.bemerkungen,
                }
        }
    )
    res.status(200).send('Data Successfully Edited')
})

// Update Report
router.put("/:id/:report/:isReport", async (req, res) => {
    let reportBoolValue = (req.params.isReport === "true");
    const bewegung = await loadBewegungCollection()
    await bewegung.updateOne(
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
    const bewegung = await loadBewegungCollection()
    await bewegung.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Data Deleted')
})

async function loadBewegungCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("bewegung")
}

module.exports = router