import { defineStore } from "pinia";

const useUser = defineStore('user', {
  state: () => ({ user: null }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
  }
})

export default useUser;