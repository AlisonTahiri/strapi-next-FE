export type Article = {
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
          name: string;
          width: number;
          height: number;
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
