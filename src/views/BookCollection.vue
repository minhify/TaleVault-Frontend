<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import BookCard from '../components/BookCard.vue';
import makeBookService from '../services/book.service'
import Pagination from '../components/Pagination.vue';
import InputSearch from '../components/InputSearch.vue';
// import BookInformation from '../components/BookInformation.vue';
import AppHeader from '../components/AppHeader.vue';
import BookForm from '@/components/BookForm.vue';
import userService from '../services/user.service';
import MakeTypeService from '../services/bookType.service'

const props = defineProps({
   id: { type: String, default: ""},
   name: {type: String, default: ""}
})
const totalPages = ref(1);
const currentPage = ref(1);
const $router = useRouter();
const books = ref([]);
const searchText = ref('');
const searchType = ref('');
const queryClient = useQueryClient();
const { isLoading, isError, data, error, refetch } = useQuery({
   queryKey: ['books', searchText, currentPage, props.id],
   queryFn: async () => {
      try {
         console.log(props)
         const res = await makeBookService.getBooks(searchText.value, currentPage.value, props.id)
         totalPages.value = res.metadata.lastPage ?? 1;
         return res
      } catch (error) {
         console.log(error);
      }
   },
});

// delete all funtuon 
const deleteAllMutation = useMutation({
   mutationFn: makeBookService.deleteAllBooks,
   onSuccess: () => {
      queryClient.invalidateQueries('books')
      refetch()
   },
   onError: (error) => {
      console.log(error);
   }

})

function deleteAllBooks() {
   if(confirm('Are you sure you want to delete all books?')) {
      deleteAllMutation.mutate()
   }
}

const  goToAddForm = () => {
   $router.push({ name: 'bookadd' });
}  

const { isLoading: isLoadingSession, isError: isErrorSession, data:sessiondata  } = useQuery({
   queryKey: ['session'],
   queryFn: userService.getSession
});

// console.log(sessiondata);
watch(props, () => (
   refetch()
))

</script>
<template>
   <div class="bookcollection">
      <!-- header -->
      <AppHeader v-model="searchText"/>
      <!-- search bar -->
      <InputSearch v-model="searchText" />
      
         <!-- add button  -->
      <!-- {{ sessiondata }} -->
      <span v-if="isLoadingSession">Loading...</span>
      <span v-else-if="isErrorSession">{{ error.message }}</span>
      <div class="add" v-else-if="sessiondata.user && sessiondata.user.role_id === 0">
         <div class="m-3 gap-3 d-flex justify-content-end align-items-center">
            <button class="btn btn-add btn-primary" @click="goToAddForm">Add new book</button>
            <button class="btn btn-del " @click="deleteAllBooks">Delete all</button>
         </div>
      </div> 
      <div v-else></div> 
      <!-- Delete all -->
      <!-- {{ sessiondata.user }} -->
      <!-- book list -->
      <span v-if="isLoading">Loading...</span>
      <span v-else-if="isError">{{ error.message }}</span>
      <BookCard v-else-if="data.books.length > 0" :books="data.books" />

   <!-- Navigator -->
   <div v-if="!searchText" class="mt-3 d-flex justify-content-center align-items-center">
      <Pagination :totalPages="totalPages" v-model:currentPage="currentPage" />
   </div>
   </div>
</template>
<script>
export default {
   name: 'BookCollection'
}
</script>

<style scoped>
.bookcollection {
   background-color: rgb(255, 255, 255);
}

.btn-add, .btn-del {
   padding-bottom: 10px;
}
.btn-del {
   background-color: rgb(180, 8, 8);
   color: #ffffff;
}

</style>