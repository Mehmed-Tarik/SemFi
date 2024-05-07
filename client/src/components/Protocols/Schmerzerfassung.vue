<template>
    <div class="schmerz-container">
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
        <div class="schmerz-patientData">
            <div class="schmerz-patientData-left"> 
                <div>
                    <svg v-if="patient.schmerzMedikation" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg>
                    <svg v-if="!patient.schmerzMedikation" class="ja-nein-icons nein" viewBox="0 0 256 256"><path fill="currentColor" d="M164.2 100.2L136.5 128l27.7 27.8a5.9 5.9 0 1 1-8.4 8.4L128 136.5l-27.8 27.7a5.9 5.9 0 0 1-8.4-8.4l27.7-27.8l-27.7-27.8a5.9 5.9 0 0 1 8.4-8.4l27.8 27.7l27.8-27.7a5.9 5.9 0 0 1 8.4 8.4ZM222 48v160a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14V48a14 14 0 0 1 14-14h160a14 14 0 0 1 14 14Zm-12 0a2 2 0 0 0-2-2H48a2 2 0 0 0-2 2v160a2 2 0 0 0 2 2h160a2 2 0 0 0 2-2Z"/></svg>
                    <span>angeordnete Schmerzmedikation <b>(s. Medikamentenblatt)</b></span>
                </div>
                <div>
                    <svg v-if="patient.schmerzPumpe" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg>
                    <svg v-if="!patient.schmerzPumpe" class="ja-nein-icons nein" viewBox="0 0 256 256"><path fill="currentColor" d="M164.2 100.2L136.5 128l27.7 27.8a5.9 5.9 0 1 1-8.4 8.4L128 136.5l-27.8 27.7a5.9 5.9 0 0 1-8.4-8.4l27.7-27.8l-27.7-27.8a5.9 5.9 0 0 1 8.4-8.4l27.8 27.7l27.8-27.7a5.9 5.9 0 0 1 8.4 8.4ZM222 48v160a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14V48a14 14 0 0 1 14-14h160a14 14 0 0 1 14 14Zm-12 0a2 2 0 0 0-2-2H48a2 2 0 0 0-2 2v160a2 2 0 0 0 2 2h160a2 2 0 0 0 2-2Z"/></svg>
                    <span>Schmerzpumpe <b>(s. Pumpenprotokoll)</b></span>
                </div>
            </div>
            <div class="schmerz-patientData-right"> 
                <div class="sonstige-title">
                    <svg v-if="patient.sonstigMethode" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg>
                    <svg v-if="!patient.sonstigMethode" class="ja-nein-icons nein" viewBox="0 0 256 256"><path fill="currentColor" d="M164.2 100.2L136.5 128l27.7 27.8a5.9 5.9 0 1 1-8.4 8.4L128 136.5l-27.8 27.7a5.9 5.9 0 0 1-8.4-8.4l27.7-27.8l-27.7-27.8a5.9 5.9 0 0 1 8.4-8.4l27.8 27.7l27.8-27.7a5.9 5.9 0 0 1 8.4 8.4ZM222 48v160a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14V48a14 14 0 0 1 14-14h160a14 14 0 0 1 14 14Zm-12 0a2 2 0 0 0-2-2H48a2 2 0 0 0-2 2v160a2 2 0 0 0 2 2h160a2 2 0 0 0 2-2Z"/></svg>
                    <span>sonstige Methoden zur Schmerzlinderung</span>
                </div>
                <div class="sonstige-options">
                    <div class="sonstige-options-left">
                        <div>
                            <svg v-if="patient.sonstigMethode.includes('kalte')" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg>
                            <svg v-if="!patient.sonstigMethode.includes('kalte')" class="ja-nein-icons nein" viewBox="0 0 256 256"><path fill="currentColor" d="M164.2 100.2L136.5 128l27.7 27.8a5.9 5.9 0 1 1-8.4 8.4L128 136.5l-27.8 27.7a5.9 5.9 0 0 1-8.4-8.4l27.7-27.8l-27.7-27.8a5.9 5.9 0 0 1 8.4-8.4l27.8 27.7l27.8-27.7a5.9 5.9 0 0 1 8.4 8.4ZM222 48v160a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14V48a14 14 0 0 1 14-14h160a14 14 0 0 1 14 14Zm-12 0a2 2 0 0 0-2-2H48a2 2 0 0 0-2 2v160a2 2 0 0 0 2 2h160a2 2 0 0 0 2-2Z"/></svg>
                            <span>Kälte</span>
                        </div>
                        <div>
                            <svg v-if="patient.sonstigMethode.includes('warme')" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg>
                            <svg v-if="!patient.sonstigMethode.includes('warme')" class="ja-nein-icons nein" viewBox="0 0 256 256"><path fill="currentColor" d="M164.2 100.2L136.5 128l27.7 27.8a5.9 5.9 0 1 1-8.4 8.4L128 136.5l-27.8 27.7a5.9 5.9 0 0 1-8.4-8.4l27.7-27.8l-27.7-27.8a5.9 5.9 0 0 1 8.4-8.4l27.8 27.7l27.8-27.7a5.9 5.9 0 0 1 8.4 8.4ZM222 48v160a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14V48a14 14 0 0 1 14-14h160a14 14 0 0 1 14 14Zm-12 0a2 2 0 0 0-2-2H48a2 2 0 0 0-2 2v160a2 2 0 0 0 2 2h160a2 2 0 0 0 2-2Z"/></svg>
                            <span>Wärme</span>
                        </div>
                    </div>
                    <div class="sonstige-options-right">
                        <div>
                            <svg v-if="patient.sonstigMethode.includes('massagen')" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg>
                            <svg v-if="!patient.sonstigMethode.includes('massagen')" class="ja-nein-icons nein" viewBox="0 0 256 256"><path fill="currentColor" d="M164.2 100.2L136.5 128l27.7 27.8a5.9 5.9 0 1 1-8.4 8.4L128 136.5l-27.8 27.7a5.9 5.9 0 0 1-8.4-8.4l27.7-27.8l-27.7-27.8a5.9 5.9 0 0 1 8.4-8.4l27.8 27.7l27.8-27.7a5.9 5.9 0 0 1 8.4 8.4ZM222 48v160a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14V48a14 14 0 0 1 14-14h160a14 14 0 0 1 14 14Zm-12 0a2 2 0 0 0-2-2H48a2 2 0 0 0-2 2v160a2 2 0 0 0 2 2h160a2 2 0 0 0 2-2Z"/></svg>
                            <span>Massagen</span>
                        </div>
                        <div>
                            <svg v-if="patient.sonstigMet" class="ja-nein-icons ja" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7Zm7.854 2.354a.5.5 0 0 0-.708-.708L7 9.293L5.854 8.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5Z"/></svg>
                            <svg v-if="!patient.sonstigMet" class="ja-nein-icons nein" viewBox="0 0 256 256"><path fill="currentColor" d="M164.2 100.2L136.5 128l27.7 27.8a5.9 5.9 0 1 1-8.4 8.4L128 136.5l-27.8 27.7a5.9 5.9 0 0 1-8.4-8.4l27.7-27.8l-27.7-27.8a5.9 5.9 0 0 1 8.4-8.4l27.8 27.7l27.8-27.7a5.9 5.9 0 0 1 8.4 8.4ZM222 48v160a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14V48a14 14 0 0 1 14-14h160a14 14 0 0 1 14 14Zm-12 0a2 2 0 0 0-2-2H48a2 2 0 0 0-2 2v160a2 2 0 0 0 2 2h160a2 2 0 0 0 2-2Z"/></svg>
                            <span>Sonstiges: <i>{{patient.sonstigMet}}</i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
        </div>
            <form @submit="onSubmit">
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th style="border-top-left-radius: 8px;">Datum</th>
                            <th class="shrinked-th">Uhrzeit</th>
                            <th>
                                <svg class="emoji" style="background-color: yellow;" width="40" height="40" viewBox="0 0 16 16"><g fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25a.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/></g></svg>
                                0
                            </th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>
                                <svg class="emoji" style="background-color: #58a2ff;" width="40" height="40" viewBox="0 0 16 16"><g fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z"/></g></svg>
                                4
                            </th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>
                                <svg class="emoji" style="background-color: #ff6a00;" width="40" height="40" viewBox="0 0 16 16"><g fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25a.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/></g></svg>
                                9
                            </th>
                            <th>10</th>
                            <th class="shrinked-th">Schmerzbeschreibung (stechend, dumpf, ziehend, pochend)</th>
                            <th class="shrinked-th">Schmerzmittel-Nebenwirkung (Übelkeit, Erbrechen, Obstipation)</th>
                            <th class="shrinked-th">Beeinflussende Faktoren</th>
                            <th class="shrinked-th-2">Hz.</th>
                            <th style="border-top-right-radius: 8px;"  v-if="!overview">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="schmerz in visibleSchmerz"
                                  :visibleSchmerz="visibleSchmerz"
                                  :schmerz="schmerz"
                                  :currentPage="currentPage"
                                  :key="schmerz._id"
                                  :style="[schmerz.isReport ? 'background-color: rgb(241 84 84 / 32%)' : '']">
                            <td>{{schmerz.datum}}</td>
                            <td class="shrinked-th">{{schmerz.uhrzeit}}</td>
                            <td class="shrinked-th" v-for="(schBtn, index) in schmerz.schmerzBtn" :key="index">
                                <span v-if="schBtn" style="font-weight: 700">X</span>
                            </td>
                            <td class="shrinked-th">{{schmerz.schmerzBesch}}</td>
                            <td class="shrinked-th">{{schmerz.schmerzMittel}}</td>
                            <td class="shrinked-th">{{schmerz.faktoren}}</td>
                            <td class="shrinked-th-2">{{schmerz.nurse}}</td>
                            <td  v-if="!overview" style="display: flex; justify-content: center;">
                                <svg v-if="nurse.isAdmin" @click="openDeleteModal(schmerz._id)" class="action-icon" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg>
                                <svg v-if="nurse.isAdmin" @click="editItem(schmerz)" class="action-icon edit" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.637.438q-.363.162-.763.162H10q-.425 0-.712-.287Q9 17.125 9 16.7v-2.425q0-.4.15-.763q.15-.362.425-.637Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"/></svg>
                                <svg v-if="!nurse.isAdmin" @click="report(schmerz._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                                <svg v-if="nurse.isAdmin && schmerz.isReport" @click="adminReport(schmerz._id)" class="action-icon report" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/></svg>
                            </td>
                        </tr>
                        <tr class="input-row" v-if="((currentPage + 1) === totalPages) || currentMustLover || schmerz.length === 0 || page || page === 0">
                            <td></td>
                            <td class="shrinked-th">
                                <vue-timepicker v-if="hideTimePicker"  :class="[isEdit ? 'timepicker-edit':'','timepicker']" v-model="chosenTime"></vue-timepicker>
                                <!-- <input type="time" class="without_ampm"  />
                                <vue-timepicker /> -->
                                <!-- <input type="time" /> -->
                            </td>
                            <td class="num-input" v-for="n in schmerzBtn.length" :key="n">
                                <Xbuttons :number="n" :array="schmerzBtn" @marked="marked" :isEdit="isEdit"  /> 
                            </td>
                            <td class="shrinked-th"><textarea v-model="schmerzBesch" :class="[isEdit ? 'edit-input':'','area']" rows="2" placeholder="Schmerzbeschreibung"></textarea></td>
                            <td class="shrinked-th"><textarea v-model="schmerzMittel" :class="[isEdit ? 'edit-input':'','area']" rows="2" placeholder="schmerzMittel"></textarea></td>
                            <td class="shrinked-th"><textarea v-model="faktoren" :class="[isEdit ? 'edit-input':'','area']" style="width: 75%;" rows="2" placeholder="Beeinflussende Faktoren"></textarea></td>
                            <td class="shrinked-th-2"><p style="font-weight: 700; color: #003648">{{nurse.username}}</p></td>
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
            <Pagination v-if="!isEdit" :protokolArray="schmerz" :currentPage="currentPage" :pageSize="pageSize" 
                        :currentMustLover="currentMustLover" :hidePrevious="hidePrevious" @updatePage="updatePage" />

        <ReportModal :openReport="openReport" :openAdminReport="openAdminReport" @closeReport="closeReport"
            :reportID="ID" :isAdmin="nurse.isAdmin" @reportUpdated="reportUpdated"
            :reportMessageAdmin="reportMessageAdmin" @closeAdminReport="closeAdminReport" @reportUploaded="reportUploaded"
            :protokolName="protokolName" :patient="patient" :page="currentPage" :nurseName="nurse.username"/>
        
    </div>
