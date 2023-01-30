<script>
  import SideMenu from '../components/records/sideMenu';

  export default {
    name: 'chat',
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
  background-color: #131c21;
}
</style>