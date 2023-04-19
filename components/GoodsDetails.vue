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
</script>

<template>
  <div class="flex justify-between" my-10 gap-30>
    <div class="flex basis-1/2 flex-col gap-5">
      <div class="text-3xl font-bold underline decoration-3 decoration-green">
        Product details
      </div>
      <div class="text-lg text-gray-700">
        {{ goods.description }}
      </div>
    </div>
    <div class="flex basis-1/2 flex-col gap-5">
      <div class="text-3xl font-bold underline decoration-3 decoration-green">
        Features
      </div>
      <div class="flex" justify-between>
        <div class="font-bold">
          Age:
        </div><div>{{ goods.feature_age }}+</div>
      </div>
      <div flex justify-between>
        <div class="font-bold">
          Material:
        </div><div>{{ goods.feature_material }}</div>
      </div>
      <div flex justify-between>
        <div class="font-bold">
          Height:
        </div><div>23cm</div>
      </div>
    </div>
  </div>
</template>
