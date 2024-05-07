<template>
        <div class="uberwachung-container">
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
            <div>
            <div class="col col-1">
                <div><span>Insulinpflichtig: </span>
                    <svg v-if="patient.insulinpflichtig" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg>
                    <svg v-if="!patient.insulinpflichtig" class="ja-nein-icons nein" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M165.7 90.3a8.1 8.1 0 0 0-11.4 0L128 116.7l-26.3-26.4a8.1 8.1 0 0 0-11.4 11.4l26.4 26.3l-26.4 26.3a8.1 8.1 0 0 0 0 11.4a8.2 8.2 0 0 0 11.4 0l26.3-26.4l26.3 26.4a8.2 8.2 0 0 0 11.4 0a8.1 8.1 0 0 0 0-11.4L139.3 128l26.4-26.3a8.1 8.1 0 0 0 0-11.4Z"/><path fill="currentColor" d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm0 176H48V48h160v160Z"/></svg>
                </div>
                <div><span>Insulin - Art: </span><span style="color: #076a8b; font-weight: 600">{{patient.insulinArt}}</span></div>
                <div><span>Dosierung: </span><svg v-if="patient.dosierung" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg></div>
                <div><span>Kostform (BE): </span><span style="color: #076a8b; font-weight: 600">{{patient.kostform}}</span></div>
            </div>
            <div class="col col-2">
                <div ><span>orale Antidiabetika: </span>
                    <svg v-if="patient.oral" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg>
                    <svg v-if="!patient.oral" class="ja-nein-icons nein" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M165.7 90.3a8.1 8.1 0 0 0-11.4 0L128 116.7l-26.3-26.4a8.1 8.1 0 0 0-11.4 11.4l26.4 26.3l-26.4 26.3a8.1 8.1 0 0 0 0 11.4a8.2 8.2 0 0 0 11.4 0l26.3-26.4l26.3 26.4a8.2 8.2 0 0 0 11.4 0a8.1 8.1 0 0 0 0-11.4L139.3 128l26.4-26.3a8.1 8.1 0 0 0 0-11.4Z"/><path fill="currentColor" d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm0 176H48V48h160v160Z"/></svg>
                </div>
                <div><span>Dosierung: </span><svg v-if="patient.dosierung" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg></div>
            </div>
            <div class="col col-3">
                <div><span class="title">Mögliche Injektionsstelle-/Lokalisation:</span> <span class="item">OS</span>= Oberschenkel  <span class="item">OA</span>= Oberarm  <span class="item">BA</span>= Bauch  <span class="item">re.</span>= rechts  <span class="item">li.</span>= links</div>
            </div>
            </div>
            <form @submit="onSubmit">
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th style="border-top-left-radius: 8px;">Datum</th>
                            <th>Uhrzeit</th>
                            <th>BZ- mmol/l</th>
                            <th>Insulin</th>
                            <th>I.E.</th>
                            <th>Lokal. s.c.</th>
                            <th>Bemerkungen</th>
                            <th>Hz.</th>
                            <th v-if="!overview" style="border-top-right-radius: 8px;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="uberwachung in visibleUberwachung"
                                   :visibleUberwachung="visibleUberwachung"
                                   :uberwachung="uberwachung"
                                   :currentPage="currentPage"
                                   :key="uberwachung._id"
                                   :style="[uberwachung.isReport ? 'background-color: rgb(241 84 84 / 32%)' : '']">
                            <td>{{uberwachung.datum}}</td>
                            <td>{{uberwachung.uhrzeit}}</td>
                            <td>{{uberwachung.bzMol}}</td>
                            <td>{{uberwachung.insulin}}</td>
                            <td>{{uberwachung.ie}}</td>
                            <td>{{uberwachung.lokal}}</td>
                            <td>{{uberwachung.bemerkungen}}</td>
                            <td>{{uberwachung.nurse}}</td>
                            <td v-if="!overview" style="display: flex; justify-content: center">
                                <svg v-if="nurse.isAdmin" @click="openDeleteModal(uberwachung._id)" class="action-icon" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg>
                                <svg v-if="nurse.isAdmin" @click="editItem(uberwachung)" class="action-icon edit" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.637.438q-.363.162-.763.162H10q-.425 0-.712-.287Q9 17.125 9 16.7v-2.425q0-.4.15-.763q.15-.362.425-.637Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"/></svg>
                                <svg v-if="!nurse.isAdmin" @click="report(uberwachung._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                                <svg v-if="nurse.isAdmin && uberwachung.isReport" @click="adminReport(uberwachung._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                            </td>
                        </tr>
                        <tr class="input-row" v-if="((currentPage + 1) === totalPages) || currentMustLover || uberwachung.length === 0 || page || page === 0">
                            <td><input v-if="isEdit" class="edit-input table-input" v-model="eDate"  type="date"></td>
                            <td></td>
                            <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="bzMol" placeholder="BZ- mmol/l" type="number"></td>
                            <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="insulin" placeholder="Insulin" type="text"></td>
                            <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="ie" placeholder="I.E." type="number"></td>
                            <td>
                            <select v-model="lokal" :class="[isEdit ? 'edit-input':'','table-input']" placeholder="Select...">
                                <option v-for="lokal in lokalsc" :key="lokal">{{lokal}}</option>
                            </select>
                            </td>
                            <td><input :class="[isEdit ? 'edit-input':'','table-input']" v-model="bemerkungen" placeholder="Bemerkungen" type="text"></td>
                            <td><p style="font-weight: 700; color: #003648">{{nurse.username}}</p></td>
                            <td>
                                <input v-if="!isEdit && !page" type="submit" value="Save" class="saveBtn" />
                                <div class="saveBtn editBtn" v-if="isEdit" @click="edit"><span>Edit</span></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div class="down-col">
                <div>„mg/dl" oder "mmol/l"</div>
                <div>mg/dl x 0,0555 = mmol/l</div>
                <div>mmol/l x 18,0182 = mg/dl</div>
            </div>
            <div v-if="!isLoaded" class="orbit-spinner">
                    <div class="orbit"></div>
                    <div class="orbit"></div>
                    <div class="orbit"></div>
            </div>
            <Pagination v-if="!isEdit" :protokolArray="uberwachung" :currentPage="currentPage" :pageSize="pageSize" 
                        :currentMustLover="currentMustLover" :hidePrevious="hidePrevious" @updatePage="updatePage" />
                        
        <ReportModal :openReport="openReport" :openAdminReport="openAdminReport" @closeReport="closeReport"
                     :reportID="ID" :isAdmin="nurse.isAdmin" @reportUploaded="reportUploaded"
                     :reportMessageAdmin="reportMessageAdmin" @closeAdminReport="closeAdminReport"
                     :protokolName="protokolName" :patient="patient" :page="currentPage" :nurseName="nurse.username" @reportUpdated="reportUpdated"/>
    </div>
</template>

<script>
import BzUberwachungService from "@/BzuberwachungService"
import ReportService from "@/ReportService"

import ProtokolHeader from "../ProtokolHeader.vue"
import FormTop from "./ProtocolComponents/FormTop.vue"
import Pagination from "./ProtocolComponents/Pagination.vue"
import ReportModal from "./ProtocolComponents/ReportModal.vue"
import SuccessMessage from "./ProtocolComponents/SuccessMessage.vue"
import DeleteModal from "./ProtocolComponents/DeleteModal.vue"

export default {
    name: "BzUberwachung",
    components: {
        ProtokolHeader, FormTop, Pagination,
        ReportModal, SuccessMessage, DeleteModal
    },
    props: ['nurse','patient','protokolName','page','month','year','successMessage','color','pageSize', 'overview', 'von', 'bis'],
    emits: ['backProtokol', 'topDate','successMsg','backOverview'],
    data() {
        return {
            uberwachung: [],
            eDate: '',
            bzMol: null,
            insulin: '',
            ie: null,
            lokalsc: ['OS','OA','BA','re','li'],
            lokal: 'OS',
            bemerkungen: '',
            openReport: false,
            openAdminReport: false,
            ID: '',
            reportMessageAdmin: '',
            currentPage: 0,
            visibleUberwachung: [],
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
        this.uberwachung = await BzUberwachungService.getSpecificBzuberwachung(this.patient.name)
        this.isLoaded = true
        // OLD WORKING PERFECTLY (WITHOUT REPORT)
        // this.currentPage = Math.ceil(this.uberwachung.length / this.pageSize) 
        // this.updateVisible()
        // this.alterCurrentValue()

        if(this.overview === 'overview') {
            this.visibleUberwachung = await BzUberwachungService.getDataForOverview(this.patient.name,this.von,this.bis)
            this.currentPage = 0
        }

        // NEW (WITH REPORT)
        if(this.page || this.page === 0) {
            this.currentPage = this.page
            this.updateVisible()
            this.currentMustLover = false
            this.$emit('topDate', this.visibleUberwachung)
        } else {
            if(!this.overview) {
                this.currentPage = Math.ceil(this.uberwachung.length / this.pageSize)  
                this.updateVisible()
                this.alterCurrentValue()
            }
        }
        this.currentPage === 1 && this.visibleUberwachung.length === this.pageSize ? this.hidePrevious = true : this.hidePrevious = false
    },
    methods: {
        async viewAll() {
            this.viewall = !this.viewall
            this.isLoaded = false
            this.uberwachung = await BzUberwachungService.getSpecificBzuberwachung(this.patient.name,this.viewall)
            this.isLoaded = true
            this.currentPage = Math.ceil(this.uberwachung.length / this.pageSize) 
            this.updateVisible()
            this.alterCurrentValue()
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
        this.$emit('topDate', this.visibleUberwachung)
        },
        updateVisible() {
        this.visibleUberwachung = this.uberwachung.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)

        if(this.visibleUberwachung.length === 0 && this.currentPage > 0) {
            this.updatePage(this.currentPage - 1)
        }
        },
        alterCurrentValue() {
            this.totalPages = Math.ceil(this.uberwachung.length / this.pageSize)
            if(this.visibleUberwachung.length === this.pageSize) {
                this.currentPage++
                this.currentMustLover = true               
            } else {
                this.currentMustLover = false
            }
        },
        resetValues() {
            this.bzMol = null
            this.insulin = ''
            this.ie = null
            this.lokal = 'OS'
            this.bemerkungen = ''
        },
        editItem(data) {
            this.currentEdit = this.currentPage
            this.ID = data._id
            this.eDate = data.datum.substr(6,10) + '-' + data.datum.substr(3,2) + '-' + data.datum.substr(0,2)
            this.bzMol = data.bzMol
            this.insulin = data.insulin
            this.ie = data.ie
            this.lokal = data.lokal
            this.bemerkungen = data.bemerkungen
            this.isEdit = true
            if(this.page === undefined)
            this.currentMustLover ? this.currentPage = this.totalPages : this.currentPage = (this.totalPages - 1)
        },
        async edit() {
            await BzUberwachungService.editBzuberwachung (
                this.ID,
                this.eDate.substr(8,10) + '/' + this.eDate.substr(5,2) + '/' + this.eDate.substr(0,4),
                this.bzMol,
                this.insulin,
                this.ie,
                this.lokal,
                this.bemerkungen
            ).then(response => {
                this.$emit('successMsg',response.data,'color: #972f08; background-color: rgb(231 112 67 / 83%);')
            })
            this.uberwachung = await BzUberwachungService.getSpecificBzuberwachung(this.patient.name)
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
            await BzUberwachungService.deleteBzuberwachung(id)
            .then(response => {
                this.$emit('successMsg',response.data,'color: #red; background-color: #d94b4bd6;')
            })
            await ReportService.deleteReport(id)
            this.openDelete = false
            this.uberwachung = await BzUberwachungService.getSpecificBzuberwachung(this.patient.name)
            this.visibleUberwachung.length === 1 ? this.onLastItemUploaded = false : this.onLastItemUploaded = true
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
            a = await BzUberwachungService.getReport(id,this.patient.name)
            console.log(a);
            this.reportMessageAdmin = a[0].reportMessage
            this.openAdminReport = true
        },
        async reportUploaded(message) {
            this.openReport = false
            this.openAdminReport = false
            this.uberwachung = await BzUberwachungService.getSpecificBzuberwachung(this.patient.name)
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
            await BzUberwachungService.insertBzuberwachung (
                this.patient.name,
                this.nurse.username,
                this.bzMol,
                this.insulin,
                this.ie,
                this.lokal,
                this.bemerkungen
            ).then(response => {
                this.$emit('successMsg',response.data,'color: darkgreen; background-color: #abf5abe8;')
            })
            this.currentMustHigher ? this.currentPage++ : ''
            this.currentMustHigher = false
            this.uberwachung = await BzUberwachungService.getSpecificBzuberwachung(this.patient.name),
            this.updateVisible()
            this.alterCurrentValue()
            this.resetValues()
            this.$emit('topDate', this.visibleUberwachung)
            this.viewall = false
            this.currentPage === 1 && this.visibleUberwachung.length === this.pageSize ? this.hidePrevious = true : this.hidePrevious = false
        }
    },
}
</script>

<style lang="scss" scoped>
.uberwachung-container {
    min-width: 1000px;
}
.col {
    display: flex;
    border: 2px solid #076a8b;
    border-radius: 8px;
    margin: auto;
    width: 94.8%;
    min-width: 1000px;
    &-1 {
        justify-content: space-around;
        padding-bottom: 5px;
        div {
            margin-top: auto;
        }
    }
    &-2 {
        justify-content: flex-start;
        padding-bottom: 5px;
        margin-top: 5px;
        div {
            margin-left: 5%;
        }
    }
    &-3 {
        padding: 5px 0;
        margin: 5px auto;
        div {
            margin-left: 3%;
            .title {
                font-weight: 600;
                color: rgb(255, 98, 0);
            }
            .item {
                font-weight: 600;
                color: #076a8b;
            }
        }
    }
}
select {
    width: 100%;
    border-width: 2px;
    height: 37px;
}
option {
    display: block;
    color: #076a8b;
    font-weight: 600;
    padding: 5px;
}
.input-row {
    td {
        padding: 0px 2px;
    }
}
.down-col {
    display: flex;
    justify-content: space-around;
    padding: 3px 0;
}
.orbit-spinner {
    margin: 10px auto;
}
</style>