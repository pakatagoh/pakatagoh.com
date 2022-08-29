import fs from "fs"
import dayjs from "dayjs"
import { join } from "path"
import fm from "front-matter"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import rehypeSlug from "rehype-slug"
import { bundleMDX } from "mdx-bundler"

export interface PostFrontMatter {
  title: string
  description: string
  isPublished: boolean
  keywords: string[]
  createdAt: string
  updatedAt?: string
}

export interface Post extends PostFrontMatter {
  slug: string
}

export const getAllPosts = () => {
  const postsDirectory = join(process.cwd(), "content/blog")
  const slugs = fs.readdirSync(postsDirectory)

  const allPosts = slugs.map((slug) => {
    const fullPath = join(postsDirectory, `${slug}/index.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf-8")
    const { attributes } = fm<PostFrontMatter>(fileContents)

    const formattedCreatedAt = dayjs(attributes.createdAt).format("DD MMM YYYY")
    const formattedUpdatedAt = attributes.updatedAt
      ? dayjs(attributes.updatedAt).format("DD MMM YYYY")
      : null

    return {
      slug,
      ...attributes,
      createdAt: formattedCreatedAt,
      ...(formattedUpdatedAt ? { updatedAt: formattedUpdatedAt } : {}),
    }
  })

  return allPosts
}

export const getAllPublishedPosts = () =>
  getAllPosts().filter((post) => post.isPublished)

export const getMdxBundle = async ({ slug }: { slug: string }) => {
  const postDirectory = join(process.cwd(), `content/blog/${slug}`)
  const postFullPath = join(postDirectory, `index.mdx`)

  const postComponentsFullPath = join(postDirectory, `components`)
  const postComponentsFiles = fs.existsSync(postComponentsFullPath)
    ? fs.readdirSync(postComponentsFullPath)
    : []

  const postComponentsFilesWithSource = postComponentsFiles.reduce<
    Record<string, string>
  >((accum, currentFileName) => {
    const componentFileRelativePath = `./components/${currentFileName}`
    const componentFileFullPath = join(postComponentsFullPath, currentFileName)

    accum[componentFileRelativePath] = fs.readFileSync(
      componentFileFullPath,
      "utf-8"
    )

    return accum
  }, {})

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    )
  }

  const bundleResult = await bundleMDX<PostFrontMatter>({
    file: postFullPath,
    // files: postComponentsFilesWithSource,
    cwd: postDirectory,
    esbuildOptions(options) {
      options.target = ["es2020", "chrome58", "firefox57", "safari11"]
      return options
    },
    mdxOptions(options) {
      const myRehypePlugins = [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight,
      ]
      const myRemarkPlugins = [
        // [massageImageUrl, { slug }],
        remarkUnwrapImages,
        remarkGfm,
      ]

      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...myRemarkPlugins,
      ]

      // @ts-ignore
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...myRehypePlugins,
      ]

      return options
    },
  })

  return bundleResult
}

export const getPostBySlug = async (slug: string) => {
  const { frontmatter, code } = await getMdxBundle({ slug })

  const formattedCreatedAt = dayjs(frontmatter.createdAt).format("DD MMM YYYY")
  const formattedUpdatedAt = frontmatter.updatedAt
    ? dayjs(frontmatter.updatedAt).format("DD MMM YYYY")
    : null

  return {
    slug,
    ...frontmatter,
    createdAt: formattedCreatedAt,
    ...(formattedUpdatedAt ? { updatedAt: formattedUpdatedAt } : {}),
    code,
  }
}
