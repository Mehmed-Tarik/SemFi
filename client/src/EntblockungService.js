import axios from "axios"

const url = "api/entblockung/"

class EntblockungService {

    static async getSpecificEntblockungProtokoll(patientName, viewall) {
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
        console.log("tuj sannnnnnnnnnn");
        const response = await axios.get(`${url}/overview/over/${patientName}/${von}/${bis}`)
        console.log(response.data );
        return response.data 
    }
    // Create Post
    static insertEntblockungProtokoll(
        patientName, nurse, von, bis, dauer, spo2_begin, hf_begin, spo2_ende, hf_ende, bemerkung
    ) {
        return axios.post(url, {
            patientName,
            nurse,
            von,
            bis,
            dauer,
            spo2_begin,
            hf_begin,
            spo2_ende,
            hf_ende,
            bemerkung
        })
    }

    // Update Post 
    static editEntblockungProtokoll(id,editDate,von,bis,dauer,spo2_begin,hf_begin,spo2_ende,hf_ende,bemerkung) {
        return axios.put(url, {
            id,
            editDate,
            von,
            bis,
            dauer,
            spo2_begin,
            hf_begin,
            spo2_ende,
            hf_ende,
            bemerkung
        })
    }

    // Update Report
    static updateReport(id,report,isReport){
        return axios.put(`${url}${id}/${report}/${isReport}`)
    }

    // Delete 
    static deleteEntblockungProtokoll(id) {
            return axios.delete(`${url}${id}`)
    }
}

export default EntblockungService