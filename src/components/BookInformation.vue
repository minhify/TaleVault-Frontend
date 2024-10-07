<template>
    <div class="container">
        <div class="row">

            <div class="col-md-12 text-left">
                <button class="btn btn-return" @click="goBack">
                    <i class="fa-solid fa-arrow-left"></i> <!-- Icon quay lại -->
                </button>
            </div>

            <div class="col-md-4" align="center">
                <div class="book-image text-right">
                    <img :src="server + selectedBook.image" alt="" class="book-image">
                </div>
            </div>

            <div class="col-md-8 bg-detail">
                <div class="book-info text-left"> <!-- Left-align the text -->
                    <h1 class="book-name" align="center">{{ selectedBook.name }}</h1> <!-- Increase the text size -->
                    <p class="author"><i class="fa-solid fa-table-list"></i><strong> Type:</strong> {{ data }}</p>
                    <p class="author"><i class="fa-solid fa-book-open-reader"></i><strong> Author:</strong> {{ selectedBook.author }}</p>
                    <p class="description"><i class="fa-solid fa-marker"></i><strong> Abstract:</strong> {{ selectedBook.abstract }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import bookTypeService from '../services/bookType.service';
import { ref } from 'vue';
import {  useQuery } from '@tanstack/vue-query';
// let type = ref('');

const props = defineProps({
    selectedBook: {
        type: Object,
        required: true
    }
});

const book = ref({ ...props.selectedBook });
const server = import.meta.env.VITE_SERVER;

const { data } = useQuery({
    queryKey: ['types', book.value.id],
    queryFn: () =>  bookTypeService.getTypeById(book.value.id)
});

function goBack() {
    window.history.back();
}
</script>

<style>
.book-info {
    font-size: 25px;
}
.book-image{
    width: 300px;
    height: 500px;
}

.btn-return {
    background: rgb(180, 8, 8);
    color: #fff;
    margin: 10px 60px;
}

.btn-return:hover {
    background: rgb(255, 255, 255);
    color: rgb(180, 8, 8);
}
.container {
    justify-content: center;
    margin-top: 50px;
    background-color: rgb(242, 184, 184);
    border-radius: 5px;
    padding: 5px;
    padding-bottom: 50px;
}
</style>
