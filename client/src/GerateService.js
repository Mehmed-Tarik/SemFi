import axios from "axios"

const url = "api/geratecheck/"

class GeratecheckService {

    static async getSpecificGeratecheck(patientName,month) {
        const response = await axios.get(`${url}${patientName}/${month}`)
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
    static insertGeratecheck(
        patientName, nurse, month, xbuttons
        // beatmungsGerat, parameter, beatmungsGerat2, parameter2, absaugGerat,
        // filter, absaugGerat2, filter2, beatmungsBeutel, dichtigkeit, notfallset, pulsoximeter, 
        // sensoren, wechseldruck, einstellung, inhalation, zubehor
    ) {
        return axios.post(url, {
            patientName,
            nurse,
            month,
            xbuttons
        })
    }

    // Update Post 
    static editGeratecheck(id,xbuttons) {
        return axios.put(url, {
            id,
            xbuttons
        })
    }

    // Update Report
    static updateReport(id,report,isReport){
        return axios.put(`${url}${id}/${report}/${isReport}`)
    }

    // Delete Post
    static deleteGeratecheck(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default GeratecheckService