<template>
    <div class="patient">
        <DeleteModal :openDelete="openDelete" :deleteID="ID" @deleteItem="deleteItem" @closeDeleteModal="closeDeleteModal" />
        <div class="header">
            <router-link to="/" class="left"> <svg class="backBtn" viewBox="0 0 24 24"><path fill="currentColor" d="M11.325 15.325q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7l-.9-.9h3.225q.425 0 .7-.288Q16 12.425 16 12t-.287-.713Q15.425 11 15 11h-3.2l.925-.925q.275-.275.263-.688q-.013-.412-.288-.687q-.275-.275-.7-.275q-.425 0-.7.275l-2.6 2.6q-.275.275-.275.7q0 .425.275.7ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg> </router-link>
            <div class="center"> <h2>Patient Input</h2> </div>
            <div class="right"></div>
        </div>
        <div class="patient-input">
            <form @submit.prevent="onSubmit">
                <div class="patient-input-row">
                    <div class="form-input">
                        <label for="name">Ptient's Name: </label>
                        <input type="text" id="name" v-model="name" placeholder="Name">
                    </div>
                    <div class="form-input">
                        <label for="birth">Ptient's Date of Birth: </label>
                        <input type="date" id="birth" v-model="dateOfBirth" placeholder="Name">
                    </div>
                </div>
                <div class="patient-input-column">
                    <div class="form-input">
                        <div style="display: flex;">
                            <div style="display: flex; flex-direction: column"> 
                                <label for="nurses">Choose Nurses: </label>
                                <select v-model="nurse" id="nurses">
                                    <option v-for="nurse in nurses" :key="nurse._id" :value="nurse.username">{{nurse.name}}({{nurse.username}})</option>
                                </select>
                            </div>
                            <svg class="styled-addicon" @click="add(1)" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-3h3.025q.425 0 .7-.288Q17 12.425 17 12t-.288-.713Q16.425 11 16 11h-3V7.975q0-.425-.287-.7Q12.425 7 12 7t-.712.287Q11 7.575 11 8v3H7.975q-.425 0-.7.287Q7 11.575 7 12t.287.712Q7.575 13 8 13h3v3.025q0 .425.288.7q.287.275.712.275Zm0 5q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>
                        </div>
                    </div>
                    <div class="chosen-container">
                        <div class="chosen-option" v-for="cNurses in chosenNurses" :key="cNurses">
                            <span class="chosen-option-text">{{cNurses}}</span>
                            <svg @click="removeChosen(cNurses,1)" class="chosen-option-remove" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"/></svg>
                        </div>
                    </div>
                    <div class="form-input">
                        <div style="display: flex;">
                            <div style="display: flex; flex-direction: column"> 
                                <label for="protokol">Choose Protokols: </label>
                                <select v-model="protokol" id="protokol">
                                    <option v-for="protokol in protokols" :key="protokol._id" :value="protokol.name">{{protokol.name}}</option>
                                </select>
                            </div>
                            <svg class="styled-addicon" @click="add(2)" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-3h3.025q.425 0 .7-.288Q17 12.425 17 12t-.288-.713Q16.425 11 16 11h-3V7.975q0-.425-.287-.7Q12.425 7 12 7t-.712.287Q11 7.575 11 8v3H7.975q-.425 0-.7.287Q7 11.575 7 12t.287.712Q7.575 13 8 13h3v3.025q0 .425.288.7q.287.275.712.275Zm0 5q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>
                        </div>
                    </div>
                    <div class="chosen-container">
                        <div class="chosen-option" v-for="cProtokols in chosenProtokols" :key="cProtokols">
                            <span class="chosen-option-text">{{cProtokols}}</span>
                            <svg @click="removeChosen(cProtokols,2)" class="chosen-option-remove" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"/></svg>
                        </div>
                    </div>
                </div>
                <div class="patient-input-row">
                    <div class="left-position">
                        <div class="check-container">
                            <label>angeordnete Schmerzmedikation (s. Medikamentenblatt)</label>
                            <input type="checkbox" v-model="schmerzMedikation">
                        </div>
                        <div class="check-container" style="margin-top: 30px;">
                            <label>Schmerzpumpe (s. Pumpenprotokoll)</label>
                            <input type="checkbox" v-model="schmerzPumpe">
                        </div>
                    </div>
                    <div class="right-position">
                        <p>sonstige Methoden zur Schmerzlinderung</p>
                        <div class="right-position-line">
                            <div class="check-container">
                                <label>Kälte</label>
                                <input type="checkbox" v-model="kalte" @change="sonstigeChange('kalte')" >
                            </div>
                            <div class="check-container">
                                <label>Massagen</label>
                                <input type="checkbox" v-model="messagen" @change="sonstigeChange('massagen')">
                            </div>
                        </div>
                        <div class="right-position-line">
                            <div class="check-container">
                                <label>Wärme</label>
                                <input type="checkbox" v-model="warme" @change="sonstigeChange('warme')">
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <label for="schmerz">Sonstiges</label>
                                <textarea v-model="sonstigMet" rows="2" cols="18" placeholder="Sonstiges..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="patient-input-row">
                    <div class="form-input beatmungSting">
                        <label for="beatmungsmodus">Beatmungsmodus</label>
                        <input type="text" id="beatmungsmodus" v-model="beatmungsmodus" placeholder="Beatmungsmodus">
                    </div>
                    <div class="form-input beatmungSting">
                        <label for="beatmungsgerat">Beatmungsgerät:</label>
                        <input type="text" id="beatmungsgerat" v-model="beatmungsgerat" placeholder="Beatmungsgerät">  
                    </div>
                    <div class="form-input beatmungSting">
                        <label for="o2-gabe">O₂-Gabe:</label>
                        <input type="number" id="o2-gabe" v-model="ogabe" placeholder="O₂-Gabe">         
                    </div>
                    <div class="form-input beatmungSting">
                        <label for="trachealkanule">Trachealkanüle:</label>
                        <input type="text" id="trachealkanule" v-model="trachealkanule" placeholder="Trachealkanüle"> 
                    </div>
                </div>
                <div class="patient-input-row">
                    <div class="form-input beatmungInt">
                        <label for="ipap">IPAP</label>
                        <input type="number" id="ipap" v-model="ipap" placeholder="IPAP">
                    </div>
                    <div class="form-input beatmungInt">
                        <label for="ipap">EPAP</label>
                        <input type="number" id="epap" v-model="epap" placeholder="EPAP">      
                    </div>
                    <div class="form-input beatmungInt">
                        <label for="Rampe">Rampe</label>
                        <input type="number" id="Rampe" v-model="rampe" placeholder="Rampe"> 
                    </div>
                    <div class="form-input beatmungInt">
                        <label for="Af">Af</label>
                        <input type="number" id="Af" v-model="af" placeholder="Af">  
                    </div>
                    <div class="form-input beatmungInt">
                        <label for="IE">I:E:</label>
                        <input type="number" id="IE" v-model="ie" placeholder="I:E:"> 
                    </div>
                    <div class="form-input beatmungInt">
                        <label for="Trigger">Trigger</label>
                        <input type="number" id="Trigger" v-model="trigger" placeholder="Trigger">     
                    </div>
                    <div class="form-input beatmungInt">
                        <label for="vt">Vt</label>
                        <input type="number" id="vt" v-model="vt" placeholder="Vt"> 
                    </div>
                    <div class="form-input beatmungInt">
                        <label for="pmax">Pmax</label>
                        <input type="number" id="pmax" v-model="pmax" placeholder="Pmax"> 
                    </div>
                    <div class="form-input beatmungInt">
                        <label for="flow">Flow</label>
                        <input type="number" id="flow" v-model="flow" placeholder="Flow"> 
                    </div>
                    <div class="form-input beatmungInt">
                        <label for="tinsp">Tinsp</label>
                        <input type="number" id="tinsp" v-model="tinsp" placeholder="Tinsp">
                    </div>
                    <div class="form-input beatmungInt">
                        <label for="fio">FiO₂</label>
                        <input type="number" id="fio" v-model="fio" placeholder="FiO₂">
                    </div>
                </div>
                <!-- ------------------------------------------------------------------- -->
                <div class="patient-input-row">
                    <div class="left-bz">
                        <div class="check-container">
                            <label>Insulinpflichtig</label>
                            <input type="checkbox" v-model="insulinpflichtig">
                        </div>
                        <div class="check-container" style="margin-top: 30px;">
                            <label>Dosierung</label>
                            <input type="checkbox" v-model="dosierung">
                        </div>
                        <div class="check-container" style="margin-top: 30px;">
                            <label>Orale Antidiabetika</label>
                            <input type="checkbox" v-model="oral">
                        </div>
                    </div>
                    <div class="right-bz">
                        <div class="form-input">
                            <label for="insulinArt">Insulin - Art</label>
                            <input type="text" id="insulinArt" v-model="insulinArt" placeholder="Insulin - Art">
                        </div>
                        <div class="form-input">
                            <label for="kostform">Kostform (BE)</label>
                            <input type="text" id="kostform" v-model="kostform" placeholder="Kostform (BE)">
                        </div>
                    </div>
                </div>
                <!-- ----------------------------------------------------------------- -->
                <div class="assist-container">
                    <table class="assist-table">
                        <tr class="assist-tr">
                            <th class="assist-th thtext" style="font-weight: 800"><span class="assist-headers">Modus: Manuel/Auto</span></th>
                            <th class="assist-th thtext"><span class="assist-headers">Inspiration- /IPAP:</span></th>
                            <th class="assist-th thtext"><span class="assist-headers">Ti:</span></th>
                            <th class="assist-th thtext"><span class="assist-headers">Pause:</span></th>
                            <th class="assist-th thtext"><span class="assist-headers">Inspiration wiederholen:</span></th>
                            <th class="assist-th thtext"><span class="assist-headers">Trigger:</span></th>
                            <th class="assist-th thtext"><span class="assist-headers">Exspiration-/EPAP:</span></th>
                            <th class="assist-th thtext"><span class="assist-headers">Te:</span></th>
                            <th class="assist-th thtext"><span class="assist-headers">Zykl. wiederholen:</span></th>
                        </tr>
                        <tr class="assist-tr">
                            <td class="assist-th fth" style="font-weight: 800"><span class="assist-headers">Einstellungen</span></td>
                            <td class="assist-th fth"><input type="text" v-model="inspirationEninstellung"></td>
                            <td class="assist-th fth"><input type="text" v-model="tiEninstellung"></td>
                            <td class="assist-th fth"><input type="text" v-model="pauseEninstellung"></td>
                            <td class="assist-th fth"><input type="text" v-model="widerholenEninstellung"></td>
                            <td class="assist-th fth"><input type="text" v-model="triggerEninstellung"></td>
                            <td class="assist-th fth"><input type="text" v-model="expirationEninstellung"></td>
                            <td class="assist-th fth"><input type="text" v-model="teEninstellung"></td>
                            <td class="assist-th fth"><input type="text" v-model="zyklEninstellung"></td>
                        </tr>
                        <tr class="assist-tr">
                            <td class="assist-th" style="font-weight: 800"><span class="assist-headers">Änderung</span></td>
                            <td class="assist-th"><input type="text" v-model="inspirationAnderung"></td>
                            <td class="assist-th"><input type="text" v-model="tiAnderung"></td>
                            <td class="assist-th"><input type="text" v-model="pauseAnderung"></td>
                            <td class="assist-th"><input type="text" v-model="widerholenAnderung"></td>
                            <td class="assist-th"><input type="text" v-model="triggerAnderung"></td>
                            <td class="assist-th"><input type="text" v-model="expirationAnderung"></td>
                            <td class="assist-th"><input type="text" v-model="teAnderung"></td>
                            <td class="assist-th"><input type="text" v-model="zyklAnderung"></td>
                        </tr>
                    </table>
                </div>
                <!-- ----------------------------------------------------------------- -->
                <input v-if="!isEdit" type="submit" value="Save" class="saveBtn patientBtn" />
                <div class="saveBtn patientEditBtn" v-if="isEdit" @click="edit"><span>Edit</span></div>
            </form>
        </div>
        <table class="styled-table">
            <thead>
                <tr>
                    <th style="border-top-left-radius: 8px;">Name</th>
                    <th>Birth</th>
                    <th>Nurses</th>
                    <th>Protokols</th>
                    <th>S.Medikation</th>
                    <th>Schmerzpumpe</th>
                    <th>Methoden</th>
                    <th>Sonstiges</th>
                    <th>Beatmungsmodus</th>
                    <th>Beatmungsgerät</th>
                    <th>O₂-Gabe</th>
                    <th>Trachealkanüle</th>
                    <th>IPAP</th>
                    <th>EPAP</th>
                    <th>Rampe</th>
                    <th>Af</th>
                    <th>I:E:</th>
                    <th>Trigger</th>
                    <th>Vt</th>
                    <th>Pmax</th>
                    <th>Flow</th>
                    <th>Tinsp</th>
                    <th>FiO₂</th>
                    <th>Insulinpflichtig</th>
                    <th>Dosierung</th>
                    <th>Orale Antidiabetika</th>
                    <th>Insulin - Art</th>
                    <th>Kostform (BE)</th>
                    <th style="border-top-right-radius: 8px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="patient in patients" :key="patient._id">
                    <td>{{patient.name}}</td>
                    <td>{{patient.dateOfBirth}}</td>
                    <td>
                        <span v-for="nurse in patient.nurses" :key="nurse">
                            {{`${nurse},`}}
                        </span>
                    </td>
                    <td>
                        <span v-for="protokol in patient.protokols" :key="protokol">
                            {{`${protokol},`}}
                        </span>
                    </td>
                    <td>{{patient.schmerzMedikation}}</td>
                    <td>{{patient.schmerzPumpe}}</td>
                    <td>
                        <span v-for="method in patient.sonstigMethode" :key="method">
                            {{`${method},`}}
                        </span>
                    </td>
                    <td>{{patient.sonstigMet}}</td>
                    <td>{{patient.beatmungsmodus}}</td>
                    <td>{{patient.beatmungsgerat}}</td>
                    <td>{{patient.ogabe}}</td>
                    <td>{{patient.trachealkanule}}</td>
                    <td>{{patient.ipap}}</td>
                    <td>{{patient.epap}}</td>
                    <td>{{patient.rampe}}</td>
                    <td>{{patient.af}}</td>
                    <td>{{patient.ie}}</td>
                    <td>{{patient.trigger}}</td>
                    <td>{{patient.vt}}</td>
                    <td>{{patient.pmax}}</td>
                    <td>{{patient.flow}}</td>
                    <td>{{patient.tinsp}}</td>
                    <td>{{patient.fio}}</td>
                    <td>{{patient.insulinpflichtig}}</td>
                    <td>{{patient.dosierung}}</td>
                    <td>{{patient.oral}}</td>
                    <td>{{patient.insulinArt}}</td>
                    <td>{{patient.kostform}}</td>
                    <td style="display: flex; justify-content: center">
                        <svg @click="openDeleteModal(patient._id)" class="action-icon" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg>
                        <svg @click="editItem(patient)" class="action-icon edit" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.637.438q-.363.162-.763.162H10q-.425 0-.712-.287Q9 17.125 9 16.7v-2.425q0-.4.15-.763q.15-.362.425-.637Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"/></svg>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import NurseService from '@/LoginService'
