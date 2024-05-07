<template>
    <div class="vitalzeichen-container">
        <SuccessMessage :message="successMessage" :color="color" />
        <DeleteModal :openDelete="openDelete" :deleteID="ID" @deleteItem="deleteItem" @closeDeleteModal="closeDeleteModal" />
        <ProtokolHeader :isOverview="overview" :protokolName="protokolName" @backProtokol="$emit('backProtokol')" />
        <svg v-if="overview" @click="$emit('backOverview')" class="backBtn backBtnOverview"  viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm37.66 130.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32L139.31 128Z"/></svg>
        <div v-if="nurse.isAdmin && !overview" class="view-all">
            <button class="view-all-btn" @click="viewAll">
                <span v-if="!viewall">View All</span>
                <span v-if="viewall">View 7 Days</span>
            </button>
        </div>
        <div v-if="overview" class="overview-date">
            <span><b>Von: </b>{{von}}</span>
            <span><b>-</b></span>
            <span><b>Bis: </b>{{bis}}</span>
        </div>
        <FormTop :patient="patient" :currentPage="currentPage" :lower="currentMustLover" :month="month" :year="year" />
        <div class="legend">
            <div class="row-one">
                <span>Beurteilung des Sekrets auf Menge, Farbe und Konsistenz:  <b>O</b> = wenig, <b>1</b> = mäßig viel, <b>2</b> = viel <b>3</b> = klar <b>4</b> = weißlich, <b>5</b> = gelb, <b>6</b> = blutig, <b>7</b> = flüssig, <b>8</b> = zäh, <b>9</b> = übelriechend</span>
            </div>
            <div class="row-two">
                <span><b>ET</b>-Endotracheal   <b>N/O</b>-Nasal/Oral  <b>SG</b>-Subglottisch <b>PT</b>= Paratracheal   <b>IK</b>= Innenkanüle</span>
            </div>
        </div>
        <form @submit="onSubmit">
            <table class="styled-table">
                <thead>
                    <tr>
                        <th style="border-top-left-radius: 8px;">Datum</th>
                        <th>Uhrzeit</th>
                        <th>RR mm/Hg</th>
                        <th>rektal T C°</th>
                        <th>Leiste T C°</th>
                        <th>AF</th>
                        <th>HF</th>
                        <th>SpO₂ %</th>
                        <th>O₂ Gabe</th>
                        <th>Inhalation</th>
                        <th>Beatmung/ Atmung</th>
                        <th>spontan</th>
                        <th>abgelesen</th>
                        <th>justiert</th>
                        <th>entblockt</th>
                        <th>ET</th>
                        <th>N/O</th>
                        <th>SG/ PT</th>
                        <th>Sekret- Beurteilung</th>
                        <th>IK- Wechseln</th>
                        <th>Hz.</th>
                        <th v-if="!overview" style="border-top-right-radius: 8px;">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vitalzeichen in visibleVitalzeichen"
                              :visibleVitalzeichen="visibleVitalzeichen"
                              :vitalzeichen="vitalzeichen"
                              :currentPage="currentPage"
                              :key="vitalzeichen._id"
                              :style="[vitalzeichen.isReport ? 'background-color: rgb(241 84 84 / 32%)' : '']">
                        <td>{{vitalzeichen.datum}}</td>
                        <td>{{vitalzeichen.uhrzeit}}</td>
                        <td>{{vitalzeichen.rr}}</td>
                        <td><span v-if="vitalzeichen.rektal" style="font-weight: 700">X</span></td>
                        <td><span v-if="vitalzeichen.leiste" style="font-weight: 700">X</span></td>
                        <td>{{vitalzeichen.af}}</td>
                        <td>{{vitalzeichen.hf}}</td>
                        <td>{{vitalzeichen.spo2}}</td>
                        <td>{{vitalzeichen.gabe}}</td>
                        <td>{{vitalzeichen.inhalation}}</td>
                        <td><span v-if="vitalzeichen.atmung" style="font-weight: 700">X</span></td>
                        <td><span v-if="vitalzeichen.spontan" style="font-weight: 700">X</span></td>
                        <td>{{vitalzeichen.abgelesen}}</td>
                        <td>{{vitalzeichen.justiert}}</td>
                        <td>{{vitalzeichen.entblockt}}</td>
                        <td>{{vitalzeichen.et}}</td>
                        <td>{{vitalzeichen.no}}</td>
                        <td>{{vitalzeichen.sg}}</td>
                        <td>{{vitalzeichen.sekret}}</td>
                        <td><span v-if="vitalzeichen.wechseln" style="font-weight: 700">X</span></td>
                        <td>{{vitalzeichen.nurse}}</td>
                        <td v-if="!overview" style="display: flex; justify-content: center">
                            <!-- <svg v-if="nurse.isAdmin" @click="deleteItem(vitalzeichen._id)" class="action-icon" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg> -->
                            <svg v-if="nurse.isAdmin" @click="openDeleteModal(vitalzeichen._id)" class="action-icon" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg>
                            <svg v-if="nurse.isAdmin" @click="editItem(vitalzeichen)" class="action-icon edit" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.637.438q-.363.162-.763.162H10q-.425 0-.712-.287Q9 17.125 9 16.7v-2.425q0-.4.15-.763q.15-.362.425-.637Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"/></svg>
                            <svg v-if="!nurse.isAdmin" @click="report(vitalzeichen._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                            <svg v-if="nurse.isAdmin && vitalzeichen.isReport" @click="adminReport(vitalzeichen._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                        </td>
                    </tr>
                    <tr class="input-row" v-if="((currentPage + 1) === totalPages) || currentMustLover || vitalzeichen.length === 0 || page || page === 0">
                        <td><input v-if="isEdit" class="edit-input table-input" v-model="eDate" type="date"></td>
                        <td></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="rr" placeholder="Vti (ml)" type="text"></td>
                        <td><div @click="OnBtn(1)" :class="[isEdit ? 'xbutton-edit':'','xbutton']"><span v-if="rektal">X</span></div></td>
                        <td><div @click="OnBtn(2)" :class="[isEdit ? 'xbutton-edit':'','xbutton']"><span v-if="leiste">X</span></div></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="af" placeholder="Vti (ml)" type="text"></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="hf" placeholder="Vti (ml)" type="text"></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="spo2" placeholder="Vti (ml)" type="text"></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="gabe" placeholder="Vti (ml)" type="text"></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="inhalation" placeholder="Vti (ml)" type="text"></td>
                        <td><div @click="OnBtn(3)" :class="[isEdit ? 'xbutton-edit':'','xbutton']"><span v-if="atmung">X</span></div></td>
                        <td><div @click="OnBtn(4)" :class="[isEdit ? 'xbutton-edit':'','xbutton']"><span v-if="spontan">X</span></div></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="abgelesen" placeholder="Vti (ml)" type="text"></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="justiert" placeholder="Vti (ml)" type="text"></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="entblockt" placeholder="Vti (ml)" type="text"></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="et" placeholder="Vti (ml)" type="text"></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="no" placeholder="Vti (ml)" type="text"></td>
                        <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="sg" placeholder="Vti (ml)" type="text"></td>
                        <td><input min="0" max="9" :class="[isEdit ? 'edit-input':'','table-input']" v-model="sekret" placeholder="Vti (ml)" type="number"></td>
                        <td><div @click="OnBtn(5)" :class="[isEdit ? 'xbutton-edit':'','xbutton']"><span v-if="wechseln">X</span></div></td>
                        <td><p style="font-weight: 700; color: #003648">{{nurse.username}}</p></td>
                        <td>
                            <input v-if="!isEdit && !page" type="submit" value="Save" class="saveBtn" />
                            <div class="saveBtn editBtn" v-if="isEdit" @click="edit"><span>Edit</span></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        <div v-if="!isLoaded" class="orbit-spinner">
                <div class="orbit"></div>
                <div class="orbit"></div>
                <div class="orbit"></div>
        </div>
        <Pagination v-if="!isEdit" :protokolArray="vitalzeichen" :currentPage="currentPage" :pageSize="pageSize" 
            :currentMustLover="currentMustLover" :hidePrevious="hidePrevious" @updatePage="updatePage" />

        <ReportModal :openReport="openReport" :openAdminReport="openAdminReport" @closeReport="closeReport"
            :reportID="ID" :isAdmin="nurse.isAdmin" @reportUpdated="reportUpdated"
            :reportMessageAdmin="reportMessageAdmin" @closeAdminReport="closeAdminReport" @reportUploaded="reportUploaded"
            :protokolName="protokolName" :patient="patient" :page="currentPage" :nurseName="nurse.username"/>
    </div>
</template>

<script>
import VitalzeichenService from "@/VitalzeichenService"
import ReportService from "@/ReportService"

import FormTop from "./ProtocolComponents/FormTop.vue"
import Pagination from "./ProtocolComponents/Pagination.vue"
import ProtokolHeader from "../ProtokolHeader.vue"
import ReportModal from "./ProtocolComponents/ReportModal.vue"
import SuccessMessage from "./ProtocolComponents/SuccessMessage.vue"
import DeleteModal from "./ProtocolComponents/DeleteModal.vue"

export default {
    name: 'Vitalzeichen',
    components: {
        ProtokolHeader, FormTop, Pagination, 
        ReportModal, SuccessMessage, DeleteModal
    },
    props: ['nurse','patient','protokolName','page','month','year','successMessage','color','pageSize', 'overview', 'von', 'bis'],
    emits: ['backProtokol','topDate','successMsg','backOverview'],
    data() {
        return {
            vitalzeichen: [],
            visibleVitalzeichen: [],
            eDate: '',
            rr: null,
            rektal: false,
            leiste: false,
            af: null,
            hf: null,
            spo2: null,
            gabe: null,
            inhalation: '',
            atmung: false,
            spontan: false,
            abgelesen: null,
            justiert: null,
            entblockt: null,
            et: null,
            no: null,
            sg: null,
            sekret: null,
            wechseln: false,
            openReport: false,
            openAdminReport: false,
            ID: '',
            reportMessageAdmin: '',
            currentPage: 0,
            currentMustLover: false,
            currentMustHigher: false,
            totalPages: null,
            isEdit: false,
            currentEdit: null,
            isLoaded: false,
            hidePrevious: false,
            viewall: false,
            openDelete: false,
            onLastItemUploaded: false,
        }
    },
    async created() {
        this.vitalzeichen = await VitalzeichenService.getSpecificVitalzeichen(this.patient.name)
        this.isLoaded = true

        if(this.overview === 'overview') {
            this.visibleVitalzeichen = await VitalzeichenService.getDataForOverview(this.patient.name,this.von,this.bis)
            this.currentPage = 0
        }

        if(this.page || this.page === 0) {
            this.currentPage = this.page
            this.updateVisible()
            this.currentMustLover = false
            this.$emit('topDate', this.visibleVitalzeichen)
        } else {
            if(!this.overview) {
                this.currentPage = Math.ceil(this.vitalzeichen.length / this.pageSize) 
                this.updateVisible()
                this.alterCurrentValue()
            }
        }
        this.currentPage === 1 && this.visibleVitalzeichen.length === this.pageSize ? this.hidePrevious = true : this.hidePrevious = false
    },
    methods: {
        async viewAll() {
            this.viewall = !this.viewall
            this.isLoaded = false
            this.vitalzeichen = await VitalzeichenService.getSpecificVitalzeichen(this.patient.name,this.viewall)
            this.isLoaded = true
            this.currentPage = Math.ceil(this.vitalzeichen.length / this.pageSize) 
            this.updateVisible()
            this.alterCurrentValue()
        },
        OnBtn(num) {
            switch(num) {
                case 1: this.rektal = !this.rektal; break;
                case 2: this.leiste = !this.leiste; break;
                case 3: this.atmung = !this.atmung; break;
                case 4: this.spontan = !this.spontan; break;
                case 5: this.wechseln = !this.wechseln; break;
            }
        },
        updatePage(pageNumber) {
        if(this.currentMustLover === true) {
           this.currentMustLover = false
           pageNumber = pageNumber - 1 
           this.currentMustHigher = true
        }
        this.currentPage = pageNumber
        this.onLastItemUploaded ? this.currentPage++ : ''
        this.updateVisible()
        this.$emit('topDate', this.visibleVitalzeichen)
        },
        updateVisible() {
        this.visibleVitalzeichen = this.vitalzeichen.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)

        if(this.visibleVitalzeichen.length === 0 && this.currentPage > 0) {
            this.updatePage(this.currentPage - 1)
        }
        },
        alterCurrentValue() {
            this.totalPages = Math.ceil(this.vitalzeichen.length / this.pageSize)
            if(this.visibleVitalzeichen.length === this.pageSize) {
                this.currentPage++
                this.currentMustLover = true               
            } else {
                this.currentMustLover = false
            }
        },
        resetValues() {
            this.rr = null
            this.rektal = false
            this.leiste = false
            this.af = null
            this.hf = null
            this.spo2 = null
            this.gabe = null
            this.inhalation = ''
            this.atmung = false
            this.spontan = false
            this.abgelesen = null
            this.justiert = null
            this.entblockt = null
            this.et = null
            this.no = null
            this.sg = null
            this.sekret = null
            this.wechseln = false
        },
        editItem(data) {
            this.currentEdit = this.currentPage
            this.ID = data._id
            this.eDate = data.datum.substr(6,10) + '-' + data.datum.substr(3,2) + '-' + data.datum.substr(0,2)
            //-----------------------------------------------------------------
            this.rr = data.rr
            this.rektal = data.rektal
            this.leiste = data.leiste
            this.af = data.af
            this.hf = data.hf
            this.spo2 = data.spo2
            this.gabe = data.gabe
            this.inhalation = data.inhalation
            this.atmung = data.atmung
            this.spontan = data.spontan
            this.abgelesen = data.abgelesen
            this.justiert = data.justiert
            this.entblockt = data.entblockt
            this.et = data.et
            this.no = data.no
            this.sg = data.sg
            this.sekret = data.sekret
            this.wechseln = data.wechseln
            //-----------------------------------------------------------------
            this.isEdit = true
            if(this.page === undefined)
            this.currentMustLover ? this.currentPage = this.totalPages : this.currentPage = (this.totalPages - 1)
        },
        async edit() {
            await VitalzeichenService.editVitalzeichen (
                this.ID,
                this.eDate.substr(8,10) + '/' + this.eDate.substr(5,2) + '/' + this.eDate.substr(0,4),
                this.rr,
                this.rektal,
                this.leiste,
                this.af,
                this.hf,
                this.spo2,
                this.gabe,
                this.inhalation,
                this.atmung,
                this.spontan,
                this.abgelesen,
                this.justiert,
                this.entblockt,
                this.et,
                this.no,
                this.sg,
                this.sekret,
                this.wechseln
            ).then(response => {
                this.$emit('successMsg',response.data,'color: #972f08; background-color: rgb(231 112 67 / 83%);')
            })
            this.vitalzeichen = await VitalzeichenService.getSpecificVitalzeichen(this.patient.name)
            this.currentPage = this.currentEdit
            this.onLastItemUploaded = true
            this.updateVisible()
            this.onLastItemUploaded = false
            this.resetValues()
            this.isEdit = false
        },
        openDeleteModal(id) {
            this.openDelete = true
            this.ID = id
        },
        closeDeleteModal(value) {
            this.openDelete = value
        },
        async deleteItem(id) {
            await VitalzeichenService.deleteVitalzeichen(id)
            .then(response => {
                this.$emit('successMsg',response.data,'color: #red; background-color: #d94b4bd6;')
            })
            await ReportService.deleteReport(id)
            this.openDelete = false
            this.vitalzeichen = await VitalzeichenService.getSpecificVitalzeichen(this.patient.name)
            this.visibleVitalzeichen.length === 1 ? this.onLastItemUploaded = false : this.onLastItemUploaded = true
            this.updateVisible()
            this.onLastItemUploaded = false
            this.alterCurrentValue()
        },
        report(id) {
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
            this.ID = id
            let a = {}
            a = await VitalzeichenService.getReport(id,this.patient.name)
            this.reportMessageAdmin = a[0].reportMessage
            this.openAdminReport = true
        },
        async reportUploaded(message) {
            this.openReport = false
            this.openAdminReport = false
            this.vitalzeichen = await VitalzeichenService.getSpecificVitalzeichen(this.patient.name)
            this.onLastItemUploaded = true
            this.updateVisible()
            this.onLastItemUploaded = false
            this.$emit('successMsg',message,'color: darkgreen; background-color: #abf5abe8;')
        },
        reportUpdated(message) {
            this.openReport = false
            this.$emit('successMsg',message,'color: darkgreen; background-color: #abf5abe8;')
        },
        async onSubmit(e) {
            e.preventDefault()
            await VitalzeichenService.insertVitalzeichen (
                this.patient.name,
                this.nurse.username,
                this.rr,
                this.rektal,
                this.leiste,
                this.af,
                this.hf,
                this.spo2,
                this.gabe,
                this.inhalation,
                this.atmung,
                this.spontan,
                this.abgelesen,
                this.justiert,
                this.entblockt,
                this.et,
                this.no,
                this.sg,
                this.sekret,
                this.wechseln
            ).then(response => {
                this.$emit('successMsg',response.data,'color: darkgreen; background-color: #abf5abe8;')
            })
            this.currentMustHigher ? this.currentPage++ : ''
            this.currentMustHigher = false
            this.vitalzeichen = await VitalzeichenService.getSpecificVitalzeichen(this.patient.name)
            this.updateVisible()
            this.alterCurrentValue()
            this.resetValues()
            this.$emit('topDate', this.visibleVitalzeichen)
            this.viewall = false
            this.currentPage === 1 && this.visibleVitalzeichen.length === this.pageSize ? this.hidePrevious = true : this.hidePrevious = false
        }
    }
}
</script>

<style lang="scss" scoped>
.styled-table {
    min-width: 1200px;
    th,td {
        padding: 10px 3px;
        font-weight: 500;
    }
}
.legend {
    justify-content: space-around;
    border: 2px solid #076a8b;
    border-radius: 8px;
    padding: 5px 0;
    margin: auto;
    width: 94.8%;
    min-width: 1200px;
    margin-bottom: 10px;
    text-align: center;
    span {
        display: block;
        margin: 5px 0;
    }
}
</style>