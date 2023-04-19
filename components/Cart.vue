<script setup>
const cartData = ref()
const token = useAuthStore()
$fetch('http://127.0.0.1:8000/get_cart/', {
  method: 'GET',
  headers: {
    Authorization: `Token ${token.$state.key}`,
  },
}).then((res) => {
  console.log(res)
  cartData.value = res
}).catch((err) => {
  console.log(err)
})
const cart_price_total = computed(() => {
  let total = 0
  cartData.value.forEach((it) => {
    total += it.item_total
  })
  return total
})
function remove_it(id) {
  $fetch(`http://127.0.0.1:8000/remove_from_cart/${id}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token.$state.key}`,
    },
  }).then(() => {
    cartData.value.forEach((it, index) => {
      if (it.id === id)
        cartData.value.splice(index, 1)
    })
  }).catch((err) => {
    console.log(err)
  })
}

function checkout() {
  if (cartData.value.length === 0) {
    ElMessage({
      type: 'error',
      message: 'Cart is empty',
    })
  }
  else {
    $fetch('http://127.0.0.1:8000/create_order/', { method: 'POST', headers: { Authorization: `Token ${token.$state.key}` } })
      .then((res) => {
        console.log(res)
        ElMessageBox({
          title: 'Message',
          message: h('p', null, [
            h('span', null, 'Successful or cancel checkout.'),
          ]),
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = 'Loading...'
              setTimeout(() => {
                $fetch(`http://127.0.0.1:8000/complete_order/${res.id}/`, { method: 'POST', headers: { Authorization: `Token ${token.$state.key}` } })
                  .then((res) => {
                    cartData.value.forEach((index) => {
                      cartData.value.splice(index, 1)
                    })
                    done()
                  })
                  .catch((err) => {
                    console.log(err)
                  })
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 3000)
            }
            else {
              $fetch(`http://127.0.0.1:8000/cancel_order/${res.id}/`, { method: 'POST', headers: { Authorization: `Token ${token.$state.key}` } })
                .then((res) => {
                  cartData.value.forEach((index) => {
                    cartData.value.splice(index, 1)
                  })
                  done()
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          },
        }).then((action) => {
          ElMessage({
            type: 'success',
            message: 'Successful purchase',
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<template>
  <div v-if="cartData" class="h-100% flex flex-col justify-between gap-3">
    <div>
      <div v-for="it in cartData" :key="it.id" class="flex justify-between gap-3">
        <div><NuxtImg width="100" height="100" :src="`http://127.0.0.1:8000${it.product.img}`" /></div>
        <div class="flex flex-1 flex-col gap-5">
          <div><span class="cursor-pointer text-sm font-semibold underline hover:no-underline">{{ it.product.name }}</span></div>
          <div class="flex justify-between">
            <div class="cursor-pointer text-sm text-pink underline hover:no-underline" @click="remove_it(it.id)">
              Remove
            </div>
            <div><span class="text-sm font-semibold">£{{ it.product.price }}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative bottom-0">
      <div class="flex flex-col">
        <div class="flex justify-between bg-green-200 p-4 text-sm font-semibold">
          <div>Sub total</div>
          <div>£{{ cart_price_total }}</div>
        </div>
        <button class="btn" @click="checkout">
          Proceed to checkout
        </button>
      </div>
    </div>
  </div>
</template>
