import axios from 'axios'
import { postsStore } from '../store/postStore'

export const getPosts = async () => {
  try {
    const response = await axios.get('/test-api/posts.json')
    postsStore.setState(() => response.data)
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching posts:', error instanceof Error ? error.message : 'Unknown error')
  }
}
