<script setup>
import { ref, onMounted } from 'vue';
import Service from '../js/Service'
// import { VueRecaptcha } from 'vue-recaptcha';

const {login} = defineProps(['login'])

const name = ref("");
const username = ref('');
const password = ref('');
const error = ref('');
const captchaVerified = ref(false);
const captchaToken = ref(null);

const handleLogin = async (e) => {
    e.preventDefault();
    // if (username.value == "" && password.value == "")
    //     {
    //         login(name.value);
    //     }
    // else
    // error.value = 'Invalid username or password';

    if (captchaToken.value != null) {
      error.value = 'Please complete the CAPTCHA';
      return;
    }

    const content =
    {
      username,
      password
    };
    try {
      const response = await Service.login(content);
      if (response.status == 200) {
        login(name.value);
      } else {
        error.value = 'Invalid username or password';
      }
    } catch {
      console.log("couldn't log in due to an error");
    }
};

const onCaptchaVerified = (token) => {
      captchaToken.value = token;
      captchaVerified.value = true;
    };

onMounted(()=>{
  // Expose the callback globally for reCAPTCHA
  window.onCaptchaSuccess = onCaptchaVerified;
  }
) 
</script>
<style>
.g-recaptcha {
  margin: 1rem 0;
}
</style>
<template>
    <div class="login">
        <h2>Login</h2>
        <form >
            <div>
                <label>Name:</label>
                <input type="text" role='name' aria-label='full name' v-model="name" />
            </div>
            <div>
                <label>Username:</label>
                <input type="text" role='username' aria-label='user name' v-model="username" />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" role='password' aria-label='password' v-model="password" />
            </div>
            <p v-if="error" style='color: red'>{{ error }}</p>
            <button :disabled="!captchaVerified" type="submit" @click="handleLogin">Login</button>

            <div class="g-recaptcha" 
              :sitekey="Service.captcha_key" 
              :data-callback="onCaptchaVerified">
            </div>

           
        </form>
    </div>
</template>
