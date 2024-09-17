<script setup>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

</script>

<template>
  <div class="MainPageContainer">
    <router-view />
  </div>
</template>
<style scoped>
.MainPageContainer {
  background-color: rgb(255, 255, 255);
  height: 200vh;
}
</style>