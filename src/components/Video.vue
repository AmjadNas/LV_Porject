<script setup>
import { onUpdated } from 'vue';
import { watch } from 'vue';
import { ref, onMounted, onUnmounted } from 'vue';

const { length, videos, onFinished } = defineProps(['length', 'videos', 'onFinished'])
const currentVideoIndex = ref(0);
const replayCount = ref([]);
const elapsed = ref([]);
const cldVideo = ref(null);
const currentTime = ref(Date.now());

const processSeletcion = () => {
  const pickedIndex = currentVideoIndex.value;
  const tempElapsed = elapsed.value;
  const newTime = tempElapsed[pickedIndex] ?  Date.now() - currentTime.value + tempElapsed[pickedIndex] : Date.now() - currentTime.value;
  
  tempElapsed[pickedIndex] = newTime;
  onFinished(pickedIndex, replayCount.value, tempElapsed);
  elapsed.value = Array(length).fill(0);
  replayCount.value = Array(length).fill(0);
  currentVideoIndex.value = 0;

}


const handleKeyDown = (event) => {
  if (event.code === 'ArrowRight') {
    nextVideo();
  } else if (event.code === 'ArrowLeft') {
    previousVideo();
  } 
  else if (event.code === 'Space') {
    processSeletcion();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  elapsed.value = Array(length).fill(0);
  replayCount.value = Array(length).fill(0);

});

onUpdated(() =>{
  currentTime.value = Date.now();
});

onUnmounted(() => {
  
  window.removeEventListener('keydown', handleKeyDown);

});


const nextVideo = () => {

  const tempIndex = currentVideoIndex.value;
  

  if (tempIndex < videos.length - 1){
    const tempElapsed = elapsed.value;
  const newTime = tempElapsed[tempIndex] ?  Date.now() - currentTime.value + tempElapsed[tempIndex] : Date.now() - currentTime.value;

  elapsed.value[tempIndex] = newTime;

    currentVideoIndex.value = tempIndex + 1
    
  }

}

const previousVideo = () => {

  const tempIndex = currentVideoIndex.value;
  

  if (tempIndex > 0){

    const tempElapsed = elapsed.value;
  console.log(tempElapsed)

  const newTime = tempElapsed[tempIndex] ?  Date.now() - currentTime.value + tempElapsed[tempIndex] : Date.now() - currentTime.value;

  elapsed.value[tempIndex] = newTime;
    currentVideoIndex.value = tempIndex - 1;

  }

  //videoRef.play();
}

const restartVideo = () => {

  const tempIndex = currentVideoIndex.value;
  // const videoRef = cldVideo.value;
  const tempElapsed = elapsed.value;

  elapsed.value[tempIndex] = Date.now() - currentTime.value + tempElapsed[tempIndex];
  
  // videoRef.currentTime = 0;
  const currentReplays = replayCount.value[currentVideoIndex.value];

  replayCount.value[currentVideoIndex.value] = currentReplays + 1
  //videoRef.play();
};
// ref={videoRef}

</script>


<template>
  <h2>Video Player</h2>
  <!-- <video autoplay ref="cldVideo" :src="videos[currentVideoIndex]" controls width="600" /> -->

  <iframe  width="1920" height="1080" :src="videos[currentVideoIndex]+`&amp;controls=0&autoplay=1&mute=1&loop=1`" 
  title="YouTube video player" frameborder="0" allow="autoplay; encrypted-media;" :mute=1
  referrerpolicy="strict-origin-when-cross-origin" 
  ></iframe>
</template>