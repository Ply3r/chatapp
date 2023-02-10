import { defineStore } from "pinia";

const useUser = defineStore('user', {
  state: () => ({ user: {}, chat: null }),
  getters: {
    getUser(state) {
      return state.user;
    },
    getChat(state) {
      return state.chat;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    setChat(chat) {
      this.chat = chat;
    }
  }
})

export default useUser;