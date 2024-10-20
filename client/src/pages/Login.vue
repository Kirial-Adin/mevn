<script setup lang="ts">
import { ref } from 'vue'
import { useCoreStore } from '../stores/auth'

const store = useCoreStore()
const email = ref<string>('')
const password = ref<string>('')

const login = async () => {
  await store.login(email.value, password.value)
}
</script>

<template>
  <div class="login">
    <div class="login__header">Вход</div>
    <input v-model="email" type="email" placeholder="Введите email" />
    <input v-model="password" type="password" placeholder="Введите пароль" />
    <button @click="login" class="btn__login">Войти</button>
  </div>
</template>

<style scoped>
@import '../utils/colors.css';
@import '../utils/input.css';

.login {
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  align-self: center;
  margin-top: 200px;

  .login__header {
    font-size: 30px;
    font-weight: bold;
  }

  input {
    margin: 10px 20px;
  }

  .btn__login {
    border: none;
    background-color: var(--color);
    border-radius: 8px;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  :hover {
    transform: scale(1.01);
  }
}
</style>
