<template>
    <div class="overview">
        <div>
        <SuccessMessage :message="successMessage" :color="color" />
        <div class="header">
            <router-link to="/" class="left"> <svg class="backBtn" viewBox="0 0 24 24"><path fill="currentColor" d="M11.325 15.325q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7l-.9-.9h3.225q.425 0 .7-.288Q16 12.425 16 12t-.287-.713Q15.425 11 15 11h-3.2l.925-.925q.275-.275.263-.688q-.013-.412-.288-.687q-.275-.275-.7-.275q-.425 0-.7.275l-2.6 2.6q-.275.275-.275.7q0 .425.275.7ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg> </router-link>
            <div class="center"> <h2>Overview</h2> </div>
            <div class="right"></div>
        </div>
        <form @submit.prevent="onSubmit">
            <div class="input-container">
                <div class="form-input">
                    <label for="patient">Choose Patinet:</label>
                    <select name="" id="patient" v-model="chosenPatient" @change="inpChange">
                        <option v-for="patient in patients" :key="patient._id" :value="patient">{{patient.name}}</option>
                    </select>
                </div>
                <div class="form-input">
                    <label for="von">Von (Date):</label>
                    <input type="date" id="von" placeholder="patient..." v-model="von" @change="inpChange">
                </div>
                <div class="form-input">
                    <label for="bis">Bis (Date):</label>
                    <input type="date" id="bis" placeholder="patient..." v-model="bis" @change="inpChange">
                </div>
            </div>
            <input value="Search" type="submit" class="saveBtn overBtn">
        </form>
        <div class="protokol-box">
        <div class="protokol-item"
                    v-for="(protokol,index) in protokols"
                    v-bind:item="protokol"
                    v-bind:index="index"
                    v-bind:key="protokol._id"
                    v-on:click="chooseProtokol(protokol)"
                >
                <div class="protokol-name">
                    <span>{{protokol}}</span>
                </div>
        </div>
        </div>
        <div v-if="!protokols.length && submitted" class="orbit-spinner">
            <div class="orbit"></div>
            <div class="orbit"></div>
            <div class="orbit"></div>
        </div>
        </div>
        <div class="protokol-container"><!-- isProtocol izbrisati i onaj gore pa vidjet kako izgleda -->
            <Pflegebericht v-if="chosenProtokol==='Pflegebericht'" :nurse="nurse" :patient="chosenPatient" :protokolName="chosenProtokol" 
                            :overview="'overview'" @backOverview="backOverview" :von="von" :bis="bis" />
            <Beatmung v-if="chosenProtokol==='Beatmungsprotokoll'" :nurse="nurse" :patient="chosenPatient" :protokolName="chosenProtokol" 
                            :overview="'overview'" @backOverview="backOverview" :von="von" :bis="bis" />
            <Gewicht v-if="chosenProtokol==='Protokoll - Gewichtskontrolle'" :nurse="nurse" :patient="chosenPatient" :protokolName="chosenProtokol"
                            :overview="'overview'" @backOverview="backOverview" :von="von" :bis="bis" />
            <BzUberwachung v-if="chosenProtokol==='BZ Überwachung'" :nurse="nurse" :patient="chosenPatient" :protokolName="chosenProtokol"
                            :overview="'overview'" @backOverview="backOverview" :von="von" :bis="bis" />
            <Schmerzerfassung v-if="chosenProtokol==='Schmerzerfassung'" :nurse="nurse" :patient="chosenPatient" :protokolName="chosenProtokol"
                            :overview="'overview'" @backOverview="backOverview" :von="von" :bis="bis" />
            <Vitalzeichen v-if="chosenProtokol==='Vitalzeichenkontrolle'" :nurse="nurse" :patient="chosenPatient" :protokolName="chosenProtokol"
                            :overview="'overview'" @backOverview="backOverview" :von="von" :bis="bis" />
            <Entblockung v-if="chosenProtokol==='Entblockungsprotokoll'" :nurse="nurse" :patient="chosenPatient" :protokolName="chosenProtokol"
                            :overview="'overview'" @backOverview="backOverview" :von="von" :bis="bis" />
            <Anfall v-if="chosenProtokol==='Anfall Protocol'" :nurse="nurse" :patient="chosenPatient" :protokolName="chosenProtokol"
                            :overview="'overview'" @backOverview="backOverview" :von="von" :bis="bis" />
            <Bewegung v-if="chosenProtokol==='Lagerung- Bewegungsplan'" :nurse="nurse" :patient="chosenPatient" :protokolName="chosenProtokol"
                            :overview="'overview'" @backOverview="backOverview" :von="von" :bis="bis" />
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------- -->
            <Geratecheck v-if="chosenProtokol==='Protokoll- Gerätecheck MP'" :nurse="nurse" :patient="chosenPatient" :protokolName="chosenProtokol"
                            :overview="'overview'" @backOverview="backOverview" :von="von" :bis="bis" />
        </div>
    </div>
</template>

<script>
import PatientService from '@/PatientsService'
import OverviewService from '@/OverviewService'

import SuccessMessage from "../components/Protocols/ProtocolComponents/SuccessMessage.vue"

