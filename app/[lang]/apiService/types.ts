type Article = {
  id: string;
  attributes: {
    title: string;
    description: string;
    slug: string;
    updatedAt: string;
    locale: LocaleCode;
    localizations: {
      data: {
        attributes: {
          slug: string;
          locale: LocaleCode;
        };
      };
    };
    cover: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
          width: number;
          height: number;
          formats: {
            small: {
              url: string;
              width: number;
              height: number;
            };
            medium: {
              url: string;
              width: number;
              height: number;
            };
          };
        };
      };
    };
    author: {
      data: {
        attributes: {
          name: string;
          profile_pic: {
            data: {
              attributes: {
                url: string;
                name: string;
                width: number;
                height: number;
              };
            };
          };
        };
      };
    };
  };
};

type SingleArticle = {
  id: string;
  attributes: {
    title: string;
    description: string;
    body: string;
    slug: string;
    updatedAt: string;
    localizations: {
      data: {
        attributes: {
          slug: string;
          locale: LocaleCode;
        };
      }[];
    };
    cover: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
          width: number;
          height: number;
          formats: {
            large: {
              url: string;
              width: number;
              height: number;
            };
            medium: {
              url: string;
              width: number;
              height: number;
            };
          };
        };
      };
    };
    author: {
      data: {
        attributes: {
          name: string;
          bio: string;
          profile_pic: {
            data: {
              attributes: {
                url: string;
                name: string;
                width: number;
                height: number;
              };
            };
          };
        };
      };
    };
  };
};

type Category = {
  attributes: {
    name: string;
    metaDescription: string;
    localizations: {
      data: [
        {
          attributes: {
            name: string;
            locale: LocaleCode;
          };
        }
      ];
    };
  };
};

export type PaginationType = {
  total: number;
  page: number;
  pageCount: number;
};

export type ArticlesDataType = {
  articles: {
    data: Article[];
    meta: { pagination: PaginationType };
  };
};

export type SingleArticleDataType = {
  articles: {
    data: SingleArticle[];
  };
};

export type CategoriesDataType = {
  categories: {
    data: Category[];
  };
};

export type LocaleCode = "en" | "sq";

export type Locales = {
  i18NLocales: {
    data: {
      id: string;
      attributes: {
        name: string;
        code: LocaleCode;
      };
    }[];
  };
};

export type MainPageDataType = {
  mainPage: {
    data: {
      attributes: {
        title: string;
        metaTitle: string;
        metaDescription: string;
      };
    };
  };
};
