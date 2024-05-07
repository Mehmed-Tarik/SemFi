import axios from "axios"

const url = "api/overview/"

class OverviewService {

    static async getProtokols(patientName,von,bis) {
        const response = await axios.get(`${url}${patientName}/${von}/${bis}`)
        return response.data
    }
}

export default OverviewService