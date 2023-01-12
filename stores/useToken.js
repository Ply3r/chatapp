import { defineStore } from "pinia";

const useToken = defineStore('token', {
  state: () => ({ token: null }),
  getters: {
    getToken(state) {
      return state.token
    },
  },
  actions: {
    setToken(token) {
      this.token = token
    },
  }
})

export default useToken;