import axios from "axios"

const url = "api/vitalzeichen/"

class VitalzeichenService {

    static async getSpecificVitalzeichen(patientName, viewall) {
        const response = await axios.get(`${url}${patientName}/${viewall}`)
        return response.data
    }
    // Get report
    static async getReport(id,patientName) {
         const response = await axios.get(`${url}/report/${id}/${patientName}`)
         return response.data    
    }
    // GET FOR OVERVIEW
    static async getDataForOverview(patientName,von,bis) {
        const response = await axios.get(`${url}/overview/over/${patientName}/${von}/${bis}`)
        return response.data 
    }
    // Create Post
    static insertVitalzeichen(
        patientName, nurse, rr, rektal, leiste, af, hf, spo2, gabe, inhalation,
        atmung, spontan, abgelesen, justiert, entblockt, et, no, sg, sekret, wechseln
    ) {
        return axios.post(url, {
            patientName,
            nurse,
            rr,
            rektal,
            leiste,
            af,
            hf,
            spo2,
            gabe,
            inhalation,
            atmung,
            spontan,
            abgelesen,
            justiert,
            entblockt,
            et,
            no,
            sg,
            sekret,
            wechseln
        })
    }
    // Update  
    static editVitalzeichen(
        id, editDate, rr, rektal, leiste, af, hf, spo2, gabe, inhalation,
        atmung, spontan, abgelesen, justiert, entblockt, et, no, sg, sekret, wechseln
    ) {
        return axios.put(url, {
            id,
            editDate,
            rr,
            rektal,
            leiste,
            af,
            hf,
            spo2,
            gabe,
            inhalation,
            atmung,
            spontan,
            abgelesen,
            justiert,
            entblockt,
            et,
            no,
            sg,
            sekret,
            wechseln
        })
    }
    // Update Report
    static updateReport(id,report,isReport){
        return axios.put(`${url}${id}/${report}/${isReport}`)
    }
    // Delete Post
    static deleteVitalzeichen(id) {
        // if(confirm('Are you sure')){
            return axios.delete(`${url}${id}`)
        // }
    }
}

export default VitalzeichenService