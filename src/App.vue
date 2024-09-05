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
  background-color: rgb(77, 74, 74);
  height: 200vh;
}
</style>