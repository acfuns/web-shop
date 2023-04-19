<script setup lang="ts">
const token = useAuthStore()
const isDisable = ref(false)
const drawer = ref(false)
const isBody = ref(true)

// token.$subscribe((mutation, state) => {
//   if (state.key !== '')
//     isDisable.value = true
// })
const auth = useCookie('auth')
if (auth.value)
  isDisable.value = true

const router = useRouter()
function goLogin() {
  router.push({ path: '/login' })
}

function goOrder() {
  router.push({ path: '/order' })
}

function goHome() {
  router.push({ path: '/' })
}

function toUrlString(str: string) {
  return str.toLocaleLowerCase().replaceAll(' ', '-')
}

const state2 = ref('')
interface ProductItem {
  value: string
  link: string
}
const products = ref<ProductItem[]>([])
function querySearch(queryString: string, cb: any) {
  const results = queryString
    ? products.value.filter(createFilter(queryString))
    : products.value
  // call callback function to return suggestions
  cb(results)
}
function createFilter(queryString: string) {
  return (products: ProductItem) => {
    return (
      products.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

async function loadAll() {
  const res = ref<ProductItem[]>([])
  await $fetch('http://127.0.0.1:8000/products', {
    method: 'GET',
  }).then((data: any) => {
    console.log(data)
    data.forEach((it: any) => {
      res.value.push({
        value: it.name,
        link: `${toUrlString(it.category_msg.name)}/${toUrlString(it.name)}/?id=${it.id}`,
      })
    })
  })

  return res.value
}

function handleSelect(item: ProductItem) {
  router.push(item.link)
}

onMounted(() => {
  loadAll().then((data) => {
    console.log(data)

    products.value = data
  })
})
</script>

<template>
  <header class="sticky top-0 z-30 bg-white/75 py-3 text-lg text-gray-500 shadow shadow-gray-200 backdrop-blur-md dark:bg-black/75 dark:shadow-gray-800">
    <div class="relative mx-auto max-w-7xl px-4 container lg:px-8 sm:px-6">
      <div class="flex items-center justify-between">
        <div class="flex cursor-pointer items-center" @click="goHome">
          <nuxt-img class="inline-block h-14 w-14" src="/logo.svg" />
          <span class="text-xl font-semibold text-black dark:text-white">母婴产品商城</span>
        </div>

        <div class="grid grid-flow-col items-center gap-4 dark:text-[#BBBBBB]">
          <el-autocomplete
            v-model="state2"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            clearable
            class="inline-input w-50"
            placeholder="Please Input"
            @select="handleSelect"
          />
          <div v-if="isDisable" class="cursor-pointer rounded lt-md:hidden hover:text-gray-800 hover:duration-0.4s dark:hover:text-gray-200" @click="goOrder">
            个人订单
          </div>
          <div v-if="isDisable" class="cursor-pointer rounded lt-md:hidden hover:text-gray-800 hover:duration-0.4s dark:hover:text-gray-200" @click="() => drawer = true">
            购物车
          </div>
          <div v-if="!isDisable" class="cursor-pointer rounded lt-md:hidden hover:text-gray-800 hover:duration-0.4s dark:hover:text-gray-200" @click="goLogin">
            注册登录
          </div>
          <DarkToggle />
        </div>
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
  </header>
</template>

<style>
.el-drawer__header {
  margin-bottom: 0;
}
</style>
