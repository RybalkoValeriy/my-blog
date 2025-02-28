import { posts } from '#site/content'
import { MDXContent } from '@/components/mdx-components'
import { notFound } from 'next/navigation'

import '@/styles/mdx.css'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { Tag } from '@/components/tag'
import { calculateReadingTime, formatDate } from '@/lib/utils'
import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import { Comments } from '@/components/ui/comments'
interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug?.join('/')
  const post = posts.find((post) => post.slugAsParams === slug)

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const ogSearchParams = new URLSearchParams()
  ogSearchParams.set('title', post.title)

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split('/') }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className="container py-6 prose dark:prose-invert max-w-4xl mx-auto border p-4 rounded-md">
      <h1 className="mb-4 text-lg">{post.title}</h1>
      <div className="mb-4 flex justify-between items-center text-xs sm:text-xs font-small">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <div className="flex items-center gap-1 font-small">
          <Clock className="h-4 w-4" />
          <span>{calculateReadingTime(post.body)}</span>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.titleimage && (
        <Image
          src={'/' + post.titleimage}
          width={1200}
          height={630}
          className="w-full h-full object-cover rounded-sm"
          alt={post.title}
        />
      )}
      {post.description ? (
        <p className="text-sm mt-0 text-muted-foreground font-small">
          {post.description}
        </p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
      <Comments />
    </article>
  )
}
