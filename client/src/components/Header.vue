<script setup>
import Logo from '../assets/img/navbar-logo.svg'
import avatarLogo from '../assets/img/avatar.png'
import { API_URL } from '@/http/api'
import { computed, ref } from 'vue'
import { useCoreStore } from '../stores/auth'
import { useFileStore } from '../stores/file'

const coreStore = useCoreStore()
const fileStore = useFileStore()
const currentDir = computed(() => fileStore.dirInfo.currentDir)
const isAuth = computed(() => coreStore.userInfo.isAuth)
const currentAvatar = computed(() => coreStore.avatar)
// const currentAvatar = 'fb25b309-c7fe-42e5-840e-60da86a55282.jpg'
const searchName = ref('')
const avatar = computed(() => currentAvatar.value ? `${API_URL + currentAvatar.value}` : avatarLogo)

async function searchFilesHandler() {
  if (searchName.value !== '') {
    await fileStore.searchFiles(searchName.value, currentDir.value)
  } else {
    await fileStore.getFiles(currentDir.value)
  }
}

const logout = async () => {
  await coreStore.logout()
}

</script>

<template>
  <div class="navbar">
    <div class="conteiner">
      <img :src="Logo" src="" alt="" class="navbar__logo" />
      <a href="/" class="navbar__header">MEVN CLOUD</a>
      <div class="navbar__login" v-if="!isAuth">
        <a href="/login" style="font-size: 20px">Войти</a>
        <a href="/registration" class="navbar__register" style="font-size: 20px"> Регистрация </a>
      </div>
      <div class="navbar__login" v-else>
        <input
          v-model="searchName"
          @change="searchFilesHandler"
          class="search"
          type="text"
          placeholder="Название файла..."
        />
        <a @click="logout">Выход</a>
        <router-link to="/profile">
          <img class="avatar" :src="avatar" alt="">
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../utils/colors.css';
@import '../utils/input.css';

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
}

.navbar__header {
  margin-left: 10px;
  font-size: 24px;
  font-weight: bold;
}
.navbar__login {
  margin-left: auto;
  margin-right: 20px;
}

.navbar__login a {
  font-size: 20px;
}

.search {
  width: 200px;
  margin-right: 400px;
}

a {
  text-decoration: none;
  cursor: pointer;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 10px;
}

@media screen and (max-width: 950px) {
  .navbar__header {
    font-size: 14px;
  }

  .navbar__login {
    margin-right: 0;
  }

  .navbar__login a {
    font-size: 16px;
    margin-right: 10px;
  }

  .search {
    width: 100px;
    font-size: 10px;
    margin-right: 80px;
  }
}
</style>
