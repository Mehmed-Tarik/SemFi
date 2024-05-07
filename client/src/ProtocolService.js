import axios from "axios"

const url = "api/protocols/"

class ProtocolService {

    static async getProtocols() {
        const response = await axios.get(url)
        return response.data
        
    }

    // Create Post
    static insertProtocols(text) {
        return axios.post(url, {
            name
        })
    }

    // Delete Post
    static deleteProtocols(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default ProtocolService