export type Article = {
  id: string;
  attributes: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
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

export type SingleArticle = {
  id: string;
  attributes: {
    title: string;
    description: string;
    body: string;
    slug: string;
    publishedAt: string;
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
