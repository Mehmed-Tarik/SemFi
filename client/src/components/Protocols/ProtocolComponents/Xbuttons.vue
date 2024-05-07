<template>
    <div :class="[isEdit ? 'xbutton-edit':'','xbutton']" class="xbutton" @click="marked(number - 1)">
        <span v-if="array[number - 1]">X</span>
    </div>
</template>

<script>
export default {
    name: "Xbuttons",
    props: {
        number: Number,
        array: Array,
        isEdit: Boolean
    },
    methods: {
        marked(num) {
            this.$emit("marked", num)
        }
    },
}
</script>