<template>
    <div class="container">
        <div>Name des Patient: <span class="prop-value"> {{patient.name}}</span></div>
        <div>geb.: <span class="prop-value"> {{patient.dateOfBirth}}</span></div>
        <div>Monat: <span class="prop-value" v-for="(m, index) in month" :key="m">{{m}}<span v-if="month.length > 1 && index === 0">/</span></span></div>
        <div>Jahr: <span class="prop-value" v-for="(y, index) in year" :key="y">{{y}}<span v-if="year.length > 1 && index === 0">/</span></span></div>
        <div class="blatt">Blatt Nr.: <span v-if="!lower">{{ currentPage + 1}}</span><span v-if="lower">{{ currentPage }}</span></div>
    </div>
</template>

<script>
export default {
    name: "FormTop",
    props: {
        patient: Object,
        currentPage: Number,
        lower: Boolean,
        month: Array,
        year: Array
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: space-around;
    border: 2px solid #076a8b;
    border-radius: 8px;
    padding: 5px 0;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 10px;
    width: 94.8%;
    min-width: 1000px;
    .prop-value {
        font-weight: 600;
        color: #003648;
    }
    .blatt {
        span {
            font-weight: 600;
            color: #003648;
        }
    }
}
</style>