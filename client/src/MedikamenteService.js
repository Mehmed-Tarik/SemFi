import axios from "axios"

const url = "api/medikamente/"

class MedikamenteService {

    // Create Post
    static insertMedikamente(
        id, patientName, nurse, medikament
    ) {
        return axios.post(url, {
            id,
            patientName,
            nurse,
            medikament
        })
    }

    static editMedikamente(id,medikament) {
        return axios.put(url, {
            id,
            medikament
        })
    }

    // Delete Post
    static deleteMedikamente(id) {
        if(confirm('Are you sure')){
            return axios.delete(`${url}${id}`)
        }
    }
}

export default MedikamenteService