const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

router.get("/:patientName/:viewall", async (req, res) => {
    let seeAll = (req.params.viewall === "true")
    console.log(seeAll);
    vitalzeichen = await loadVitalzeichenCollection()
    // res.send(await vitalzeichen.find({patientName:req.params.patientName ,
    //                         createdAt: { $lt: new Date(),    
    //                         $gte: new Date(new Date().setDate(new Date().getDate()-7))}}).toArray())
    if(seeAll) {
        let vitalzeichenAll = vitalzeichen.find({patientName:req.params.patientName})
        res.send(await vitalzeichenAll.toArray())
    } else {
        let vitalzeichenSeven = vitalzeichen.find({patientName:req.params.patientName ,
            createdAt: { $lt: new Date(),    
            $gte: new Date(new Date().setDate(new Date().getDate()-7))}})
            res.send(await vitalzeichenSeven.toArray())
    }
})
// Get report
router.get("/report/:id/:patientName", async (req, res) => {
    vitalzeichen = await loadVitalzeichenCollection()
    res.send(await vitalzeichen.find({_id: new mongodb.ObjectId(req.params.id),patientName:req.params.patientName}).toArray())
})
// GET DATA FOR OVERVIEW
router.get('/overview/over/:patientName/:von/:bis', async (req,res) => {

    vitalzeichen = await loadVitalzeichenCollection()
    res.send(await vitalzeichen.find({patientName:req.params.patientName,
                   datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                   $lt: new Date(req.params.bis).getTime()}}).toArray())
})
// Add Nurses
router.post("/", async (req, res) => {
    const vitalzeichen = await loadVitalzeichenCollection()
    await vitalzeichen.insertOne({
        patientName: req.body.patientName,
        datum: (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + "/" +  new Date().getFullYear(),
        uhrzeit: new Date().getHours() + ":" + new Date().getMinutes(),
        datumSeconds: Date.now(),
        nurse: req.body.nurse,
        rr: req.body.rr,
        rektal: req.body.rektal,
        leiste: req.body.leiste,
        af: req.body.af,
        hf: req.body.hf,
        spo2: req.body.spo2,
        gabe: req.body.gabe,
        inhalation: req.body.inhalation,
        atmung: req.body.atmung,
        spontan: req.body.spontan,
        abgelesen: req.body.abgelesen,
        justiert: req.body.justiert,
        entblockt: req.body.entblockt,
        et: req.body.et,
        no: req.body.no,
        sg: req.body.sg,
        sekret: req.body.sekret,
        wechseln: req.body.wechseln,
        isReport: false,
        reportMessage: '',
        createdAt: new Date()
    })
    res.status(201).send('Data Successfully Uploaded')
})
// Update Pflege
router.put("/", async (req, res) => {
    const vitalzeichen = await loadVitalzeichenCollection()
    await vitalzeichen.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                datum: req.body.editDate,
                rr: req.body.rr,
                rektal: req.body.rektal,
                leiste: req.body.leiste,
                af: req.body.af,
                hf: req.body.hf,
                spo2: req.body.spo2,
                gabe: req.body.gabe,
                inhalation: req.body.inhalation,
                atmung: req.body.atmung,
                spontan: req.body.spontan,
                abgelesen: req.body.abgelesen,
                justiert: req.body.justiert,
                entblockt: req.body.entblockt,
                et: req.body.et,
                no: req.body.no,
                sg: req.body.sg,
                sekret: req.body.sekret,
                wechseln: req.body.wechseln,
                }
        }
    )
    res.status(200).send('Data Successfully Edited')
})
// Update Report
router.put("/:id/:report/:isReport", async (req, res) => {
    let reportBoolValue = (req.params.isReport === "true");
    const vitalzeichen = await loadVitalzeichenCollection()
    await vitalzeichen.updateOne(
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
    const vitalzeichen = await loadVitalzeichenCollection()
    await vitalzeichen.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Data Deleted')
})

async function loadVitalzeichenCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("vitalzeichen")
}

module.exports = router