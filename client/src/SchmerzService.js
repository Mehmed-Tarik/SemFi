import axios from "axios"

const url = "api/schmerzerfassung/"

class SchmerzService {

    static async getSpecificSchmerz(patientName, viewall) {
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
    static insertSchmerz(
        patientName, uhrzeit, nurse, schmerzBtn, schmerzBesch, schmerzMittel, faktoren
    ) {
        return axios.post(url, {
            patientName,
            uhrzeit,
            nurse,
            schmerzBtn,
            schmerzBesch,
            schmerzMittel,
            faktoren
        })
    }
    // Update Schmerz 
    static editSchmerz(id,editDate,uhrzeit,schmerzBtn,schmerzBesch,schmerzMittel,faktoren) {
        return axios.put(url, {
            id,
            editDate,
            uhrzeit,
            schmerzBtn,
            schmerzBesch,
            schmerzMittel,
            faktoren
        })
    }

    // Update Report
    static updateReport(id,report,isReport){
        return axios.put(`${url}${id}/${report}/${isReport}`)
    }

    // Delete Post
    static deleteSchmerz(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default SchmerzService