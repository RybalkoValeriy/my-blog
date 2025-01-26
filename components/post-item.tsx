import { Calendar } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { cn, formatDate } from '@/lib/utils'
import { Tag } from './tag'
import Link from 'next/link'
import React from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from './ui/card'

interface PostItemProps {
  slug: string
  title: string
  description?: string
  date: string
  titleimage?: string
  reading: string
}

export function PostItem({
  slug,
  title,
  description,
  date,
  titleimage,
  reading,
}: PostItemProps) {
  return (
    <Card className=" rounded-sm flex flex-col p-4 mb-4 gap-2 border-border border-b py-3">
      <CardTitle>
        <Link href={'/' + slug}>{title}</Link>
      </CardTitle>

      {titleimage ? (
        <CardHeader>
          <img
            src={'/' + titleimage}
            className="h-48 w-96 object-cover center rounded-sm"
          ></img>
        </CardHeader>
      ) : null}

      <CardContent>
        <div className="flex justify-between items-center">
          <dl>
            <dt className="sr-only">Published On</dt>
            <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
          </dl>
          {reading}
        </div>
      </CardContent>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href={'/' + slug}
          className={cn(buttonVariants({ variant: 'default' }), 'py-0')}
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  )
}
