import { graphql } from "gatsby"
import React from "react"
import ReactMarkdown from "react-markdown"

export default ({ data }) => {
  const markdown = data.github.repository.object.text
  return <ReactMarkdown source={markdown} />
}

export const query = graphql`
  query($blogId: GitHub_GitObjectID!, $repo: String!) {
    github {
      repository(name: $repo, owner: "gaslight") {
        object(expression: "master:services", oid: $blogId) {
          ... on GitHub_Blob {
            id
            text
          }
        }
      }
    }
  }
`