import ProtokolService from '@/ProtocolService'
import PatientService from '@/PatientsService'
import DeleteModal from '../components/Protocols/ProtocolComponents/DeleteModal.vue'

export default {
    name: 'Patient',
    components: {
        DeleteModal
    },
    data() {
        return {
            patients: [],
            name: '',
            dateOfBirth: '',
            nurse: '', // --
            nurses: [],// --
            chosenNurses: [],
            protokol: '', // --
            protokols: [],// --
            chosenProtokols: [],
            schmerzMedikation: false,
            schmerzPumpe: false,
            sonstigMethode: [],
            kalte: false, // --
            messagen: false, // --
            warme: false, // --
            sonstigMet: '',
            beatmungsmodus: '',
            beatmungsgerat: '',
            ogabe: null,
            trachealkanule: '',
            ipap: null,
            epap: null,
            rampe: null,
            af: null,
            ie: null,
            trigger: null,
            vt: null,
            pmax: null,
            flow: null,
            tinsp: null,
            fio: null,
            insulinpflichtig: false,
            dosierung: false,
            oral: false,
            insulinArt: '',
            kostform: '',
            ID: '',
            openDelete: false,
            isEdit: false,
            //----------------------------
            inspirationEninstellung: '',
            inspirationAnderung: '',
            tiEninstellung: '',
            tiAnderung: '',
            pauseEninstellung: '',
            pauseAnderung: '',
            widerholenEninstellung: '',
            widerholenAnderung: '',
            triggerEninstellung: '',
            triggerAnderung: '',
            expirationEninstellung: '',
            expirationAnderung: '',
            teEninstellung: '',
            teAnderung: '',
            zyklEninstellung: '',
            zyklAnderung: ''
        }
    },
    async created() {
        this.nurses = await NurseService.getPNurses()
        this.protokols = await ProtokolService.getProtocols()
        this.patients = await PatientService.getPatients()
    },
    methods: {
        add(num) {
            switch(num) {
                case 1: 
                if(!this.chosenNurses.includes(this.nurse)) {
                    if(this.nurse) {
                        this.chosenNurses.push(this.nurse)
                        this.nurse=''
                    } 
                } 
                break
                case 2:
                if(!this.chosenProtokols.includes(this.protokol)) {
                    if(this.protokol) {
                        this.chosenProtokols.push(this.protokol)
                        this.protokol=''
                    } 
                } 
                break
            }
        },
        removeChosen(value,num) {
            let index = null
            switch(num) {
                case 1: index = this.chosenNurses.indexOf(value);
                        index !== -1 ? this.chosenNurses.splice(index, 1) : '';
                break
                case 2: index = this.chosenProtokols.indexOf(value);
                        index !== -1 ? this.chosenProtokols.splice(index, 1) : '';
                break
            }
        },
        sonstigeChange(value) {
            let index = null
            if(value==='kalte') {
                if(this.kalte) {
                    this.sonstigMethode.push(value)
                } else {
                    if(this.sonstigMethode.includes(value)) {
                        index = this.sonstigMethode.indexOf(value)
                        index !== -1 ? this.sonstigMethode.splice(index, 1) : ''
                    }
                }
            }
            if(value==='massagen') {
                if(this.messagen) {
                    this.sonstigMethode.push(value)
                } else {
                    if(this.sonstigMethode.includes(value)) {
                        index = this.sonstigMethode.indexOf(value)
                        index !== -1 ? this.sonstigMethode.splice(index, 1) : ''
                    }
                }
            }
            if(value==='warme') {
                if(this.warme) {
                    this.sonstigMethode.push(value)
                } else {
                    if(this.sonstigMethode.includes(value)) {
                        index = this.sonstigMethode.indexOf(value)
                        index !== -1 ? this.sonstigMethode.splice(index, 1) : ''
                    }
                }
            }
        },
        resetValues() {
                this.name = ''
                this.dateOfBirth = ''
                this.chosenNurses = []
                this.chosenProtokols = []
                this.schmerzMedikation = false
                this.schmerzPumpe = false
                this.sonstigMethode = []
                this.kalte = false
                this.messagen = false
                this.warme = false
                this.sonstigMet = ''
                this.beatmungsmodus = ''
                this.beatmungsgerat = ''
                this.ogabe = ''
                this.trachealkanule = ''
                this.ipap = null
                this.epap = null
                this.rampe = null
                this.af = null
                this.ie = null
                this.trigger = null
                this.vt = null
                this.pmax = null
                this.flow = null
                this.tinsp = null
                this.fio = null
                this.insulinpflichtig = false
                this.dosierung = false
                this.oral = false
                this.insulinArt = ''
                this.kostform = ''
                this.inspirationEninstellung = ''
                this.inspirationAnderung = ''
                this.tiEninstellung = ''
                this.tiAnderung = ''
                this.pauseEninstellung = ''
                this.pauseAnderung = ''
                this.widerholenEninstellung = ''
                this.widerholenAnderung = ''
                this.triggerEninstellung = ''
                this.triggerAnderung = ''
                this.expirationEninstellung = ''
                this.expirationAnderung = ''
                this.teEninstellung = ''
                this.teAnderung = ''
                this.zyklEninstellung = ''
                this.zyklAnderung = ''
        },
        async onSubmit() {
            await PatientService.insertPatients(
                this.name,
                this.dateOfBirth,
                this.chosenNurses,
                this.chosenProtokols,
                this.schmerzMedikation,
                this.schmerzPumpe,
                this.sonstigMethode,
                this.sonstigMet,
                this.beatmungsmodus,
                this.beatmungsgerat,
                this.ogabe,
                this.trachealkanule,
                this.ipap,
                this.epap,
                this.rampe,
                this.af,
                this.ie,
                this.trigger,
                this.vt,
                this.pmax,
                this.flow,
                this.tinsp,
                this.fio,
                this.insulinpflichtig,
                this.dosierung,
                this.oral,
                this.insulinArt,
                this.kostform,
                this.inspirationEninstellung,
                this.inspirationAnderung,
                this.tiEninstellung,
                this.tiAnderung,
                this.pauseEninstellung,
                this.pauseAnderung,
                this.widerholenEninstellung,
                this.widerholenAnderung,
                this.triggerEninstellung,
                this.triggerAnderung,
                this.expirationEninstellung,
                this.expirationAnderung,
                this.teEninstellung,
                this.teAnderung,
                this.zyklEninstellung,
                this.zyklAnderung
            ).then(response => {
                console.log(response.data);
                this.resetValues()
            })
        },
        openDeleteModal(id) {
            this.openDelete = true
            this.ID = id
        },
        closeDeleteModal(value) {
            this.openDelete = value
        },
        async deleteItem(id) {
            await PatientService.deletePatients(id)
            .then(response => {
                // this.$emit('successMsg',response.data,'color: #red; background-color: #d94b4bd6;')
            })
            this.openDelete = false
            this.patients = await PatientService.getPatients()
        },
        editItem(data) {
                console.log(data.sonstigMethode);
                this.ID = data._id
                this.name = data.name
                this.dateOfBirth = data.dateOfBirth
                this.chosenNurses = data.nurses
                this.chosenProtokols = data.protokols
                this.schmerzMedikation = data.schmerzMedikation
                this.schmerzPumpe = data.schmerzPumpe
                this.sonstigMethode = data.sonstigMethode
                //-------------------------------
                data.sonstigMethode.includes('kalte') ? this.kalte = true : this.kalte = false
                data.sonstigMethode.includes('massagen') ? this.messagen = true : this.messagen = false
                data.sonstigMethode.includes('warme') ? this.warme = true : this.warme = false
                //-------------------------------
                this.sonstigMet = data.sonstigMet
                this.beatmungsmodus = data.beatmungsmodus
                this.beatmungsgerat = data.beatmungsgerat
                this.ogabe = data.ogabe
                this.trachealkanule = data.trachealkanule
                this.ipap = data.ipap
                this.epap = data.epap
                this.rampe = data.rampe
                this.af = data.af
                this.ie = data.ie
                this.trigger = data.trigger
                this.vt = data.vt
                this.pmax = data.pmax
                this.flow = data.flow
                this.tinsp = data.tinsp
                this.fio = data.fio
                this.insulinpflichtig = data.insulinpflichtig
                this.dosierung = data.dosierung
                this.oral = data.oral
                this.insulinArt = data.insulinArt
                this.kostform = data.kostform
                this.inspirationEninstellung = data.inspirationEninstellung
                this.inspirationAnderung = data.inspirationAnderung
                this.tiEninstellung = data.tiEninstellung
                this.tiAnderung = data.tiAnderung
                this.pauseEninstellung = data.pauseEninstellung
                this.pauseAnderung = data.pauseAnderung
                this.widerholenEninstellung = data.widerholenEninstellung
                this.widerholenAnderung = data.widerholenAnderung
                this.triggerEninstellung = data.triggerEninstellung
                this.triggerAnderung = data.triggerAnderung
                this.expirationEninstellung = data.expirationEninstellung
                this.expirationAnderung = data.expirationAnderung
                this.teEninstellung = data.teEninstellung
                this.teAnderung = data.teAnderung
                this.zyklEninstellung = data.zyklEninstellung
                this.zyklAnderung = data.zyklAnderung
                this.isEdit = true
        },
        async edit() {
            await PatientService.editPatients (
                this.ID,
                this.name,
                this.dateOfBirth,
                this.chosenNurses,
                this.chosenProtokols,
                this.schmerzMedikation,
                this.schmerzPumpe,
                this.sonstigMethode,
                this.sonstigMet,
                this.beatmungsmodus,
                this.beatmungsgerat,
                this.ogabe,
                this.trachealkanule,
                this.ipap,
                this.epap,
                this.rampe,
                this.af,
                this.ie,
                this.trigger,
                this.vt,
                this.pmax,
                this.flow,
                this.tinsp,
                this.fio,
                this.insulinpflichtig,
                this.dosierung,
                this.oral,
                this.insulinArt,
                this.kostform,
                this.inspirationEninstellung,
                this.inspirationAnderung,
                this.tiEninstellung,
                this.tiAnderung,
                this.pauseEninstellung,
                this.pauseAnderung,
                this.widerholenEninstellung,
                this.widerholenAnderung,
                this.triggerEninstellung,
                this.triggerAnderung,
                this.expirationEninstellung,
                this.expirationAnderung,
                this.teEninstellung,
                this.teAnderung,
                this.zyklEninstellung,
                this.zyklAnderung
            ).then(response => {
                this.$emit('successMsg',response.data,'color: #972f08; background-color: rgb(231 112 67 / 83%);')
                this.resetValues()
            })
            this.patients = await PatientService.getPatients()
            this.isEdit = false
        }
    }
}
</script>

