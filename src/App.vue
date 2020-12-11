<template>
  <div id="app">
    <!-- {{ currentRoute }} -->
    <header class="header">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-lg-2">
          <div class="header-logo">
            <router-link to="/"><span>RIANDAGANG</span></router-link>
          </div>
        </div>
        <div class="col-xl-6 col-lg-7">
        </div>
        <div class="col-lg-3">
          <div class="header-right">
            <div class="header-right-auth">
              <!-- <router-link class="logreg" v-if="!isLoggedIn" to="/login">Login</router-link> -->
              <a style="cursor: pointer;" class="logreg" v-if="!isLoggedIn" @click="showModal = 'Login'">Login</a>
              <a style="cursor: pointer;" class="logreg" v-if="!isLoggedIn" @click="showModal = 'Register'">Register</a>
              <!-- <router-link class="logreg" v-if="!isLoggedIn" to="/register">Register</router-link> -->
            </div>
            <ul class="header-right-widget">
                <!-- <li v-if="isLoggedIn">{{ currentUser }}</li> -->
                <li><router-link v-if="isLoggedIn" to="/love"><span class="icon_heart_alt"></span>
                  <div class="tip">{{ loveCount }}</div>
                </router-link></li>
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
<section class="banner set-bg" data-setbg="./assets/img/banner/banner-2.jpg" style="backgroundImage: url(https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-ancient-chinese-landscape-white-background-banner-image_233831.jpg)">
    <div class="container">
      <div class="row">
        <div class="col-10 m-auto">
          <div class="banner-slider owl-carousel">
            <vueper-slides
              class="no-shadow"
              ref="myVueperSlides"
              autoplay
              @autoplay-pause="internalAutoPlaying = false"
              @autoplay-resume="internalAutoPlaying = true">
              <vueper-slide
                v-for="(slide) in slides"
                :key="slide.id"
                :title="slide.title"
                :content="slide.content"
                :style="'border: none'"/>
              <template v-slot:pause>
                <i class="icon pause_circle_outline"></i>
              </template>
            </vueper-slides>
          </div>
        </div>
      </div>
    </div>
  </section>
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
              <h2>New Year 2021</h2>
              <h5><span>Sale</span> 150%</h5>
              <h5><span>YOU BUY WE</span>PAY</h5>
            </div>
            <div class="discount-countdown" id="countdown-time">
              <countdown :time="time">
                <template slot-scope="props">
                  <div class="countdown-item">
                    <span>{{ props.days }}</span>
                    <p>Days</p>
                  </div>
                  <div class="countdown-item">
                    <span>{{ props.hours }}</span>
                    <p>Hour</p>
                  </div>
                  <div class="countdown-item">
                    <span>{{ props.minutes }}</span>
                    <p>Min</p>
                  </div>
                  <div class="countdown-item">
                    <span>{{ props.seconds }}</span>
                    <p>Sec</p>
                  </div>
                </template>
              </countdown>
            </div>
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
  <Login @change-modal="changeModal" v-if="showModal == 'Login'"></Login>
  <Register @change-modal="changeModal" v-if="showModal == 'Register'"></Register>
  </div>

</template>

<script>
import Swal from 'sweetalert2'
import { VueperSlides, VueperSlide } from 'vueperslides'
import Login from './components/LoginCard'
import Register from './components/RegisterCard'
export default {
  data () {
    return {
      showModal: '',
      slides: [
        {
          id: 'slide-1',
          content: `<div class="banner-item">
                  <div class="banner-text">
                    <span>RianDagang Collection</span>
                    <h1>New Year 2021 SALE!</h1>
                    <span>you buy, we pay</span>
                    <br>
                  </div>
                </div>`
        },
        {
          id: 'slide-2',
          content: `<div class="banner-item">
                  <div class="banner-text">
                    <span>RianDagang Collection</span>
                    <h1>The Project X</h1>
                  </div>
                </div>`
        },
        {
          id: 'slide-3',
          content: `<div class="banner-item">
                  <div class="banner-text">
                    <span>RianDagang Collection</span>
                    <h1>The Jakarta Warehouse Project</h1>
                  </div>
                </div>`
        }
      ],
      time: (new Date((new Date()).getFullYear() + 1, 0, 1)) - (new Date())
    }
  },
  components: {
    VueperSlides,
    VueperSlide,
    Login,
    Register
  },
  methods: {
    changeModal (payload) {
      this.showModal = payload
    },
    handleSlideClick (dataset) {
      console.log(dataset.index, dataset.name)
    },
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
  watch: {
    isLoggedIn: function (value) {
      if (value) this.showModal = ''
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
    },
    currentUser: {
      get () {
        return this.$store.state.currentUser
      }
    },
    currentRoute () {
      return this.$router.currentRoute
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
@import "https://fonts.googleapis.com/css2?family=Cookie&display=swap";
@import "./assets/styleSheet/style.css";
@import "./assets/styleSheet/bootstrap.min.css";
@import "./assets/styleSheet/elegant-icons.css";
@import "./assets/styleSheet/font-awesome.min.css";
</style>
