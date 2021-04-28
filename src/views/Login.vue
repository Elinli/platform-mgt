<template>
  <div class="home">
    <div class="login-register">
      <div class="tabs">
        <div class="login" :class="[currentTab === 'login' ? 'active' : '']">
          平台中心
        </div>
      </div>

      <div class="form">
        <p>
          <img src="../assets/user.png" class="icon-img" />
          <input type="text" v-model="loginForm.username" />
        </p>
        <p>
          <img src="../assets/pwd.png" class="icon-img" />

          <input type="password" v-model="loginForm.password" />
        </p>
        <p class="btn-login">
          <input type="button" value="登陆" @click="handleClick" />
        </p>
      </div>
      <div class="error">
        {{ errorInfo.value }}
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import { _axios } from '@/utils/http';
import { loginApi } from '@/apis/menu';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, toRefs } from 'vue';
export default {
  name: 'Login',
  components: {
    HelloWorld,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    let errorInfo = reactive({ value: '' });
    let loginForm = reactive({ username: '', password: '' });
    const handleClick = () => {
      console.log(loginForm.username);
      if (!loginForm.username) {
        errorInfo.value = '请输入用户名';
        return;
      } else if (!loginForm.password) {
        errorInfo.value = '请输入密码';
        return;
      } else {
        router.push({
          path: '/home',
        });
      }
      console.log('handle');
    };
    const validateLoginForm = (form) => {};
    loginApi({ username: 'sdsds', password: '3445' })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    let currentTab = reactive({ value: 'login' });
    return {
      handleClick,
      currentTab,
      loginForm,
      errorInfo,
    };
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-register {
    width: 25%;
    height: 40%;
    min-height: 280px;
    padding: 20px 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    .tabs {
      padding-top: 20px;
      display: flex;
      justify-content: space-around;
      & > div {
        flex-grow: 1;
        text-align: center;
        line-height: 36px;
        font-size: 24px;
        letter-spacing: 6px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      & > p:not(:last-of-type) {
        height: 42px;
        line-height: 42px;
        display: flex;
        align-items: center;
        border-radius: 6px;
        overflow: hidden;
        padding: 0;
        background-color: rgba(255, 255, 255, 0.1);
        & > .icon-img {
          width: 24px;
          height: 24px;
          font-size: 14px;
          margin-left: 16px;
        }
        & > input {
          background-color: transparent;
          height: 36px;
          flex-grow: 1;
          text-indent: 10px;
          font-size: 18px;
          border: none;
          outline: none;
          color: rgb(212, 198, 198);
        }
      }
      & > .btn-login {
        height: 32px;
        border-radius: 30px;
        text-align: center;
        overflow: hidden;
        & > input {
          height: 100%;
          width: 100%;
          border: none;
          outline: none;
          background-color: rgba(159, 172, 172, 0.5);
          color: rgb(201, 209, 235);
          font-size: 16px;
          cursor: pointer;
        }
        & > input:hover {
          height: 100%;
          width: 100%;
          border: none;
          outline: none;
          background-color: rgba(177, 226, 226, 0.5);
          color: rgb(238, 240, 247);
          font-size: 16px;
        }
      }
    }
    .error {
      text-align: center;
      color: rgba(255, 0, 0, 0.8);
      font-size: 14px;
    }
  }
}
</style>
