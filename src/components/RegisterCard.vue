<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 400px; padding: 50px;">
          <div class="login">
    <div class="limiter">
      <!-- <div class="container-login100"> -->
        <!-- <div class="wrap-login100"> -->
          <span @click="move('')" class="icon_close_alt" style="float: right;"></span>
          <form @submit.prevent="register" class="login100-form validate-form">
            <span class="login100-form-title"> Register </span>

            <div
              :class="{ 'alert-validate': emailError }"
              class="wrap-input100 validate-input"
              :data-validate="emailErrorMsg"
            >
              <input
                v-model="email"
                :class="{ 'has-val': email.length }"
                class="input100"
                type="text"
                name="email"
              />
              <span class="focus-input100" data-placeholder="Email"></span>
            </div>

            <div
              :class="{ 'alert-validate': passwordError }"
              class="wrap-input100 validate-input"
              :data-validate="passwordErrorMsg"
            >
              <input
                v-model="password"
                :class="{ 'has-val': password.length }"
                class="input100"
                type="password"
                name="pass"
              />
              <span class="focus-input100" data-placeholder="Password"></span>
            </div>

            <div class="container-login100-form-btn">
              <button class="login100-form-btn">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
        </div>
      <!-- </div> -->
    <!-- </div> -->
  </transition>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      emailError: false,
      emailErrorMsg: '',
      passwordError: false,
      passwordErrorMsg: ''
    }
  },
  methods: {
    move (patch) {
      this.$emit('change-modal', patch)
    },
    register () {
      const regEmail = new RegExp(
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      this.emailError = false
      this.passwordError = false
      if (this.email === '') {
        this.emailError = true
        this.emailErrorMsg = 'Enter email'
      } else if (!regEmail.test(String(this.email).toLowerCase())) {
        this.emailError = true
        this.emailErrorMsg = 'Invalid email format'
      }
      const regPassword = new RegExp(/^[a-zA-Z0-9]+$/)
      if (this.password === '') {
        this.passwordError = true
        this.passwordErrorMsg = 'Enter password'
      } else if (!regPassword.test(this.password)) {
        this.passwordError = true
        this.passwordErrorMsg = 'Invalid email password'
      }
      if (this.passwordError || this.emailError) {
        return
      }
      this.$store.dispatch('register', { email: this.email, password: this.password })
        .then(data => {
          this.$emit('change-modal', '')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="css" scoped>
@import "../assets/styleSheet/login.css";
@import "../assets/styleSheet/bootstrap.min.css";
@import "../assets/styleSheet/elegant-icons.css";
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
