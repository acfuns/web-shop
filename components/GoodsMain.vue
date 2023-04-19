<script setup lang="ts">
const props = defineProps<{
  goods: {
    id: number
    name: string
    description: string
    category: number
    price: string
    stock: number
    feature_age: number
    feature_material: string
    img: string
  }
}>()
const drawer = ref(false)
const token = useAuthStore()
const isBody = ref(true)

function addCart() {
  $fetch('http://127.0.0.1:8000/add_to_cart/', {
    method: 'POST',
    body: { product_id: props.goods.id },
    headers: {
      Authorization: `Token ${token.$state.key}`,
    },
  })
    .then((res) => {
      drawer.value = true
    }).catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="flex justify-between bg-[#f9f9f9]" pb-20 pt-10>
    <div class="basis-3/5">
      <NuxtImg :src="goods.img" width="400px" height="500px" />
    </div>
    <div class="flex basis-2/5 flex-col gap-4">
      <div class="text-2xl font-bold">
        {{ goods.name }}
      </div>
      <div class="mb-5 text-3xl font-bold">
        £{{ goods.price }}
      </div>
      <button class="btn" @click="addCart">
        add to cart
      </button>
      <div class="my-4 flex flex-col gap-2 text-lg text-gray-700">
        <div class="flex gap-2">
          <div i-carbon-delivery-truck self-center /><div>Free delivery on orders over £50</div>
        </div>
        <div class="flex gap-2">
          <div i-carbon-checkmark-outline self-center /><div>Interest free finance available*</div>
        </div>
        <div class="flex gap-2">
          <div i-carbon-location-heart self-center /><div>28 days to return</div>
        </div>
      </div>
      <div class="h-30 overflow-hidden">
        <p class="block text-lg leading-6 text-gray-700">
          {{ goods.description }}
        </p>
      </div>
      <span class="text-xl">More...</span>
    </div>
  </div>
  <el-drawer v-model="drawer" title="I am the title" :append-to-body="isBody" size="15%" :destroy-on-close="isBody">
    <template #header>
      <div class="flex justify-between border-b-1 pb-4">
        <span class="font-semibold text-black">Shopping cart</span>
      </div>
    </template>
    <Cart />
  </el-drawer>
</template>
