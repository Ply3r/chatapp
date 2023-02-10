<script>
  import UserService from '../../../assets/http/user.service';
  import FriendService from '../../../assets/http/friends.service';
  import ChatService from '../../../assets/http/chat.service';
  import useUser from '../../../stores/useUser';

  export default {
    data() {
      return {
        search: "",
        searched: false,
        request_list: [],
        friend_list: [],
        use_user: useUser(),
        user_service: new UserService(),
        friend_service: new FriendService(),
        chat_service: new ChatService(),
      }
    },
    mounted() {
      this.fetchAll();
    },
    methods: {
      fetchAll() {
        this.getUsers();
        this.getRequests();
      },
      async getUsers(event=null) {
        if (event) {
          event.preventDefault();
        }
        
        this.searched = true;
        this.friend_service.search(this.search).then((res) => {
          this.friend_list = res.data.friends;
        });
      },
      getRequests() {
        this.friend_service.getReceivedRequests()
          .then(({ data: { friends } }) => this.request_list = friends);
      },
      async removeRequest(id) {
        await this.friend_service.removeRequest(id);

        this.fetchAll();
      },
      async acceptRequest(request_id) {
        await this.friend_service.acceptRequest(request_id);

        this.fetchAll();
      },
      async startChat(friend_id) {
        const { data: { chat } } = await this.chat_service.create({ receiver_id: friend_id});

        console.log(chat)
        this.use_user.setChat(chat);
        this.$bvModal.hide('friend_modal');
      }
    }
  }
</script>

<template>
  <div>
    <b-form @submit="getUsers">
      <b-row>
        <b-col>
          <b-input
            v-model="search"
            placeholder="Find a new friend..." 
          />
        </b-col>
      </b-row>
    </b-form>
    <div>
      <div class="d-flex flex-column align-items-center my-5" v-if="!searched && !request_list.length">
        <h1>😃</h1>
        <h2 class="text-muted">Add a friend</h2>
      </div>
      <div class="d-flex justify-content-center" v-else>
        <div class="d-flex flex-column align-items-center my-5" v-if="!friend_list.length && !request_list.length">
          <h1>😓</h1>
          <h2 class="text-muted">No user found</h2>
        </div>
        <div v-else class="friend_container my-4">
          <!-- RequestList -->
          <div v-if="request_list.length">
            <h5 class="text-muted my-3">Requests received</h5>
            <hr>
          </div>
          <b-row 
            class="friend_card d-flex justify-content-center align-items-center"
            :key="'request - ' + request.id"
            v-for="request in request_list"
          >
            <b-col md="2">
              <img v-if="request.profile_image" class="avatar small-avatar" :src="request.profile_image">
              <img v-else class="avatar small-avatar" src="~/assets/imgs/default-user-img.jpg" />
            </b-col>
            <b-col md="6">
              <p class="friend_name">{{ request.username }}</p>
            </b-col>
            <b-col md="2">
              <div class="friend_actions">
                <div class="d-flex justify-content-end friends-action">
                  <b-icon style="color: green" icon="check" class="h3 m-0" @click="acceptRequest(request.request_id)" />
                  <b-icon style="color: red" icon="x" class="h3 m-0 mx-2" @click="removeRequest(request.request_id)" />
                </div>
              </div>
            </b-col>
          </b-row>
          
          <!-- Friends List -->
          <div v-if="friend_list.length">
            <h5 class="text-muted my-3">Friends</h5>
            <hr>
          </div>
          <b-row 
            class="friend_card d-flex justify-content-center align-items-center"
            :key="'friend - ' + user.id"
            v-for="user in friend_list"
          >
            <b-col md="2">
              <img v-if="user.profile_image" class="avatar small-avatar" :src="user.profile_image">
              <img v-else class="avatar small-avatar" src="~/assets/imgs/default-user-img.jpg" />
            </b-col>
            <b-col md="6">
              <p class="friend_name">{{ user.username }}</p>
            </b-col>
            <b-col md="2">
              <div class="friend_actions">
                <div class="d-flex justify-content-end friends-action">
                  <b-icon style="color: blue" icon="telegram" class="h3 m-0" @click="startChat(user.id)" />
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friends-action  svg {
  cursor: pointer;
}

.friend_name {
  font-size: 1.2em;
  margin: 0;
}

.friend_container {
  width: 100%;
  min-height: 150px;
  max-height: 300px;
  overflow: auto;
  overflow-x: hidden;
}

.friend_card {
  border-bottom: 2px solid rgba(128, 128, 128, 0.193);
}
</style>