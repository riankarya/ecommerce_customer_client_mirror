import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    isLoggedIn: false,
    carts: [],
    totalPrice: 0,
    loves: []
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
      console.log(payload, 'asuppppppppppppppppp')
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
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    register (context, payload) {
      console.log('<<<<ASUP TI STATE>>>>', payload)
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
            console.log(data.data.data)
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
            console.log('<<<<ASUP TI FETCHPRODUCT VUE>>>>', data)
            context.commit('setProducts', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // fetchProductById (context, payload) {
    //   return new Promise((resolve, reject) => {
    //     Axios({
    //       url: `http://localhost:3000/products/${payload.id}`,
    //       method: 'get',
    //       headers: { token: localStorage.token }
    //     })
    //       .then(data => {
    //         data = {
    //           id: data.data.data.id,
    //           name: data.data.data.name,
    //           image_url: data.data.data.image_url,
    //           price: data.data.data.price,
    //           stock: data.data.data.stock,
    //           category: data.data.data.category
    //         }
    //         context.commit('setProduct', data)
    //         console.log(this.state.product)
    //         resolve(data)
    //       })
    //       .catch(err => {
    //         reject(err)
    //       })
    //   })
    // },
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
            console.log(totalPrice, 'ASUP TI FETCH TOTAL PRICE STORE')
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
        console.log(elem.product)
        return Axios({
          url: `http://localhost:3000/carts/${elem.id}`,
          method: 'patch',
          headers: { token: localStorage.token },
          data: { quantity: elem.quantity, ProductId: elem.product.id }
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
        console.log(elem.product)
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
