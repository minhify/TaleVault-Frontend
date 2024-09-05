<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

let fileError = ref('');
let file = ref('');
let flag = ref(false);

const bookFormSchema = yup.object().shape({
    name: yup.string().required('Book name is require'),
    author: yup.string().required('Book author is require'),
    abstract: yup.string().required('Book content is require'),
    // image: yup.mixed().test('fileNotEmpty', 'Image is required', (value) => {
    //     return value instanceof File;}),
})

const message = ref('');

const props = defineProps({
    book: {
        type: Object,
        required: true,
    },
    types: {
        type: Array,
        default: () => []
    }
})
console.log(props.book)

const editedBook = ref({ ...props.book });

const $emit = defineEmits(['submit:book', 'delete:book']);


function deleteBook() {
    if (confirm('Are you sure you want to delete this book?')) {
        $emit('delete:book', editedBook.value.id);

    }

}

// function updateBook() {
//     $emit('submit:book', editedBook.value);
// }
function addBook() {
    if (!file) fileError.value = 'Image is empty';
    if (!fileError.value) {
        console.log("help update")
        $emit('submit:book', { ...props.book, file: file });
    }

}
// image 
function uploadFile(e) {
    fileError.value = '';
    file = e.target.files[0];
    flag.value = true;
    props.book.image = "/images/" + file.name;
    const validType = ['image/gif', 'image/jpeg', 'image/png'];
    //

    // console.log(file)
    if (!validType.includes(file.type)) {
        fileError.value = "Invalid image type";
    }
    else {
        console.log("valid image type")

    }

}
</script>

<template>
    <!-- {{ props.book.name }} -->
    <Form :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="name"><i class="fa-solid fa-book"></i><strong> Name</strong></label>
            <Field name="name" type="text" class="form-control" v-model="props.book.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author"><i class="fa-solid fa-book-open-reader"></i><strong> Author</strong></label>
            <Field name="author" type="text" class="form-control" v-model="props.book.author" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="abstract"><i class="fa-solid fa-marker"></i><strong> Abstract</strong></label>
            <!-- <Field name="abstract" type="text" class="form-control" v-model="editedBook.abstract" /> -->
            <textarea name="abstract" class="form-control" rows="5" v-model="props.book.abstract"></textarea>
            <ErrorMessage name="abstract" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="typeid"><i class="fa-solid fa-table-list"></i><strong> Type</strong></label>
            <select name="typeid" class="form-control" v-model="props.book.typeid">
                <option value="" disabled selected>Type</option>
                <option v-for="(type, index) in props.types" :key="index" :value="type.type_id">{{ type.name }}</option>
            </select>
        </div>
        <!-- image file -->
        <div class="form-group">
            <label for="typeid"><i class="fa-regular fa-image"></i><strong> Image</strong></label>
            <input type="file" name="file" class="form-control" @change="uploadFile" /> <br>
            <span :class="{ 'd-block': fileError, 'd-none': !fileError }">{{ fileError }}</span> <br>
        </div>
        <!--  -->
        <div class="form-group">
            <button class="btn btn-primary m-2" @click="addBook"><i class="fas fa-save"></i> Save</button>
            <button v-if="props.book.id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    </Form>
    <!-- {{ editedBook }} -->
</template>

<style scoped>
.form-group {
    margin-top: 5px;
}
</style>
