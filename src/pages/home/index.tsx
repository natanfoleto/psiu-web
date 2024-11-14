import { EnumTypeReaction, Post, type PostProps } from '@/components/post'

import { NewPost } from './new-post'

const posts: PostProps[] = [
  {
    id: 'cfa9570f-8709-4a2c-b49e-2c85e1bcdbdd',
    content: 'Cortei o pulso galera!',
    publishedAt: '2024-10-23T00:59:25.784Z',
    updatedAt: null,
    comments: [
      {
        id: 'ad99bf8a-533f-4b01-8f1b-9820725b289d',
        postId: 'cfa9570f-8709-4a2c-b49e-2c85e1bcdbdd',
        content: 'Comentário 335',
        commentedAt: '2024-10-23T01:01:03.864Z',
        updatedAt: null,
        reactions: [
          {
            id: 'c09b0845-488d-4046-9fdc-9f741dbd21b3',
            postId: 'c09b0845-488d-4046-9fdc-9f741dbd21b5',
            type: EnumTypeReaction.ENTENDO_VOCE,
            reactedAt: '2024-10-30T23:18:06.302Z',
          },
        ],
      },
    ],
    reactions: [
      {
        id: 'bb1d17d6-d34c-4728-b6c6-27c6fac11728',
        postId: 'cfa9570f-8709-4a2c-b49e-2c85e1bcdbdd',
        type: EnumTypeReaction.ESTAMOS_JUNTOS,
        reactedAt: '2024-10-23T00:59:52.167Z',
      },
    ],
  },
  {
    id: 'd1a6781e-94b7-4f1a-8b2d-f2c59e8b0a1c',
    content: 'Dia difícil hoje, mas amanhã é outro dia!',
    publishedAt: '2024-11-01T09:30:12.200Z',
    updatedAt: null,
    comments: [
      {
        id: 'f2348db4-2b94-4d1e-9ed2-9329ff617b1e',
        postId: 'd1a6781e-94b7-4f1a-8b2d-f2c59e8b0a1c',
        content: 'Fique firme! Tudo vai melhorar.',
        commentedAt: '2024-11-01T09:45:30.100Z',
        updatedAt: null,
        reactions: [
          {
            id: 'h2b39b54-6f91-4125-9a28-9e573b5b4cfa',
            postId: 'c09b0845-488d-4046-9fdc-9f741dbd30b5',
            type: EnumTypeReaction.APOIO,
            reactedAt: '2024-11-01T09:46:00.500Z',
          },
        ],
      },
    ],
    reactions: [
      {
        id: 'z4b37f19-4f8e-42df-a71d-5a193d2d3332',
        postId: 'd1a6781e-94b7-4f1a-8b2d-f2c59e8b0a1c',
        type: EnumTypeReaction.TRISTEZA,
        reactedAt: '2024-11-01T09:31:45.234Z',
      },
    ],
  },
  {
    id: 'e8b561d2-cf68-4d9f-b712-7f94a0a0e2a9',
    content: 'Alguém assistiu ao último episódio da série X?',
    publishedAt: '2024-10-25T18:22:10.784Z',
    updatedAt: null,
    comments: [
      {
        id: 'e9ab4f88-6a54-4c1d-923f-7c6e4f789d33',
        postId: 'e8b561d2-cf68-4d9f-b712-7f94a0a0e2a9',
        content: 'Sim! Foi incrível, o que você achou?',
        commentedAt: '2024-10-25T18:30:12.800Z',
        updatedAt: null,
        reactions: [
          {
            id: 'a7cb2d48-7d8f-45b5-9d41-8c6f2d8a8764',
            postId: 'c09b0845-488d-4046-9fdc-8b741dbd21b5',
            type: EnumTypeReaction.ENTENDO_VOCE,
            reactedAt: '2024-10-25T18:32:00.100Z',
          },
        ],
      },
    ],
    reactions: [
      {
        id: 'f3d67b02-3e56-4769-849d-4a3d9d74380f',
        postId: 'e8b561d2-cf68-4d9f-b712-7f94a0a0e2a9',
        type: EnumTypeReaction.APOIO,
        reactedAt: '2024-10-25T18:23:45.234Z',
      },
    ],
  },
  {
    id: 'f1c72d4e-8c2d-4e6b-a34c-87c79d2e6d7d',
    content: 'Comemorando uma grande conquista hoje!',
    publishedAt: '2024-11-03T12:00:00.000Z',
    updatedAt: null,
    comments: [
      {
        id: 'g8f46ad4-3d84-4c1e-8f1e-7a9d4f7e982c',
        postId: 'f1c72d4e-8c2d-4e6b-a34c-87c79d2e6d7d',
        content: 'Parabéns! Muito feliz por você.',
        commentedAt: '2024-11-03T12:15:00.000Z',
        updatedAt: null,
        reactions: [
          {
            id: 'h7f3e2a8-1d4f-47b2-8f6e-2d4b7a8c5e3d',
            postId: 'c02b0845-488d-4046-9fdc-9f741dbd21b5',
            type: EnumTypeReaction.TRISTEZA,
            reactedAt: '2024-11-03T12:17:00.000Z',
          },
        ],
      },
    ],
    reactions: [
      {
        id: 'i9e8d7c6-2b5a-47e8-9a4d-6b2d7f4e5c3a',
        postId: 'f1c72d4e-8c2d-4e6b-a34c-87c79d2e6d7d',
        type: EnumTypeReaction.FORCA,
        reactedAt: '2024-11-03T12:01:30.000Z',
      },
    ],
  },
  {
    id: 'j8e57c2a-1d7f-4c3b-a4e5-7b6f3d4e9b8f',
    content: 'Pensando em adotar um cachorro. Alguma dica?',
    publishedAt: '2024-11-05T15:30:25.000Z',
    updatedAt: null,
    comments: [
      {
        id: 'k4d39c2f-3e1b-4a6d-9c7e-4b2e5d6c8a9f',
        postId: 'j8e57c2a-1d7f-4c3b-a4e5-7b6f3d4e9b8f',
        content: 'Procure adotar de ONGs, eles precisam de amor!',
        commentedAt: '2024-11-05T15:45:00.000Z',
        updatedAt: null,
        reactions: [
          {
            id: 'm9f2b1c4-5e4f-4e7d-8a6d-3b4e5c6a7f9g',
            postId: 'd09b0845-488d-4046-9fdc-9f741dbd21b5',
            type: EnumTypeReaction.ESTAMOS_JUNTOS,
            reactedAt: '2024-11-05T15:47:00.000Z',
          },
        ],
      },
    ],
    reactions: [
      {
        id: 'o6g3d5c7-9f4b-4e7d-a3e6-2f3g4h5i6j7k',
        postId: 'j8e57c2a-1d7f-4c3b-a4e5-7b6f3d4e9b8f',
        type: EnumTypeReaction.ENTENDO_VOCE,
        reactedAt: '2024-11-05T15:31:45.000Z',
      },
    ],
  },
]

export function Home() {
  return (
    <div className="h-screen w-full px-16 py-8 space-y-12 overflow-y-auto">
      <NewPost />

      <div className="flex flex-col items-center gap-12">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            content={post.content}
            publishedAt={post.publishedAt}
            updatedAt={post.updatedAt}
            comments={post.comments}
            reactions={post.reactions}
          />
        ))}
      </div>
    </div>
  )
}
