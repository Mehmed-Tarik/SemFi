import axios from "axios"

const url = "api/bzuberwachung/"

class BzuberwachungService {

    static async getBzuberwachung() {
        const response = await axios.get(url)
        return response.data
        
    }
    static async getSpecificBzuberwachung(patientName, viewall) {
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
    static insertBzuberwachung(
        patientName, nurse, bzMol,
        insulin, ie, lokal, bemerkungen
    ) {
        return axios.post(url, {
            patientName,
            nurse,
            bzMol,
            insulin,
            ie,
            lokal,
            bemerkungen
        })
    }

    // Update Post 
    static editBzuberwachung(id,editDate,bzMol,insulin,ie,lokal,bemerkungen) {
        return axios.put(url, {
            id,
            editDate,
            bzMol,
            insulin,
            ie,
            lokal,
            bemerkungen
        })
    }

    // Update Report
    static updateReport(id,report,isReport){
        return axios.put(`${url}${id}/${report}/${isReport}`)
    }

    // Delete Post
    static deleteBzuberwachung(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default BzuberwachungService