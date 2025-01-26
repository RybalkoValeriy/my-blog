import Link from 'next/link'

interface PostShortProps {
  slug: string
  title: string
  date: string
}

export function PostShortItem({ slug, title }: PostShortProps) {
  return (
    <div className="grid grid-rows-2 grid-colums-4 hover:bg-secondary/80 p-1 rounded-sm  underline underline-offset-1">
      <Link href={'/' + slug} className="row-span-2 ">
        {title}
      </Link>
    </div>
  )
}
