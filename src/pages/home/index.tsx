import { Post } from '@/components/post'

import { NewPost } from './new-post'

export function Home() {
  return (
    <div className="h-screen w-full px-16 py-8 space-y-12 overflow-y-auto">
      <NewPost />

      <div className="flex flex-col items-center gap-12">
        <Post
          id=""
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum obcaecati quis magni quidem modi aliquam voluptate id veritatis aut. Eligendi voluptas quidem fugiat dolores recusandae vitae esse dolor quos velit!"
          publishedAt="2024-11-08T23:57:50.054Z"
          updatedAt={null}
        />

        <Post
          id=""
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eaque, odio quidem laborum quam eum mollitia ducimus rem ad perspiciatis fugit aspernatur eligendi, repudiandae beatae voluptatem error, doloribus porro sunt."
          publishedAt="2024-10-08T23:57:50.054Z"
          updatedAt={null}
        />

        <Post
          id=""
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laboriosam consectetur rem vel, quos accusamus adipisci iure explicabo tenetur maiores. Cupiditate deserunt, doloremque atque minus ab minima eius rerum quia."
          publishedAt="2024-09-08T23:57:50.054Z"
          updatedAt="2024-11-08T18:00:50.054Z"
        />
      </div>
    </div>
  )
}
