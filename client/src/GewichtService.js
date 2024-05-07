import axios from "axios"

const url = "api/gewicht/"

class GewichtService {

    static async getSpecificGewicht(patientName, viewall) {
        
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
    static insertGewicht(
        patientName, nurse, gewicht, bu
    ) {
        return axios.post(url, {
            patientName,
            nurse,
            gewicht,
            bu
        })
    }

    // Update Post 
    static editGewicht(id,editDate,gewicht,bu) {
        return axios.put(url, {
            id,
            editDate,
            gewicht,
            bu
        })
    }

    // Update Report
    static updateReport(id,report,isReport){
        return axios.put(`${url}${id}/${report}/${isReport}`)
    }

    // Delete Post
    static deleteGewicht(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default GewichtService