<template>
    <div class="contact-contanier">
        <div class="header">
            <router-link to="/" class="left"> <svg class="backBtn" viewBox="0 0 24 24"><path fill="currentColor" d="M11.325 15.325q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7l-.9-.9h3.225q.425 0 .7-.288Q16 12.425 16 12t-.287-.713Q15.425 11 15 11h-3.2l.925-.925q.275-.275.263-.688q-.013-.412-.288-.687q-.275-.275-.7-.275q-.425 0-.7.275l-2.6 2.6q-.275.275-.275.7q0 .425.275.7ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg> </router-link>
            <div class="center"> <h2>Send Email</h2> </div>
            <div class="right"></div>
        </div>
        <div class="contact-form">
            <form @submit.prevent="onEmailSubmit">
                <div class="form-input">
                    <label for="name">From: </label>
                    <input type="name" id="name" v-model="from" placeholder="From">
                </div>
                <div class="form-input">
                    <label for="email">To: </label>
                    <input type="email" id="email" v-model="to" placeholder="To">
                </div>
                <div class="form-input">
                    <label for="email">Subject: </label>
                    <input type="text" id="email" v-model="subject" placeholder="Subject">
                </div>
                <div class="form-input">
                    <label for="message">Message: </label>
                    <textarea id="message" cols="30" rows="6" v-model="message" placeholder="Message"></textarea>
                </div>
                <input class="sendEmail" type="submit" value="Send Email" />
            </form>
        </div>
    </div>
</template>

<script>
import MailService from '@/MailService'

export default {
    data() {
        return {
            from: '',
            to: '',
            subject: '',
            message: ''
        }
    },
    methods: {
        async onEmailSubmit() {
            await MailService.sendMail (
                this.from,
                this.to,
                this.subject,
                this.message
            ).then(response => {
                // this.$emit('successMsg',response.data,'color: darkgreen; background-color: #abf5abe8;')
                console.log(response.data);
            })
            this.from = ''
            this.to = ''
            this.subject = ''
            this.message = ''
            console.log(this.from);
            console.log(this.to);
            console.log(this.subject);
            console.log(this.message);
        }
    },
}
</script>

<style lang="scss" scoped>
.contact {
  &-form {
    display: flex;
    flex-direction: column;
    .form-input {
      display: flex;
      flex-direction: column;
      width: 35%;
      margin: 25px auto;
      label {
        margin-bottom: 5px;
        font-weight: 600;
      }
      input {
        height: 36px;
        font-size: 17px;
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
      textarea {
        width: 96%;
        font-size: 17px;
        border-radius: 5px;
        padding: 3px 8px;
        border: 2px solid #074a60;
        resize: vertical;
        &:focus::placeholder {
        color: transparent;
        }
        &:focus {
            outline: none !important;
            border: 2px solid #074a60;
            box-shadow: 0 0 10px #719ECE;
        }
      }
    }
    .sendEmail {
          display: block;
          width: 140px;
          margin: 20px auto;
          height: 40px;
          border: none;
          font-weight: 600;
          background-color: #074a60;
          border-radius: 5px;
          color: #fff;
          font-size: 15px;
          letter-spacing: 0.7px;
          cursor: pointer;
    }
  }
}
</style>