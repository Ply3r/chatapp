<script>
  import FriendService from '../../../assets/http/friends.service';

  export default {
    data() {
      return {
        search: "",
        users_list: [],
        service: new FriendService(),
      }
    },
    methods: {
      getUsers(event) {
        event.preventDefault();
        
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
            placeholder="Find a friend..." 
          />
        </b-col>
      </b-row>
    </b-form>
    <div>

    </div>
  </div>
</template>