</template>

<script>
import SchmerzService from "@/SchmerzService"
import ReportService from "@/ReportService"

import Xbuttons from "./ProtocolComponents/Xbuttons.vue"
import FormTop from "./ProtocolComponents/FormTop.vue"
import Pagination from "./ProtocolComponents/Pagination.vue"
import ProtokolHeader from "../ProtokolHeader.vue"
import ReportModal from "./ProtocolComponents/ReportModal.vue"
import SuccessMessage from "./ProtocolComponents/SuccessMessage.vue"
import DeleteModal from "./ProtocolComponents/DeleteModal.vue"

import VueTimePicker from "vue3-timepicker";
import "vue3-timepicker/dist/VueTimepicker.css";

export default {
    name: 'Schmerzerfassung',
    components: {
        ProtokolHeader, FormTop, Pagination, Xbuttons,
        ReportModal, SuccessMessage, DeleteModal,
        "vue-timepicker": VueTimePicker,
    },
    props: ['nurse','patient','protokolName','page','month','year','successMessage','color','pageSize', 'overview', 'von', 'bis'],
    emits: ['backProtokol','topDate','successMsg','backOverview'],
    data(){
        return {
            schmerz: [],
            visibleSchmerz: [],
            eDate: '',
            chosenTime: '',
            schmerzBtn: [false, false, false, false, false, false, false, false, false, false, false],
            schmerzBesch: '',
            schmerzMittel: '',
            faktoren: '',
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
            hideTimePicker: true,
        }
    },
    async created() {
        this.schmerz = await SchmerzService.getSpecificSchmerz(this.patient.name)
        this.isLoaded = true
        console.log(this.overview);
        if(this.overview === 'overview') {
            this.visibleSchmerz = await SchmerzService.getDataForOverview(this.patient.name,this.von,this.bis)
            this.currentPage = 0
        }

        if(this.page || this.page === 0) {
            this.currentPage = this.page
            this.updateVisible()
            this.currentMustLover = false
            this.$emit('topDate', this.visibleSchmerz)
        } else {
            if(!this.overview) {
                this.currentPage = Math.ceil(this.schmerz.length / this.pageSize)  
                this.updateVisible()
                this.alterCurrentValue()
            }
        }
        this.currentPage === 1 && this.visibleSchmerz.length === this.pageSize ? this.hidePrevious = true : this.hidePrevious = false
    },
    methods: {
        marked(num) {
            this.schmerzBtn[num] = !this.schmerzBtn[num]
        },
        async viewAll() {
            this.viewall = !this.viewall
            this.isLoaded = false
            this.schmerz = await SchmerzService.getSpecificSchmerz(this.patient.name,this.viewall)
            this.isLoaded = true
            this.currentPage = Math.ceil(this.schmerz.length / this.pageSize) 
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
        this.$emit('topDate', this.visibleSchmerz)
        },
        updateVisible() {
        this.visibleSchmerz = this.schmerz.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
        if(this.visibleSchmerz.length === 0 && this.currentPage > 0) {
            this.updatePage(this.currentPage - 1)
        }
        },
        alterCurrentValue() {
            this.totalPages = Math.ceil(this.schmerz.length / this.pageSize)
            if(this.visibleSchmerz.length === this.pageSize) {
                this.currentPage++
                this.currentMustLover = true               
            } else {
                this.currentMustLover = false
            }
        },
        resetValues() {
            for(let i=0;i<this.schmerzBtn.length;i++){
                this.schmerzBtn[i] = false
            }
            this.schmerzBesch = ''
            this.schmerzMittel = ''
            this.faktoren = ''
            // this.hideTimePicker = false;
            this.chosenTime = ''
            // setTimeout(() => {
            //     this.hideTimePicker = true;
            // },300)
            // this.hideTimePicker = true;
        },
        editItem(data) {
            this.hideTimePicker = false;
            this.currentEdit = this.currentPage
            this.ID = data._id
            this.eDate = data.datum.substr(6,10) + '-' + data.datum.substr(3,2) + '-' + data.datum.substr(0,2)
            this.chosenTime = data.uhrzeit
            this.schmerzBtn = data.schmerzBtn
            this.schmerzBesch = data.schmerzBesch
            this.schmerzMittel = data.schmerzMittel
            this.faktoren = data.faktoren
            this.isEdit = true
            if(this.page === undefined)
            this.currentMustLover ? this.currentPage = this.totalPages : this.currentPage = (this.totalPages - 1)

            setTimeout(() => { this.hideTimePicker = true },300)
        },
        async edit() {
            await SchmerzService.editSchmerz (
                this.ID,
                this.eDate.substr(8,10) + '/' + this.eDate.substr(5,2) + '/' + this.eDate.substr(0,4),
                this.chosenTime,
                this.schmerzBtn,
                this.schmerzBesch,
                this.schmerzMittel,
                this.faktoren
            ).then(response => {
                this.$emit('successMsg',response.data,'color: #972f08; background-color: rgb(231 112 67 / 83%);')
            })
            this.schmerz = await SchmerzService.getSpecificSchmerz(this.patient.name)
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
            await SchmerzService.deleteSchmerz(id)
            .then(response => {
                this.$emit('successMsg',response.data,'color: #red; background-color: #d94b4bd6;')
            })
            await ReportService.deleteReport(id)
            this.openDelete = false
            this.schmerz = await SchmerzService.getSpecificSchmerz(this.patient.name)
            this.visibleSchmerz.length === 1 ? this.onLastItemUploaded = false : this.onLastItemUploaded = true
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
            a = await SchmerzService.getReport(id,this.patient.name)
            this.reportMessageAdmin = a[0].reportMessage
            this.openAdminReport = true
        },
        async reportUploaded(message) {
            this.openReport = false
            this.openAdminReport = false
            this.schmerz = await SchmerzService.getSpecificSchmerz(this.patient.name)
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
            console.log(this.schmerzBtn);
            e.preventDefault()
            await SchmerzService.insertSchmerz (
                this.patient.name,
                this.chosenTime,
                this.nurse.username,
                this.schmerzBtn,
                this.schmerzBesch,
                this.schmerzMittel,
                this.faktoren
            ).then(response => {
                this.$emit('successMsg',response.data,'color: darkgreen; background-color: #abf5abe8;')
            })
            this.currentMustHigher ? this.currentPage++ : ''
            this.currentMustHigher = false
            this.schmerz = await SchmerzService.getSpecificSchmerz(this.patient.name)
            this.updateVisible()
            this.alterCurrentValue()
            this.resetValues()
            this.$emit('topDate', this.visibleSchmerz)
            this.viewall = false
            this.currentPage === 1 && this.visibleSchmerz.length === this.pageSize ? this.hidePrevious = true : this.hidePrevious = false
        }
    }
}
</script>

