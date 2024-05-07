import axios from "axios"

const url = "api/pflegebericht/"

class PflegeberichtService {

    static async getSpecificPflegebericht(patientName, viewall) {
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
    static insertPflegebericht(
         patientName, nurse, bericht, stuhlgang
    ) {
        return axios.post(url, {
            patientName,
            nurse,
            bericht,
            stuhlgang
        })
    }

    // Update Post 
    static editPflegebericht(id,editDate,bericht,stuhlgang) {
        return axios.put(url, {
            id,
            editDate,
            bericht,
            stuhlgang
        })
    }

    // Update Report
    static updateReport(id,report,isReport){
        return axios.put(`${url}${id}/${report}/${isReport}`)
    }

    // Delete Post
    static deletePflegebericht(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default PflegeberichtService