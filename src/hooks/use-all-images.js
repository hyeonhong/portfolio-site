import { useStaticQuery, graphql } from 'gatsby';
export const useAllImages = () => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          filter: {
            extension: { regex: "/(jpeg|jpg|gif|png)/" }
            sourceInstanceName: { eq: "images" }
          }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                fluid(maxWidth: 2000, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  );
  return allFile.edges;
};
