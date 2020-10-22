<template>
  <tr>
    <td class="cart-product-item">
      <img :src="data.product.image_url" style="max-width: 75px" alt="" />
      <div class="cart-product-item-title">
        <h6>{{ data.product.name }}</h6>
      </div>
    </td>
    <td class="cart-price">{{ data.product.price }}</td>
    <td @click="addToCart()" class="cart-close"><span class="icon_cart_alt"></span></td>
    <td @click="deleteLove(data.id)" class="cart-close"><span class="icon_close"></span></td>
  </tr>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'LoveCard',
  props: {
    data: Object
  },
  methods: {
    deleteLove (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        this.$store.dispatch('deleteLove', id)
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    },
    addToCart () {
      if (this.data.product.stock <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Sold Out!',
          text: 'Sorry...'
        })
      } else {
        this.$store.dispatch('addCart', this.data.product)
          .then(data => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Item has been added to your cart!',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    // decrease () {
    //   if (this.data.quantity === 1) return
    //   this.$store.commit('updateQuantityCartKetengan', { cartId: this.data.id, quantity: this.data.quantity - 1 })
    // },
    // increase () {
    //   if (this.data.quantity === this.data.product.stock) return
    //   this.$store.commit('updateQuantityCartKetengan', { cartId: this.data.id, quantity: this.data.quantity + 1 })
    // }
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