<style lang="scss" scoped>

.patient {
    &-input {
        width: 80%;
        margin: 10px auto;
        display: flex;
        flex-direction: column;
        &-column {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            margin-bottom: 20px;
            .form-input {
                display: flex;
                flex-direction: column;
                margin-top: 3vh;
                margin: 10px auto;
                label {
                    // margin-bottom: 3px;
                    font-weight: 600;
                }
                select {
                    margin-top: 4px;
                    height: 36px;
                    width: 250px;
                    border-radius: 5px;
                    padding-left: 5px;
                    border: 2px solid #074a60;
                    font-size: 17px;
                    font-weight: 600;
                    &:focus::placeholder {
                    color: transparent;
                    }
                    &:focus {
                    outline: none !important;
                    border: 2px solid #074a60;
                    box-shadow: 0 0 5px #719ECE;
                    }
                }
            }
        }
        &-row {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 20px;
            margin-bottom: 20px;
            .form-input {
                display: flex;
                flex-direction: column;
                width: 30%;
                margin-top: 3vh;
                label {
                    font-weight: 600;
                }
                input[type=date] {
                    width: 100%;
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
            }
        }
    }
}
@media (max-width: 800px) {
  .patient-input-row {
    flex-direction: column;
    align-items: center;
    .form-input {
        width: 50% !important;
        margin-top: 15px;
    }
  }
  .right-bz {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.styled-addicon {
    width: 40px;
    min-width: 30px;
    color: #074a60;
    margin-left: 15px;
    margin-top: 20px;
    height: 45px;
    cursor: pointer;
}
.chosen {
    &-container {
        width: 80%;
        margin: auto;
        text-align: center;
    }
    &-option {
    display: inline-block;
    margin: 3px 5px;
    padding: 5px 10px;
    background-color: #5ab1cd;
    border-radius: 15px;
    font-weight: 600;
    &-text {
        position: relative;
        top: -3px;
    }
    &-remove {
        position: relative;
        left: 5px;
        top: 2px;
        background-color: #d92121;
        color: #fff;
        border-radius: 20px;
        cursor: pointer;
    }
    }
}

.left-position {
    margin: auto 0;
}
label {
    font-size: 17px;
    font-weight: 600;
}
[type=checkbox] {
    height: 20px;
    margin-left: 10px;
    width: 20px;
    position: relative;
    top: 5px;
}
.right-position {
    p {
        font-size: 18px;
        font-weight: 600;
        text-decoration: underline;
        text-underline-position: from-font;
        margin: 12px 0px;
    }
    &-line {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
    }
    textarea {
        border: 2px solid #074a60;
        font-size: 15px;
        border-radius: 5px;
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
}
.beatmungSting {
    width: 20% !important;
    margin: 2vh 10px;
}
.beatmungInt {
    width: 8% !important;
    margin: 3vh 4px;
}
.right-bz {
    margin-top: -25px;
    .form-input {
        width: 100%;
    }
}
.patientBtn {
    display: block;
    width: 20%;
    height: 35px;
    margin-top: 20px;
    margin: 30px auto;
}
.patientEditBtn {
    width: 20%;
    display: table;
    background-color: #d85a2b;
    text-align: center;
    margin: 20px auto;
    span {
        display: block;
        margin-top: 8px;
    }
}
.assist {
    &-container {
        width: 88%;
        margin: 40px auto;
    }
    &-table {
        border-collapse: collapse;
        margin: auto;
        font-size: 0.9em;
        width: 95%;
        min-width: 2300px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }
    &-tr {
        display: block; 
        float: left; 
    }
    &-th {
        display: block;
        //border: 1px solid rgb(7 74 96 / 50%);
        height: 40px;
        padding: 5px;
        text-align: center;
        font-weight: 600;
        padding-left: 35px;
        padding-right: 35px;
    }
    &-headers {
        display: block;
        margin-top: 10px;
    }
}
.fth {
    padding-left: 0 !important;
}
.thtext {
    text-align: end;
}
input[type=text], input[type=number] {
    margin-top: 4px;
    height: 30px;
    border-radius: 5px;
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
</style>