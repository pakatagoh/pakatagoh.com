import React from "react"
import Image from "next/image"
import { AnchorOrLink, Layout, Nav, HeadWithMetaTags } from "../components"
import pgFsaeImage from "../public/images/about/pg-fsae.jpg"
import pgPhotographyImage from "../public/images/about/pg-photography.jpg"

const AboutPage = () => {
  return (
    <>
      <HeadWithMetaTags
        title="Pakata Goh"
        description="Software developer from sunny Singapore. Find out more about me here!"
        imagePath="/images/meta/pakata-headshot.jpeg"
      ></HeadWithMetaTags>
      <Layout>
        <Nav />
        <main>
          <h1 className="mb-6 text-3xl font-bold">About me</h1>
          <div className="prose w-full max-w-none space-y-4 dark:prose-invert">
            <section className="text-gray-700 dark:text-gray-300">
              <h2 className="">Pakata Goh</h2>
              <p>
                Born in 1990 and raised in sunny Singapore. If you&apos;re
                wondering why my name sounds strange, it&apos;s because
                it&apos;s a Buddhist name. I&apos;m Singaporean Chinese. I
                attended the National University of Singapore (NUS) and
                graduated with a degree in mechanical engineering in 2015.
                During university, I was part of the NUS Formula Student team
                competing in the Formula Student (FSAE) Michigan competiton.
              </p>
              <p>
                In July 2018, I decided to leave my job as a technical sales
                engineer in the industrial sector to pursue software development
                as a career. As I was learning, I completed the #100DaysOfCode
                challenge and managed to secure an internship as a junior
                developer. In Feb 2019, I joined a bootcamp conducted by
                ThoughtWorks (Singapore).
              </p>
              <p>
                I&apos;ve learnt a lot, both during my time of self-learning and
                during the bootcamp. I decided to create this website to further
                document my journey as a developer and to also share the
                knowledge I have gained thus far.
              </p>
              <p>
                In my free time, I dabble in a little photography. I love cars
                and I keep up with Formula 1 during race weekends.
              </p>
              <div className="flex flex-col items-stretch gap-8 sm:flex-row sm:justify-between sm:gap-10">
                <div className="sm:flex-1">
                  <div className="aspect-w-3 aspect-h-3 relative overflow-hidden">
                    <Image
                      src={pgFsaeImage}
                      alt="nus formula student"
                      fill
                      priority
                      placeholder="blur"
                      className="m-0"
                    />
                  </div>
                </div>
                <div className="hidden sm:block sm:flex-1">
                  <div className="aspect-w-3 aspect-h-3 relative overflow-hidden">
                    <Image
                      src={pgPhotographyImage}
                      alt="photography"
                      priority
                      placeholder="blur"
                      className="m-0"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2>Talks</h2>
              <ul>
                <li>
                  <AnchorOrLink
                    href="https://www.youtube.com/watch?v=7tcf20ItkA0"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Hooked on Hooks: Intro to React Hooks"
                  >
                    Hooked on Hooks: Intro to React Hooks
                  </AnchorOrLink>
                </li>
              </ul>
            </section>

            <section className="text-gray-700 dark:text-gray-300">
              <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
                Education
              </h2>
              <ul className="list-disc">
                <li>
                  Bachelors of Engineering (Mechanical Engineering) - National
                  University of Singapore
                </li>
              </ul>
            </section>
            <section className="text-gray-700 dark:text-gray-300">
              <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
                Hobbies
              </h2>
              <ul className="list-disc">
                <li>Photography</li>
                <li>Formula 1</li>
              </ul>
            </section>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default AboutPage
