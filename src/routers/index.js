import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'bookcollection',
        component: () => import('@/views/BookCollection.vue'),
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/NotFoundPage.vue'),
    },

    {
        path: '/login',
        name: 'loginpage',
        component: () => import('@/views/LoginPage.vue'),
    },

    {
        path: '/detail/:id',
        name: 'bookdetail',
        component: () => import('@/views/BookDetail.vue'),
        props: (route) => ({ id: route.params.id }),
    },
    {
        path: '/edit/:id',
        name: 'bookedit',
        component: () => import('@/views/BookEdit.vue'),
        props: (route) => ({ id: route.params.id }),
    },
    {
        path: '/add',
        name: 'bookadd',
        component: () => import('@/views/BookAdd.vue'),
    },

    {
        path: '/type/:id',
        name: 'bookcollectionbytype',
        component: () => import('@/views/BookCollection.vue'),
        props: (route) => ({ id: route.params.id }),
    },

    //  {
    //     path: '/contacts', 
    //     name: 'contact.add',
    //     component: () => import('@/views/ContactAdd.vue'), 
    // },

];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router