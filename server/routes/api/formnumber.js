const { Router } = require("express")
const mongodb = require("mongodb")

const router = Router()

// Get formNumber 
router.get("/", async (req, res) => {
    formNumber = await loadFormNumberCollection()
    res.send(await formNumber.find({}).toArray())
})

router.put("/:formNum", async (req, res) => {
    const formNumber = await loadFormNumberCollection()
    await formNumber.updateOne({_id: new mongodb.ObjectId("63ce8d0f2760d965b8efc8b9")}, {
                        $set: {
                            formnumber: parseInt(req.params.formNum)
                        }
                    })
                    .then(result => {
                        res.status(201).json({message: "Updated Successful!"})
                    })
                    
})

//Add formNumber
router.post("/", async (req, res) => {
    const formNumber = await loadFormNumberCollection()
    await formNumber.insertOne({
        formnumber: req.body.formnumber,
        createdAt: new Date()
    })
    res.status(201).send()
})

async function loadFormNumberCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("formNumber")
}

module.exports = router