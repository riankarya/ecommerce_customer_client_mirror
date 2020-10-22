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
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <CartCard v-for="cart in carts" :key="cart.id" :data="cart"></CartCard>
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
        <div class="col-lg-6 col-md-6 col-sm-6">
          <div class="cart-btn update-btn">
            <button @click="updateCart"><span class="icon_loading"></span> Update cart</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
        </div>
        <div class="col-lg-4 offset-lg-2">
          <div class="cart-total-procced">
            <h6>Cart total</h6>
            <ul>
              <!-- <li>Subtotal <span>Rp. {{ totalPrice }}</span></li> -->
              <li>Total <span>Rp. {{ totalPrice }}</span></li>
            </ul>
            <a @click="checkout" href="#" class="primary-btn">Proceed to checkout</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CartCard from '../components/CartCard'
import Swal from 'sweetalert2'
export default {
  name: 'Cart',
  components: {
    CartCard
  },
  data () {
    return {
      updatedCart: []
    }
  },
  computed: {
    totalPrice () {
      return this.$store.state.totalPrice
    },
    carts () {
      return this.$store.state.carts
    }
  },
  methods: {
    updateCart () {
      this.$store.dispatch('updateCart')
        .then(data => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your cart has been updated!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkout () {
      Swal.fire({
        title: 'Checkout?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, buy it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('checkout', false)
          Swal.fire(
            'Bought!',
            'Your items has been bought.',
            'success'
          )
        }
      })
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
