<script setup>
import { ref } from 'vue';
import { object } from 'yup';
import { useRouter, useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import userService from '../services/user.service';
const $router = useRouter();
const $route = useRoute();

const props = defineProps({ books: { type: Array, default: () => [] } });
const server = import.meta.env.VITE_SERVER;
const $emit = defineEmits(['update:selectedIndex']);
const {isLoading: sessionLoading, isError: sessionIsError, refetch: sessionRefetch, data: sessiondata } = useQuery({
    queryKey: ['session'],
    queryFn: userService.getSession
});

const goToEdit =  () => {
    $router.push({ name: 'bookedit', params: { id: props.book.id } });
}
</script>

<template>
    <div class="book-card">
        <div class="row">
            <div class="col-sm-2 a" align="center" v-for="(book, index) in props.books" :key="index">
                <RouterLink :to="{ name: 'bookdetail', params: { id: book.id } }">
                    <div class="mt-2">
                        <div class="bookcard">
                            <div class="book-container">
                                <!-- Set a fixed width and height for the images -->
                                <img :src="server + book.image" alt="" class="book-image">
                            </div>
                            <div class="book-info">
                                <h5 class="book-name">{{ book.name }}</h5>
                                <!-- <p class="author">Author: {{ book.author }}</p> -->
                            </div>
                        </div>
                    </div>
                </RouterLink>
                <!--  -->
                <RouterLink :to="{ name: 'bookedit', params: { id: book.id } }">
                        <span v-if = "sessionLoading">...</span>
                        <span v-else-if="sessionIsError">Error</span>
                        <div class="add" v-else-if="sessiondata.user && sessiondata.user.role_id === 0">
                            <div class="m-2 d-flex justify-content-center align-items-center">
                                <button class="btn btn-edit" @click="">Edit</button>
                            </div>
                        </div> 
                        <span v-else></span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.book-card {
    padding: 10px;
    margin-left: 50px;
    margin-right: 50px;
}

.bookcard {
    background-color: rgb(248, 246, 246);
    border-radius: 5px;
    margin-bottom: 10px;
    height: 420px;
    width: 250px;
}
.bookcard:hover {
  background-color: rgb(221, 13, 13); /* Change the background color on hover */
  transform: scale(1.02); /* Scale up the element on hover (optional) */
  transition: background-color 0.3s, transform 0.3s; /* Add a smooth transition effect */
  border-radius: 5px;
}

.book-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.book-image {
    width: 250px;
    height: 360px;
    padding: 5px;
}

.book-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    text-align: center;
}

.author,
.book-name {
    text-decoration: none;
    color: black;
}

a {
    text-decoration: none;
}

.row {
    justify-self: center
}

.btn-edit {
    background: rgb(180, 8, 8);
    color: #fff;
}
</style>

