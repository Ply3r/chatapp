<script>
  export default {
    name: 'ProfileIcon',
    data() {
      return {
        user: {
          username: null,
          email: null,
          profile_image: null,
          status: true,
        }
      }
    }
  }
</script>

<template>
  <div>
      <b-row>
        <b-col sm="2">
          <img 
            :src="user.profile_image ? user.profile_image : 'default'"
            class="avatar big-avatar"
          />
        </b-col>
      </b-row>
    </div>
</template>
