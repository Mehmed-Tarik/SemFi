const { Router } = require("express")
const mongodb = require("mongodb")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = Router()

// Get Nurses
router.get("/", async (req, res) => {
    nurses = await loadNursesCollection()
    res.send(await nurses.find({}).toArray())
})

// vidjecu da li mi ovo izasta treba!
// router.get("/:username", async (req, res) => {
//     nurses = await loadNursesCollection()
//     res.send(await nurses.find({username: req.params.username}).toArray())
// })

// Add Nurses
router.post("/register", async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // const jsonDate = new Date().toJSON();
    // console.log(jsonDate);

    const nurses = await loadNursesCollection()
    // await nurses.insertOne({
    //     name: req.body.name,
    //     username: req.body.username,
    //     password: hashedPassword,
    //     isAdmin: req.body.isAdmin,
    //     createdAt: new Date()
    // })
    // AKO STA STEKNE MORACU INSTALIRAT MONGOOSE PA PROBATI!
    const result = await nurses.insertOne({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
        isAdmin: req.body.isAdmin,
        createdAt: new Date()
    })
    // const {password, ...data} = await result.toJSON()
    // ovdje je ovako trebalo ako se sta zajebe poslije moguce da je zbog ovoga!
    const {password, ...data} = await result

    // separate password from rest of the data!
    res.status(201).send(data)
})

router.post('/login', async (req,res) => {
    // const nurse = await User.findOne({username: req.body.username})
    const nurses = await loadNursesCollection()

    const nurse = await nurses.findOne({username: req.body.username})

    if(!nurse) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if(!await bcrypt.compare(req.body.password, nurse.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }
    // make sure to stor this secret in an emv file !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // because it should not be added here !!!!!!!!!!
    const token = jwt.sign({_id: nurse._id}, 'secret')

    res.cookie('jwt', token, {
        // purpose of this is to be sent in the backend and the backend can validate it.
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send( {
        // we don't want to return cookie
        message: 'success'
    } )

    // OVO NE BI TREBALO DA BUDE ZAKOMENTIRANO !!! ALI MI JE DAVALO NEKI ERROR
    // IZGLEDA MSM 99.99% SAM SIGURAN DA TREBA BITI ZAKOMENTIRANO/IZBRISANO!!!
    // PONOVO SAM GLEDAO TUTORIAL I TAMO NEMA OVOGA I NEMAM NIKAKVIH ERROR-A I NIJE LOGICNO DA OVO BUDE TU!
    // res.send(token)
})
// rout for authanticated user!!!
// UPOSTAMANU MI NE RADI GET A KAD STAVIM POST SVE FERCERA KAKO TREBA!
// OVO TREBA BITI GET A RADI NA POST (BOZE SACUVAJ)
// KAD SAM DODAO OVO /usr ONDA JE PRORADILO ISTRAZIT TACNO STO NECE ONAKO NORMALNO!!!
router.get('/user', async (req,res) => {
    const nurses = await loadNursesCollection()
    // try {
    const cookie = req.cookies['jwt']

    //OPPOSITE OF THIS: 
    //const token = jwt.sign({_id: user._id}, 'secret')
    //WE NEED TO DECODE IT!
    // 'SECRET' must be stored in emv file.
    const claims = jwt.verify(cookie, 'secret')

    if(!claims) {
        return res.status(401).send({
            message: 'unauthenticated'
        }) 
    }
    // const nurse = await nurses.findOne({_id: claims._id})
    const nurse = await nurses.findOne({_id: new mongodb.ObjectId(claims._id)})

    const {password, ...data} = await nurse
    res.send(data)
    // } catch (e) {
    //     return res.status(401).send({
    //         message: 'unauthenticated'
    //     }) 
    // }
})

// LOG OUT
router.post('/logout', async (req,res) => {
    console.log("tu sam dole");
    // REMOVE A COOKIE
    // firstly set again the cookie
    // the way to delete a cookie is to set the expiration date to the past
    // this our cookie will expire immediately it means we successfuly removed it!
    res.cookie( 'jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })

})


// Update Nurse
// router.put("/:id/:name/:username/:password/:isAdmin", async (req, res) => {
//     const nurses = await loadNursesCollection()
//     await nurses.updateOne(
//         {_id: new mongodb.ObjectId(req.params.id)},
//         {   
//             $set: {
//                 name: req.params.name,
//                 username: req.params.username,
//                 password: req.params.password,
//                 isAdmin: req.params.isAdmin
//                 }
//         }
//     )
//     res.status(200).send()
// })
// Update Nurse II
router.put("/", async (req, res) => {
    const nurses = await loadNursesCollection()
    await nurses.updateOne(
        {_id: new mongodb.ObjectId(req.body.id)},
        {   
            $set: {
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                isAdmin: req.body.isAdmin
                }
        }
    )
    res.status(200).send()
})

// Delete Nurses
router.delete("/:id", async (req, res) => {
    const nurses = await loadNursesCollection()
    await nurses.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadNursesCollection() {
    const client = await mongodb.MongoClient.connect 
    (process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    return client.db("SemiFi").collection("nurses")
}

module.exports = router