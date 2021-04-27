<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { _axios } from '@/utils/http';
import { loginApi } from '@/apis/menu';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    loginApi({username: 'sdsds',password: '3445'})
  },
};
</script>
