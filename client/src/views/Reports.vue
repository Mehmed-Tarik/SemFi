<template>
    <div>
    <div class="report-container" v-if="!isProtocol">
        <div class="header">
        <router-link to="/" class="left"> <svg class="backBtn" viewBox="0 0 24 24"><path fill="currentColor" d="M11.325 15.325q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7l-.9-.9h3.225q.425 0 .7-.288Q16 12.425 16 12t-.287-.713Q15.425 11 15 11h-3.2l.925-.925q.275-.275.263-.688q-.013-.412-.288-.687q-.275-.275-.7-.275q-.425 0-.7.275l-2.6 2.6q-.275.275-.275.7q0 .425.275.7ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg> </router-link>
        <div class="center"> <h2>Reports List</h2> </div>
        <div class="right"></div>
    </div>
    <div class="report-list">
        <div class="report-item" v-for="report in reports" 
                                 :key="report._id"
                                 @click="openReport(report.protokolName,report.patientName,report.page)">
            <p class="report-item-time"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m13 12.175l2.25 2.25q.275.275.275.688t-.275.712q-.3.3-.713.3t-.712-.3L11.7 13.7q-.35-.35-.525-.775T11 12V9q0-.425.288-.713T12 8q.425 0 .713.288T13 9v3.175ZM12 4q.425 0 .713.288T13 5q0 .425-.288.713T12 6q-.425 0-.713-.288T11 5q0-.425.288-.713T12 4Zm8 8q0 .425-.288.713T19 13q-.425 0-.713-.288T18 12q0-.425.288-.713T19 11q.425 0 .713.288T20 12Zm-8 6q.425 0 .713.288T13 19q0 .425-.288.713T12 20q-.425 0-.713-.288T11 19q0-.425.288-.713T12 18Zm-6-6q0 .425-.288.713T5 13q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11q.425 0 .713.288T6 12Zm6 10q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"/></svg><span><b>{{report.createdAt}}</b> hours ago</span></p>
            <p class="report-item-text">{{report.protokolName}}</p>
            <p class="report-item-text">{{report.patientName}}</p>
            <p class="report-item-text">{{report.page + 1}}</p>
            <p class="report-item-text">{{report.nurse}}</p>
        </div>
        <h2 style="text-align: center" v-if="reports.length === 0">Currently there is no reports... </h2>
    </div>
    </div>
    <div>
        <Anfall v-if="isProtocol && protokolName==='Anfall Protocol'" :page="page" :nurse="nurse" :patient="patient" :protokolName="protokolName" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <BzUberwachung v-if="isProtocol && protokolName==='BZ Überwachung'" :page="page" :nurse="nurse" :patient="patient" :protokolName="protokolName" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Pflegebericht v-if="isProtocol && protokolName==='Pflegebericht'" :page="page" :nurse="nurse" :patient="patient" :protokolName="protokolName" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Beatmung v-if="isProtocol && protokolName==='Beatmungsprotokoll'" :page="page" :nurse="nurse" :patient="patient" :protokolName="protokolName" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Vitalzeichen v-if="isProtocol && protokolName==='Vitalzeichenkontrolle'" :page="page" :nurse="nurse" :patient="patient" :protokolName="protokolName" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Gewicht v-if="isProtocol && protokolName==='Protokoll - Gewichtskontrolle'" :page="page" :nurse="nurse" :patient="patient" :protokolName="protokolName" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Schmerzerfassung v-if="isProtocol && protokolName==='Schmerzerfassung'" :page="page" :nurse="nurse" :patient="patient" :protokolName="protokolName" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Entblockung v-if="isProtocol && protokolName==='Entblockungsprotokoll'" :page="page" :nurse="nurse" :patient="patient" :protokolName="protokolName" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Bewegung v-if="isProtocol && protokolName==='Lagerung- Bewegungsplan'" :page="page" :nurse="nurse" :patient="patient" :protokolName="protokolName" @backProtokol="backProtokol"
                        :pageSize="pageSize" :month="month" :year="year" @topDate="topDate" :successMessage="successMessage" :color="color" @successMsg="successMsg" />
        <Geratecheck v-if="isProtocol && protokolName==='Protokoll- Gerätecheck MP'" :page="page" :nurse="nurse" :patient="patient" :protokolName="protokolName" @backProtokol="backProtokol"
                        :successMessage="successMessage" :color="color" @successMsg="successMsg" />
    </div>
    </div>
</template>

<script>
import ReportService from "@/ReportService"
import PatientsService from "@/PatientsService"

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
    name: 'Report',
    components: {
        Anfall ,BzUberwachung, Gewicht, Pflegebericht, Geratecheck,
        Beatmung, Vitalzeichen, Schmerzerfassung, Entblockung, Bewegung
    },
    props: {
        nurse: Object
    },
    data() {
        return {
            reports: [],
            timeDifference: [],
            protokolName: '',
            page: null,
            patient: {},
            isProtocol: false,
            month: [],
            year: [],
            successMessage: '',
            color: '',
            pageSize: 3,
        }
    },
    async created() {
        const d = new Date();
        this.reports = await ReportService.getReports()
        this.reports.forEach(report => {
            report.createdAt = Math.floor((((d.getHours() * 60) + d.getMinutes()) - ((parseInt(report.createdAt.substring(11,14)) * 60) + (parseInt(report.createdAt.substring(14,17))))) / 60)
        });
    },
    methods: {
        async backProtokol() {
            this.isProtocol = false
            const d = new Date();
            this.reports = await ReportService.getReports()
            this.reports.forEach(report => {
            report.createdAt = Math.floor((((d.getHours() * 60) + d.getMinutes()) - ((parseInt(report.createdAt.substring(11,14)) * 60) + (parseInt(report.createdAt.substring(14,17))))) / 60)
            
        });
        this.$emit('updateReports', this.reports.length)
        },
        async openReport(protokolName,patientName,page) {
            this.protokolName = protokolName
            this.patientName = patientName
            this.page = page
            this.patient = await PatientsService.getSpecificPatients(patientName)
            this.patient = this.patient[0]
            this.isProtocol = true
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
            console.log(message);
            this.successMessage = message
            this.color = color
            setTimeout(() => {
                this.successMessage = ''
            }, 2000)
        },
    },
}
</script>

<style lang="scss" scoped>
.report{
    &-list {
        width: 70%;
        margin: 20px auto;
    }
    &-item {
        display: flex;
        justify-content: space-around;
        background-color: #f38686a6;
        border: 2px solid #7f0606;
        margin: 15px 0;
        padding: 1px 20px;
        border-radius: 15px;
        cursor: pointer;
        &:hover {
            box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
        }
        &-time {
            display: flex;
            font-weight: 700;
            background-color: #fff;
            padding: 1px 8px;
            border-radius: 20px;
            border: 2px solid #074a60;
            span {
                font-weight: 500;
                display: block;
                margin-top: 4px;
                margin-left: 4px;
            }
        }
        &-text {
            margin-top: 23px;
            font-size: 17px;
        }
    }
}
.left:hover {
    background-color: none;
}
</style>