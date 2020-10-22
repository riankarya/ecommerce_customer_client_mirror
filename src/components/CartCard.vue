<template>
  <tr>
    <td class="cart-product-item">
      <img :src="data.product.image_url" style="max-width: 75px" alt="" />
      <div class="cart-product-item-title">
        <h6>{{ data.product.name }}</h6>
      </div>
    </td>
    <td class="cart-price">{{ data.product.price }}</td>
    <td class="cart-quantity">
      <div class="pro-qty">
        <span @click="decrease" class="dec qtybtn">-</span>
        <input disabled type="number" :value="data.quantity" />
        <span @click="increase" class="inc qtybtn">+</span>
      </div>
    </td>
    <td class="cart-total">Rp. {{ data.product.price * data.quantity }}</td>
    <td @click="deleteCart(data.id)" class="cart-close"><span class="icon_close"></span></td>
  </tr>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'CartCard',
  props: {
    data: Object
  },
  methods: {
    deleteCart (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        this.$store.dispatch('deleteCart', id)
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    },
    decrease () {
      if (this.data.quantity === 1) return
      this.$store.commit('updateQuantityCartKetengan', { cartId: this.data.id, quantity: this.data.quantity - 1 })
    },
    increase () {
      if (this.data.quantity === this.data.product.stock) return
      this.$store.commit('updateQuantityCartKetengan', { cartId: this.data.id, quantity: this.data.quantity + 1 })
    }
  }
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:disabled {
  background-color: none !important;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
