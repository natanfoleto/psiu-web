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
  deleteComment,
  type DeleteCommentRequest,
  type DeleteCommentResponse,
} from '@/http/comments/delete-comment'
import {
  createPost,
  type CreatePostRequest,
  type CreatePostResponse,
} from '@/http/posts/create-post'
import {
  deletePost,
  type DeletePostRequest,
  type DeletePostResponse,
} from '@/http/posts/delete-post'
import { getPosts } from '@/http/posts/get-posts'
import { getPostsByStudent } from '@/http/posts/get-posts-by-student'
import type { IPost } from '@/http/posts/types'
import {
  updatePost,
  type UpdatePostRequest,
  type UpdatePostResponse,
} from '@/http/posts/update-post'
import {
  createCommentReaction,
  type CreateCommentReactionRequest,
  type CreateCommentReactionResponse,
} from '@/http/reactions/create-comment-reaction'
import {
  createPostReaction,
  type CreatePostReactionRequest,
  type CreatePostReactionResponse,
} from '@/http/reactions/create-post-reaction'
import {
  deleteCommentReaction,
  type DeleteCommentReactionRequest,
  type DeleteCommentReactionResponse,
} from '@/http/reactions/delete-comment-reaction'
import {
  deletePostReaction,
  type DeletePostReactionRequest,
  type DeletePostReactionResponse,
} from '@/http/reactions/delete-post-reaction'

import { useAuth } from '../auth'
import type { PostContextType, PostProviderProps } from './types'

const PostContext = createContext<PostContextType>({} as PostContextType)

const PostProvider = ({ children }: PostProviderProps) => {
  const { student } = useAuth()

  const [posts, setPosts] = useState<IPost[]>([])
  const [postsByStudent, setPostsByStudent] = useState<IPost[]>([])

  const [page, setPage] = useState(1)
  const [last, setLast] = useState(0)

  const onLoadMore = useCallback(() => {
    setPage((prev) => prev + 1)
  }, [])

  const fetchPosts = useCallback(async () => {
    const { result, data, last } = await getPosts({ _page: page })

    if (result === 'success') {
      if (data && last) {
        setPosts((prev) => [...prev, ...data])
        setLast(last)
      }
    }
  }, [page])

  const fetchPostsByStudent = useCallback(async () => {
    if (student) {
      const { result, data } = await getPostsByStudent({
        studentId: student.id,
      })

      if (result === 'success') {
        if (data) setPostsByStudent(data)
      }
    }
  }, [student])

  useEffect(() => {
    fetchPosts()
    fetchPostsByStudent()
  }, [fetchPosts, fetchPostsByStudent])

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

  const onUpdatePost = useCallback(
    async ({
      postId,
      content,
    }: UpdatePostRequest): Promise<UpdatePostResponse> => {
      const { result, message } = await updatePost({ postId, content })

      if (result === 'success') {
        await fetchPosts()
      }

      return { result, message }
    },
    [fetchPosts],
  )

  const onDeletePost = useCallback(
    async ({ postId }: DeletePostRequest): Promise<DeletePostResponse> => {
      const { result, message } = await deletePost({ postId })

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

  const onDeleteComment = useCallback(
    async ({
      commentId,
    }: DeleteCommentRequest): Promise<DeleteCommentResponse> => {
      const { result, message } = await deleteComment({ commentId })

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

  const onDeletePostReaction = useCallback(
    async ({
      reactionId,
    }: DeletePostReactionRequest): Promise<DeletePostReactionResponse> => {
      const { result, message } = await deletePostReaction({ reactionId })

      if (result === 'success') {
        await fetchPosts()
      }

      return { result, message }
    },
    [fetchPosts],
  )

  const onCreateCommentReaction = useCallback(
    async ({
      commentId,
      type,
    }: CreateCommentReactionRequest): Promise<CreateCommentReactionResponse> => {
      const { result, message } = await createCommentReaction({
        commentId,
        type,
      })

      if (result === 'success') {
        await fetchPosts()
      }

      return { result, message }
    },
    [fetchPosts],
  )

  const onDeleteCommentReaction = useCallback(
    async ({
      reactionId,
    }: DeleteCommentReactionRequest): Promise<DeleteCommentReactionResponse> => {
      const { result, message } = await deleteCommentReaction({ reactionId })

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
        postsByStudent,
        page,
        last,
        onLoadMore,
        onCreatePost,
        onUpdatePost,
        onDeletePost,
        onCreateComment,
        onDeleteComment,
        onCreatePostReaction,
        onDeletePostReaction,
        onCreateCommentReaction,
        onDeleteCommentReaction,
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
