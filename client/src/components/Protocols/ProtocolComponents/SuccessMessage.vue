<template>
    <div class="uploaded" v-if="message" :style="color">
        <svg class="uploaded-close" @click="message=''" viewBox="0 0 16 16"><path fill="currentColor" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
        <span>{{message}}</span>
    </div>
</template>

<script>
export default {
    name: 'SuccessMessage',
    props: {
        message: String,
        color: String
    }
}
</script>

<style lang="scss">
.uploaded {
    text-align: center;
    width: fit-content;
    position: fixed;
    top: 5%;
    right: 5%;
    padding: 15px 45px;
    border-radius: 5px;
    font-weight: 600;
    transition: 2s;
    &-close {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 20px;
        color: #d94b4b;
        cursor: pointer;
    }
}
</style>