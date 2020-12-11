<template>
  <section class="shop-cart spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="shop-cart-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <LoveCard v-for="love in loves" :key="love.id" :data="love"></LoveCard>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6">
          <div class="cart-btn">
            <router-link to="/">Continue Shopping</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoveCard from '../components/LoveCard'
export default {
  name: 'Love',
  components: {
    LoveCard
  },
  computed: {
    loves () {
      return this.$store.state.loves
    }
  }
}
</script>

<style>
@import "../assets/styleSheet/style.css";
@import "../assets/styleSheet/bootstrap.min.css";
@import "../assets/styleSheet/elegant-icons.css";
@import "../assets/styleSheet/font-awesome.min.css";
</style>
