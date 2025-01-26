import { posts } from '#site/content'
import { PostItem } from '@/components/post-item'
import { PostShortItem } from '@/components/post-short-item'
import { QueryPagination } from '@/components/query-pagination'
import { Tag } from '@/components/tag'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  calculateReadingTime,
  getAllTags,
  sortPosts,
  sortTagsByCount,
} from '@/lib/utils'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Valerii Rybalko’s blog',
  description: 'Welcome to my blog about it',
}

const POSTS_PER_PAGE = 5

interface PostsPageProps {
  searchParams: {
    page?: string
  }
}

export default async function PostPage({ searchParams }: PostsPageProps) {
  const currentPage = Number(searchParams?.page) || 1
  const sortedPosts = sortPosts(posts.filter((post) => post.published))
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  )

  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <div className="container max-w-5xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h3 className="inline-block font-black text-4xl lg:text-5xl">
            Tips and some Stories from Development Journey
          </h3>
          <p className="text-l text-muted-foreground">
            Welcome to my blog, where I share thoughts, tips, and stories from
            the world of development. From practical advice to intriguing
            challenges I’ve encountered, this space is all about sparking ideas
            and sharing experiences. Let’s explore the journey of development
            together!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, date, title, description, titleimage, body } =
                  post
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      titleimage={titleimage}
                      reading={calculateReadingTime(body)}
                    />
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>Here is no posts</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
        <div className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1 hover:bg-gray-100">
          <Card className="md:gap-8 mb-1">
            <CardHeader>
              <CardTitle>Recent posts:</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <ul className="list-disc p-4">
                {sortedPosts.slice(0, 5).map((post) => (
                  <li key={post.slug}>
                    <PostShortItem
                      slug={post.slug}
                      title={post.title}
                      date={post.date}
                    />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
            <CardHeader>
              <CardTitle>Tags:</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {sortedTags?.map((tag) => (
                <Tag tag={tag} key={tag} count={tags[tag]} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
