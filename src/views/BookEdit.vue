<script setup>
import { ref } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import makeBookService from '../services/book.service';
import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';
import { useRouter, useRoute } from 'vue-router';
import BookForm from '@/components/BookForm.vue';
import getTypeService from '../services/bookType.service';
import makeUploadService from '../services/upload.service';

const { data: types } = useQuery({
    queryKey: ['types'],
    queryFn: getTypeService.getTypes
})

const $router = useRouter();
const $route = useRoute();
// console.log($route.params.id)
const props = defineProps({
    id: {
        type: String,
        required: true,
    }
});

let book = ref(null)
let message = ref('')

const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['book'],
    queryFn: async () => {
        try {
            book.value = await makeBookService.getBook(props.id);
            console.log("success get book");
            console.log(book.value);
            return book.value;
        } catch (error) {
            console.log(error);
            $router.push({
                name: 'notfound',
                params: { pathMatch: $route.path.split('/').slice(1) }, query: $route.query,
                hash: $route.hash,
            });
        }
    },
});
console.log("data: ", data.value);
console.log(book.value);
// 
const queryClient = useQueryClient();
const updateMutation = useMutation({
    mutationFn: makeBookService.updateBook,
    onSuccess: () => {
        queryClient.invalidateQueries('book');
        alert("Edit book successfully");
        $router.push({ name: 'bookcollection' })
        // message.value = 'Edit book successfully';
    },
    onError: (error) => {
        console.log(error);
        message.value = error;
    }
});

// upload new image when updating
const uploadMutation = useMutation({
    mutationFn: makeUploadService.uploadFile,
    onSuccess: () => {
        queryClient.invalidateQueries('upload');
    },
    onError: (error) => {
        console.log(error);
    }
});


const deleteMutation = useMutation({
    mutationFn: makeBookService.deleteBook,
    onSuccess: () => {
        queryClient.invalidateQueries('books');
        alert("Delete book successfully");
        $router.push({ name: 'bookcollection' });
        
    },
    onError: (error) => {
        console.log(error);
        message.value = error;
    }
})

function updateBook(props){
    // console.log(props);
    uploadMutation.mutate(props.file);
    updateMutation.mutate(props);
    
    // console.log(book.id);
    // console.log("helo update");
}

function deleteBook(id){
    deleteMutation.mutate(id);
}
const searchText = ref('');	

</script>

<template>
    <div class="editFunction">
        <AppHeader v-model:searchText="searchText" />
        
        <!--  -->
        <div class="container mt-3 w-75">
            <span v-if="isLoading">Loading...</span>
            <span v-else-if="isError">{{ error.message }}</span>
            <div v-else>
                <BookForm :book="book"  :types="types" @submit:book="updateBook" @delete:book="deleteBook"/>
                {{ message }}
            </div>
        </div>
        


      
    </div>
</template>


<style scoped>
.container {
    margin: auto;
}
</style>