import Anfall from "@/components/Protocols/Anfall.vue"
import BzUberwachung from "@/components/Protocols/BzUberwachung.vue"
import Pflegebericht from "@/components/Protocols/Pflegebericht.vue"
import Beatmung from "@/components/Protocols/Beatmung.vue"
import Vitalzeichen from "@/components/Protocols/Vitalzeichen.vue"
import Gewicht from '@/components/Protocols/Gewicht.vue'
import Schmerzerfassung from '@/components/Protocols/Schmerzerfassung.vue'
import Entblockung from '@/components/Protocols/Entblockung.vue'
import Bewegung from '@/components/Protocols/Bewegung.vue'
import Geratecheck from '@/components/Protocols/Geratecheck.vue'

export default {
    name: 'Overview',
    components: {
        Anfall ,BzUberwachung, Gewicht, Pflegebericht, Geratecheck,
        Beatmung, Vitalzeichen, Schmerzerfassung, Entblockung, Bewegung,
        SuccessMessage
    },
    props: {
        nurse: Object
    },
    emits: ['backOverview','successMsg'],
    data() {
        return {
            patients: [],
            chosenPatient: '',
            von: '',
            bis: '',
            protokols: [],
            chosenProtokol: '',
            submitted: false,
            isProtocol: false,
            successMessage: '',
            color: '',
        }
    },
    async created() {
        this.patients = await PatientService.getPatients()
    },
    methods: {
        backOverview() { 
            this.isProtocol = false 
            this.chosenProtokol = '' 
            console.log(this.chosenProtokol);
        },
        async onSubmit() {
            if(!this.von || !this.bis || !this.chosenPatient) {
                this.successMsg('All field must be filled!','color: #red; background-color: #d94b4bd6;')
            } else {
                this.submitted = true
                this.protokols = await OverviewService.getProtokols(this.chosenPatient.name,this.von,this.bis)
                console.log(this.protokols);
                if(!this.protokols.length) {
                    this.submitted = false
                }
            }
        },
        chooseProtokol(protokol) {
            this.chosenProtokol = protokol
            this.isProtocol = true
            console.log(this.chosenProtokol);
        },
        inpChange() {
            this.protokols = []
            this.chosenProtokol = '' 
            this.submitted = false
        },
        successMsg(message,color) {
            this.successMessage = message
            this.color = color
            setTimeout(() => {
                this.successMessage = ''
            }, 2000)
        },
    }
}
</script>

<style lang="scss" scoped>
.input-container {
    display: flex;
    justify-content: space-around;
    .form-input {
        display: flex;
        flex-direction: column;
        label {
            font-weight: 600;
        }
        select,input[type=date] {
            margin-top: 6px;
            width: 240px;
            height: 42px;
            border-radius: 20px;
            padding-left: 5px;
            border: 2px solid #074a60;
            font-size: 17px;
            font-weight: 600;
            &::placeholder {
                font-weight: 500;
            }
            &:focus::placeholder {
                color: transparent;
            }
            &:focus {
                outline: none !important;
                border: 2px solid #074a60;
                box-shadow: 0 0 5px #719ECE;
            }
        }
        input[type=date] {
            height: 38px
        }
        ::-webkit-calendar-picker-indicator {
            font-size: 20px;
            margin-bottom: -2px;
            margin-right: 10px;
            cursor: pointer;
        }
    }
}
.overBtn {
    display: block;
    width: 15%;
    height: 40px;
    margin: 40px auto;
    border-radius: 30px;
}
// OVO JE KAD IDU NA DRUGU STRANICU
// .protokol {
//     &-item {
//     text-align: center;
//     width: 70%;
//     padding: 1px;
//     border-radius: 10px;
//     margin-bottom: 10px;
//     cursor: pointer;
//     border: 2px solid #0f4050;
//     font-weight: 600;
//     color: #0f4050;
//     margin: 15px auto;
//     height: 6vh;
//     background-color: #99cbf7e0;
//     }
//     &-name {
//         letter-spacing: 0.7px;
//         font-size: large;
//         padding: 8px;
//         margin-top: 8px;
//     }
// }
// OVO JE KAD JE ISPISANO DOLE 
// .protokol {
//     &-item {
//     text-align: center;
//     width: 70%;
//     padding: 1px;
//     border-radius: 20px;
//     margin-bottom: 10px;
//     cursor: pointer;
//     border: 2px solid #0f4050;
//     font-weight: 600;
//     color: #0f4050;
//     margin: 8px auto;
//     background-color: rgb(193 222 247 / 80%);
//     }
//     &-name {
//         letter-spacing: 0.7px;
//         font-size: large;
//         padding: 5px;
//     }
// }
.protokol {
    &-box {
        width: 95%;
        margin: auto;
        text-align: center;
        margin-top: -20px;
        padding-bottom: 10px;
        border-bottom: 4px solid #0f4050;
    }
    &-item {
        display: inline-block;
        background-color: rgb(193 222 247 / 80%);
        text-align: center;
        border: 2px solid #0f4050;
        margin: 3px 4px;
        border-radius: 25px;
        font-weight: 500;
        cursor: pointer;
    }
    &-name {
        letter-spacing: 0.5px;
        font-size: 17px;
        padding: 6px 10px;
        font-weight: 600;
    }
}
.protokol-container {
    margin-bottom: 50px;
}
</style>