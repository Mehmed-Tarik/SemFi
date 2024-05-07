<template>
     <nav>
        <input type="checkbox" id="check">
        <label for="check" class="checkbtn">
          <svg width="1em" height="1em"><path fill="currentColor" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/></svg>
        </label>
        <label class="logo"><img src="../assets/logo-semfi.png" class="nav-logo"></label>
        <ul>
          <li><router-link class="nav-link" to="/">Protokols</router-link></li>
          <li v-if="nurse.isAdmin"><router-link class="nav-link" to="/nurse">Nurse</router-link></li>
          <li v-if="nurse.isAdmin"><router-link class="nav-link" to="/patient">Patient</router-link></li>
          <li v-if="nurse.isAdmin"><router-link class="nav-link" to="/overview">Overview</router-link></li>
          <li><router-link class="nav-link" to="/contact">Contact Us</router-link></li>
          <li v-if="nurse.isAdmin"><router-link class="nav-link" to="/reports">Reports<span v-if="reportsNum" class="report-number">{{reportsNum}}</span></router-link></li>
          <li><a class="nav-link" @click="$emit('logout')">Logout</a></li>
        </ul>
     </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: {
        reportsNum: Number,
        nurse: Object
    }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: #0082e6;
  height: 50px;
  width: 100%;
  label.logo {
    color: #fff;
    font-size: 25px;
    line-height: 50px;
    padding: 0 100px;
    font-weight: bold;
  }
  ul {
    float: right;
    margin-right: 20px;
    li {
      display: inline-block;
      line-height: 10px;
      margin: 0 5px;
      a {
        color: #fff;
        font-size: 17;
        padding: 7px 8px;
        border-radius: 3px;
        text-decoration: none;
        letter-spacing: 0.3px;
      }
    }
  }
}
.nav-logo {
    width: 200px;
    margin-top: 10px;
}
.nav-link:hover {
  background-color: #1b9bff;
  transition: .5s;
}
.checkbtn {
  font-size: 30px;
  color: #fff;
  float: right;
  line-height: 40px;
  margin-right: 40px;
  cursor: pointer;
  display: none;
      margin-top: 10px;
}
#check {
  display: none;
}
@media (max-width: 952px) {
  label.logo {
    font-size: 30px;
    padding-left: 50px;
  }
  nav ul li a {
    font-size: 16px;
  }
}
@media (max-width: 858px) {
  .checkbtn {
    display: block;
    margin-top: 10px;
  }
  nav ul {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: #2c3e50;
    top: 34px;
    left: -120%;
    text-align: center;
    transition: all .5s;
    li {
      display: block;
      margin: 50px 0;
      line-height: 30px;
      a {
        font-size: 20px;
        &:hover {
          background: none;
          color: #0082e6;
        }
      }
    }
  }
  #check:checked ~ ul {
    left: 0;
  }
}
.report-number {
    position: relative;
    top: -12px;
    left: 5px;
    background-color: red;
    padding: 3px 7px;
    font-size: 12px;
    border-radius: 20px;
}
</style>