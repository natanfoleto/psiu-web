import { Post } from '@/components/post/post-card-1'
import { usePost } from '@/contexts/post'

import { NewPost } from './new-post'

export function Home() {
  const { posts, page, last, onLoadMore } = usePost()

  return (
    <div className="h-screen w-full 2md:px-16 px-8 pt-8 pb-12 space-y-12 overflow-y-auto">
      <NewPost />

      <div className="flex flex-col items-center gap-12">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={{
              id: post.id,
              isOwner: post.isOwner,
              content: post.content,
              publishedAt: post.publishedAt,
              updatedAt: post.updatedAt,
              comments: post.comments,
              reactions: post.reactions,
            }}
          />
        ))}
      </div>

      {page < last && (
        <div className="w-full flex justify-center">
          <button
            onClick={onLoadMore}
            className="text-zinc-300 text-sm hover:underline"
          >
            Carregar mais
          </button>
        </div>
      )}
    </div>
  )
}
