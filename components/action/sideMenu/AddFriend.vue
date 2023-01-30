<script>
  import UserService from '../../../assets/http/user.service';

  export default {
    data() {
      return {
        search: "",
        searched: false,
        users_list: [],
        service: new UserService(),
      }
    },
    methods: {
      getUsers(event) {
        event.preventDefault();
        
        this.searched = true;
        this.service.search({ search: this.search })
          .then(({ data: {users} }) => this.users_list = users)
          .catch((Err) => console.log(Err));
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
      <div class="d-flex flex-column align-items-center my-5" v-if="!searched">
        <h1>😃</h1>
        <h2 class="text-muted">Add a friend</h2>
      </div>
      <div v-else>
        <div class="d-flex flex-column align-items-center my-5" v-if="!users_list.length">
          <h1>😓</h1>
          <h2 class="text-muted">No user found</h2>
        </div>
        <div class="friend_container">
          <b-row 
            :key="'friend - ' + user.id"
            v-for="user in users_list"
          >
            <b-col>
              <img src="user.profile_image_url">
            </b-col>
            <b-col>
              <p>{{ user.username }}</p>
            </b-col>
            <b-col>
              <div class="friend_actions">

              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.friend_container {
  width: 100%;
  max-height: 150px;
}
</style>
