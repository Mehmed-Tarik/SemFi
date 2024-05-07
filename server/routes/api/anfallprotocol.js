const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

// Get Anfallprotocol
router.get("/", async (req, res) => {
    anfallprotocol = await loadAnfallprotocolCollection()
    res.send(await anfallprotocol.find({}).toArray())
})
router.get("/:patientName/:viewall", async (req, res) => {
    let seeAll = (req.params.viewall === "true")
    anfallprotocol = await loadAnfallprotocolCollection()
    medikamente = await loadMedikamenteCollection()
    beschreibung = await loadBeschreibungCollection()
    if(seeAll) {
        let anfall = anfallprotocol.aggregate([
            {$match: {patientName:req.params.patientName}},
            {$lookup: {
                from: 'medikamente',
                localField: '_id',
                foreignField: 'anfallID',
                as: 'medikamentes'
    
            }},
            {$lookup: {
                from: 'beschreibung',
                localField: '_id',
                foreignField: 'anfallID',
                as: 'beschreibungs'
            }}
        ])
        res.status(201).send(await anfall.toArray())
    } else {
        let anfall = anfallprotocol.aggregate([
            // {$match: {patientName:req.params.patientName}},
            // {$match: {
            //     createdAt: { $lt: new Date(), $gte: new Date(new Date().setDate(new Date().getDate()-1))}
            // }},
            {$match: {
                $and: [
                    {patientName:req.params.patientName},
                    {createdAt: { $lt: new Date(), $gte: new Date(new Date().setDate(new Date().getDate()-7))}}
                ]
            }},
            {$lookup: {
                from: 'medikamente',
                localField: '_id',
                foreignField: 'anfallID',
                as: 'medikamentes'
    
            }},
            {$lookup: {
                from: 'beschreibung',
                localField: '_id',
                foreignField: 'anfallID',
                as: 'beschreibungs'
            }}
        ])
        res.status(201).send(await anfall.toArray())
    }
    
})
// GET REPORT
router.get("/report/:id/:patientName", async (req, res) => {
    anfallprotocol = await loadAnfallprotocolCollection()
    res.send(await anfallprotocol.find({_id: new mongodb.ObjectId(req.params.id),patientName:req.params.patientName}).toArray())
})
// GET DATA FOR OVERVIEW
router.get('/overview/over/:patientName/:von/:bis', async (req,res) => {
    anfallprotocol = await loadAnfallprotocolCollection()
    medikamente = await loadMedikamenteCollection()
    beschreibung = await loadBeschreibungCollection()

    //  await anfallprotocol.find({patientName:req.params.patientName,
    //                      datumSeconds: { $gt: new Date(req.params.von).getTime(),
    //                                      $lt: new Date(req.params.bis).getTime()}})
    let overviewAnfall = anfallprotocol.aggregate([
            {$match: {
                $and: [
                    {patientName:req.params.patientName},
                    {datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                     $lt: new Date(req.params.bis).getTime()}}
                ]
            }},
            {$lookup: {
                from: 'medikamente',
                localField: '_id',
                foreignField: 'anfallID',
                as: 'medikamentes'
    
            }},
            {$lookup: {
                from: 'beschreibung',
                localField: '_id',
                foreignField: 'anfallID',
                as: 'beschreibungs'
            }}
        ])
        res.status(201).send(await overviewAnfall.toArray())
})
// Add Anfallprotocol
router.post("/", async (req, res) => {
    const anfallprotocol = await loadAnfallprotocolCollection()
    await anfallprotocol.insertOne({
        patientName: req.body.patientName,
        datum: (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + "/" +  new Date().getFullYear(),
        datumSeconds: Date.now(),
        uhrzeit: req.body.uhrzeit,
        XbuttonArray: req.body.XbuttonArray,
        rr: req.body.rr,
        puls: req.body.puls,
        spoz: req.body.spoz,
        nurse: req.body.nurse,
        isReport: false,
        reportMessage: '',
        createdAt: new Date()
    })
    res.status(201).send('Data Successfully Uploaded')
})

// Update Anfallprotocol
router.put("/", async (req, res) => {
    const anfallprotocol = await loadAnfallprotocolCollection()
    await anfallprotocol.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                datum: req.body.editDate,
                uhrzeit: req.body.uhrzeit,
                XbuttonArray: req.body.XbuttonArray,
                rr: req.body.rr,
                puls: req.body.puls,
                spoz: req.body.spoz,
                }
        }
    )
    res.status(200).send('Data Successfully Edited')
})

// Update Report
router.put("/:id/:report/:isReport", async (req, res) => {
    let reportBoolValue = (req.params.isReport === "true");
    const anfallprotocol = await loadAnfallprotocolCollection()
    await anfallprotocol.updateOne(
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

// Delete Anfallprotocol
router.delete("/:id", async (req, res) => {
    const anfallprotocol = await loadAnfallprotocolCollection()
    await anfallprotocol.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Data Deleted!')
})

async function loadAnfallprotocolCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    return client.db("SemiFi").collection("anfallprotocol")
}
async function loadMedikamenteCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    return client.db("SemiFi").collection("medikamente")
}
async function loadBeschreibungCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    return client.db("SemiFi").collection("beschreibung")
}

module.exports = router