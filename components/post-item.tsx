import { Calendar, Clock } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { cn, formatDate } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from './ui/card'

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
    <Card className="rounded-sm flex flex-col p-4 mb-4 gap-2 border-border border-b py-3 bg-r">
      <CardHeader>
        <CardTitle>
          <Link href={'/' + slug}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={date} className="text-xs sm:text-sm font-medium">
              {formatDate(date)}
            </time>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Clock className="h-6 w-4" />
            {reading}
          </div>
        </div>
      </CardContent>

      {titleimage && (
        <CardHeader className="border border-gray-300 rounded-sm">
          <Image
            src={'/' + titleimage}
            alt={title}
            className="w-full h-full object-cover rounded-sm"
            layout="responsive"
            width={700}
            height={475}
          />
        </CardHeader>
      )}

      <CardDescription className="m-1">{description}</CardDescription>
      <CardFooter className="flex justify-between mt-4">
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
