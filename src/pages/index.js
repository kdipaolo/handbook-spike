import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import slugify from "slugify"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      github {
        infrastructure: repository(name: "infrastructure", owner: "gaslight") {
          object(expression: "master:services") {
            ... on GitHub_Tree {
              id
              entries {
                name
                object {
                  ... on GitHub_Blob {
                    id
                    text
                  }
                }
              }
            }
          }
        }
        handbook: repository(name: "handbook", owner: "gaslight") {
          object(expression: "master:benefits") {
            ... on GitHub_Tree {
              id
              entries {
                name
                object {
                  ... on GitHub_Blob {
                    id
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const slug = text => {
    // const getTitle = text.split("\n")[0].replace(/# /, "")
    return slugify(text.replace(".md", ""), {
      replacement: "-", // replace spaces with replacement
      remove: null, // regex to remove characters
      lower: true, // result in lower case
    })
  }

  const title = text =>
    text
      .split("\n")[0]
      .replace(/# /, "")
      .toLowerCase()

  return (
    <Layout>
      <h1>Services:</h1>
      {data.github.infrastructure.object.entries.map(item => {
        return (
          <Link to={`/content/services/${slug(item.name)}`}>
            <a style={{ display: "block" }} href="">
              {title(item.object.text)}
            </a>
          </Link>
        )
      })}
      <h1>Benefits:</h1>
      {data.github.handbook.object.entries.map(item => {
        return (
          <Link to={`/content/benefits/${slug(item.name)}`}>
            <a style={{ display: "block" }} href="">
              {title(item.object.text)}
            </a>
          </Link>
        )
      })}
    </Layout>
  )
}

export default IndexPage
