import axios from "axios"

const url = "api/report/"

class ReportService {

    static async getReports() {
        const response = await axios.get(url)
        return response.data
    }

    // Create Post
    static insertReport(
        id, protokolName, patientName, nurse, page
    ) {
        return axios.post(url, {
            id,
            protokolName,
            patientName,
            nurse,
            page
        })
    }

    // Delete Post
    static deleteReport(id) {
        // if(confirm('Are you sure')){
            return axios.delete(`${url}${id}`)
        // }
    }
}

export default ReportService