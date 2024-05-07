const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

// Middleware
app.use(bodyParser.json())

// used to get the cookie
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['https://localhost:8080']
}))

//const socket = new WebSocket("ws://localhost:8000/ws")

const nurses = require("./routes/api/nurses")
const patients = require("./routes/api/patients")
const protocols = require("./routes/api/protocols")
const anfallprotocol = require("./routes/api/anfallprotocol")
const beatmungsprotokoll = require("./routes/api/beatmungsprotokoll")
const pflegebericht = require("./routes/api/pflegebericht")
const medikamente = require("./routes/api/medikamente")
const beschreibung = require("./routes/api/beschreibung")
const einausfuhr = require("./routes/api/ein-ausfuhr")
const formNumber = require("./routes/api/formnumber")
const bzuberwachung = require("./routes/api/bzuberwachung")
const report = require("./routes/api/report")
const vitalzeichen = require("./routes/api/vitalzeichen")
const gewicht = require('./routes/api/gewicht')
const schmerzerfassung = require('./routes/api/schmerzerfassung')
const entblockung = require('./routes/api/entblockung')
const bewegungsplan = require('./routes/api/bewegungsplan')
const geratecheck = require('./routes/api/geratecheck')
const overview = require('./routes/api/overview')
// const mail = require('./routes/api/mail')

app.use("/api/nurses", nurses)
app.use("/api/patients", patients)
app.use("/api/protocols", protocols)
app.use("/api/anfallprotocol", anfallprotocol)
app.use("/api/beatmungsprotokoll", beatmungsprotokoll)
app.use("/api/pflegebericht", pflegebericht)
app.use("/api/medikamente", medikamente)
app.use("/api/beschreibung", beschreibung)
app.use("/api/einausfuhr", einausfuhr)
app.use("/api/formNumber", formNumber)
app.use("/api/bzuberwachung", bzuberwachung)
app.use("/api/report", report)
app.use("/api/vitalzeichen", vitalzeichen)
app.use('/api/gewicht', gewicht)
app.use('/api/schmerzerfassung', schmerzerfassung)
app.use('/api/entblockung', entblockung)
app.use('/api/bewegungsplan', bewegungsplan)
app.use('/api/geratecheck', geratecheck)
app.use('/api/overview', overview)
// app.use('/api/mail', mail)

// Handle production
if(process.env.NODE_ENV === "production") {
    // Static folder
    app.use(express.static(__dirname + "/public/"))

    // Handle SPA
    app.get(/.*/, (req,res) => res.sendFile(__dirname + "/public/index.html"))
}

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server started on port ${port}`))