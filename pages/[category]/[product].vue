<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
const route = useRoute()
const { data: goods } = useFetch(`http://127.0.0.1:8000/products/${route.query.id}`)
</script>

<template>
  <div class="bg-[#f9f9f9]">
    <div class="mx-auto max-w-7xl px-4 pt-10 container lg:px-8 sm:px-6">
      <NavCategory />
      <GoodsMain v-if="goods" :goods="goods" />
    </div>
  </div>
  <div class="mx-auto max-w-7xl px-4 pt-10 container lg:px-8 sm:px-6">
    <GoodsDetails v-if="goods" :goods="goods" />
  </div>
</template>
