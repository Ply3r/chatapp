<script>
  import UserService from '../../../assets/http/user.service';
  import FriendService from '../../../assets/http/friends.service';

  export default {
    data() {
      return {
        search: "",
        searched: false,
        request_list: [],
        users_list: [],
        user_service: new UserService(),
        friend_service: new FriendService(),
      }
    },
    mounted() {
      this.getRequests();
    },
    methods: {
      getUsers(event=null) {
        if (event) {
          event.preventDefault();
        }
        
        this.searched = true;
        this.user_service.search({ search: this.search })
          .then(({ data: {users} }) => this.users_list = users)
          .catch((Err) => console.log(Err));
      },
      getRequests() {
        this.friend_service.getSentRequests()
          .then(({ data: { users } }) => this.request_list = users);
      },
      async removeRequest(id) {
        await this.friend_service.removeRequest(id);

        this.getRequests();
      },
      async addFriend(friend_id) {
        await this.friend_service.createRequest({ receiver_id: friend_id });

        this.getRequests();
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
        <div class="d-flex flex-column align-items-center my-5" v-if="!users_list.length && !request_list.length">
          <h1>😓</h1>
          <h2 class="text-muted">No user found</h2>
        </div>
        <div v-else class="friend_container my-4">
          <!-- RequestList -->
          <h6 v-if="request_list.length" class="text-muted">Requests sent</h6>
          <b-row 
            class="friend_card d-flex justify-content-center align-items-center"
            :key="'request - ' + request.id"
            v-for="request in request_list"
          >
            <b-col md="2">
              <img class="avatar small-avatar" :src="request.Users_Friends_receiver_idToUsers.profile_image_url">
            </b-col>
            <b-col md="6">
              <p class="friend_name">{{ request.Users_Friends_receiver_idToUsers.username }}</p>
            </b-col>
            <b-col md="2">
              <div class="friend_actions">
                <div class="d-flex justify-content-end friends-action">
                  <b-icon style="color: red" icon="person-x-fill" class="h3 m-0" @click="removeRequest(request.id)" />
                </div>
              </div>
            </b-col>
          </b-row>
          
          <!-- Users List -->
          <h6 v-if="users_list.length" class="text-muted">Users</h6>
          <b-row 
            class="friend_card d-flex justify-content-center align-items-center"
            :key="'friend - ' + user.id"
            v-for="user in users_list"
          >
            <b-col md="2">
              <img class="avatar small-avatar" :src="user.profile_image_url">
            </b-col>
            <b-col md="6">
              <p class="friend_name">{{ user.username }}</p>
            </b-col>
            <b-col md="2">
              <div class="friend_actions">
                <div class="d-flex justify-content-end friends-action">
                  <b-icon style="color: green" icon="person-plus-fill" class="h3 m-0" @click="addFriend(user.id)" />
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