const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query Posts {
      allMarkdownRemark {
        nodes {
          frontmatter {
            url
            category
          }
        }
      }
    }
  `)

  data.allMarkdownRemark.nodes.forEach(node => {
    const { url, category } = node.frontmatter
    actions.createPage({
      path: `/${category}/${url}`,
      component: path.resolve("./src/templates/using-dsg.js"),
      context: { url },
    })
  })
}
