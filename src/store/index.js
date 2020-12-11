import Axios from 'axios'
import { resolve } from 'core-js/fn/promise'
import Vue from 'vue'
import Vuex from 'vuex'
// import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    isLoggedIn: false,
    carts: [],
    totalPrice: 0,
    loves: [],
    currentUser: ''
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setProduct (state, payload) {
      state.product = payload
    },
    setIsLoggedIn (state, payload) {
      state.isLoggedIn = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    updateQuantityCartKetengan (state, payload) {
      const newCarts = state.carts.map(elem => {
        if (payload.cartId === elem.id) {
          elem.quantity = payload.quantity
          return elem
        }
        return elem
      })
      state.carts = newCarts
    },
    setTotalPrice (state, payload) {
      state.totalPrice = payload
    },
    setLoves (state, payload) {
      state.loves = payload
    },
    setCurrentUser (state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
    logout (context, payload) {
      context.commit('setIsLoggedIn', payload)
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: 'http://localhost:3000/users/login',
          method: 'post',
          data: payload
        })
          .then(data => {
            localStorage.setItem('token', data.data.token)
            localStorage.setItem('id', data.data.id)
            context.commit('setIsLoggedIn', true)
            context.commit('setCurrentUser', data.data.payload.email)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: 'http://localhost:3000/users/register',
          method: 'post',
          data: payload
        })
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchProduct (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: 'http://localhost:3000/products',
          method: 'get'
        })
          .then(data => {
            data = data.data.data.map(elem => {
              return {
                id: elem.id,
                name: elem.name,
                image_url: elem.image_url,
                price: elem.price,
                stock: elem.stock,
                category: elem.category
              }
            })
            context.commit('setProducts', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addCart (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `http://localhost:3000/carts/${payload.id}`,
          method: 'post',
          headers: { token: localStorage.token },
          data: payload
        })
          .then(data => {
            context.dispatch('fetchCart')
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchCart (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: 'http://localhost:3000/carts',
          method: 'get',
          headers: { token: localStorage.token }
        })
          .then(data => {
            const totalPrice = data.data.reduce((acc, elem) => {
              return acc + elem.quantity * elem.product.price
            }, 0)
            context.commit('setCarts', data.data)
            context.commit('setTotalPrice', totalPrice)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateCart (context, payload) {
      return Promise.all(context.state.carts.map(elem => {
        return Axios({
          url: `http://localhost:3000/carts/${elem.id}`,
          method: 'patch',
          headers: { token: localStorage.token },
          data: { quantity: elem.quantity, ProductId: elem.product.id }
        })
      }))
        .then(data => {
          context.dispatch('fetchCart')
          resolve(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCart (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `http://localhost:3000/carts/${payload}`,
          method: 'delete',
          headers: { token: localStorage.token }
        })
          .then(data => {
            context.dispatch('fetchCart')
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    checkout (context, payload) {
      return Promise.all(context.state.carts.map(elem => {
        return Axios({
          url: `http://localhost:3000/carts/${elem.id}`,
          method: 'put',
          headers: { token: localStorage.token },
          data: { status: payload }
        })
      }))
        .then(data => {
          context.dispatch('fetchCart')
          console.log(data, 'BERHASIL UPDATE')
        })
        .catch(err => {
          console.log(err, 'GAGILS')
        })
    },
    addLove (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `http://localhost:3000/loves/${payload.id}`,
          method: 'post',
          headers: { token: localStorage.token },
          data: payload
        })
          .then(data => {
            context.dispatch('fetchLove')
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchLove (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: 'http://localhost:3000/loves',
          method: 'get',
          headers: { token: localStorage.token }
        })
          .then(data => {
            context.commit('setLoves', data.data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteLove (context, payload) {
      console.log(payload, 'ASUP TI DELETELOVE STORE')
      return new Promise((resolve, reject) => {
        Axios({
          url: `http://localhost:3000/loves/${payload}`,
          method: 'delete',
          headers: { token: localStorage.token }
        })
          .then(data => {
            context.dispatch('fetchLove')
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
