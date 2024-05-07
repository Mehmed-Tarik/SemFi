import axios from "axios"

const url = "api/mail/"

class MailService {

    static sendMail(
        from, to, subject, message
    ) {
        return axios.post(url, {
            from,
            to,
            subject,
            message
        })
    }

}

export default MailService