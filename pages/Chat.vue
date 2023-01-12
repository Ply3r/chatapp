<script>
  import SideMenu from '../components/records/SideMenu';

  export default {
    name: 'Chat',
    components: { SideMenu },
  }
</script>

<template>
  <div class="page-container">
    <SideMenu />
    <MessageScream />
  </div>
</template>

<style scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
}
</style>