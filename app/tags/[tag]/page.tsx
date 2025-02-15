import { posts } from '#site/content'
import { PostItem } from '@/components/post-item'
import { PostShortItem } from '@/components/post-short-item'
import { Tag } from '@/components/tag'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  calculateReadingTime,
  getAllTags,
  getPostsByTagSlug,
  sortPosts,
  sortTagsByCount,
} from '@/lib/utils'
import { slug } from 'github-slugger'
import { Metadata } from 'next'

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  }
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts)
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }))
  return paths
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params
  const title = tag.split('-').join(' ')

  const sortedPosts = sortPosts(posts.filter((post) => post.published))
  const allPosts = getPostsByTagSlug(posts, tag)
  const displayPosts = allPosts.filter((post) => post.published)
  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <div className="container max-w-5xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h3 className="inline-block font-black text-4xl lg:text-5xl">
            {title}
          </h3>
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
        </div>
        <div className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
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
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {sortedTags?.map((t) => (
                <Tag
                  tag={t}
                  key={t}
                  count={tags[t]}
                  current={slug(t) === tag}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
