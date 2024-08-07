const articlesQuery = `#graphql
query GetArticles ($categoryName: String, $locale: I18NLocaleCode $page:Int, $pageSize: Int) {
  articles(locale: $locale ,filters: {category: {name: {eq: $categoryName}}}, sort: ["updatedAt:desc"], pagination: {page: $page, pageSize:$pageSize}) {
    data {
      id
      attributes {
        title
        description
        body
        slug
        updatedAt
        locale
        localizations {
          data {
            attributes {
              slug
              locale
            }
          }
        }
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
query GetArticleDetail ($slug:String, $locale:I18NLocaleCode){
  articles(filters: {slug: {eq: $slug}}, locale:$locale) {
    data {
      id
      attributes {
        title
        slug
        description
        body
        createdAt
        updatedAt
        localizations {
          data {
            attributes {
              slug
              locale
            }
          }
        }
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
query GetCategories ($locale: I18NLocaleCode) {
  categories (locale: $locale) {
    data {
      attributes {
        name
        metaDescription
        localizations {
          data {
            attributes {
              name
              locale
            }
          }
        }
      }
    }
  }
}`;

const localesQuery = `#graphql
query GetLocales {
  i18NLocales {
    data {
      id
      attributes {
        name
        code
      }
    }
  }
}`;

const mainPageQuery = `#graphql
query GetMainPageData ($locale: I18NLocaleCode) {
  mainPage (locale: $locale) {
    data {
      attributes {
        title
        metaTitle
        metaDescription
      }
    }
  }
}`;

export {
  articlesQuery,
  singleArticlesQuery,
  categoriesQuery,
  localesQuery,
  mainPageQuery,
};
