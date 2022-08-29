import Head from "next/head"
import React from "react"
import { Layout } from "../components/Layout"
import { Nav } from "../components/Nav"

const CustomNotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <Layout>
        <Nav />
        <div className="prose dark:prose-invert">
          <h1 className="text-3xl">Not Found</h1>
          <p>Oops! We are not able to find the resource you were looking for</p>
        </div>
      </Layout>
    </>
  )
}

export default CustomNotFoundPage
