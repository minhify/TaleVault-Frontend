<script setup>
defineProps({
    modelValue: { type: String, default: '' },
})

const $emit = defineEmits(['submit', 'update:modelValue']);
</script>

<template>
    <div class="d-flex m-2 justify-content-center">
        <input class="form-control-sm me-2 w-25" type="text" placeholder="Search" :value="modelValue"
            @input="(e) => $emit('update:modelValue', e.target.value)" @keyup.enter="$emit('submit')">
       
    </div>
</template>

