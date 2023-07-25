import { defineStore } from 'pinia'
import type { Person } from '@/types'
export const usePersonStore = defineStore('person', {
  state: () => ({
    persons: [] as Array<Person>
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    async fetchPersons() {
      console.log('Fetching!')
      //const { isFetching, error, data } = await useFetch('http://localhost:3000/person')
      const res = await fetch('http://localhost:3000/person')
      //if (error) throw error
      this.persons = await res.json()
    }
  }
})
