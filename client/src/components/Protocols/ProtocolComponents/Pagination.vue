<template>
  <div>
    <div v-if="totalPages() > 0" class="pagination-wrapper">
        <svg v-if="showPreviousLink() && !hidePrevious" class="pagination-btn" @click="updatePage(currentPage - 1)" viewBox="0 0 24 24"><path fill="currentColor" d="M21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2M7 12l5 5v-3h4v-4h-4V7l-5 5Z"/></svg>
        <p> <span v-if="!currentMustLover" style="font-weight: 600">{{ currentPage + 1 }}</span> <span v-if="currentMustLover" style="font-weight: 600">{{ currentPage }}</span> of <span style="font-weight: 600">{{totalPages()}}</span> </p>
        <svg v-if="showNextLink() && !currentMustLover" class="pagination-btn" @click="updatePage(currentPage + 1)" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2m14-7l-5-5v3H8v4h4v3l5-5Z"/></svg>
    </div>
  </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        protokolArray: Array,
        currentPage: Number,
        pageSize: Number,
        currentMustLover: Boolean,
        hidePrevious: Boolean
    },
    methods: {
        updatePage(pageNumber) {
            this.$emit('updatePage', pageNumber)
        },
        totalPages() {
            return Math.ceil(this.protokolArray.length / this.pageSize)
        },
        showPreviousLink() {
            return this.currentPage === 0 ? false : true
        },
        showNextLink() {
            return this.currentPage === (this.totalPages() - 1) ? false : true
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination {
    &-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        p {
            margin: 16px 8px;
        }
    }
    &-btn {
        display: block;
        width: 50px;
        color: #074a60;
        cursor: pointer;
    }
}
</style>