import axios from "axios"

const url = "api/anfallprotocol/"

class AnfallService {
    static async getAnfall() {
        const response = await axios.get(url)
        return response.data
    }

    static async getSpecificAnfall(patientName, viewall) {
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
    static insertAnfall(
        patientName, uhrzeit, XbuttonArray, rr, puls, spoz, nurse
    ) {
        return axios.post(url, {
            patientName,
            uhrzeit,
            XbuttonArray,
            rr,
            puls,
            spoz,
            nurse
        })
    }

    // Update Post 
    static editAnfall(id,editDate,uhrzeit, XbuttonArray, rr, puls, spoz) {
        return axios.put(url, {
            id,
            editDate,
            uhrzeit,
            XbuttonArray,
            rr,
            puls,
            spoz
        })
    }
    
    // Update Report
    static updateReport(id,report,isReport){
        return axios.put(`${url}${id}/${report}/${isReport}`)
    }

    // Delete Post
    static deleteAnfall(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default AnfallService