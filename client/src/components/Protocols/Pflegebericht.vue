<template>
        <div class="pflege-container">
            <SuccessMessage :message="successMessage" :color="color" />
            <DeleteModal :openDelete="openDelete" :deleteID="ID" @deleteItem="deleteItem" @closeDeleteModal="closeDeleteModal" />
            <ProtokolHeader :isOverview="overview" :protokolName="protokolName" @backProtokol="$emit('backProtokol')" />
            <!-- <svg v-if="overview" @click="$emit('backOverview')" class="backBtn backBtnOverview" viewBox="0 0 24 24"><path fill="currentColor" d="M11.325 15.325q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7l-.9-.9h3.225q.425 0 .7-.288Q16 12.425 16 12t-.287-.713Q15.425 11 15 11h-3.2l.925-.925q.275-.275.263-.688q-.013-.412-.288-.687q-.275-.275-.7-.275q-.425 0-.7.275l-2.6 2.6q-.275.275-.275.7q0 .425.275.7ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg> -->
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
            <div class="pflege-tip">
                Besonderheiten-/Auffälligkeiten-/Veränderungen, Beobachtungen im Pflegeprozess/Zielerreichung im Pflegeprozess
            </div>
            <form @submit.prevent="onSubmit">
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th style="border-top-left-radius: 8px;">Datum</th>
                            <th>Uhrzeit</th>
                            <th style="width: 40%">Bericht</th>
                            <th>Stuhlgang</th>
                            <th>Hz.</th>
                            <th v-if="!overview" style="border-top-right-radius: 8px;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pflege in visiblePflege"
                                   :visiblePflege="visiblePflege"
                                   :pflege="pflege"
                                   :currentPage="currentPage"
                                   :key="pflege._id"
                                   :style="[pflege.isReport ? 'background-color: rgb(241 84 84 / 32%)' : '']">
                            <td>{{pflege.datum}}</td>
                            <td>{{pflege.uhrzeit}}</td>
                            <td>{{pflege.bericht}}</td>
                            <td><span v-if="pflege.stuhlgang" style="font-weight: 700">X</span></td>
                            <td>{{pflege.nurse}}</td>
                            <td v-if="!overview" style="display: flex; justify-content: center">
                                <svg v-if="nurse.isAdmin" @click="openDeleteModal(pflege._id)" class="action-icon" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg>
                                <svg v-if="nurse.isAdmin" @click="editItem(pflege)" class="action-icon edit" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.637.438q-.363.162-.763.162H10q-.425 0-.712-.287Q9 17.125 9 16.7v-2.425q0-.4.15-.763q.15-.362.425-.637Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"/></svg>
                                <svg v-if="!nurse.isAdmin" @click="report(pflege._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                                <svg v-if="nurse.isAdmin && pflege.isReport" @click="adminReport(pflege._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                            </td>
                        </tr>
                        <tr class="input-row" v-if="((currentPage + 1) === totalPages) || currentMustLover || pflegebericht.length === 0 || page || page === 0">
                            <td><input v-if="isEdit" class="edit-input table-input" v-model="eDate" type="date"></td>
                            <td></td>
                            <td><textarea v-model="bericht" :class="[isEdit ? 'edit-input':'','bericht']" rows="2" placeholder="Bericht..."></textarea></td>
                            <td><div @click="OnStuhl" :class="[isEdit ? 'edit-xbutton':'','xbutton']"><span v-if="stuhlgang">X</span></div></td>
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
            <Pagination v-if="!isEdit" :protokolArray="pflegebericht" :currentPage="currentPage" :pageSize="pageSize" 
                        :currentMustLover="currentMustLover" :hidePrevious="hidePrevious" @updatePage="updatePage" />

        <ReportModal :openReport="openReport" :openAdminReport="openAdminReport" @closeReport="closeReport"
                :reportID="ID" :isAdmin="nurse.isAdmin" @reportUpdated="reportUpdated"
                :reportMessageAdmin="reportMessageAdmin" @closeAdminReport="closeAdminReport" @reportUploaded="reportUploaded"
                :protokolName="protokolName" :patient="patient" :page="currentPage" :nurseName="nurse.username"/>
    </div>
</template>

<script>
import Pflegebericht from "@/PflegeberichtService"
import ReportService from "@/ReportService"

import FormTop from "./ProtocolComponents/FormTop.vue"
import Pagination from "./ProtocolComponents/Pagination.vue"
import ProtokolHeader from "../ProtokolHeader.vue"
import ReportModal from "./ProtocolComponents/ReportModal.vue"
import SuccessMessage from "./ProtocolComponents/SuccessMessage.vue"
import DeleteModal from "./ProtocolComponents/DeleteModal.vue"

export default {
    name: "Pflegebericht",
    components: {
        ProtokolHeader, FormTop, Pagination,
        ReportModal, SuccessMessage, DeleteModal
    },
    props: ['nurse','patient','protokolName','page','month','year','successMessage','color','pageSize', 'overview', 'von', 'bis'],
    emits: ['backProtokol','topDate','successMsg','backOverview'],
    data(){
        return {
            pflegebericht: [],
            visiblePflege: [],
            eDate: '',
            bericht: '',
            stuhlgang: false,
            //------------------------------------------------------
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
        this.pflegebericht = await Pflegebericht.getSpecificPflegebericht(this.patient.name)
        this.isLoaded = true
        // this.currentPage = Math.ceil(this.pflegebericht.length / this.pageSize) 
        // this.totalPages = Math.ceil(this.pflegebericht.length / this.pageSize)
        // this.updateVisible()
        //---------------------------------------------------------------------------------
        // if(this.visiblePflege.length === this.pageSize) {
        //     this.currentPage++
        //     this.currentMustLover = true               
        // } else {
        //     this.currentMustLover = false
        // }
        //---------------------------------------------------------------------------------
        if(this.overview === 'overview') {
            this.visiblePflege = await Pflegebericht.getDataForOverview(this.patient.name,this.von,this.bis)
            this.currentPage = 0
        }
        //---------------------------------------------------------------------------------
        if(this.page || this.page === 0) {
            this.currentPage = this.page
            this.updateVisible()
            this.currentMustLover = false
            this.$emit('topDate', this.visiblePflege)
        } else {
            // ovo sam dodao poslije overview-a ako se sta sjebe do toga je!
            if(!this.overview) {
                this.currentPage = Math.ceil(this.pflegebericht.length / this.pageSize) 
                this.updateVisible()
                this.alterCurrentValue()
            }
        }
        this.currentPage === 1 && this.visiblePflege.length === this.pageSize ? this.hidePrevious = true : this.hidePrevious = false
    },
    methods: {
        async viewAll() {
            this.viewall = !this.viewall
            this.isLoaded = false
            this.pflegebericht = await Pflegebericht.getSpecificPflegebericht(this.patient.name,this.viewall)
            this.isLoaded = true
            this.currentPage = Math.ceil(this.pflegebericht.length / this.pageSize) 
            this.updateVisible()
            this.alterCurrentValue()
        },
        OnStuhl() {
            this.stuhlgang = !this.stuhlgang
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
        this.$emit('topDate', this.visiblePflege)
        },
        updateVisible() {
        this.visiblePflege = this.pflegebericht.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
        if(this.visiblePflege.length === 0 && this.currentPage > 0) {
            this.updatePage(this.currentPage - 1)
        }
        },
        alterCurrentValue() {
            this.totalPages = Math.ceil(this.pflegebericht.length / this.pageSize)
            if(this.visiblePflege.length === this.pageSize) {
                this.currentPage++
                this.currentMustLover = true               
            } else {
                this.currentMustLover = false
            }
        },
        resetValues() {
            this.bericht = ''
            this.stuhlgang = false
        },
        editItem(data) {
            this.currentEdit = this.currentPage
            this.ID = data._id
            this.eDate = data.datum.substr(6,10) + '-' + data.datum.substr(3,2) + '-' + data.datum.substr(0,2)
            this.bericht = data.bericht
            this.stuhlgang = data.stuhlgang
            this.isEdit = true
            if(this.page === undefined)
            this.currentMustLover ? this.currentPage = this.totalPages : this.currentPage = (this.totalPages - 1)
        },
        async edit() {
            await Pflegebericht.editPflegebericht (
                this.ID,
                this.eDate.substr(8,10) + '/' + this.eDate.substr(5,2) + '/' + this.eDate.substr(0,4),
                this.bericht,
                this.stuhlgang
            ).then(response => {
                this.$emit('successMsg',response.data,'color: #972f08; background-color: rgb(231 112 67 / 83%);')
            })
            this.pflegebericht = await Pflegebericht.getSpecificPflegebericht(this.patient.name)
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
            await Pflegebericht.deletePflegebericht(id)
            .then(response => {
                this.$emit('successMsg',response.data,'color: #red; background-color: #d94b4bd6;')
            })
            await ReportService.deleteReport(id)
            this.openDelete = false
            this.pflegebericht = await Pflegebericht.getSpecificPflegebericht(this.patient.name)
            this.visiblePflege.length === 1 ? this.onLastItemUploaded = false : this.onLastItemUploaded = true
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
            a = await Pflegebericht.getReport(id,this.patient.name)
            this.reportMessageAdmin = a[0].reportMessage
            this.openAdminReport = true
        },
        async reportUploaded(message) {
            this.openReport = false
            this.openAdminReport = false
            this.pflegebericht = await Pflegebericht.getSpecificPflegebericht(this.patient.name)
            this.onLastItemUploaded = true
            this.updateVisible()
            this.onLastItemUploaded = false
            this.$emit('successMsg',message,'color: darkgreen; background-color: #abf5abe8;')
        },
        reportUpdated(message) {
            this.openReport = false
            this.$emit('successMsg',message,'color: darkgreen; background-color: #abf5abe8;')
        },
        async onSubmit() {
            await Pflegebericht.insertPflegebericht (
                this.patient.name,
                this.nurse.username,
                this.bericht,
                this.stuhlgang
            ).then(response => {
                this.$emit('successMsg',response.data,'color: darkgreen; background-color: #abf5abe8;')
            })
            this.currentMustHigher ? this.currentPage++ : ''
            this.currentMustHigher = false
            this.pflegebericht = await Pflegebericht.getSpecificPflegebericht(this.patient.name),
            this.updateVisible()
            this.alterCurrentValue()
            this.resetValues()
            this.$emit('topDate', this.visiblePflege)
            this.viewall = false
            this.currentPage === 1 && this.visiblePflege.length === this.pageSize ? this.hidePrevious = true : this.hidePrevious = false
        }
    }
}
</script>

<style lang="scss" scoped>
.pflege-container {
    min-width: 1000px;
}
.pflege-tip {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    font-size: 18px;
    letter-spacing: 0.2px;
}
.bericht {
    width: 420px;
    font-size: 15px;
    border-radius: 5px;
    padding: 3px 8px;
    border: 2px solid #074a60;
    resize: vertical;
    &:focus::placeholder {
        color: transparent;
    }
    &:focus {
        outline: none !important;
        border: 2px solid #074a60;
        box-shadow: 0 0 10px #719ECE;
    }
}
.stuhl {
    display: table;
    height: 40px;
    width: 80%;
    background-color: #074a60;
    margin: 0 auto;
    border-radius: 5px;
    cursor: pointer;
    span {
        display: table-cell;
        vertical-align: middle;
        font-weight: 700;
        color: #fff;
    }
}
.xbutton {
    height: 40px;
    width: 80%;
}
.edit-input {
    border: 2px solid #d85a2b;
}
.edit-xbutton {
    background-color: #d85a2b;
}
</style>