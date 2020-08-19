/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-favicon',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: `${__dirname}/src`,
        components: `${__dirname}/src/components`,
        pages: `${__dirname}/src/pages`,
        util: `${__dirname}/src/util`,
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/src/data/svgs/`,
          omitKeys: ['xmlnsDc', 'xmlnsCc', 'xmlnsRdf', 'xmlnsSvg', 'xmlnsSodipodi', 'xmlnsInkscape',
            'rdfResource', 'rdfAbout', 'inkscapePageopacity', 'inkscapePageshadow', 'inkscapeWindowWidth',
            'inkscapeWindowHeight', 'inkscapeZoom', 'inkscapeCx', 'inkscapeCy', 'inkscapeWindowX',
            'inkscapeWindowY', 'inkscapeWindowMaximized', 'inkscapeCurrentLayer', 'inkscapeConnectorCurvature',
            'inkscapeVersion', 'sodipodiDocname']
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-175797849-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Defers execution of google analytics script after page load
        defer: true,
      },
    },
  ],
}
