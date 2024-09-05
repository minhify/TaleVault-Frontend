<script setup>
import AppHeader from '../components/AppHeader.vue';
</script>

<template>
    <AppHeader />
    <div class="container w-25 p-3">
        <p class="title">Page not found!!!</p>
        <p class="message"> Return to 
            <router-link to="/">
                Main Page
            </router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: "NotFoundPage",
    components: { AppHeader }
}
</script>

<style scoped>
.container {
    background-color: aliceblue;
    text-align: center;
    height: auto;
    font-weight: bold;
}
.title {
    color: red;
    font-size:larger;
}

</style>