<script setup>
defineProps({
    modelValue: { type: String, default: '' },
})

const $emit = defineEmits(['submit', 'update:modelValue']);
</script>

<template>
    <div class="d-flex m-3 justify-content-center">
        <input class="form-control-sm me-2 w-25 search-bar" type="text" placeholder="Search" :value="modelValue"
            @input="(e) => $emit('update:modelValue', e.target.value)" @keyup.enter="$emit('submit')">
       
    </div>
</template>

<style scoped>
.search-bar {
    border-radius: 20px;
    border-color: rgb(153, 160, 168);
}

.search-bar:focus {
    border-color: rgb(221, 13, 13);
    outline: none;
}
</style>