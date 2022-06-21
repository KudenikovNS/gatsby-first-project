import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  /* Внесли конст nodes */
  const { nodes } = data.allMarkdownRemark
  return (
    <Layout>
      <Seo title="Home" />
      <h1>
        Welcome to <b>Gatsby!</b>
      </h1>
      {/* Добавление собственных ссылок */}
      <div className="posts">
        {nodes.map(post => {
          const { category, title, url, image } = post.frontmatter
          const img = getImage(image)
          return (
            <div key={post.id} className="post">
              <GatsbyImage image={img} alt={title} />
              <Link to={`/${category}/${url}`}>{title}</Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage

/* Информация из GraphQL */
export const query = graphql`
  query MainPage {
    allMarkdownRemark {
      nodes {
        frontmatter {
          category
          title
          url
          image {
            childImageSharp {
              gatsbyImageData(
                width: 200
                formats: [AUTO, AVIF]
                placeholder: BLURRED
              )
            }
          }
        }
        id
      }
    }
  }
`
