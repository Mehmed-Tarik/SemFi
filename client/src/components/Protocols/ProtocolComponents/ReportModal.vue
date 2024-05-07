<template>
    <div>
        <div @mousemove="draging" @mousedown="drag" @mouseup="drop" 
             @touchmove="dragingT" @touchstart="dragT" @touchend="dropT"
             class="report-modal" id="report" v-if="openReport">
            <div>
                <h3>Write your report:</h3>
                <button class="report-close" @click="$emit('closeReport',false)">X</button>
            </div>
            <textarea v-model="reportMessage" class="report-text-area" rows="5" placeholder="Report..."></textarea>
            <div class="report-submit">
                <button :disabled="!reportMessage" @click="submitReport(isAdmin)" class="report-submit-btn">Submit</button>
            </div>
        </div>
        <div @mousemove="draging" @mousedown="drag" @mouseup="drop" 
             @touchmove="dragingT" @touchstart="dragT" @touchend="dropT" 
             class="report-modal" id="report" v-if="openAdminReport">
            <div class="admin-report-text">
                <p>{{reportMessageAdmin}}</p>
            </div>
            <button class="report-close" @click="$emit('closeAdminReport',false)">X</button>
            <button @click="submitReport(isAdmin)" class="report-submit-btn admin-report-btn">Resolve</button>
        </div>
    </div>
</template>

<script>
import BzUberwachungService from "@/BzuberwachungService"
import Pflegebericht from "@/PflegeberichtService"
import BeatmungService from "@/BeatmungService"
import AnfallService from "@/AnfallService"
import VitalzeichenService from "@/VitalzeichenService"
import GewichtService from "@/GewichtService"
import SchmerzService from "@/SchmerzService"
import Entblockung from "@/EntblockungService"
import Bewegung from "@/BewegungService"
import GerateService from "@/GerateService"

import ReportService from "@/ReportService"

