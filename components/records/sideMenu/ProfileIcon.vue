<script>
  import useUser from '../../../stores/useUser';
  import AddFriend from '../../action/sideMenu/AddFriend.vue';
  import ListFriend from '../../action/sideMenu/ListFriend.vue';

  export default {
  components: { AddFriend, ListFriend },
    name: 'ProfileIcon',
    data() {
      return {
        components: { AddFriend },
        user: {
          username: null,
          email: null,
          profile_image: null,
          status: true,
        }
      }
    },
    mounted() {
      this.setup();
    },
    methods: {
      setup() {
        const user = useUser().getUser;
        this.user.username = user.username;
        this.user.email = user.email;
        this.user.profile_image = user.profile_image;
        this.user.status = user.status;
      }
    }
  }
</script>

<template>
  <div>
    <div>
      <b-row class="profile-container">
        <b-col md="4">
          <div 
            class="avatar big-avatar m-3"
          >
            <img v-if="user.profile_image" :src="user.profile_image" />
            <img v-else src="~/assets/imgs/default-user-img.jpg" />
            <div :class="{ 'status-badget-big': true, online: user.status}"></div>
          </div>
        </b-col>
        <b-col md="6" class="mx-3">
          <div>
            <h2>{{ user.username }}</h2>
            <p>{{ user.email }}</p>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" style="padding-top: 0">
          <div class="icons-container">
            <b-icon 
              icon="search" 
            />
            <b-icon 
              icon="person-fill" 
              v-b-modal.friend_modal
            />
            <b-icon 
              icon="person-plus-fill" 
              v-b-modal.add_friend
            />
          </div>
        </b-col>
      </b-row>
      <hr class="mb-1">
    </div>
    <b-modal 
      title="Friend List"
      hide-footer
      id="friend_modal" 
    >
      <list-friend />
    </b-modal>
    <b-modal 
      title="Add Friend"
      hide-footer
      id="add_friend" 
    >
      <add-friend />
    </b-modal>
  </div>
</template>

<style>
hr {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.197);
}

.icons-container {
  width: 100%;
  height: 30px;
  padding: 0px 35px;
  display: flex;
  align-items: center;
}

.icons-container > svg {
  width: 25px;
  height: 25px;
  color: white;
  margin-right: 15px;
  cursor: pointer;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0;
  margin: 0;
}

.status-badget-big {
  height: 30px;
  width: 30px;
  position: absolute;
  right: 30%;
  bottom: 18%;
  border-radius: 50%;
  background-color: rgb(255, 65, 65);
  border: 5px solid  #131c21;
}

.status-badget {
  height: 20px;
  width: 20px;
  position: absolute;
  right: 20%;
  bottom: 15%;
  border-radius: 50%;
  background-color: rgb(255, 65, 65);
  border: 4px solid  #131c21;
}

.online {
  box-sizing: content-box;
  background-color: rgb(33, 220, 33);
  border: 4px solid  #131c21;
}

@media screen and (max-width: 1350px) {
  .status-badget-big {
    right: 0%;
    bottom: 18%;
  }

  .status-badget {
    right: 8%;
    bottom: 15%;
  }
}
</style>
