import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  createComment,
  type CreateCommentRequest,
  type CreateCommentResponse,
} from '@/http/comments/create-comment'
import {
  createPost,
  type CreatePostRequest,
  type CreatePostResponse,
} from '@/http/posts/create-post'
import { getPosts } from '@/http/posts/get-posts'
import type { IPost } from '@/http/posts/types'
import {
  createPostReaction,
  type CreatePostReactionRequest,
  type CreatePostReactionResponse,
} from '@/http/reactions/create-post-reaction'

import type { PostContextType, PostProviderProps } from './types'

const PostContext = createContext<PostContextType>({} as PostContextType)

const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<IPost[]>([])

  const fetchPosts = useCallback(async () => {
    const { result, data } = await getPosts()

    if (result === 'success') {
      if (data) setPosts(data)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const onCreatePost = useCallback(
    async ({ content }: CreatePostRequest): Promise<CreatePostResponse> => {
      const { result, message } = await createPost({ content })

      if (result === 'success') {
        await fetchPosts()
      }

      return { result, message }
    },
    [fetchPosts],
  )

  const onCreateComment = useCallback(
    async ({
      postId,
      content,
    }: CreateCommentRequest): Promise<CreateCommentResponse> => {
      const { result, message } = await createComment({ postId, content })

      if (result === 'success') {
        await fetchPosts()
      }

      return { result, message }
    },
    [fetchPosts],
  )

  const onCreatePostReaction = useCallback(
    async ({
      postId,
      type,
    }: CreatePostReactionRequest): Promise<CreatePostReactionResponse> => {
      const { result, message } = await createPostReaction({ postId, type })

      if (result === 'success') {
        await fetchPosts()
      }

      return { result, message }
    },
    [fetchPosts],
  )

  return (
    <PostContext.Provider
      value={{
        posts,
        onCreatePost,
        onCreateComment,
        onCreatePostReaction,
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