<style lang="scss" scoped>
// @import '../../../node_modules/vue3-timepicker/dist/VueTimepicker.css';
// .vue__time-picker-input {
//     width: 7em;
// }
.schmerz-patientData {
    display: flex;
    flex-direction: row;
    width: 95.1%;
    margin: auto;
    min-width: 1000px;
    margin-top: 5px;
    margin-bottom: 25px;
    &-left {
        border: 2px solid #000;
        flex: 1;
        margin-right: 5px;
        border-radius: 8px;
        height: 120px;
        div {
            margin-left: 20px;
            margin-top: 18px;
        }
    }
    &-right {
        border: 2px solid #000;
        flex: 1;
        margin-left: 5px;
        border-radius: 8px;
        height: 120px;
        .sonstige-title {
            text-align: center;
            padding-bottom: 5px;
            border-bottom: 2px solid;
        }
        .sonstige-options {
            display: flex;
            flex-direction: row;
            margin-top: 5px;
            &-left {
                flex: 1;
                div {
                    margin-bottom: 10px;
                    margin-left: 20px;
                }
            }
            &-right {
                flex: 1;
                div {
                    margin-bottom: 10px;
                }
            }
        }
    }
}
.emoji {
    position: absolute;
    border-radius: 20px;
    color: #000;
    margin-top: -40px;
    margin-left: 4px;
 }
.styled-table {
    min-width: 1000px;
    th,td {
        //padding: 10px 3px;
        font-weight: 500;
    }
}
.shrinked-th {
    padding: 2px 0 !important;
    &-2 {
        padding: 5px 5px !important;
    }
}
.num-input {
    padding: 0 1px;
}
.area {
    width: 85%;
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
// input[type=time]::-webkit-datetime-edit-ampm-field {
//   display: none;
// }
</style>