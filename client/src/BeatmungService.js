import axios from "axios"

const url = "api/beatmungsprotokoll/"

class BeatmungService {

    static async getBeatmungsProtokoll() {
        const response = await axios.get(url)
        return response.data
        
    }
    static async getSpecificBeatmungsProtokoll(patientName, viewall) {
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
    static insertBeatmungsProtokoll(
        patientName, nurse, vti, vte, af,
        ie, pinsp, pexp, o2, spo2, puls
    ) {
        return axios.post(url, {
            patientName,
            nurse,
            vti,
            vte,
            af,
            ie,
            pinsp,
            pexp,
            o2,
            spo2,
            puls
        })
    }

    // Update Post 
    static editBeatmungsProtokoll(id,editDate,uhrzeit,vti,vte,af,ie,pinsp,pexp,o2,spo2,puls) {
        return axios.put(url, {
            id,
            editDate,
            uhrzeit,
            vti,
            vte,
            af,
            ie,
            pinsp,
            pexp,
            o2,
            spo2,
            puls
        })
    }

    // Update Report
    static updateReport(id,report,isReport){
        return axios.put(`${url}${id}/${report}/${isReport}`)
    }

    // Delete 
    static deleteBeatmungsProtokoll(id) {
            return axios.delete(`${url}${id}`)
    }
}

export default BeatmungService