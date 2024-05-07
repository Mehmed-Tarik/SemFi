<template>
    <div class="medikamente-container">
        <div class="input-container" v-if="((currentPage + 1) === totalPages) || currentMustLover || length === 0 ">
        <input :class="[isEdit ? 'edit-input':'','styled-input']" v-model="medikament" type="text" placeholder="Add Medikamente">
        <svg class="styled-icon" viewBox="0 0 512 512"><path fill="currentColor" d="M217.4 27.43c-27.9.47-53.1 17.11-64.5 42.84l136.5 41.23c6-35.79-15.5-70.49-50.1-81.02c-6.2-1.88-12.7-2.91-19.2-3.05h-2.7zm-69.7 60.08c-6.1 35.89 15.4 70.69 50.1 81.19c34.8 10.5 71.9-6.7 86.5-40zm265.5 44.29c-25.3.1-52.2 12.3-72.5 41L215.9 349.7c-33.5 47.4-18.9 97 14.1 120.4c33.1 23.5 84.6 20.8 118.1-26.6l124.7-176.8c33.5-47.5 18.9-97-14.1-120.5c-12.4-8.8-27.3-13.9-43-14.4zm-1.8 17.3c1.3 0 2.6 0 3.8.1c12.1.5 23.5 4.8 33.1 11.7c25.7 18.2 38.6 54.5 9.7 95.4l-64.5 91.5c-35.8-9.6-81.8-42.3-102.7-73l64.7-91.6c16.9-23.9 37-33.7 55.9-34.1zM91.25 225.3c-9.62.1-19.11 2.1-27.93 6c-33.11 14.5-50.34 51.5-40.24 86.3l130.72-57.1c-13.1-22.1-36.9-35.5-62.55-35.2zm69.65 51.6L30.2 334.1c18.45 31.4 57.3 44 90.6 29.5c33.2-14.6 50.4-51.8 40.1-86.7z"/></svg>
        <svg v-if="!isEdit" class="styled-addicon" @click="onSubmitMedikament" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-3h3.025q.425 0 .7-.288Q17 12.425 17 12t-.288-.713Q16.425 11 16 11h-3V7.975q0-.425-.287-.7Q12.425 7 12 7t-.712.287Q11 7.575 11 8v3H7.975q-.425 0-.7.287Q7 11.575 7 12t.287.712Q7.575 13 8 13h3v3.025q0 .425.288.7q.287.275.712.275Zm0 5q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>
        <svg v-if="isEdit" class="styled-edit" @click="onEditMedikament" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-3h3.025q.425 0 .7-.288Q17 12.425 17 12t-.288-.713Q16.425 11 16 11h-3V7.975q0-.425-.287-.7Q12.425 7 12 7t-.712.287Q11 7.575 11 8v3H7.975q-.425 0-.7.287Q7 11.575 7 12t.287.712Q7.575 13 8 13h3v3.025q0 .425.288.7q.287.275.712.275Zm0 5q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>
        </div>
        <div class="output-container">
            <div v-for="medikament in medikaments" 
                       :key="medikament._id"
                        class="medikament-item">
                <div class="medikament-item-container"
                     v-for="m in medikament" :key="m._id">
                <svg  class="medikament-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M16.2 3.5c-1-1-2.3-1.5-3.5-1.5s-2.6.5-3.5 1.5L3.4 9.1c-2 2-2 5.1 0 7.1s5.1 2 7.1 0l5.7-5.7c1.9-1.9 1.9-5.1 0-7m-1.4 5.6L12 11.9L8.4 8.4L4 12.8c0-.8.2-1.7.9-2.3l5.7-5.7c.5-.5 1.3-.8 2-.8s1.5.3 2.1.8c1.2 1.3 1.2 3.1.1 4.3m4.8-2c0 .8-.2 1.5-.4 2.3c1 1.2 1 3-.1 4.1l-2.8 2.8l-1.5-1.5l-2.8 2.8c-1.3 1.3-3.1 2-4.8 2c.2.3.4.6.7.9c2 2 5.1 2 7.1 0l5.7-5.7c2-2 2-5.1 0-7.1c-.5-.2-.8-.4-1.1-.6Z"/></svg>
                <div class="medikament-item-subcontainer">
                <span class="medikament-date">{{m.datum}} - {{m.uhrzeit}}</span>
                <span class="medikament-name">{{m.medikament}}</span>
                </div>
                <span class="medikament-nurse">{{m.nurse}}</span>
                <svg v-if="nurse.isAdmin" @click="$emit('deleteMedikament',m._id)" class="action-icon" style="margin-left: 5px" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg>
                <svg v-if="nurse.isAdmin" @click="editMedikament(m)" class="action-icon edit" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.637.438q-.363.162-.763.162H10q-.425 0-.712-.287Q9 17.125 9 16.7v-2.425q0-.4.15-.763q.15-.362.425-.637Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"/></svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Medikamente",
    props: {
        medikaments: Array,
        nurse: Object,
        currentPage: Number,
        totalPages: Number,
        currentMustLover: Boolean,
        length: Number
    },
    data() {
        return {
            medikament: '',
            editID: '',
            isEdit: false
        }
    },
    methods: {
        async onSubmitMedikament() {
            this.$emit("medikament", this.medikament)
            this.medikament = ''
        },
        editMedikament(data) {
            this.editID = data._id
            this.medikament = data.medikament
            this.isEdit = true
        },
        onEditMedikament() {
            this.$emit("editMedikament", this.editID, this.medikament)
            this.medikament = ''
            this.isEdit = false
        }
    }
}
</script>

<style lang="scss" scoped>
.medikamente-container {
    display: flex;
    width: 100%;
}
.input-container {
     display: flex;
}
.styled {
    &-input {
        display: block;
        width: 170px;
        height: 30px;
        border-radius: 25px;
        border: 2px solid #076a8b;
        padding: 5px 7px;
        font-size: 17px;
        padding-left: 15px;
        &:focus::placeholder {
        color: transparent;
        }
        &:focus {
            outline: none !important;
            border: 2px solid #076a8b;
            box-shadow: 0 0 10px #719ECE;
        }
    }
    &-icon {
        width: 26px;
        color: #d94b4b;
        margin-left: -34px;
        height: 45px;
    }
    &-addicon {
        width: 40px;
        color: #d94b4b;
        margin-left: 15px;
        height: 45px;
        cursor: pointer;
    }
    &-edit {
        width: 40px;
        color: #d85a2b;
        margin-left: 15px;
        height: 45px;
        cursor: pointer; 
    }
}
.output-container {
     margin-left: 20px;
     margin-bottom: 30px;
}
.medikament {
    &-item-container {
        display: flex;
        flex-direction: row;
        background-color: #87e2ff;
        padding: 4px 10px;
        border-radius: 30px;
        width: fit-content;
        margin-bottom: 5px;
    }
    &-icon {
        width: 22px;
        color: #d94b4b;
        margin-right: 5px;
        min-width: 22px;
    }
    &-item-subcontainer {
       display: flex;
        flex-direction: column; 
    }
    &-date {
        font-size: 13px;
    }
    &-name {
        font-size: 15px;
        font-weight: 600;
        text-align: center;
    }
    &-nurse {
        font-size: 14px;
        font-weight: 600;
        color: #074a60;
        margin-left: 8px;
        margin-top: 3%;
        .delete {
            margin-left: 5px;
        }
    }
}
</style>