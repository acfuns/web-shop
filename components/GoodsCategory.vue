<script setup lang="ts">
defineProps<{
  goods: Array<{
    id: number
    name: string
    description: string
    category: number
    price: string
    stock: number
    feature_age: number
    feature_material: string
    img: string
  }>
}>()
const url = useRoute().path
const router = useRouter()
function toProduct(name: string, id: number) {
  router.push({ path: `${url}/${name.toLocaleLowerCase().replaceAll(' ', '-')}`, query: { id } })
}

const route = useRoute()
const store = useCategoryStore()
const cid = store.category.get(route.params.category)
const { data: msg } = useFetch(`http://127.0.0.1:8000/category_detail/${cid}/`)
</script>

<template>
  <div v-if="msg" class="flex flex-col self-center gap-3 text-center">
    <h1 class="mb-10 mt-6 text-5xl font-bold">
      {{ msg.name }}
    </h1>
    <span class="mx-auto max-w-[800px] font-mono">
      {{ msg.description }}
    </span>
    <div class="mb-8 mt-3">
      <span>{{ msg.product_count }}</span> products
    </div>
  </div>
  <div class="grid grid-cols-4 gap-6 lt-md:grid-cols-2">
    <div v-for="it in goods" :key="it.id" @click="toProduct(it.name, it.id)">
      <div class="group flex flex-col cursor-pointer">
        <div class="overflow-hidden">
          <nuxt-img :src="it.img" class="transition-transform duration-500 group-hover:scale-105" />
        </div>
        <span>{{ it.name }}</span>
        <span>£{{ it.price }}</span>
      </div>
    </div>
  </div>
</template>
