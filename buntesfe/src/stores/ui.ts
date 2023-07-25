import { defineStore } from 'pinia'
export const useUIStore = defineStore('ui', {
  state: () => ({
    view: 'HOME'
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    loadUI() {
      console.log('Loading UI data')
      this.view = localStorage.getItem('view') || 'HOME'
    },
    saveUI() {
      console.log('Saving UI data')
      localStorage.setItem('view', this.view)
    }
  }
})
