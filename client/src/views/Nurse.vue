<template>
  <div class="nurse">
    <div class="header">
        <router-link to="/" class="left"> <svg class="backBtn" viewBox="0 0 24 24"><path fill="currentColor" d="M11.325 15.325q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7l-.9-.9h3.225q.425 0 .7-.288Q16 12.425 16 12t-.287-.713Q15.425 11 15 11h-3.2l.925-.925q.275-.275.263-.688q-.013-.412-.288-.687q-.275-.275-.7-.275q-.425 0-.7.275l-2.6 2.6q-.275.275-.275.7q0 .425.275.7ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg> </router-link>
        <div class="center"> <h2>Nurse Input</h2> </div>
        <div class="right"></div>
    </div>
    <div class="nurse-form">
      <form @submit="onSubmit">
        <div class="form-input">
          <label for="">Nurse's Name: </label>
          <input type="text" v-model="name" placeholder="name">
        </div>
        <div class="form-input">
          <label for="">Nurse's Username: </label>
          <input type="text" v-model="username" placeholder="username">
        </div>
        <div class="form-input">
          <label for="">Set Password: </label>
          <input type="text" v-model="password" placeholder="password">
        </div>
        <div class="form-check">
          <label for="">is Admin: </label>
          <input type="checkbox" v-model="isAdmin">
        </div>
        <input class="saveBtnAdmin" v-if="!isEdit"  type="submit" value="Save" />
        <div class="saveBtnAdmin editBtn" v-if="isEdit" @click="edit">Edit</div>
      </form>
    </div>
    <div class="nurse-table">
      <table class="styled-table">
        <thead>
          <tr>
            <th style="border-top-left-radius: 8px;">Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Is Nurse Admin</th>
            <th style="border-top-right-radius: 8px;">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nurse in nurses" :key="nurse._id">
            <td>{{nurse.name}}</td>
            <td>{{nurse.username}}</td>
            <td>{{nurse.password}}</td>
            <td>{{nurse.isAdmin}}</td>
            <td>
              <svg @click="deleteItem(nurse._id)" class="action-icon" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"/></g></svg>
              <svg @click="editItem(nurse)" class="action-icon edit" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.637.438q-.363.162-.763.162H10q-.425 0-.712-.287Q9 17.125 9 16.7v-2.425q0-.4.15-.763q.15-.362.425-.637Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"/></svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import LoginService from "@/LoginService"

export default {
  name: "Nurse",
  data() {
    return {
      name: '',
      username: '',
      password: '',
      isAdmin: false,
      isEdit: false,
      editID: '',
      nurses: []
    }
  },
  async created() {
    this.nurses = await LoginService.getPNurses() 
  },
  methods: {
    editItem(nurse) {
      this.editID = nurse._id
      this.name = nurse.name
      this.username = nurse.username
      this.password = nurse.password
      this.isAdmin = nurse.isAdmin
      this.isEdit = true
    },
    async edit() {
      await LoginService.editNurse(
        this.editID,
        this.name,
        this.username,
        this.password,
        this.isAdmin
        )
      this.nurses = await LoginService.getPNurses() 
      this.isEdit = false
      this.resetValues()
    },
    async deleteItem(id) {
        await LoginService.deleteNurse(id)
        this.nurses = await LoginService.getPNurses() 

    },
    async onSubmit(e) {
      e.preventDefault()
      await LoginService.insertNurse (
        this.name,
        this.username,
        this.password,
        this.isAdmin
      )
      this.nurses = await LoginService.getPNurses() 
      this.resetValues()
    },
    resetValues() {
      this.name = ''
      this.username = ''
      this.password = ''
      this.isAdmin = false
    }
  }
}
</script>

<style lang="scss" scoped>

.nurse {
  &-form {
    display: flex;
    flex-direction: column;
    .form-input {
      display: flex;
      flex-direction: column;
      width: 28%;
      margin: 10px auto;
      label {
        margin-bottom: 5px;
        font-weight: 600;
      }
      input {
        height: 28px;
        border-radius: 5px;
        padding-left: 5px;
        border: 2px solid #074a60;
        &:focus::placeholder {
        color: transparent;
        }
        &:focus {
        outline: none !important;
        border: 2px solid #074a60;
        box-shadow: 0 0 5px #719ECE;
        }
      }
    }
    .form-check {
      display: flex;
      width: 25%;
      margin: 10px auto;
      label {
        margin-top: 4px;
        font-weight: 600;
      }
      input {
        width: 20px;
        height: 20px;
      }
    }
  }
}
.saveBtnAdmin {
  display: block;
  width: 120px;
  margin: 10px auto;
  height: 32px;
  border: none;
  font-weight: 600;
  background-color: #149816;
  border-radius: 5px;
  color: #fff;
}
</style>
