const articlesQuery = `#graphql
query {
  articles {
    data {
      id
      attributes {
        title
        description
        slug
        publishedAt
        cover {
          data {
            attributes {
              url
              name
              width
              height
              formats
            }
          }
        }
        author {
          data {
            attributes {
              name
              profile_pic {
                data {
                  attributes {
                    url
                    name
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

const singleArticlesQuery = `#graphql
query GetArticleDetail($slug:String){
  articles(filters: {slug: {eq: $slug}}) {
    data {
      id
      attributes {
        title
        slug
        description
        body
        createdAt
        updatedAt
        cover {
          data {
            attributes {
              alternativeText
              url
              width
              height
              formats
            }
          }
        }
        author {
          data {
            attributes {
              name
              bio
              profile_pic {
                data {
                  attributes {
                    url
                    name
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export { articlesQuery, singleArticlesQuery };
