<script setup>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query';
import makeBookService from '../services/book.service';
import userService from '../services/user.service';
import BookInformation from '@/components/BookInformation.vue'
import MakeTypeService from '../services/bookType.service';


const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['session'],
    queryFn: userService.getSession
});
const {isLoading: typeLoading, isError: typeIsError, data: typeData, error: typeError, refetch: typeRefetch} = useQuery({
    queryKey: ['type'],
    queryFn: MakeTypeService.getTypes
});

const searchText = ref('');

const $router = useRouter();


const queryClient = useQueryClient();
// logout function 
const loggoutMutation = useMutation(
    {
        mutationFn: userService.logout,
        onSuccess: () => {
            queryClient.invalidateQueries('session');
            $router.push(
                { name: 'bookcollection' }
            )
            console.log("logout success");
        },
        onError: (err) => {
            console.log(err);
        }
    }
);
function logout() {
    loggoutMutation.mutate();

}

</script>
<template>
    <nav class="navbar navbar-expand-lg  navbar-header ">
        <div class="container-fluid">
            <a class="navbar-brand navbar-home" href="/">WIBU COLLECTION</a>
            <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <button class="btn btn-catogory dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Category
                        </button>
                        <ul class="dropdown-menu dropdown-menu-light">
                            <span v-if = "typeLoading">...</span>
                            <span v-else-if="typeIsError">Error</span>
                                <li :class="['dropdown-item', 'category-item']" v-else-if="typeData.length>0" v-for="(type, index) in typeData" :key="index" class="dropdown-item">
                                <router-link   :to="{ name: 'bookcollectionbytype', params: { id: type.type_id } }" class="dropdown-item">
                                        {{ type.name }}
                                </router-link>
                                <!-- {{ type.name }} -->
                            </li>
                            <span v-else>Empty</span>
                        </ul>
                    </li>
                </ul>
            </div>


            <!-- user icon  -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                class="usericon">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>


            <!-- get session -->
            <span v-if="isLoading">Loading...</span>
            <span v-else-if="isError">{{ error.message }}</span>
            <div class="username" v-else-if="data.user">
                {{ data.user.username }}
                <button class="btn btn-danger" @click="logout">Logout</button>
            </div>
            <div v-else>
                <!-- login -->
                <router-link to="/login">
                    <button type="button" class="btn btn-success">
                        Login
                    </button>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar-header {
    background:  rgb(180, 8, 8);
}

.navbar-home{
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    color: aliceblue;
    padding: 0 50px 0 50px;
}

.btn-catogory{
    width: 160px;
    background-color: #fff;
    border: none;
}

.dropdown-item:hover {
    background: #ce2323;
}

.username {
    float: right;
    padding: 10px;
    font-size: 20px;
    color: rgb(238, 16, 16)
}

.usericon {
    height: 30px;
    width: 30px;
    color: aliceblue;
    margin: 10px;
}
</style>

