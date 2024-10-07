<script setup>
import { ref } from 'vue';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query';
import BookInformation from '@/components/BookInformation.vue'
import makeBookService from '../services/book.service';
import AppHeader from '../components/AppHeader.vue';
import BookForm from '@/components/BookForm.vue';
import getTypeService from '../services/bookType.service';
import makeUploadService from '../services/upload.service';
import { useRouter } from 'vue-router';

const searchText = ref('');
const message = ref('');
const book = ref([]);
const $router = useRouter();

const { data } = useQuery({
    queryKey: ['types'],
    queryFn: getTypeService.getTypes
})

const queryClient = useQueryClient();
const uploadMutation = useMutation({
    mutationFn: makeUploadService.uploadFile,
    onSuccess: () => {
        queryClient.invalidateQueries('upload');
    },
    onError: (error) => {
        console.log(error);
    }
});

const addBookMutation = useMutation({
    mutationFn: makeBookService.addBook,
    onSuccess: () => {
        queryClient.invalidateQueries('books');
        message.value = 'Add book successfully';
    },
    onError: (error) => {
        console.log(error);
    }
});

function create(props) {
    console.log(props.name);
    try {
        if (props.file.name) {
            uploadMutation.mutate(props.file);
            // add book to dataa base
            let image = '/images/' + props.file.name;
            addBookMutation.mutate({
                name: props.name,
                author: props.author,
                abstract: props.abstract,
                typeid: props.typeid,
                image: image,
            });
            message.value = 'Add book successfully';
            alert(message.value);
            $router.push({ name: 'bookcollection' });

        }
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div class="addFunction">
        <AppHeader v-model:searchText="searchText" />
        

        <div class="container mt-3 w-75">
            <BookForm :book="[]" :types="data" @submit:book='create' />
            <br>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: auto
}
</style>
