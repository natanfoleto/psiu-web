import { useEffect, useState } from 'react'

import { Post } from '@/components/post'
import { getPosts } from '@/http/posts/get-posts'
import type { IPost } from '@/http/posts/types'

import { NewPost } from './new-post'

export function Home() {
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
    <div className="h-screen w-full px-16 py-8 space-y-12 overflow-y-auto">
      <NewPost />

      <div className="flex flex-col items-center gap-12">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={{
              id: post.id,
              content: post.content,
              publishedAt: post.publishedAt,
              updatedAt: post.updatedAt,
              comments: post.comments,
              reactions: post.reactions,
            }}
          />
        ))}
      </div>
    </div>
  )
}
