import axios from "axios"

const url = "/api/bewegungsplan/"

class BewegungService {

    static async getSpecificBewegung(patientName, viewall) {
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
    static insertBewegung(
        patientName, nurse, xButtons, bemerkungen
    ) {
        return axios.post(url, {
            patientName,
            nurse,
            xButtons,
            bemerkungen
        })
    }

    // Update Post 
    static editBewegung(id,editDate,xButtons,bemerkungen) {
        return axios.put(url, {
            id,
            editDate,
            xButtons,
            bemerkungen
        })
    }

    // Update Report
    static updateReport(id,report,isReport){
        return axios.put(`${url}${id}/${report}/${isReport}`)
    }

    // Delete Post
    static deleteBewegung(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default BewegungService