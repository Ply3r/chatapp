<script>
  import UserService from '../../../assets/http/user.service';
  import FriendService from '../../../assets/http/friends.service';
  import Swal from 'sweetalert2';

  export default {
    components: {
      Swal,
    },
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
        this.user_service.search(this.search)
          .then(({ data: {users} }) => this.users_list = users)
          .catch((err) => console.log(err));
      },
      getRequests() {
        this.friend_service.getSentRequests()
          .then(({ data: { friends } }) => this.request_list = friends);
      },
      async removeRequest(id) {
        await this.friend_service.removeRequest(id);

        this.getUsers()
        this.getRequests();
      },
      addFriend(friend_id) {
        this.friend_service.createRequest({ receiver_id: friend_id })
          .then(() => {
            this.getUsers()
            this.getRequests();
          })
          .catch((err) => {
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message,
            })
          })
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
          <div v-if="request_list.length">
            <h5 class="text-muted my-3">Requests sent</h5>
            <hr>
          </div>
          <b-row 
            class="friend_card d-flex justify-content-center align-items-center"
            v-for="request in request_list"
            :key="'request - ' + request.id"
          >
            <b-col md="2">
              <img class="avatar small-avatar" :src="request.profile_image">
            </b-col>
            <b-col md="6">
              <p class="friend_name">{{ request.username }}</p>
            </b-col>
            <b-col md="2">
              <div class="friend_actions">
                <div class="d-flex justify-content-end friends-action">
                  <b-icon style="color: red" icon="person-x-fill" class="h3 m-0" @click="removeRequest(request.friend_id)" />
                </div>
              </div>
            </b-col>
          </b-row>
          
          <!-- Users List -->
          <div>
            <h5 v-if="users_list.length" class="text-muted my-3">Users</h5>
            <hr>
          </div>
          <b-row 
            class="friend_card d-flex justify-content-center align-items-center"
            :key="'friend - ' + user.id"
            v-for="user in users_list"
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