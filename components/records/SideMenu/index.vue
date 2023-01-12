<script>
import ProfileIcon from './ProfileIcon.vue';
export default {
  name: 'SideMenu',
  components: { ProfileIcon },
}

</script>

<template>
  <div class="side-menu-container">
    <ProfileIcon />
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
