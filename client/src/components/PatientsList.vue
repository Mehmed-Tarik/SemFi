<template>
    <div>
        <div v-if="!isProtocol">
        <svg class="backBtn" @click="$emit('backButton')" viewBox="0 0 24 24"><path fill="currentColor" d="M11.325 15.325q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7l-.9-.9h3.225q.425 0 .7-.288Q16 12.425 16 12t-.287-.713Q15.425 11 15 11h-3.2l.925-.925q.275-.275.263-.688q-.013-.412-.288-.687q-.275-.275-.7-.275q-.425 0-.7.275l-2.6 2.6q-.275.275-.275.7q0 .425.275.7ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>
            <div class="patient-container">
                <input class="search-input" type="text" placeholder="Search Patient..." v-model="search">
                <svg class="search-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg>
                <div class="patient-item"
                    v-for="(patient,index) in filteredPatients"
                    v-bind:item="patient"
                    v-bind:index="index"
                    v-bind:key="patient._id"
                    v-on:click="choosePatient(patient)"
                >
                    <div class="patient-name">
                        <span>{{patient.name}}</span>
                    </div>
                </div>
                <div v-if="!patients.length" class="orbit-spinner">
                    <div class="orbit"></div>
                    <div class="orbit"></div>
                    <div class="orbit"></div>
                </div>
            </div>
        </div>
        <Anfall v-if="isProtocol && chosenProtokol==='Anfall Protocol'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol" 
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Beatmung v-if="isProtocol && chosenProtokol==='Beatmungsprotokoll'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol" 
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <BzUberwachung v-if="isProtocol && chosenProtokol==='BZ Überwachung'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol" 
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Pflegebericht v-if="isProtocol && chosenProtokol==='Pflegebericht'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol" 
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Vitalzeichen v-if="isProtocol && chosenProtokol==='Vitalzeichenkontrolle'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol" 
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Gewicht v-if="isProtocol && chosenProtokol==='Protokoll - Gewichtskontrolle'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Schmerzerfassung v-if="isProtocol && chosenProtokol==='Schmerzerfassung'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Entblockung v-if="isProtocol && chosenProtokol==='Entblockungsprotokoll'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Bewegung v-if="isProtocol && chosenProtokol==='Lagerung- Bewegungsplan'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------ -->
        <Geratecheck v-if="isProtocol && chosenProtokol==='Protokoll- Gerätecheck MP'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol"
                         :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <CoughAssist v-if="isProtocol && chosenProtokol==='Cough Assist Protokoll'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol"
                         :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------ -->
        <EinAusfuhr v-if="isProtocol && chosenProtokol==='Ein Ausfuhr Protokoll'" :nurse="nurse" :patient="patient" :protokolName="chosenProtokol" @backProtokol="backProtokol" />
        
    </div>
</template>

<script>
import PatientsService from "@/PatientsService"
import Anfall from "@/components/Protocols/Anfall.vue"
import Beatmung from "@/components/Protocols/Beatmung.vue"
import Pflegebericht from "@/components/Protocols/Pflegebericht.vue"
import BzUberwachung from "@/components/Protocols/BzUberwachung.vue"
import EinAusfuhr from "@/components/Protocols/EinAusfuhr.vue"
import Vitalzeichen from './Protocols/Vitalzeichen.vue'
import Gewicht from './Protocols/Gewicht.vue'
import Schmerzerfassung from './Protocols/Schmerzerfassung.vue'
import Entblockung from './Protocols/Entblockung.vue'
import Bewegung from './Protocols/Bewegung.vue'
import Geratecheck from './Protocols/Geratecheck.vue'
import CoughAssist from './Protocols/CoughAssist.vue'

export default {
    name: "PatientsList",
    components: {
        Beatmung, Pflegebericht, Anfall, EinAusfuhr, BzUberwachung, Gewicht,
        Vitalzeichen, Schmerzerfassung, Entblockung, Bewegung, Geratecheck, CoughAssist
    },
    props: {
        nurse: Object,
        chosenProtokol: String
    },
    data() {
        return {
            patients: [],
            patient: {},
            search: "",
            patientName: "",
            isProtocol: false,
            month: [],
            year: [],
            successMessage: '',
            color: '',
            pageSize: 3,
        }
    },
    async created() {
        this.patients = await PatientsService.getNursesPatients(this.nurse.username,this.chosenProtokol)
    },
    methods: {
        backProtokol() {
            this.isProtocol = false
        },
        choosePatient(patient) {
            this.patient = patient
            this.isProtocol = true
            this.search = ""
        },
        topDate(collection) {
            this.month = []
            this.year = []
            collection.forEach(vu => {
                this.month.push(vu.datum.substr(3, 2))
                this.year.push(vu.datum.substr(6, 10))
            });
            this.month = [...new Set(this.month)]
            this.year = [...new Set(this.year)]
        },
        successMsg(message,color) {
            this.successMessage = message
            this.color = color
            setTimeout(() => {
                this.successMessage = ''
            }, 2000)
        },
    },
    computed: {
        filteredPatients() {
            return this.patients.filter(patient => patient.name.includes(this.search))
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    &-input {
        display: block;
        width: 80%;
        margin: 0 auto;
        height: 30px;
        border-radius: 25px;
        border: 2px solid #076a8b;
        padding: 5px 7px;
        font-size: 17px;
        margin-bottom: 30px;
        padding-left: 15px;
        &:focus {
            outline: none !important;
            border: 2px solid #076a8b;
            box-shadow: 0 0 10px #719ECE;
        }
    }
    &-icon {
        position: relative;
        bottom: 65px;
        left: 240px;
        width: 26px;
        color: #5ab1cd;
    }
}
.patient {
    &-container {
        width: 300px;
        margin: 0 auto;
    }
    &-item {
        text-align: center;
        padding: 1px;
        border-radius: 30px;
        margin-bottom: 10px;
        cursor: pointer;
        border: 2px solid #076a8b;
        font-weight: 600;
        color: #0f4050;
        &:hover {
            background-color: rgb(205, 237, 248);
        }
    }
    &-name {
        letter-spacing: 0.7px;
        padding: 8px;
    }
}
</style>