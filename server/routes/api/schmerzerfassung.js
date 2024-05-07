const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

router.get("/:patientName/:viewall", async (req, res) => {
    let seeAll = (req.params.viewall === "true")
    schmerz = await loadSchmerzCollection()
    if(seeAll) {
        let schmerzAll = schmerz.find({patientName:req.params.patientName})
        res.send(await schmerzAll.toArray())
    } else {
        let schmerzSeven = schmerz.find({patientName:req.params.patientName ,
            createdAt: { $lt: new Date(),    
            $gte: new Date(new Date().setDate(new Date().getDate()-7))}})
            res.send(await schmerzSeven.toArray())
    }
    
})
// Get report
router.get("/report/:id/:patientName", async (req, res) => {
    schmerz = await loadSchmerzCollection()
    res.send(await schmerz.find({_id: new mongodb.ObjectId(req.params.id),patientName:req.params.patientName}).toArray())
})
// for overview
router.get('/overview/over/:patientName/:von/:bis', async (req,res) => {
    console.log("sto nece baaa");
    console.log(req.params.patientName);
    console.log(req.params.von);
    console.log(req.params.bis);
    schmerz = await loadSchmerzCollection()
    res.send(await schmerz.find({patientName:req.params.patientName,
                   datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                   $lt: new Date(req.params.bis).getTime()}}).toArray())
})
// Add Schmerzerfassung
router.post("/", async (req, res) => {
    const schmerz = await loadSchmerzCollection()
    await schmerz.insertOne({
        patientName: req.body.patientName,
        datum: (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + "/" +  new Date().getFullYear(),
        uhrzeit: req.body.uhrzeit,
        datumSeconds: Date.now(),
        nurse: req.body.nurse,
        schmerzBtn: req.body.schmerzBtn,
        schmerzBesch: req.body.schmerzBesch,
        schmerzMittel: req.body.schmerzMittel,
        faktoren: req.body.faktoren,
        isReport: false,
        reportMessage: '',
        createdAt: new Date()
    })
    res.status(201).send('Data Successfully Uploaded')
})
// Update Schmerzerfassung
router.put("/", async (req, res) => {
    const schmerz = await loadSchmerzCollection()
    await schmerz.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                datum: req.body.editDate,
                uhrzeit: req.body.uhrzeit,
                schmerzBtn: req.body.schmerzBtn,
                schmerzBesch: req.body.schmerzBesch,
                schmerzMittel: req.body.schmerzMittel,
                faktoren: req.body.faktoren,
                }
        }
    )
    res.status(200).send('Data Successfully Edited')
})

// Update Report
router.put("/:id/:report/:isReport", async (req, res) => {
    let reportBoolValue = (req.params.isReport === "true");
    const schmerz = await loadSchmerzCollection()
    await schmerz.updateOne(
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

// Delete Schmerzerfassung
router.delete("/:id", async (req, res) => {
    const schmerz = await loadSchmerzCollection()
    await schmerz.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Data Deleted')
})

async function loadSchmerzCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("schmerz")
}

module.exports = router