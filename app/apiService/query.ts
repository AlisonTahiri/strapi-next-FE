const articlesQuery = `#graphql
query {
  articles {
    data {
      id
      attributes {
        title
        description
        body
        slug
        publishedAt
        cover {
          data {
            attributes {
              url
              name
              width
              height
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

export { articlesQuery };
