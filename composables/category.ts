import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    category: new Map(),
  }),
})
