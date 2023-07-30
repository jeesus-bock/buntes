export interface Post {
  author: string
  content: string
  comments: { author: string; content: string }[]
}
