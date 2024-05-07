import axios from "axios"

const url = "api/nurses/"

class LoginService {

    static async loginNurse(username, password) {
        return axios.post(`${url}/login`, {
            username,
            password
        })
    }

    static async getNurse() {
        const response = await axios.get(`${url}/user`)
        return response.data
    }

    static async logout() {
        const reponse = await axios.post(`${url}/logout`)
        return reponse.data.message
    }

    static async getPNurses() {
        const response = await axios.get(url)
        return response.data
        
    }

    // Create Post
    static insertNurse(
        name, username, password, isAdmin
    ) {
        return axios.post(`${url}/register`, {
            name,
            username,
            password,
            isAdmin,
        })
    }

    // Delete Post
    static deleteNurse(id) {
        if(confirm('Are you sure')){
            return axios.delete(`${url}${id}`)
        }
    }

    static editNurse(id,name,username,password,isAdmin) {
        return axios.put(url, {
            id,
            name,
            username,
            password,
            isAdmin
        })
    }
    
}

export default LoginService