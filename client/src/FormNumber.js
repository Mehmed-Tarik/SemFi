import axios from "axios"

const url = "api/formNumber/"

class FormNumberService {

    static async getFormNumber() {
        const response = await axios.get(url)
        return response.data
        
    }
    // static async getSpecificEinausfuhr(patientName,pageNumber) {
    //     const response = await axios.get(`${url}${patientName}/${pageNumber}`)
    //     return response.data
        
    // }
    // Delete Post
    static editEinausfuhr(num) {
            console.log(num);
            return axios.put(`${url}${num}`)
    }


    // // Create Post
    // static insertEinausfuhr(
    //     patientName, datum, uhrzeit, nurse, 
    //     einfuhr, kcal, flussigkeit, ausfuhr
    // ) {
    //     return axios.post(url, {
    //         patientName,
    //         datum,
    //         uhrzeit,
    //         nurse,
    //         einfuhr,
    //         kcal,
    //         flussigkeit,
    //         ausfuhr
    //     })
    // }

    // // Delete Post
    // static deleteEinausfuhr(id) {
    //     if(confirm('Are you sure')){
    //         return axios.delete(`${url}${id}`)
    //     }
    // }
}

export default FormNumberService