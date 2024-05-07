import axios from "axios"

const url = "api/patients/"

class PatientsService {

    static async getPatients() {
        const response = await axios.get(url)
        return response.data
    }

    static async getNursesPatients(username,chosenProtokol) {
        const response = await axios.get(`${url}${username}/${chosenProtokol}`)
        return response.data
    }

    static async getSpecificPatients(patientName) {
        const response = await axios.get(`${url}/patient/${patientName}`)
        return response.data
    }

    // Create Post
    static insertPatients(
        name, dateOfBirth, chosenNurses, chosenProtokols, schmerzMedikation, schmerzPumpe, sonstigMethode,
        sonstigMet, beatmungsmodus, beatmungsgerat, ogabe, trachealkanule, ipap, epap, rampe, af, ie, trigger,
        vt, pmax, flow, tinsp, fio, insulinpflichtig, dosierung, oral, insulinArt, kostform, 
        inspirationEninstellung, inspirationAnderung, tiEninstellung, tiAnderung, pauseEninstellung,
        pauseAnderung, widerholenEninstellung, widerholenAnderung, triggerEninstellung, triggerAnderung,
        expirationEninstellung, expirationAnderung, teEninstellung, teAnderung, zyklEninstellung, zyklAnderung
    ) {
        return axios.post(url, {
            name,
            dateOfBirth,
            chosenNurses,
            chosenProtokols,
            schmerzMedikation,
            schmerzPumpe,
            sonstigMethode,
            sonstigMet,
            beatmungsmodus,
            beatmungsgerat,
            ogabe,
            trachealkanule,
            ipap,
            epap,
            rampe,
            af,
            ie,
            trigger,
            vt,
            pmax,
            flow,
            tinsp,
            fio,
            insulinpflichtig,
            dosierung,
            oral,
            insulinArt,
            kostform,
            inspirationEninstellung,
            inspirationAnderung,
            tiEninstellung, 
            tiAnderung, 
            pauseEninstellung,
            pauseAnderung, 
            widerholenEninstellung, 
            widerholenAnderung, 
            triggerEninstellung, 
            triggerAnderung,
            expirationEninstellung, 
            expirationAnderung, 
            teEninstellung, 
            teAnderung, 
            zyklEninstellung, 
            zyklAnderung
        })
    }

    static editPatients(
        id, name, dateOfBirth, chosenNurses, chosenProtokols, schmerzMedikation, schmerzPumpe, sonstigMethode,
        sonstigMet, beatmungsmodus, beatmungsgerat, ogabe, trachealkanule, ipap, epap, rampe, af, ie, trigger,
        vt, pmax, flow, tinsp, fio, insulinpflichtig, dosierung, oral, insulinArt, kostform
    ) {
        return axios.put(url, {
            id,
            name,
            dateOfBirth,
            chosenNurses,
            chosenProtokols,
            schmerzMedikation,
            schmerzPumpe,
            sonstigMethode,
            sonstigMet,
            beatmungsmodus,
            beatmungsgerat,
            ogabe,
            trachealkanule,
            ipap,
            epap,
            rampe,
            af,
            ie,
            trigger,
            vt,
            pmax,
            flow,
            tinsp,
            fio,
            insulinpflichtig,
            dosierung,
            oral,
            insulinArt,
            kostform
        })
    }

    // Delete Post
    static deletePatients(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default PatientsService