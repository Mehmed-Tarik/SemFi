import axios from "axios"

const url = "api/beschreibung/"

class BeschreibungService {

    // static async getBeschreibung() {
    //     const response = await axios.get(url)
    //     return response.data
        
    // }
    // static async getSpecificBeschreibung(patientName,pageNumber) {
    //     const response = await axios.get(`${url}${patientName}/${pageNumber}`)
    //     return response.data
        
    // }

    // Create Post
    static insertBeschreibung(
        id, patientName, nurse, beschreibung
    ) {
        return axios.post(url, {
            id,
            patientName,
            nurse,
            beschreibung
        })
    }

    static editBeschreibung(id,beschreib) {
        return axios.put(url, {
            id,
            beschreib
        })
    }

    // Delete Post
    static deleteBeschreibung(id) {
        if(confirm('Are you sure')){
            return axios.delete(`${url}${id}`)
        }
    }
}

export default BeschreibungService