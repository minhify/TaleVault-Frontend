<script setup>
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import BookInformation from '@/components/BookInformation.vue'
import makeBookService from '../services/book.service';
import AppHeader from '../components/AppHeader.vue';


const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

console.log(props.id);

const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: [props.id],
    queryFn: async () => {
        try {
            const res = await makeBookService.getBook(props.id);
            return res;
        } catch (error) {
            console.log(error);
        }
    },
});
</script>

<template>
    <!-- {{ data.image }}  -->
    <AppHeader />
    <div class="BookDetailPage">
        <span v-if="isLoading">Loading...</span>
        <span v-else-if="isError">{{ error.message }}</span>
        <!-- <span v-else-if="data.books.length = 0"  ></span> -->
        <BookInformation v-else :selectedBook="data" />
    </div>
</template>

<style scoped>
.BookDetailPage {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>