import { defineStore } from 'pinia'
import type { Post } from '@/types'
export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Array<Post>
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    async fetchPosts() {
      console.log('Fetching!')
      //const { isFetching, error, data } = await useFetch('http://localhost:3000/post')
      const res = await fetch('http://bock.pink:3000/post')
      //if (error) throw error
      this.posts = await res.json()
    }
  }
})
