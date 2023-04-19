<script setup>
const token = useAuthStore()
const orders = ref()

$fetch('http://127.0.0.1:8000/all_orders/', { method: 'GET', headers: { Authorization: `Token ${token.$state.key}` } })
  .then((res) => {
    orders.value = res
  })
  .catch((err) => {
    console.log(err)
  })
</script>

<template>
  <div v-if="orders" mx-auto w-200>
    <div v-for="order in orders" :key="order.id" class="mb-4 flex flex-col gap-2 rounded-2xl bg-[#f9f9f9] p-5">
      <div flex flex-col gap-5 border-b-1 pb-4>
        <div flex justify-between>
          <div self-center text-2xl>
            Order ID: {{ order.id }}
          </div>
          <div self-end rounded-xl bg-blue-5 px-4 py-2 text-sm text-white :class="{ 'bg-blue-5': order.status === 'DELIVERED', 'bg-red-7': order.status === 'CANCELLED' }">
            {{ order.status }}
          </div>
        </div>
        <div text-sm>
          <span text-gray-500>Order date:  </span>
          <span>{{ order.created_at }}</span>
        </div>
      </div>
      <div v-for="it in order.items" :key="it.id" flex flex-col border-b-1 pb-4>
        <div flex justify-between>
          <div flex justify-between gap-4>
            <NuxtImg width="90" height="90" :src="`http://127.0.0.1:8000${it.product_info.img}`" rounded />
            <span self-center text-gray-6>{{ it.product_info.name }}</span>
          </div>
          <div self-center>
            <span font-500>{{ it.product_info.price }}</span>
          </div>
        </div>
      </div>
      <div>
        <span text-gray-500>total: {{ order.total_amount }}</span>
        <span text-lg />
      </div>
    </div>
  </div>
</template>
