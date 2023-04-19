<script setup lang="ts">
// const goods = [
//   { id: 1, src: '/soft_toys_banners_0106c99a12.png' },
//   { id: 2, src: '/books_banners_00ddf826ad.png' },
//   { id: 3, src: '/vintage_banners_d01820f955.png' },
//   { id: 4, src: '/vintage_banners_d01820f955.png' },
// ]
const props = defineProps<{
  goods: Array<{
    id: number
    name: string
    message: string
    category_img: string
  }>
}>()
const store = useCategoryStore()
props.goods.forEach((it) => {
  store.category.set(it.name.toLocaleLowerCase().replace(' ', '-'), it.id)
})

const router = useRouter()
function enterCategories(name: string) {
  router.push(`/${name.toLocaleLowerCase().replace(' ', '-')}`)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-5 lt-md:grid-cols-1">
    <div v-for="it of goods" :key="it.id">
      <nuxt-img class="rounded" :src="`http://127.0.0.1:8000/${it.category_img}/`" alt="" loading="lazy" />
      <div class="mt-4 text-center">
        <h2 class="my-3 text-3xl font-semibold">
          {{ it.name }}
        </h2>
        <p class="my-3 text-lg">
          {{ it.message }}
        </p>
        <button class="my-4 text-lg transition duration-500 btn" @click="enterCategories(it.name)">
          Shop {{ it.name }}
        </button>
      </div>
    </div>
    <!-- <div><img src="/books_banners_00ddf826ad.png" alt=""></div>
    <div><img src="/vintage_banners_d01820f955.png" alt=""></div> -->
  </div>
</template>
