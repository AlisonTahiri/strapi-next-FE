const articlesQuery = `#graphql
query GetArticles ($categoryName: String, $page:Int, $pageSize: Int) {
  articles(filters: {category: {name: {eq: $categoryName}}}, sort: ["updatedAt:desc"], pagination: {page: $page, pageSize:$pageSize}) {
    data {
      id
      attributes {
        title
        description
        body
        slug
        updatedAt
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
        category {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageCount
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

const categoriesQuery = `#graphql
query {
  categories {
    data {
      attributes {
        name
      }
    }
  }
}
`;

export { articlesQuery, singleArticlesQuery, categoriesQuery };
