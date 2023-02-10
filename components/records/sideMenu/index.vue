<script lang="js">
import ProfileIcon from './ProfileIcon.vue';
import Chats from './Chats.vue';
export default {
  name: 'SideMenu',
  components: { ProfileIcon, Chats },
}

</script>

<template>
  <div class="side-menu-container">
    <ProfileIcon />
    <Chats />
  </div>
</template>

<style scoped>
.side-menu-container {
  height: 100vh;
  width: 28vw;
  display: flex;
  flex-direction: column;
  border-right: 2px solid rgba(82, 81, 81, 0.372);
}

</style>
