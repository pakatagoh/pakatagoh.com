import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import React from "react"
import { HeadWithMetaTags } from "../../components/HeadWithMetaTags"
import { Layout } from "../../components/Layout"
import { Nav } from "../../components/Nav"
import { useMdxComponent } from "../../hooks/useMdxComponent"
import { getAllPublishedPosts, getPostBySlug, Post } from "../../service/posts"
import "highlight.js/styles/github-dark.css"

interface PostDetailsProps extends Post {
  code: string
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = () => {
  const allPublishedPosts = getAllPublishedPosts()

  const allPaths = allPublishedPosts.map((post) => ({
    params: {
      slug: `${post.slug}`,
    },
  }))

  return {
    paths: allPaths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  PostDetailsProps,
  { slug: string }
> = async (context) => {
  const slug = context.params?.slug!

  const postDetail = await getPostBySlug(slug)
  return {
    props: postDetail,
  }
}

const BlogDetailPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { title, code, createdAt, description, keywords = [] } = props

  const Component = useMdxComponent({ code })

  return (
    <>
      <HeadWithMetaTags
        title={title ? `${title} - Pakata Goh` : "Not Found"}
        description={description}
        imagePath="/images/blog/writing-article.jpeg"
      >
        <meta property="og:type" content="article" />
        <meta property="og:article:author" content="Pakata Goh" />

        <meta property="og:article:published_time" content={createdAt} />
        {keywords.map((keyword) => (
          <meta key={keyword} property="og:article:tag" content={keyword} />
        ))}
      </HeadWithMetaTags>
      <Layout>
        <Nav />
        <main className="prose w-full max-w-none break-words dark:prose-invert">
          <h1>{title}</h1>
          <Component />
        </main>
      </Layout>
    </>
  )
}

export default BlogDetailPage
