<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
const route = useRoute()
const store = useCategoryStore()
const cid = store.category.get(route.params.category)

const { data: goods } = useFetch(`http://127.0.0.1:8000/categories/${cid}/products`)
</script>

<template>
  <div class="mx-auto mt-5 max-w-7xl px-4 container lg:px-8 sm:px-6">
    <NavCategory />
    <GoodsCategory v-if="goods" :goods="goods" />
  </div>
</template>
