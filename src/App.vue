<template>
  <div id="app">
    <header class="header">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-lg-2">
          <div class="header-logo">
            <router-link to="/"><span class="icon_house"></span></router-link>
          </div>
        </div>
        <div class="col-xl-6 col-lg-7">
        </div>
        <div class="col-lg-3">
          <div class="header-right">
            <div class="header-right-auth">
              <router-link class="logreg" v-if="!isLoggedIn" to="/login">Login</router-link>
              <router-link class="logreg" v-if="!isLoggedIn" to="/register">Register</router-link>
            </div>
            <ul class="header-right-widget">
              <!-- <li><a href="#"><span class="icon_heart_alt"></span>
                  <div class="tip">2</div>
                </a></li> -->
                <li><router-link v-if="isLoggedIn" to="/love"><span class="icon_heart_alt"></span>
                  <div class="tip">{{ loveCount }}</div>
                </router-link></li>
              <!-- <router-link v-if="isLoggedIn" to="/cart">Register</router-link> -->
                <li><router-link v-if="isLoggedIn" to="/cart"><span class="icon_cart_alt"></span>
                  <div class="tip">{{ cartCount }}</div>
                </router-link></li>
              <li><button v-if="isLoggedIn" @click="logout" class="btn btn-danger btn-sm">Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <router-view/>
  <section class="discount">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 p-0">
          <div class="discount-pic">
            <img src="./assets/img/discount.jpg" alt="">
          </div>
        </div>
        <div class="col-lg-6 p-0">
          <div class="discount-text">
            <div class="discount-text-title">
              <span>Discount</span>
              <h2>2020</h2>
              <h5><span>Sale</span> 150%</h5>
              <h5><span>YOU BUY WE</span>PAY</h5>
            </div>
            <div class="discount-countdown" id="countdown-time">
              <div class="countdown-item">
                <span>22</span>
                <p>Days</p>
              </div>
              <div class="countdown-item">
                <span>18</span>
                <p>Hour</p>
              </div>
              <div class="countdown-item">
                <span>46</span>
                <p>Min</p>
              </div>
              <div class="countdown-item">
                <span>05</span>
                <p>Sec</p>
              </div>
            </div>
            <a href="#">Shop now</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="services spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="services-item">
            <i class="fa fa-car"></i>
            <h6>Free Shipping</h6>
            <p>For all oder over Rp. 0</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="services-item">
            <i class="fa fa-money"></i>
            <h6>Money Back Guarantee</h6>
            <p>If good have Problems</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="services-item">
            <i class="fa fa-support"></i>
            <h6>Online Support 24/7</h6>
            <p>Dedicated support</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="services-item">
            <i class="fa fa-headphones"></i>
            <h6>Payment Secure</h6>
            <p>100% secure payment</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>

</template>

<script>
import Swal from 'sweetalert2'
export default {
  methods: {
    logout () {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will have to log in again after this.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('logout', false)
          localStorage.clear()
          Swal.fire(
            'Succeed!',
            'You have been logged out.',
            'success'
          )
        }
      })
    }
  },
  computed: {
    isLoggedIn: {
      get () {
        return this.$store.state.isLoggedIn
      }
    },
    cartCount: {
      get () {
        return this.$store.state.carts.length
      }
    },
    loveCount: {
      get () {
        return this.$store.state.loves.length
      }
    }
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.$store.commit('setIsLoggedIn', true)
    }
    if (this.isLoggedIn) {
      this.$store.dispatch('fetchCart')
      this.$store.dispatch('fetchLove')
    }
  }
}
</script>

<style>
@import "./assets/styleSheet/style.css";
@import "./assets/styleSheet/bootstrap.min.css";
@import "./assets/styleSheet/elegant-icons.css";
@import "./assets/styleSheet/font-awesome.min.css";
</style>
