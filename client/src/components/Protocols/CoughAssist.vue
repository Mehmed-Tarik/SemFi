<template>
    <div class="cough-container">
        <SuccessMessage :message="successMessage" :color="color" />
        <DeleteModal :openDelete="openDelete" :deleteID="ID" @deleteItem="deleteItem" @closeDeleteModal="closeDeleteModal" />
        <ProtokolHeader :isOverview="overview" :protokolName="protokolName" @backProtokol="$emit('backProtokol')" />
        <svg v-if="overview" @click="$emit('backOverview')" class="backBtn backBtnOverview"  viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm37.66 130.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32L139.31 128Z"/></svg>
        <div v-if="overview" class="overview-date">
            <span><b>Von: </b>{{von}}</span>
            <span><b>-</b></span>
            <span><b>Bis: </b>{{bis}}</span>
        </div>
        <div class="container-ftop">
            <div>Name des Patient: <span class="prop-value"> {{patient.name}}</span></div>
            <div>geb.: <span class="prop-value"> {{patient.dateOfBirth}}</span></div>
            <div>Monat: <span class="prop-value" v-if="month<10"> 0{{paginationMonth}} </span> <span class="prop-value" v-else> {{paginationMonth}} </span></div>
            <div>Jahr: <span class="prop-value">{{new Date().getFullYear()}}</span></div>
            <div class="blatt">Blatt Nr.: <span>{{paginationMonth}}</span></div>
        </div>
        <div class="cough-patient-container">
            <h4 style="margin-left: 5%;">Gerätetyp: <span style="font-weight: 400; font-size: 16px;">Ovo nisam uradio u patientu!!!</span></h4>
            <div class="cough-table-container">
                <div class="first-table">
                <table>
                <tr>
                    <td>Modus: Manuel/Auto</td>
                    <td>Inspiration- /IPAP:</td>
                    <td>Ti:</td>
                    <td>Pause:</td>
                    <td>Inspiration wiederholen:</td>
                    <td>Trigger:</td>
                    <td>Exspiration-/EPAP:</td>
                    <td>Te:</td>
                    <td>Zykl. wiederholen:</td>
                </tr>
                <tr>
                    <td>Einstellungen</td>
                    <td style="font-weight: 500">{{patient.inspirationEninstellung}}</td>
                    <td style="font-weight: 500">{{patient.tiEninstellung}}</td>
                    <td style="font-weight: 500">{{patient.pauseEninstellung}}</td>
                    <td style="font-weight: 500">{{patient.widerholenEninstellung}}</td>
                    <td style="font-weight: 500">{{patient.triggerEninstellung}}</td>
                    <td style="font-weight: 500">{{patient.expirationEninstellung}}</td>
                    <td style="font-weight: 500">{{patient.teEninstellung}}</td>
                    <td style="font-weight: 500">{{patient.zyklEninstellung}}</td>
                </tr>
                <tr>
                    <td>Änderung</td>
                    <td style="font-weight: 500">{{patient.inspirationAnderung}}</td>
                    <td style="font-weight: 500">{{patient.tiAnderung}}</td>
                    <td style="font-weight: 500">{{patient.pauseAnderung}}</td>
                    <td style="font-weight: 500">{{patient.widerholenAnderung}}</td>
                    <td style="font-weight: 500">{{patient.triggerAnderung}}</td>
                    <td style="font-weight: 500">{{patient.expirationAnderung}}</td>
                    <td style="font-weight: 500">{{patient.teAnderung}}</td>
                    <td style="font-weight: 500">{{patient.zyklAnderung}}</td>
                </tr>
            </table>
            </div>
            <div class="second-table">
                <table>
                    <tr>
                        <td>Verlauf:</td>
                        <td>Sekret mobilisiert:</td>
                        <td>Legende:</td>
                    </tr>
                    <tr>
                        <td>p = problematisch</td>
                        <td>j = ja</td>
                        <td>PM = Parameter</td>
                    </tr>
                    <tr>
                        <td>u = problemlos</td>
                        <td>n = nein</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            </div>
        </div>
        <div class="f-table">
            <table>
                <tr>
                    <td>Datum</td>
                    <td>PM getestet</td>
                    <td>PM getestet</td>
                    <td>Verlauf (n. Anwendung)</td>
                    <td>Verlauf (n. Anwendung)</td>
                    <td>Sekret mobilisiert</td>
                    <td>Sekret mobilisiert</td>
                </tr>
                <tr>
                    <td>--</td>
                    <td>TD</td>
                    <td>ND</td>
                    <td>TD</td>
                    <td>ND</td>
                    <td>TD</td>
                    <td>ND</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>++</td>
                    <td>++</td>
                    <td>++</td>
                    <td>++</td>
                    <td>++</td>
                    <td>++</td>
                </tr>
            </table>
        </div>
        <div class="s-table">
            <table>
                <tr>
                    <td>adv = problematisch</td>
                    <td>asdv = ja</td>
                    <td>adv = Parameter</td>
                </tr>
                <tr>
                    <td>adv = problematisch</td>
                    <td>asdv = ja</td>
                    <td>adsv = Parameter</td>
                </tr>
                <tr>
                    <td>asdv = problematisch</td>
                    <td>asdv = ja</td>
                    <td>asdv = Parameter</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>

import FormTop from "./ProtocolComponents/FormTop.vue"
import Pagination from "./ProtocolComponents/Pagination.vue"
import ProtokolHeader from "../ProtokolHeader.vue"
import ReportModal from "./ProtocolComponents/ReportModal.vue"
import SuccessMessage from "./ProtocolComponents/SuccessMessage.vue"
import DeleteModal from "./ProtocolComponents/DeleteModal.vue"
import Xbutton from "./ProtocolComponents/Xbuttons.vue"

export default {
    name: 'CoughAssist',
    components: {
        ProtokolHeader, FormTop, Pagination, Xbutton,
        ReportModal, SuccessMessage, DeleteModal
    },
    props: ['nurse','patient','protokolName','page','successMessage','color','overview','von','bis'],
    emits: ['backProtokol','successMsg','backOverview'],
    data() {
        return {

            //----------------------------------------
            showDate: false,
            isEdit: false,
            openReport: false,
            openAdminReport: false,
            ID: '',
            reportMessageAdmin: '',
            openDelete: false,
            paginationMonth: null,
            moveDataModal: 300,
            modalDatum: '',
            modalUhrzeit: '',
            modalDay: 0,
            excededMonthError: false,
            isLoaded: false,
        }
    },
    async created() {
    this.month = new Date().getMonth() + 1
    this.paginationMonth = this.month
    // this.gerate = await GerateService.getSpecificGeratecheck(this.patient.name,this.month)
    // this.isLoaded = true

    // if(this.overview === 'overview') {
    //     this.gerate = await GerateService.getDataForOverview(this.patient.name,this.von,this.bis)
    // }
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
table {
    border-collapse: collapse;
    margin: auto;
    font-size: 0.9em;
    width: 95%;
    min-width: 2300px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
tr { 
    display: block; 
    float: left; 
}
th, td { 
    display: block;
    border: 1px solid rgb(7 74 96 / 50%);; 
    height: 20px;
    padding: 5px;
    text-align: center;
    font-weight: 600;
}
.cough-patient-container {
    width: 95%;
    margin: auto;
}
.first-table {
    margin-left: 5%;
}
.second-table {
    width: 35%;
    margin-left: 56%;
    margin-top: -16%;
}
.f-table {
    margin-top: 10%;
    margin-left: 7.3%;
}
.s-table {
    margin-top: 3%;
    margin-left: 7.3%;
}
</style>