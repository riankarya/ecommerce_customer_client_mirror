<template>
  <div class="col-lg-3 col-md-4 col-sm-6 mix" :class="data.category">
    <div class="product-item">
      <div
        class="product-item-pic set-bg"
        data-setbg="https://blognumbers.files.wordpress.com/2010/09/9.jpg" :style="{ backgroundImage: `url(${data.image_url})` }"
      >
        <ul class="stock-love">
          <li v-if="data.stock == 0" class="label stockout">out of stock</li>
          <!-- <li v-if="data.stock == 0" class="label stockout right">Liked!</li> -->
        </ul>
        <ul class="product-hover">
          <li>
            <a v-if="isLoggedIn" @click="addLove"><span class="icon_heart_alt"></span></a>
          </li>
          <li>
            <a v-if="isLoggedIn && data.stock > 0" @click="addCart"><span class="icon_cart_alt"></span></a>
          </li>
        </ul>
      </div>
      <div class="product-item-text">
        <h6><a href="#">{{ data.name }}</a></h6>
        <div class="product-price">Stock {{ data.stock }}</div>
        <div class="product-price">Rp. {{ data.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productCard',
  props: {
    data: Object
  },
  methods: {
    addLove () {
      this.$store.dispatch('addLove', this.data)
    },
    addCart () {
      this.$store.dispatch('addCart', this.data)
        .then(data => {

        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    isLoggedIn: {
      get () {
        return this.$store.state.isLoggedIn
      }
    }
  }
}
</script>

<style>
@import "../assets/styleSheet/style.css";
@import "../assets/styleSheet/bootstrap.min.css";
@import "../assets/styleSheet/elegant-icons.css";
@import "../assets/styleSheet/font-awesome.min.css";
.stock-love {
 display: flex !important;
 flex-flow: row !important;
 width: 100% !important;
 justify-content: space-between !important;
}
.stock-love .right {
  justify-content: flex-end !important;
  margin-left: 180px;
}
</style>
