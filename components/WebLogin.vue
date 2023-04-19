<script setup>
const username = ref('')
const email = ref('')
const password = ref('')
const err_msg = ref('')
const router = useRouter()
function login() {
  if (username.value !== '' && email.value !== '' && password.value !== '') {
    $fetch('http://127.0.0.1:8000/auth/login/', { method: 'POST', body: { username: username.value, email: email.value, password: password.value } })
      .then((res) => {
        useAuthStore().$state.key = res.key
        router.push({ path: '/' })
      })
      .catch(() => {
        err_msg.value = 'login error'
      })
  }
}
</script>

<template>
  <div class="mx-auto w-200">
    <div class="flex flex-col gap-5">
      <h1 class="text-2xl font-bold">
        Sign in
      </h1>
      <span>Sign in to check your order information, and more</span>
      <form>
        <label class="block">
          <span class="block text-sm font-medium text-slate-700">Username</span>
          <!-- Using form state modifiers, the classes can be identical for every input -->
          <input
            v-model="username"
            type="text" class="mt-1 block w-full border border-slate-300 rounded-md bg-white px-3 py-2 text-sm shadow-sm disabled:border-slate-200 focus:border-sky-500 invalid:border-pink-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:text-pink-600 disabled:shadow-none focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 placeholder-slate-400"
          >
        </label>
        <label class="block">
          <span class="block text-sm font-medium text-slate-700">Email</span>
          <!-- Using form state modifiers, the classes can be identical for every input -->
          <input
            v-model="email"
            type="text" class="mt-1 block w-full border border-slate-300 rounded-md bg-white px-3 py-2 text-sm shadow-sm disabled:border-slate-200 focus:border-sky-500 invalid:border-pink-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:text-pink-600 disabled:shadow-none focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 placeholder-slate-400"
          >
        </label>
        <label class="block">
          <span class="block text-sm font-medium text-slate-700">Password</span>
          <!-- Using form state modifiers, the classes can be identical for every input -->
          <input
            v-model="password"
            type="password" class="mt-1 block w-full border border-slate-300 rounded-md bg-white px-3 py-2 text-sm shadow-sm disabled:border-slate-200 focus:border-sky-500 invalid:border-pink-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:text-pink-600 disabled:shadow-none focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 placeholder-slate-400"
          >
        </label>
      </form>
      <button class="btn" @click="login">
        Sign in
      </button>
      <span class="text-center text-xl text-red">{{ err_msg }}</span>
    </div>
  </div>
</template>
