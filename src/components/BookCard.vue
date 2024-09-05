<script setup>
import { ref } from 'vue';
import { object } from 'yup';
import { useRouter, useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import userService from '../services/user.service';
const $router = useRouter();
const $route = useRoute();

const props = defineProps({ books: { type: Array, default: () => [] } });
// const server = "http://localhost:3000" ;
const server = import.meta.env.VITE_SERVER;

const $emit = defineEmits(['update:selectedIndex']);

const {isLoading: sessionLoading, isError: sessionIsError, refetch: sessionRefetch, data: sessiondata } = useQuery({
    queryKey: ['session'],
    queryFn: userService.getSession
});

// go to edit page
const goToEdit =  () => {
    $router.push({ name: 'bookedit', params: { id: props.book.id } });
}


</script>

<template>
    <div class="book-card">
        <div class="row">
            <div class="col-sm-3 a" align="center" v-for="(book, index) in props.books" :key="index">
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
                                <button class="btn btn-success" @click="">Edit</button>
                            </div>
                        </div> 
                        <span v-else></span>
                </RouterLink>
                
                <!--  -->
            </div>
        </div>
    </div>
    <!-- <br>
    <hr>
    <br>
    {{ props.books }} -->
</template>


<style scoped>
.book-card {
    padding: 10px;
    margin-left: 50px;
    margin-right: 50px;
    /* background-color: rgb(77, 74, 74); */
    
}

.bookcard {
    background-color: rgb(116, 116, 116);
    border-radius: 5px;
    margin-bottom: 10px;
    height: 340px;
    width: 250px;
}
.bookcard:hover {
  background-color: #ec9292; /* Change the background color on hover */
  transform: scale(1.05); /* Scale up the element on hover (optional) */
  transition: background-color 0.3s, transform 0.3s; /* Add a smooth transition effect */
  border-radius: 5px;
}


/* Style for the book container (including image) */
.book-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Define a fixed width and height for the images */
.book-image {
    width: 200px;
    height: 250px;
    padding: 5px;
}

/* Style for the book name and author */
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
    /* Remove underline */
}

a {
    text-decoration: none;
}

.row {
    justify-self: center
}
</style>

