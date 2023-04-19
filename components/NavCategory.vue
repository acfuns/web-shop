<script setup lang="ts">
const route = useRoute()
const navArray = route.path.split('/')
navArray.shift()

function goNav(idx: number) {
  let res = ''
  for (let i = 0; i <= idx; i++)
    res += `/${navArray[i]}`

  return res
}
</script>

<template>
  <nav>
    <ul class="flex justify-start gap-3">
      <li class="inactive">
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </li>
      <li v-for="it, idx in navArray" :key="idx" class="inactive before:content-[quoted:/]">
        <NuxtLink class="px-2" active-class="active" :to="goNav(idx)">
          {{ it.replaceAll('-', ' ') }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
