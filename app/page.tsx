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
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 sm:col-span-8 sm:col-start-1">
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
            <p>Here are no posts yet :)</p>
          )}

          {totalPages > 1 ? (
            <QueryPagination
              totalPages={totalPages}
              className="justify-end mt-4"
            />
          ) : null}
        </div>

        <div className="col-span-12 sm:col-span-4 sm:col-start-9 order-first sm:order-none">
          <Card className="mb-4 p-2 sm:p-4 w-full sm:w-auto">
            <CardHeader>
              <CardTitle>Recent posts:</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 sm:gap-3">
              <ul className="list-disc p-2 sm:p-4 text-sm sm:text-base">
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

          <Card className="p-2 sm:p-4 w-full sm:w-auto">
            <CardHeader>
              <CardTitle>Tags:</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 sm:gap-3">
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
