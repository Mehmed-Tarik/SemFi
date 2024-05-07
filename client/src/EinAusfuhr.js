import axios from "axios"

const url = "api/einausfuhr/"

class EinausfuhrService {

    static async getEinausfuhr() {
        const response = await axios.get(url)
        // console.log(response);
        return response.data
        
    }
    static async getSpecificEinausfuhr(patientName,pageNumber) {
        const response = await axios.get(`${url}${patientName}/${pageNumber}`)
        return response.data
        
    }

    // Create Post
    static insertEinausfuhr(
        patientName, datum, uhrzeit, nurse, 
        einfuhr, kcal, flussigkeit, ausfuhr, pageNumber
    ) {
        return axios.post(url, {
            patientName,
            datum,
            uhrzeit,
            nurse,
            einfuhr,
            kcal,
            flussigkeit,
            ausfuhr,
            pageNumber
        })
    }

    // Update Post 
    static editGeratecheck(id,einfuhr,kcal,flussigkeit,ausfuhr) {
        return axios.put(url, {
            id,
            einfuhr,
            kcal,
            flussigkeit,
            ausfuhr,
        })
    }

    // Delete Post
    static deleteEinausfuhr(id) {
        if(confirm('Are you sure')){
            return axios.delete(`${url}${id}`)
        }
    }
}

export default EinausfuhrService