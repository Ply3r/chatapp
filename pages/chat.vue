<script>
  import SideMenu from '../components/records/sideMenu';
  import MessageScreen from '../components/records/messageScreen';

  export default {
    name: 'chat',
    components: { SideMenu, MessageScreen },
  }
</script>

<template>
  <div class="page-container">
    <SideMenu />
    <MessageScreen />
  </div>
</template>

<style scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: #131c21;
}
</style>