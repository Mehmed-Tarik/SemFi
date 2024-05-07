<template>
  <div>
    <!-- :class="[isEdit ? 'edit-xbutton':'','xbutton']" -->
    <div class="protocol-container"  v-if="!isProtokol">
      <!-- <button :style="nurse.isAdmin ? 'top: 60px;':'top: 20px;'" class="logout-btn" @click="$emit('logout')">Logout</button> -->
      <ProtocolsCard :protocols="protocols" @chosenProtocol="choseProtocol"/>
    </div>
    <div v-if="!isProtokolsLoaded" class="orbit-spinner">
      <div class="orbit"></div>
      <div class="orbit"></div>
      <div class="orbit"></div>
    </div>
      <PatientsList v-if="isProtokol" :nurse="nurse" :chosenProtokol="chosenProtokol" @backButton="backButton"/>
  </div>
</template>

<script>
import ProtocolSevice from "@/ProtocolService"
import ReportService from "@/ReportService"
import LoginService from "@/LoginService"

import ProtocolsCard from "../components/ProtocolsCard.vue"
import PatientsList from "../components/PatientsList.vue"

export default {
    name: "Protocols",
    components: {
      ProtocolsCard, 
      PatientsList
    },
    props: {
        nurse: Object
    },
    data() {
        return {
          protocols: [],
          nurses: [],
          isProtokol: false,
          chosenProtokol: '',
          isProtokolsLoaded: false
        }
      },
    async created() {
      let a = await ReportService.getReports()
      this.$emit('updateReports', a.length)
      try {
        this.protocols = await ProtocolSevice.getProtocols()
        this.isProtokolsLoaded = true
      } catch(err) {
        this.error = err.message
      }
    },
    methods: {
        choseProtocol(name) {
          this.chosenProtokol = name
          this.isProtokol = true
          console.log(this.chosenProtokol);
        },
        backButton() {
          this.isProtokol = false
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-panel-btn {
    display: block;
    margin: 0 auto;
    height: 44px;
    border: none;
    background-color: lightblue;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
}
.protocol-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 20px;
    border-radius: 10px;
    opacity: 1;
}
.orbit-spinner {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    perspective: 1000px;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 40%;
}
.logout-btn {
    position: fixed;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-weight: 700;
    background-color: #268cd7;
    border: 2px solid #074a60;
    color: #fff;
    cursor: pointer;
}
</style>