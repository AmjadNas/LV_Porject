<script setup>
import { ref } from 'vue';
import VidoesPlayerApp from './components/VideoApp.vue';
import Login from './components/Login.vue';
import Service from './js/Service';

const isLoggedIn = ref(false);
const uploaded = ref(false);
const name = ref('');


const handleLogin = (newName) => {
  name.value = newName;
  isLoggedIn.value = true;
};

const handleLogout = () => {
  isLoggedIn.value = false;
  Service.logOut()
};

const onUpload = (allVideos) => {
  
  const postData = async () => {
    try {
      const dataToSend =   {
          name,
          date: Date.now(),
          data: {
            ...allVideos
          }
        };
      const response = await Service.sendData(dataToSend);

      if (response.status == 200)
        uploaded.value = true
    } catch (error) {
      console.log("couldn't send data!");
    }
  }
  postData();
}
</script>


<template>
 
    <VidoesPlayerApp v-if="isLoggedIn" :onUpload="onUpload" :onLogout="handleLogout" />
    <Login v-else :login="handleLogin"/>
  
</template>



<style src="normalize.css/normalize.css"></style>

<style>


</style>
