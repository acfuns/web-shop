<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
const { data: goods } = await useFetch('http://127.0.0.1:8000/categories')
</script>

<template>
  <div class="mx-auto mt-30 max-w-7xl px-4 container lg:px-8 sm:px-6">
    <GoodsLists :goods="goods" />
  </div>
</template>
