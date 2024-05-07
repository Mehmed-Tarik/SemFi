<template>
  <div class="container">
    <div class="login-box" v-if="!authenticated">
      <img src="./assets/avatar.png" class="avatar">
        <h1 class="login-box-title">Login Here</h1>
          <form>
            <label class="login-box-label" for="username">Username:</label>
            <input class="login-input" type="text" id="username" name="username" v-model="username" placeholder="Enter Username">
            <label class="login-box-label" for="password">Password:</label>
            <input class="login-input" type="password" id="password" name="password" v-model="password" placeholder="Enter Password">
            <button class="loginBtn" @click="login">Login</button>
            <a class="forget-password" href="#">Forget Password</a>    
          </form>
    </div>
    <div v-if="authenticated"> <!-- v-if="nurse.isAdmin" -->
      <Navbar :nurse="nurse" @logout="logout" :reportsNum="reportsNum"/>
      <router-view :nurse="nurse"  @updateReports="updateReports"></router-view>
    </div>
  </div>
</template>

<script>
import LoginService from "./LoginService"
import ReportService from "./ReportService"

import Navbar from "./components/Navbar.vue"

export default {
    name: 'App',
    components: {
      Navbar
    },
    emits: ['logout','updateReports'],
      data() {
        return {
          isCorrect: false,
          nurses: [],
          nurse: {},
          error: "",
          username: "",
          password: "",
          reportsNum: null,
          authenticated: false
        }
      },
    async created() {
      let a = await ReportService.getReports()
      this.reportsNum = a.length
    },
    methods: {
      async login(e) {
        e.preventDefault();
        await LoginService.loginNurse (
                  this.username,
                  this.password,
        ).then(response => {
          response.data.message === 'success' ? this.authenticated = true : this.authenticated = false
        })
        this.nurse = await LoginService.getNurse()
      },
      async logout() {
        let logoutMsg = await LoginService.logout()
        logoutMsg === 'success' ? this.authenticated = false : this.authenticated = true 
      },
      updateReports(reportsCount) {
        this.reportsNum = reportsCount
      }
    }
}
</script>

<style lang="scss">
body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background-image: url("./assets/logo-semfi.png");
    background-repeat: no-repeat;
    background-position: 50% -200%;
}
.login-box{
    position: absolute;
    width: 240px;
    height: 260px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 70px 30px;
    border-radius: 7px;
    .avatar{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      top: -50px;
      left: calc(50% - 50px);
    }
    &-title {
      margin: 0;
      padding: 0 0 20px;
      text-align: center;
      font-size: 22px;
    }
    &-label {
      font-weight: bold;
      margin-bottom: 5px;
    }
    .login-input {
      width: 100%;
      margin-bottom: 20px;
      border: none;
      border-bottom: 1px solid #fff;
      background: #fff;
      outline: none;
      height: 40px;
      color: #000;
      font-size: 16px;
      border-radius: 6px;
      letter-spacing: 0.2px;
      &::placeholder {
        color: #1c8adb ;
        font-weight: 500;
        opacity: 1; /* Firefox */
      }
    }
    .forget-password {
        text-decoration: none;
        font-size: 14px;
        color: #fff;
      &:hover {
        color: #39dc79;
      }
    }
  .loginBtn {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 13px 29px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-right: 15px;
    cursor: pointer;
    border-radius: 5px;
  }
}
.drag-test {
    width: 240px;
    background-color: red;
    height: 50px;
    text-align: center;
    color: #fff;
    cursor: pointer;
}
</style>
