<template>
    <div class="header">
        <div class="left"> <svg v-if="!isOverview" class="backBtn" @click="backProtokol" viewBox="0 0 24 24"><path fill="currentColor" d="M11.325 15.325q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7l-.9-.9h3.225q.425 0 .7-.288Q16 12.425 16 12t-.287-.713Q15.425 11 15 11h-3.2l.925-.925q.275-.275.263-.688q-.013-.412-.288-.687q-.275-.275-.7-.275q-.425 0-.7.275l-2.6 2.6q-.275.275-.275.7q0 .425.275.7ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg> </div>
        <div class="center"> <h2>{{protokolName}}</h2> </div>
        <div class="right"><img src="../assets/logo-semfi.png" class="logo"></div>
    </div>
</template>

<script>
import "../styles.scss"
export default {
    name: "ProtokolHeader",
    props: {
        protokolName: String,
        isOverview: String,
    },
    methods: {
        backProtokol() {
            this.$emit('backProtokol')
        }
    },
}
</script>

<style lang="scss" scoped>
.logo {
    display: block;
    width: 300px;
    margin: auto;
    margin-top: 15px;
}
</style>