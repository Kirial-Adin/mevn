<script setup>
import Logo from '../assets/img/navbar-logo.svg'
import { computed } from 'vue'
import { useCoreStore } from '../stores/auth'

const store = useCoreStore()
const isAuth = computed(() => store.userInfo.isAuth)

const logout = async() => {
  await store.logout();
}

</script>

<template>
  <div class="navbar">
    <div class="conteiner">
      <img :src="Logo" src="" alt="" class="navbar__logo" />
      <a href="/" class="navbar__header">MEVN CLOUD</a>
      <div class="navbar__login" v-if="!isAuth">
        <a href="/login"  style="font-size: 20px">Войти</a>
        <a href="/registration" class="navbar__register" style="font-size: 20px"> Регистрация </a>
      </div>
      <div class="navbar__login" v-else>
        <a @click="logout" style="font-size: 20px">Выход</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../utils/colors.css';

.conteiner {
  display: flex;
  align-items: center;
  width: 1140px;
}

.navbar {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: white;

  .navbar__header {
    margin-left: 10px;
    font-size: 24px;
    font-weight: bold;
  }
  .navbar__login {
    margin-left: auto;
    margin-right: 20px;
  }
}

a {
  text-decoration: none;
  cursor: pointer;
}
</style>
