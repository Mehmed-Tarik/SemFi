<template>
    <div class="geratecheck-container">
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

        <div style="margin: auto; width: 95.1%;">
        <form @submit.prevent="onSubmit">
            <table>
                <tr>
                    <th style="border-top-left-radius: 8px;">MP-Geräte:</th>
                    <th>Beatmungsgerät(Einsatzgerät)</th>
                    <th>(Funktion, Parameter, Akku)</th>
                    <th>Beatmungsgerät(Einsatzgerät)</th>
                    <th>(Funktion, Parameter, Akku)</th>
                    <th>Absauggerät(Einsatzgerät)</th>
                    <th>(Funktion, Filter, max Sog 0,8 bar)</th>
                    <th>Absauggerät(Einsatzgerät)</th>
                    <th>(Funktion, Filter, max Sog 0,8 bar)</th>
                    <th>Beatmungsbeutel</th>
                    <th>(Funktion, Dichtigkeit, Maske)</th>
                    <th>Notfallset komplett:</th>
                    <th>(Liste *Inhalt Notfallset*)</th>
                    <th>Pulsoximeter:</th>
                    <th>(Alarmgrenzen, Sensoren)</th>
                    <th>Wechseldruckmatratratze:</th>
                    <th>(Funktion, Einstellung, KG)</th>
                    <th>Inhalationsgerät:</th>
                    <th style="border-bottom-left-radius: 8px;">(Funktion, Zubehör)</th>
                    <th v-if="!overview" class="input-column" style="color:#003648">Actions:</th>
                </tr>
                <tr>
                    <th><b>T/ N</b></th>
                    <th>T</th>
                    <th>N</th>
                    <th>T</th>
                    <th>N</th>
                    <th>T</th>
                    <th>N</th>
                    <th>T</th>
                    <th>N</th>
                    <th>T</th>
                    <th>N</th>
                    <th>T</th>
                    <th>N</th>
                    <th>T</th>
                    <th>N</th>
                    <th>T</th>
                    <th>N</th>
                    <th>T</th>
                    <th>N</th>
                </tr>
                <tr >
                    <tr v-for="(gerat, index) in gerate" :key="gerat._id"
                        :style="[gerat.isReport ? 'background-color: rgb(241 84 84 / 32%)' : '', 'cursor: pointer']"
                        @click="showDatum(gerat,index)">
                        <td>{{index + 1}}</td>
                        <td style="color: #003648" v-for="(g, index) in gerat.xbuttons" :key="index">
                            <span v-if="g" style="font-weight: 700">{{gerat.nurse}}</span>
                        </td>
                        <td v-if="!overview" class="input-column" style="display: flex; justify-content: center">
                            <svg v-if="nurse.isAdmin" @click="openDeleteModal(gerat._id)" class="action-icon" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg>
                            <svg v-if="nurse.isAdmin" @click="editItem(gerat)" class="action-icon edit" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.637.438q-.363.162-.763.162H10q-.425 0-.712-.287Q9 17.125 9 16.7v-2.425q0-.4.15-.763q.15-.362.425-.637Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"/></svg>
                            <svg v-if="!nurse.isAdmin" @click="report(gerat._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                            <svg v-if="nurse.isAdmin && gerat.isReport" @click="adminReport(gerat._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                        </td>

                    </tr>
                    <tr v-if="nurse.isAdmin || paginationMonth === month"> <!-- v-if="paginationMonth === month || !isEdit" -->
                        <td v-if="!overview" class="input-column">{{gerate.length + 1}}</td>
                        <td class="input-column" v-for="n in xbuttons.length" :key="n">
                            <Xbutton v-if="!overview" class="area" :number="n" :array="xbuttons" @marked="marked" :isEdit="isEdit" /> 
                        </td> 
                        <td class="input-column" v-if="gerate.length + 1 <= 31  && !overview">
                            <input v-if="!isEdit && !page" type="submit" value="Save" class="saveBtn" />
                            <div class="saveBtn editBtn" v-if="isEdit" @click="edit"><span>Edit</span></div>
                        </td>
                        <td v-if="gerate.length + 1> 31">
                            <button :disabled="true" class="errorBtn">X</button>
                        </td>
                    </tr>
                </tr>
            </table>
            <div v-if="!isLoaded" class="orbit-spinner gerate-spinner">
                    <div class="orbit"></div>
                    <div class="orbit"></div>
                    <div class="orbit"></div>
            </div>
            <div v-if="!overview" class="pagination">       
                <svg v-if="paginationMonth > 1" @click="prev" class="pagination-btn" viewBox="0 0 24 24"><path fill="currentColor" d="M21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2M7 12l5 5v-3h4v-4h-4V7l-5 5Z"/></svg>
                <p><span>{{paginationMonth }}</span> of <span>{{month}}</span></p>
                <svg v-if="paginationMonth < month" @click="next" class="pagination-btn" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2m14-7l-5-5v3H8v4h4v3l5-5Z"/></svg>
            </div>                                     
        </form>
        </div>
        <div v-if="showDate" class="date-modal" :style="increaseLeft()">
            <span class="date-modal-day">{{modalDay + 1}}</span>
            <div class="date-modal-date">
                <span>{{modalDatum}}</span>
                <span>{{modalUhrzeit}}</span>
            </div>
        </div>
        <ReportModal :openReport="openReport" :openAdminReport="openAdminReport" @closeReport="closeReport"
                :reportID="ID" :isAdmin="nurse.isAdmin" @reportUpdated="reportUpdated"
                :reportMessageAdmin="reportMessageAdmin" @closeAdminReport="closeAdminReport" @reportUploaded="reportUploaded"
                :protokolName="protokolName" :patient="patient" :page="month" :nurseName="nurse.username"/>
    </div>
</template>

<script>
import GerateService from "@/GerateService"
import ReportService from "@/ReportService"

import FormTop from "./ProtocolComponents/FormTop.vue"
import Pagination from "./ProtocolComponents/Pagination.vue"
import ProtokolHeader from "../ProtokolHeader.vue"
import ReportModal from "./ProtocolComponents/ReportModal.vue"
import SuccessMessage from "./ProtocolComponents/SuccessMessage.vue"
import DeleteModal from "./ProtocolComponents/DeleteModal.vue"
import Xbutton from "./ProtocolComponents/Xbuttons.vue"

export default {
    name: 'Geratecheck',
    components: {
        ProtokolHeader, FormTop, Pagination, Xbutton,
        ReportModal, SuccessMessage, DeleteModal
    },
    props: ['nurse','patient','protokolName','page','successMessage','color','overview','von','bis'],
    emits: ['backProtokol','successMsg','backOverview'],
    data() {
        return {
            xbuttons: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            gerate: [],
            month: '',
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
    this.gerate = await GerateService.getSpecificGeratecheck(this.patient.name,this.month)
    this.isLoaded = true

    if(this.overview === 'overview') {
        this.gerate = await GerateService.getDataForOverview(this.patient.name,this.von,this.bis)
    }
    },
    methods: {
        async prev() {
            this.paginationMonth--
            this.gerate = await GerateService.getSpecificGeratecheck(this.patient.name,this.paginationMonth)
        },
        async next() {
            this.paginationMonth++
            this.gerate = await GerateService.getSpecificGeratecheck(this.patient.name,this.paginationMonth)
        },
        marked(num) {
            this.xbuttons[num] = !this.xbuttons[num]
        },
        resetValues() {
            for(let i=0;i<this.xbuttons.length;i++){
                this.xbuttons[i] = false
            }
        },
        editItem(data) {
            this.showDate = !this.showDate
            this.ID = data._id
            this.xbuttons = data.xbuttons
            this.isEdit = true
        },
        async edit() {
            await GerateService.editGeratecheck (
                this.ID,
                this.xbuttons,
            ).then(response => {
                this.$emit('successMsg',response.data,'color: #972f08; background-color: rgb(231 112 67 / 83%);')
            })
            this.gerate = await GerateService.getSpecificGeratecheck(this.patient.name,this.month)
            this.resetValues()
            this.isEdit = false
        },
        openDeleteModal(id) {
            this.showDate = !this.showDate
            this.openDelete = true
            this.ID = id
        },
        closeDeleteModal(value) {
            this.openDelete = value
        },
        async deleteItem(id) {
            await GerateService.deleteGeratecheck(id)
            .then(response => {
                this.$emit('successMsg',response.data,'color: #red; background-color: #d94b4bd6;')
            })
            await ReportService.deleteReport(id)
            this.openDelete = false
            this.gerate = await GerateService.getSpecificGeratecheck(this.patient.name,this.month)
        },
        report(id) {
            this.showDate = !this.showDate
            this.ID = id
            this.openReport = true
        },
        closeReport(value){
            this.openReport = value
        },
        closeAdminReport(value){
            this.openAdminReport = value
        },
        async adminReport(id) {
            this.showDate = !this.showDate
            this.ID = id
            let a = {}
            a = await GerateService.getReport(id,this.patient.name)
            this.reportMessageAdmin = a[0].reportMessage
            this.openAdminReport = true
        },
        async reportUploaded(message) {
            this.openReport = false
            this.openAdminReport = false
            this.gerate = await GerateService.getSpecificGeratecheck(this.patient.name,this.month)
            this.$emit('successMsg',message,'color: darkgreen; background-color: #abf5abe8;')
        },
        reportUpdated(message) {
            this.openReport = false
            this.$emit('successMsg',message,'color: darkgreen; background-color: #abf5abe8;')
        },
        async onSubmit() {
            console.log(this.month);
            await GerateService.insertGeratecheck (
                this.patient.name,
                this.nurse.username,
                this.month,
                this.xbuttons
            ).then(response => {
                this.$emit('successMsg',response.data,'color: darkgreen; background-color: #abf5abe8;')
            })
            this.resetValues()
            this.gerate = await GerateService.getSpecificGeratecheck(this.patient.name,this.month)
        },
        showDatum(data,index) {
            this.showDate = !this.showDate 
            this.moveDataModal = 300 + index * 50
            this.nurse.isAdmin ? this.moveDataModal = 300 + index * 50 : this.moveDataModal = 300 + index * 30
            this.modalDatum = data.datum
            this.modalUhrzeit = data.uhrzeit
            this.modalDay = index
        },
        increaseLeft() { return `left:${this.moveDataModal}px` },
        openErrorModal() {
            this.excededMonthError = true
        }
    }
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

/* border-collapse */
// tr>*:not(:first-child) { border-top: 0; }
// tr:not(:first-child)>* { border-left:0; }
.input-column {
    border: 1px solid #ffffff;
    padding: 0;
    margin: 5px;
    margin-top: 3.5px;
    height: 25px;
}
.area {
    width: 30px;
    height: 25px;
}
.pagination {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
    &-btn {
        display: block;
        width: 50px;
        color: #074a60;
        cursor: pointer;
    }
    span {
        color: #074a60;
        font-weight: 600;
    }
}
.date-modal {
    position: absolute;
    width: 250px;
    height: 60px;
    background-color: rgb(0 54 72 / 96%);
    top: 350px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    &-day {
        text-align: start !important;
        font-weight: 500 !important;
    }
    &-date {
        display: flex;
        flex-direction: column;
        position: absolute;
        margin-left: 75px;
        margin-top: 1px;
    }
    span {
        margin: 6px;
        font-weight: 600;
        color: #fff;
        letter-spacing: 1px;
        text-align: center;
    }
}
.errorBtn {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: brown;
    font-weight: 700;
    border: none;
    border-radius: 5px;
    color: #fff;
}
.gerate-spinner {
    position: absolute;
    top: 400px;
    left: 400px;
}
</style>