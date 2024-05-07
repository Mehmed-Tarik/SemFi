<template>
    <div class="beschreibung-container">
        <div class="title">
            <p>Verlaufsbeobachtung der gekennzeichneten Symptome</p>
        </div>
        <div class="input-container" v-if="((currentPage + 1) === totalPages) || currentMustLover || length === 0 ">
        <textarea :class="[isEdit ? 'edit-input':'']" v-model="beschreib" rows="2" placeholder="Beschreibung..."></textarea>
        <svg v-if="!isEdit" @click="onSubmitBeschreibung" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 10h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
        <svg v-if="isEdit"  @click="onEditBeschreibung" class="beschreibung-edit" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 10h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
        </div>
        <div class="output-container">
            <div v-for="beschr in beschreibung" 
                       :key="beschr._id"
                        class="beschreibung-item">
                <div class="beschreibung-item-container"
                     v-for="b in beschr" :key="b._id">
                    <svg  class="beschreibung-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19 5v9h-5v5H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10l6-6V5c0-1.1-.9-2-2-2zm-7 11H7v-2h5v2zm5-4H7V8h10v2z"/></svg>
                    <div class="beschreibung-item-subcontainer">
                        <span class="beschreibung-date">{{b.datum}} - {{b.uhrzeit}}</span>
                        <span class="beschreibung-name">{{b.beschreibung}}</span>
                    </div>
                    <span class="beschreibung-nurse">{{b.nurse}}</span>
                    <svg v-if="nurse.isAdmin" @click="$emit('deleteBeschreibung',b._id)" class="action-icon" style="margin-left: 5px" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg>
                    <svg v-if="nurse.isAdmin" @click="editBeschreibung(b)" class="action-icon edit" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.637.438q-.363.162-.763.162H10q-.425 0-.712-.287Q9 17.125 9 16.7v-2.425q0-.4.15-.763q.15-.362.425-.637Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"/></svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Beschreibung",
    props: {
        beschreibung: Array,
        nurse: Object,
        currentPage: Number,
        totalPages: Number,
        currentMustLover: Boolean,
        length: Number
    },
    data() {
        return {
            beschreib: '',
            editID: '',
            isEdit: false
        }
    },
    methods: {
        async onSubmitBeschreibung() {
            this.$emit("onBeschreibung", this.beschreib)
            this.beschreib = ''
        },
        editBeschreibung(data) {
            console.log(data);
            this.editID = data._id
            this.beschreib = data.beschreibung
            this.isEdit = true
        },
        onEditBeschreibung() {
            this.$emit("editBeschreibung", this.editID, this.beschreib)
            this.beschreib = ''
            this.isEdit = false
        }
    }
}
</script>

<style lang="scss" scoped>
.beschreibung-container {
    width: 100%;
    //border: 2px solid blue;
}
.title {
    background-color: #6eba6e;
    padding: 5px 0px;
    border-radius: 10px;
    p {
        text-align: center;
        margin: 5px 0;
    }
}
.input-container {
    display: flex;
        textarea {
        width: 95%;
        display: block;
        margin: 10px 0;
        resize: vertical;
        border: 2px solid #074a60;
        border-radius: 8px;
        padding-left: 5px;
        font-size: 16px;
        &:focus::placeholder {
        color: transparent;
        }
        &:focus {
            outline: none !important;
            border: 2px solid #074a60;
            box-shadow: 0 0 10px #719ECE;
        }
        }
        svg {
            width: 46px;
            color: #074a60;
            margin-left: 20px;
            cursor: pointer;
        }
}
.output-container {
    margin-top: 10px;
}
.beschreibung {
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
        margin-right: 5px;
        color: #074a60;
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
    }
    &-nurse {
        font-size: 14px;
        font-weight: 600;
        color: #074a60;
        margin-left: 8px;
        margin-top: 3%;
    }
    &-edit {
        width: 46px;
        color: #d85a2b !important;
        margin-left: 20px;
        cursor: pointer; 
    }
}
</style>