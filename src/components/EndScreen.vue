<script setup>

import { onMounted, onUnmounted } from 'vue';

const { resetDone } = defineProps(['resetDone']);

const handleKeyDown = (event) => {

    if (event.code === 'Enter') {

        resetDone();
    }

}


onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);


});
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);

});

</script>

<template>
    <div>
        <p>Questions</p>
    </div>
</template>
