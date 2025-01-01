<script setup>
import {onMounted} from 'vue'
import {useCoreStore} from '../stores/auth'

const store = useCoreStore()

function uploadAvatarHandler(e) {
    const file = e.target.files[0]
    store.uploadAvatar(file)
}

onMounted(async () => {
//    console.log(store.value)
})

</script>

<template>
    <div>
        <button @click="store.deleteAvatar">Удалить  аватар</button>
        <input accept="image/*" @change="(e) => uploadAvatarHandler(e)" type="file" placeholder="Загрузить аватар">
    </div>
</template>

<style scoped>
</style>