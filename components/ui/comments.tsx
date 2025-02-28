'use client'
import Giscus from '@giscus/react'

export function Comments() {
  return (
    <Giscus
      repo="RybalkoValeriy/my-blog"
      repoId="R_kgDONsjD4Q"
      category="blog-comments"
      categoryId="DIC_kwDONsjD4c4CnX4Z"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  )
}
