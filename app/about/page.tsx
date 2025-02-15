'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { siteConfig } from '@/config/site'
import { Mail, Linkedin } from 'lucide-react'
import { Icons } from '@/components/icons'

export default function AboutPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start overflow-hidden">
        <div className="min-w-58 max-w-58 flex flex-col gap-2">
          <Avatar className="h-48 w-48">
            <AvatarImage
              src="/me.png"
              alt={siteConfig.author}
              className="object-cover h-full w-full"
            />
            <AvatarFallback className="text-4xl">JC</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center break-words">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center break-words">
            Software Developer
          </p>
          <div className="flex flex-col space-y-2">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="flex items-center gap-2 text-sm"
            >
              <Mail className="h-5 w-5" /> {siteConfig.links.email}
            </a>

            <a
              href={siteConfig.links.github}
              className="flex items-center gap-2 text-sm"
            >
              <Icons.gitHub className="h-5 w-5" /> GitHub
            </a>

            <a
              href={siteConfig.links.linkedin}
              className="flex items-center gap-2 text-sm"
            >
              <Linkedin className="h-5 w-5" /> LinkedIn
            </a>
          </div>
        </div>
        <div className=" text-lg indent-8 mb-4">
          <p className="py-4 list-disc indent-8 mb-4">
            Hi, my name is <strong>Valerii</strong>, and I’m a{' '}
            <strong>software engineer</strong> based in <strong>Germany</strong>
            . I have a passion for building{' '}
            <strong>scalable applications</strong> and enhancing{' '}
            <strong>user experiences</strong>. Over the years, I’ve worked with
            various technologies, primarily <strong>.NET</strong>, and
            collaborated with different companies to develop impactful software
            solutions. I have a strong interest in{' '}
            <strong>event-driven architectures</strong> and am a firm believer
            in the power of <strong>rich domain models</strong> for designing
            robust applications. While my expertise lies in backend development,
            I also have some experience with{' '}
            <strong>frontend technologies</strong>. My favorite framework is{' '}
            <strong>React</strong>, and I enjoy exploring modern UI development
            practices.
          </p>
          <p className="py-4 list-disc indent-8 mb-4">
            Outside of work, I cherish spending time with my{' '}
            <strong>family</strong> and watching my <strong>daughter</strong>{' '}
            grow. My hobbies include <strong>jogging</strong>,{' '}
            <strong>football</strong>, and <strong>gaming</strong>. This blog is
            an essential part of my{' '}
            <strong>personal and professional growth</strong>. I’ve always
            wanted a space to share my thoughts, experiences, and the lessons
            I’ve learned along the way. Welcome to my blog! Here, I share{' '}
            <strong>insights</strong>, <strong>practical tips</strong>, and{' '}
            <strong>personal experiences</strong> from my journey as a software
            engineer. Whether it’s tackling complex challenges, exploring new
            technologies, or refining best practices, I hope this space inspires
            and sparks meaningful discussions.
          </p>
          <p className="py-4 list-disc indent-8 mb-4">
            I appreciate you stopping by THX!
          </p>
        </div>
      </div>
    </div>
  )
}
