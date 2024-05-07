const { Router } = require("express")
const mongodb = require("mongodb")
const connectUrl = process.env.MONGO_URI

const router = Router()

router.get("/:patientName/:von/:bis", async (req, res) => {
    let protokols = []

    pflegebericht = await loadPflegeberichtCollection()
    beatmung = await loadBeatmungsprotokollCollection()
    gewicht = await loadGewichtCollection()
    schmerz = await loadSchmerzCollection()
    vitalzeichen = await loadVitalzeichenCollection()
    bzuberwachung = await loadBzuberwachungCollection()
    entblockung = await loadEntblockungCollection()
    bewegung = await loadBewegungCollection()
    geratecheck = await loadGeratecheckCollection()
    anfallprotocol = await loadAnfallprotocolCollection()

    let pflegeArray = pflegebericht.find({patientName:req.params.patientName,
                      datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                      $lt: new Date(req.params.bis).getTime()}}).toArray()
    let p = await pflegeArray
    //--------------------------------------------------------------------------------------
    let beatmungArray = beatmung.find({patientName:req.params.patientName,
                        datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                        $lt: new Date(req.params.bis).getTime()}}).toArray()
    let b = await beatmungArray
    //--------------------------------------------------------------------------------------
    let gewichtArray = gewicht.find({patientName:req.params.patientName,
                       datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                       $lt: new Date(req.params.bis).getTime()}}).toArray()
    let g = await gewichtArray
    //--------------------------------------------------------------------------------------
    let bzuberwachungArray = bzuberwachung.find({patientName:req.params.patientName,
                             datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                             $lt: new Date(req.params.bis).getTime()}}).toArray() 
    let bz = await bzuberwachungArray
    //--------------------------------------------------------------------------------------
    // radi!!!
    let schmerzArray = schmerz.find({patientName:req.params.patientName,
                                datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                                $lt: new Date(req.params.bis).getTime()}}).toArray() 
    let sc = await schmerzArray
    //--------------------------------------------------------------------------------------
    let vitalzeichenArray = vitalzeichen.find({patientName:req.params.patientName,
                            datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                            $lt: new Date(req.params.bis).getTime()}}).toArray()
    let v = await vitalzeichenArray
    //---------------------------------------------------------------------------------------
    let entblockungArray = entblockung.find({patientName:req.params.patientName,
                           datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                           $lt: new Date(req.params.bis).getTime()}}).toArray()
    let e = await entblockungArray
    //----------------------------------------------------------------------------------------
    let anfallprotocolArray = anfallprotocol.find({patientName:req.params.patientName,
                              datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                              $lt: new Date(req.params.bis).getTime()}}).toArray()
    let anf = await anfallprotocolArray
    //------------------------------------------------------------------------------------------
    let bewegungArray = bewegung.find({patientName:req.params.patientName,
                        datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                        $lt: new Date(req.params.bis).getTime()}}).toArray()
    let bew = await bewegungArray
    //------------------------------------------------------------------------------------------
    let geratecheckArray = geratecheck.find({patientName:req.params.patientName,
                           datumSeconds: { $gt: new Date(req.params.von).getTime(),
                                           $lt: new Date(req.params.bis).getTime()}}).toArray()
    let ger = await geratecheckArray
    //------------------------------------------------------------------------------------------
    console.log(bew);

    p.length === 0 ? '' : protokols.push('Pflegebericht') 
    b.length === 0 ? '' : protokols.push('Beatmungsprotokoll') 
    g.length === 0 ? '' : protokols.push('Protokoll - Gewichtskontrolle')
    bz.length === 0 ? '': protokols.push('BZ Überwachung')
    sc.length === 0 ? '': protokols.push('Schmerzerfassung')
    v.length === 0 ? '' : protokols.push('Vitalzeichenkontrolle')
    e.length === 0 ? '' : protokols.push('Entblockungsprotokoll')
    anf.length === 0 ? '' : protokols.push('Anfall Protocol')
    ger.length === 0 ? '' : protokols.push('Protokoll- Gerätecheck MP')
    bew.length === 0 ? '' : protokols.push('Lagerung- Bewegungsplan')

    res.send(await protokols)

})

// OVO TEK URADITI KAD BUDEM IMAO PROTOKOLE AKO MOGNE!
// /:protokolName/:Von/:Bis
// router.get("/:protokolName", async (req, res) => {
//     if(req.params.patientName === 'Pflegebericht') {
//         let pflegeArray = pflegebericht.find({patientName:req.params.patientName}).toArray()
//         res.send(await pflegeArray)
//     }
//     if(req.params.patientName === 'Beatmungsprotokoll') {
//         let pflegeArray = pflegebericht.find({patientName:req.params.patientName}).toArray()
//         res.send(await pflegeArray)
//     }
// })

async function loadPflegeberichtCollection() {
    const client = await mongodb.MongoClient.connect (connectUrl, { useNewUrlParser: true })
    return client.db("SemiFi").collection("pflegebericht")
}
async function loadBeatmungsprotokollCollection() {
    const client = await mongodb.MongoClient.connect (connectUrl, { useNewUrlParser: true })
    return client.db("SemiFi").collection("beatmungsprotokoll")
}
async function loadGewichtCollection() {
    const client = await mongodb.MongoClient.connect (connectUrl, { useNewUrlParser: true })
    return client.db("SemiFi").collection("gewicht")
}
async function loadSchmerzCollection() {
    const client = await mongodb.MongoClient.connect (connectUrl, { useNewUrlParser: true })
    return client.db("SemiFi").collection("schmerz")
}
async function loadVitalzeichenCollection() {
    const client = await mongodb.MongoClient.connect (connectUrl, { useNewUrlParser: true })
    return client.db("SemiFi").collection("vitalzeichen")
}
async function loadBzuberwachungCollection() {
    const client = await mongodb.MongoClient.connect (connectUrl, { useNewUrlParser: true })
    return client.db("SemiFi").collection("bzuberwachung")
}
async function loadEntblockungCollection() {
    const client = await mongodb.MongoClient.connect (connectUrl, { useNewUrlParser: true })
    return client.db("SemiFi").collection("entblockung")
}
async function loadBewegungCollection() {
    const client = await mongodb.MongoClient.connect (connectUrl, { useNewUrlParser: true })
    return client.db("SemiFi").collection("bewegung")
}
async function loadGeratecheckCollection() {
    const client = await mongodb.MongoClient.connect (connectUrl, { useNewUrlParser: true })
    return client.db("SemiFi").collection("geratecheck")
}
async function loadAnfallprotocolCollection() {
    const client = await mongodb.MongoClient.connect (connectUrl, { useNewUrlParser: true })
    return client.db("SemiFi").collection("anfallprotocol")
}

module.exports = router