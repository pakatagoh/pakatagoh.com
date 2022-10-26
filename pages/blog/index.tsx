import React from "react"
import { Layout } from "../../components/Layout"
import { Nav } from "../../components/Nav"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { HeadWithMetaTags } from "../../components/HeadWithMetaTags"
import Link from "next/link"
import dayjs from "dayjs"
import { getAllPublishedPosts } from "../../service/posts"
import type { Post } from "../../service/posts"

interface BlogListingPageProps {
  posts: Post[]
}
export const getStaticProps: GetStaticProps<
  BlogListingPageProps
> = async () => {
  const publishedPosts = getAllPublishedPosts().sort((a, b) =>
    dayjs(a.createdAt).isBefore(b.createdAt)
      ? 1
      : dayjs(a.createdAt).isAfter(b.createdAt)
      ? -1
      : 0
  )

  return { props: { posts: publishedPosts } }
}

const BlogListingPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  return (
    <>
      <HeadWithMetaTags
        title="Blog - Pakata Goh"
        description="Blog posts"
        imageUrl="/images/blog/writing-article.jpeg"
      />
      <Layout>
        <Nav />
        <main>
          <h1 className="text-3xl font-bold">Blog</h1>
          <div className="mt-6 flex flex-col gap-6">
            {props.posts.map((post) => {
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-lg border border-gray-200 border-opacity-40 py-3 px-4 shadow-lg transition-shadow hover:shadow-md dark:border-gray-700 dark:border-opacity-30 dark:shadow-gray-900 sm:py-3 sm:px-4"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-1 sm:mb-2 sm:flex-nowrap sm:gap-3">
                    <h4 className="font-medium ">{post.title}</h4>
                    <div className="flex w-full items-center gap-1 text-sm text-gray-700 dark:text-gray-400 sm:w-auto sm:gap-3">
                      <span> - </span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                    {post.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </main>
      </Layout>
    </>
  )
}

export default BlogListingPage