export default {
    name: "ReportModal",
    props: {
        openReport: Boolean,
        openAdminReport: Boolean,
        reportID: String,
        isAdmin: Boolean,
        reportMessageAdmin: String,
        protokolName: String,
        patient: Object,
        page: Number,
        nurseName: String
    },
    data() {
        return {
            reportMessage: '',
            pickedUp: false
        }
    },
    methods: {
        drag() {
          let doc = document.getElementById('report')
          doc.style.position = "absolute"
          this.pickedUp = true
        },
        draging() {
          let doc = document.getElementById('report')
          if(this.pickedUp) {
            doc.style.marginLeft = 0;
            doc.style.marginRight = 0;
            doc.style.left = window.event.clientX - 310 + "px"
            doc.style.top = window.event.clientY - 30 + "px"
          }
        },
        drop() {
          this.pickedUp = false
        },
        dragT() {
          let doc = document.getElementById('report')
          doc.style.position = "absolute"
          this.pickedUp = true
        },
        dragingT() {
          let doc = document.getElementById('report')
          if(this.pickedUp) {
            doc.style.marginLeft = 0;
            doc.style.marginRight = 0;
            let touch = window.event.touches[0];
            doc.style.left = touch.pageX - 310 + "px"
            doc.style.top = touch.pageY - 30 + "px"
          }
        },
        dropT() {
          this.pickedUp = false
        },
        async submitReport(isAdmin) {
            if(isAdmin){
                this.reportMessage ="no report"
                switch(this.protokolName) {
                  case 'Anfall Protocol': await AnfallService.updateReport(this.reportID,this.reportMessage,false); break
                  case 'BZ Überwachung': await BzUberwachungService.updateReport(this.reportID,this.reportMessage,false); break
                  case 'Pflegebericht': await Pflegebericht.updateReport(this.reportID,this.reportMessage,false); break
                  case 'Beatmungsprotokoll': await BeatmungService.updateReport(this.reportID,this.reportMessage,false); break
                  case 'Vitalzeichenkontrolle': await VitalzeichenService.updateReport(this.reportID,this.reportMessage,false); break
                  case 'Protokoll - Gewichtskontrolle': await GewichtService.updateReport(this.reportID,this.reportMessage,false); break
                  case 'Schmerzerfassung': await SchmerzService.updateReport(this.reportID,this.reportMessage,false); break
                  case 'Entblockungsprotokoll': await Entblockung.updateReport(this.reportID,this.reportMessage,false); break
                  case 'Lagerung- Bewegungsplan': await Bewegung.updateReport(this.reportID,this.reportMessage,false); break
                  case 'Protokoll- Gerätecheck MP': await GerateService.updateReport(this.reportID,this.reportMessage,false); break
                }
                await ReportService.deleteReport(this.reportID)
                this.$emit('reportUploaded', 'Report Resolved!')
            } else {
                switch(this.protokolName) {
                  case 'Anfall Protocol':
                    await AnfallService.updateReport(this.reportID,this.reportMessage,true)
                        .then(response => {
                             this.$emit('reportUpdated', response.data)
                         })
                  break
                  case 'BZ Überwachung':
                   await BzUberwachungService.updateReport(this.reportID,this.reportMessage,true)
                         .then(response => {
                             this.$emit('reportUpdated', response.data)
                         })
                  break
                  case 'Pflegebericht':
                    await Pflegebericht.updateReport(this.reportID,this.reportMessage,true)
                        .then(response => {
                             this.$emit('reportUpdated', response.data)
                         })
                  break
                  case 'Beatmungsprotokoll':
                    await BeatmungService.updateReport(this.reportID,this.reportMessage,true)
                        .then(response => {
                             this.$emit('reportUpdated', response.data)
                         })
                  break
                  case 'Vitalzeichenkontrolle': 
                    await VitalzeichenService.updateReport(this.reportID,this.reportMessage,true)
                        .then(response => {
                             this.$emit('reportUpdated', response.data)
                         })
                  break
                  case 'Protokoll - Gewichtskontrolle': 
                    await GewichtService.updateReport(this.reportID,this.reportMessage,true)
                        .then(response => {
                             this.$emit('reportUpdated', response.data)
                         })
                  break
                  case 'Schmerzerfassung': 
                    await SchmerzService.updateReport(this.reportID,this.reportMessage,true)
                        .then(response => {
                             this.$emit('reportUpdated', response.data)
                         })
                  break
                  case 'Entblockungsprotokoll': 
                    await Entblockung.updateReport(this.reportID,this.reportMessage,true)
                        .then(response => {
                             this.$emit('reportUpdated', response.data)
                         })
                  break
                  case 'Lagerung- Bewegungsplan':
                    await await Bewegung.updateReport(this.reportID,this.reportMessage,true)
                        .then(response => {
                          this.$emit('reportUpdated', response.data)
                        })
                  break
                  case 'Protokoll- Gerätecheck MP':
                    await await GerateService.updateReport(this.reportID,this.reportMessage,true)
                        .then(response => {
                          this.$emit('reportUpdated', response.data)
                        })
                  break
                }
                this.reportMessage = ''
                await ReportService.insertReport(
                  this.reportID,
                  this.protokolName,
                  this.patient.name,
                  this.nurseName,
                  this.page
                ).then((response) => {
                  this.$emit('reportUploaded', response.data)
                })
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.report {
  &-modal {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 40%;
    border-radius: 10px;
    text-align: center;
    width: 600px;
    height: 220px;
    background-color: #719ECE;
    cursor: pointer;
  }
  &-close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 5px;
    font-weight: 800;
    color: #fff;
    background-color: #d94b4b;
    cursor: pointer;
  }
  &-text-area {
    width: 500px;
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
  &-submit {
    margin-top: 6px;
  }
  &-submit-btn {
    width: fit-content;
    background-color: #074a60;
    border: 0;
    border-radius: 56px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 15px;
    outline: 0;
    padding: 10px 40px;
    text-align: center;
    text-decoration: none;
    letter-spacing: 0.5px;
  }
}
.admin-report {
  &-text {
    font-weight: 700;
    width: 80%;
    margin: 10px auto;
    background-color: #fff;
    padding: 4px;
    height: 120px;
    overflow-y: scroll;
  }
  &-btn {
    margin-top: 20px;
  }
}
</style>