require('dotenv').config()
const path = require(`path`)
const slugify = require("slugify")


exports.createPages = async ({ actions, graphql }) => {
  const tree = `
  object(expression: "master:") {
  ... on GitHub_Tree {
    id
    entries {
      name
      object {
        ... on GitHub_Blob {
          id
          text
          oid
        }
      }
      object {
        ... on GitHub_Tree {
          entries {
            name
            object {
              ... on GitHub_Blob {
                id
                text
                oid
              }
              ... on GitHub_Tree {
                entries {
                  name
                  object {
                    ... on GitHub_Blob {
                      id
                      text
                      oid
                    }
                    ... on GitHub_Tree {
                      entries {
                        name
                        object {
                          ... on GitHub_Blob {
                            id
                            text
                            oid
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`
  const { data } = await graphql(`
    {
      github {
        infrastructure: repository(name: "infrastructure", owner: "gaslight") {
         ${tree}
        }
        handbook: repository(name: "handbook", owner: "gaslight") {
          ${tree}
         }
      }
    }
  `)

  const createPage = (parent, child, blogId, repo) =>
    actions.createPage({
      path: parent ? `content/${parent}/${child}` : `content/${child}`,
      component: path.resolve(`./src/components/testing.js`),
      context: {
        blogId,
        repo,
      },
    })
  const slug = text => {
    // const getTitle = text.split("\n")[0].replace(/# /, "")
    return slugify(text.replace(".md", ""), {
      replacement: "-", // replace spaces with replacement
      remove: null, // regex to remove characters
      lower: true, // result in lower case
    })
  }

  const infrastructure = data.github.infrastructure.object.entries
  const handbook = data.github.handbook.object.entries
  infrastructure.forEach(item => {
    if (item.name === "services") {
      item.object.entries.forEach(item => {
        createPage(
          "services",
          slug(item.name),
          item.object.oid,
          "infrastructure"
        )
      })
    }
  })
  handbook.forEach(item => {
    if (item.name === "benefits") {
      item.object.entries.forEach(item => {
        createPage("benefits", slug(item.name), item.object.oid, "handbook")
      })
    }
  })
}
