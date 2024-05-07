<template>
    <div class="delete-modal" v-if="openDelete">
        <div>
            <h3>Are you sure ?</h3>
            <span>All data will be permanetly lost</span>
            <span v-if="specMessage" id="specMsg">{{specMessage}}</span>
            <button class="delete-close" @click="$emit('closeDeleteModal', false)">X</button>
        </div>
        <div class="delete-submit">
            <button class="delete-btn yes" @click="$emit('deleteItem', deleteID)">JA</button>
            <button class="delete-btn no"  @click="$emit('closeDeleteModal', false)">NEIN</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeleteModal',
    props: {
        openDelete: Boolean,
        deleteID: String,
        specMessage: String
    }
}
</script>

<style lang="scss" scoped>
.delete {
  &-modal {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 20%;
    border-radius: 10px;
    text-align: center;
    width: 300px;
    height: 120px;
    background-color: #d92121;
    z-index: 1000;
    cursor: pointer;
    h3 {
        margin-bottom: 3px;
    }
    span {
        display: block;
        margin-bottom: 20px;
    }
  }
  &-close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 5px;
    font-weight: 800;
    color: #fff;
    background-color: #d92121;
    cursor: pointer;
  }
  &-btn {
    height: 30px;
    width: 80px;
    border: none;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
    margin: 0 10px;
  }
}
.yes {
    background-color: #8c0707;
    color: #fff;
}
.no {
     background-color: #ffffff;
     color: #000000;
}
#specMsg {
    margin-bottom: 0;
    margin-top: -22px;
    font-size: 12px;
    color: #fff;
}
</style>