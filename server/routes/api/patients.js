const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

// Get Patients
router.get("/", async (req, res) => {
    patients = await loadPatientsCollection()
    res.send(await patients.find({}).toArray())
})

router.get("/patient/:patientName", async (req, res) => {
    patients = await loadPatientsCollection()
    res.send(await patients.find({name:req.params.patientName}).toArray())
})

router.get("/:username/:chosenProtokol", async (req, res) => {
    console.log(req.params.username);
    console.log(req.params.chosenProtokol);
    patients = await loadPatientsCollection()
    res.send(await patients.find({nurses:req.params.username,protokols:req.params.chosenProtokol}).toArray())
})

// Add Patients
router.post("/", async (req, res) => {
    const patients = await loadPatientsCollection()
    await patients.insertOne({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        nurses: req.body.chosenNurses,
        protokols: req.body.chosenProtokols,
        schmerzMedikation: req.body.schmerzMedikation,
        schmerzPumpe: req.body.schmerzPumpe,
        sonstigMethode: req.body.sonstigMethode,
        sonstigMet: req.body.sonstigMet,
        beatmungsmodus: req.body.beatmungsmodus,
        beatmungsgerat: req.body.beatmungsgerat,
        ogabe: req.body.ogabe,
        trachealkanule: req.body.trachealkanule,
        ipap: req.body.ipap,
        epap: req.body.epap,
        rampe: req.body.rampe,
        af: req.body.af,
        ie: req.body.ie,
        trigger: req.body.trigger,
        vt: req.body.vt,
        pmax: req.body.pmax,
        flow: req.body.flow,
        tinsp: req.body.tinsp,
        fio: req.body.fio,
        insulinpflichtig: req.body.insulinpflichtig,
        dosierung: req.body.dosierung,
        oral: req.body.oral,
        insulinArt: req.body.insulinArt,
        kostform: req.body.kostform,
        inspirationEninstellung: req.body.inspirationEninstellung,
        inspirationAnderung: req.body.inspirationAnderung,
        tiEninstellung: req.body.tiEninstellung, 
        tiAnderung: req.body.tiAnderung, 
        pauseEninstellung: req.body.pauseEninstellung,
        pauseAnderung: req.body.pauseAnderung, 
        widerholenEninstellung: req.body.widerholenEninstellung, 
        widerholenAnderung: req.body.widerholenAnderung, 
        triggerEninstellung: req.body.triggerEninstellung, 
        triggerAnderung: req.body.triggerAnderung,
        expirationEninstellung: req.body.expirationEninstellung, 
        expirationAnderung: req.body.expirationAnderung, 
        teEninstellung: req.body.teEninstellung, 
        teAnderung: req.body.teAnderung, 
        zyklEninstellung: req.body.zyklEninstellung, 
        zyklAnderung: req.body.zyklAnderung,
        createdAt: new Date()
    })
    res.status(201).send()
})

router.put("/", async (req, res) => {
    const patients = await loadPatientsCollection()
    await patients.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                name: req.body.name,
                dateOfBirth: req.body.dateOfBirth,
                nurses: req.body.chosenNurses,
                protokols: req.body.chosenProtokols,
                schmerzMedikation: req.body.schmerzMedikation,
                schmerzPumpe: req.body.schmerzPumpe,
                sonstigMethode: req.body.sonstigMethode,
                sonstigMet: req.body.sonstigMet,
                beatmungsmodus: req.body.beatmungsmodus,
                beatmungsgerat: req.body.beatmungsgerat,
                ogabe: req.body.ogabe,
                trachealkanule: req.body.trachealkanule,
                ipap: req.body.ipap,
                epap: req.body.epap,
                rampe: req.body.rampe,
                af: req.body.af,
                ie: req.body.ie,
                trigger: req.body.trigger,
                vt: req.body.vt,
                pmax: req.body.pmax,
                flow: req.body.flow,
                tinsp: req.body.tinsp,
                fio: req.body.fio,
                insulinpflichtig: req.body.insulinpflichtig,
                dosierung: req.body.dosierung,
                oral: req.body.oral,
                insulinArt: req.body.insulinArt,
                kostform: req.body.kostform,
                }
        }
    )
    res.status(200).send('Data Successfully Edited')
})

// Delete Patients
router.delete("/:id", async (req, res) => {
    const patients = await loadPatientsCollection()
    await patients.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send('Data Deleted')
})

async function loadPatientsCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("patients")
}

module.exports = router