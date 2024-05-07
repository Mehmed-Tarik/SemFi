<template>
    <div>
        <div class="einausfuhr-container">
        <ProtokolHeader :protokolName="protokolName" @backProtokol="$emit('backProtokol')" />
        <FormTop :patient="patient" :currentPage="pagginationNum" :month="month" :year="year" />
            <div class="datum-column" v-if="pagginationNum===formCount.length && !einausfuhr.length">
                <label for="datum">Datum: </label>
                <div style="display:flex; flex-direction: row">
                <input id="datum" v-model="datum" @input="datumInput" type="date">
                <span v-if="!datum && !einausfuhr.length" class="datum-column-warning">Must choose datum first!</span>
                </div>
            </div>
            <div class="datum-prev" v-if="pagginationNum<formCount.length || einausfuhr.length">
                <div class="datum-prev-title">Datum: </div>
                <!-- <div class="datum-prev-date">{{einausfuhr[0].datum}}</div> -->
                <div class="datum-prev-date">{{paginationDatum}}</div>
            </div>
            <form @submit="onSubmit">
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th style="border-top-left-radius: 8px;">Uhrzeit</th>
                            <th>Einfuhr</th>
                            <th>Kcal</th>
                            <th>Flüssigkeit</th>
                            <th>Hz.</th>
                            <th>Ausfuhr</th>
                            <th style="border-top-right-radius: 8px;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="einaus in einausfuhr"
                                   :key="einaus._id">
                            <td>{{einaus.uhrzeit}}</td>
                            <td>{{einaus.einfuhr}}</td>
                            <td>{{einaus.kcal}}</td>
                            <td>{{einaus.flussigkeit}}</td>
                            <td>{{einaus.nurse}}</td>
                            <td>{{einaus.ausfuhr}}</td>
                            <td style="display: flex; justify-content: center">
                                <svg v-if="nurse.isAdmin" @click="openDeleteModal(einaus._id)" class="action-icon" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg>
                                <svg v-if="nurse.isAdmin" @click="editItem(einaus)" class="action-icon edit" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.637.438q-.363.162-.763.162H10q-.425 0-.712-.287Q9 17.125 9 16.7v-2.425q0-.4.15-.763q.15-.362.425-.637Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"/></svg>
                                <svg v-if="!nurse.isAdmin" @click="report(einaus._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                                <svg v-if="nurse.isAdmin && einaus.isReport" @click="adminReport(einaus._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                            </td>
                        </tr>
                        <tr v-if="pagginationNum >= formCount.length || isEdit">
                            <td><vue-timepicker class="timepicker" v-model="chosenTime"></vue-timepicker></td>
                            <td><input class="table-input" v-model="einfuhr" placeholder="Einfuhr" type="number"></td>
                            <td><input class="table-input" v-model="kcal" placeholder="Kcal" type="number"></td>
                            <td><input class="table-input" v-model="flussig" placeholder="Flüssigkeit" type="text"></td>
                            <td><p style="font-weight: 700; color: #003648">{{nurse.username}}</p></td>
                            <td><input class="table-input" v-model="ausfuhr" placeholder="Ausfuhr" type="number"></td>
                            <td><input v-if="datum || einausfuhr.length" type="submit" value="Save" class="saveBtn" /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div class="bilanz-container">
                <div>Bilanz: E-A= <span class="bilanz">{{bilanz}}</span> ml</div>
                <button class="complete" @click="complete">Complete</button>
            </div>
            
            <div class="pagination">
                <svg v-if="pagginationNum > 0" @click="prev" class="pagination-btn" viewBox="0 0 24 24"><path fill="currentColor" d="M21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2M7 12l5 5v-3h4v-4h-4V7l-5 5Z"/></svg>
                <p><span>{{pagginationNum + 1}}</span> of <span>{{formCount.length + 1}}</span></p>
                <svg v-if="pagginationNum < formCount.length" @click="next" class="pagination-btn" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2m14-7l-5-5v3H8v4h4v3l5-5Z"/></svg>
            </div>
        </div>
    </div>
</template>

<script>
import ProtokolHeader from "../ProtokolHeader.vue"
import FormTop from "./ProtocolComponents/FormTop.vue"
import VueTimePicker from "vue3-timepicker"
import "vue3-timepicker/dist/VueTimepicker.css"
import EinAusfuhrService from "@/EinAusfuhr"
import axios from "axios"
import FormNumberService from "@/FormNumber"

export default {
    name: "EinAusfuhr",
    components: {
        ProtokolHeader, FormTop,
        "vue-timepicker": VueTimePicker
    },
    props: {
        nurse: Object,
        patient: Object,
        protokolName: String
    },
    emits: 'backProtokol',
    data() {
        return {
            url: "api/formNumber/",
            formNum: null,
            einausfuhr: [],
            datum: '',
            chosenTime: '',
            einfuhr: null,
            kcal: null,
            flussig: '',
            ausfuhr: null,
            bilanz: null,
            pagginationNum: 0,
            wholeEinAusfur: [],
            formCount: 0,
            formNumPost: null,
            month: [],
            year: [],
            paginationDatum: '',
            //----------------------------------------
            isEdit: false
        }
    },
    async created() {
        let formNumber = await axios.get(`${this.url}`)
        this.formNum = formNumber.data[0].formnumber
        this.einausfuhr = await EinAusfuhrService.getSpecificEinausfuhr(this.patient.name, this.formNum)
        //------------------------------------------------------
        if(this.einausfuhr.length){
            this.getFormTopDate(this.einausfuhr[0].datum)
        }
        //------------------------------------------------------
        // PREBACIT OVO SVE U FUNKCIJE !!!!
        //------------------------------------------------------
        // ovo je da prati formnumer za trazanje u bazi
        this.formNumPost = this.formNum
        // ovo dole je za padding i za blat nr.
        this.wholeEinAusfur = await EinAusfuhrService.getEinausfuhr()
        let wholeEinAus = []
        this.wholeEinAusfur.forEach((whole) => {
            wholeEinAus.push(whole.pageNumber)
        })
        this.formCount = [...new Set(wholeEinAus)]
        this.pagginationNum = this.formCount.length
        //-------------------------------------------------------
        this.bilanzResult()
        if(this.einausfuhr.length) {
            this.datum = this.einausfuhr[0].datum
        }
        console.log('this.formNumPost: ' + this.formNumPost);
    },
    methods: {
        getFormTopDate(date){
            this.month = []
            this.year = []
            this.month.push(date.substring(5,7))
            this.year.push(date.substring(0,4))
        },
        bilanzResult(){
            let res = []
            this.bilanz = 0
            this.einausfuhr.forEach((einaus) => {
                res.push(einaus.einfuhr - einaus.ausfuhr) 
            })
            for(let i=0;i<res.length;i++)
                this.bilanz += res[i]
        },
        datumInput() {
            this.getFormTopDate(this.datum)
        },
        async prev() {
            if(this.pagginationNum > 0) {
                this.pagginationNum --
                this.formNumPost --
                console.log('this.formNumPost: ' + this.formNumPost);
                this.einausfuhr = await EinAusfuhrService.getSpecificEinausfuhr(this.patient.name, this.formNumPost)
                this.bilanzResult()
                console.log(this.einausfuhr.length);
                this.getFormTopDate(this.einausfuhr[0].datum)
                this.paginationDatum = this.einausfuhr[0].datum
            } 
        },
        async next() {
            if(this.pagginationNum < this.formCount.length) {
                this.pagginationNum ++
                this.formNumPost ++
                console.log('this.formNumPost: ' + this.formNumPost);
                this.einausfuhr = await EinAusfuhrService.getSpecificEinausfuhr(this.patient.name, this.formNumPost)
                this.bilanzResult()
                console.log(this.einausfuhr.length);
                if(this.einausfuhr.length > 0) {
                    console.log("halooo");
                    this.getFormTopDate(this.einausfuhr[0].datum)
                    this.paginationDatum = this.einausfuhr[0].datum
                }
            }
        },
        async complete() {
            if(confirm('Are you sure')){
            this.formNum ++
            console.log(this.formNum);
            await axios.put(`${this.url}${this.formNum}`)
            this.einausfuhr = await EinAusfuhrService.getSpecificEinausfuhr(this.patient.name, this.formNum)
            //---------------------------------------------------------------------------------------------
                    this.formNumPost = this.formNum
                // ovo dole je za padding i za blat nr.
                this.wholeEinAusfur = await EinAusfuhrService.getEinausfuhr()
                let wholeEinAus = []
                this.wholeEinAusfur.forEach((whole) => {
                    wholeEinAus.push(whole.pageNumber)
                })
                this.formCount = [...new Set(wholeEinAus)]
                this.pagginationNum = this.formCount.length

            //-------------------------------------------------------------------------------
            this.bilanz = 0
            }
        },
        editItem(data) {
            console.log(data);
            this.isEdit = true
            this.ID = data._id
            this.einfuhr = data.einfuhr
            this.kcal = data.kcal
            this.flussig = data.flussigkeit
            this.ausfuhr = data.ausfuhr
            this.isEdit = true
        },
        // async edit() {
        //     await GerateService.editGeratecheck (
        //         this.ID,
        //         this.xbuttons,
        //     ).then(response => {
        //         this.$emit('successMsg',response.data,'color: #972f08; background-color: rgb(231 112 67 / 83%);')
        //     })
        //     this.gerate = await GerateService.getSpecificGeratecheck(this.patient.name,this.month)
        //     this.resetValues()
        //     this.isEdit = false
        // },
        async onSubmit(e) {
            console.log(this.formNum);
            e.preventDefault()
            await EinAusfuhrService.insertEinausfuhr (
                this.patient.name,
                this.datum,
                this.chosenTime,
                this.nurse.username,
                this.einfuhr,
                this.kcal,
                this.flussig,
                this.ausfuhr,
                this.formNum
            )
            this.einausfuhr = await EinAusfuhrService.getSpecificEinausfuhr(this.patient.name, this.formNum)
            this.bilanzResult()

            this.chosenTime = ''
            this.einfuhr = null
            this.kcal = null
            this.flussig = ''
            this.ausfuhr = null
        }
    },
}
</script>

<style lang="scss" scoped>
.einausfuhr-container {
    min-width: 1000px;
}
.datum-column {
    display: flex;
    flex-direction: column;
    margin: auto;
    font-size: 0.9em;
    width: 95%;
    margin-bottom: 5px;
    label {
        font-size: 18px;
        font-weight: 600;
        color: #074a60;
    }
    input {
        width: 20%;
        height: 31px;
        border-color: #074a60;
        outline: 0;
        border-width: 0 0 2px;
    }
    ::-webkit-datetime-edit {
        font-weight: 700;
        font-size: 17px;
    }
    ::-webkit-calendar-picker-indicator {
        font-size: 20px;
        margin-bottom: -4px;
        cursor: pointer;
    }
    &-warning {
        color: #9a0404;
        font-weight: 600;
        margin-top: 9px;
        margin-left: 5px;
    }

}
.timepicker {
    border: 2px solid #074a60;
    border-radius: 5px;
}
.complete {
    margin: 10px auto;
    display: block;
    cursor: pointer;
}
.pagination {
    display: flex;
    justify-content: center;
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
.datum-prev {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 95%;
    margin-bottom: 5px;
    &-title {
        font-size: 18px;
        font-weight: 600;
        color: #074a60;
        margin-bottom: 5px;
    }
    &-date {
        font-size: 16px;
        font-weight: 600;
    }
}
.bilanz-container {
        display: flex;
        justify-content: center;
        width: 80%;
        margin: 15px auto;
    div {
        margin-right: 10%;
        margin-top: 13px;
    }
    button {
        width: fit-content;
        margin: 0;
        margin-left: 10%;
        background-color: #0078d0;
        border: 0;
        border-radius: 56px;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-size: 17px;
        font-weight: 600;
        outline: 0;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
    }
}
.bilanz {
    color: #9a0404;
    font-weight: 600;
}
</style>