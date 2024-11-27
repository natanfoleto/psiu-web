import { createContext, useContext, useEffect, useState } from 'react'

import { getPosts } from '@/http/posts/get-posts'
import type { IPost } from '@/http/posts/types'

import type { PostContextType, PostProviderProps } from './types'

const PostContext = createContext<PostContextType>({} as PostContextType)

const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    async function fetch() {
      const { result, data } = await getPosts()

      if (result === 'success') {
        if (data) setPosts(data)
      }
    }

    fetch()
  }, [])

  return (
    <PostContext.Provider
      value={{
        posts,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

function usePost(): PostContextType {
  return useContext(PostContext)
}

export { PostProvider, usePost }
