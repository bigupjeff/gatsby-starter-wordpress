/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  /**
   * Adding plugins to this array adds them to your Gatsby site.
   *
   * Gatsby has a rich ecosystem of plugins.
   * If you need any more you can search here: https://www.gatsbyjs.com/plugins/
   */
  plugins: [
    {
		/**
		 * First up is the WordPress source plugin that connects Gatsby
		 * to your WordPress site.
		 *
		 * visit the plugin docs to learn more
		 * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
		 *
		 */
		resolve: `gatsby-source-wordpress`,
		options: {
			// the only required plugin option for WordPress is the GraphQL url.
			url: process.env.WP_GRAPHQL_ENDPOINT_URL,
			auth: {
				// Only required if your WordPress site is behind Basic Auth.
				htaccess: {
					username: process.env.HTTPBASICAUTH_USERNAME,
					password: process.env.HTTPBASICAUTH_PASSWORD,
				}
			},
			html: {
				// Causes the source plugin to find/replace images in html with Gatsby images.
				useGatsbyImage: true,
				// Determines the image quality that Sharp will use when generating inline html
				// image thumbnails.
				imageQuality: 90,
				// When this is true, any url's which are wrapped in "", '', or () and which
				// contain /wp-content/uploads will be transformed into static files and the
				// url's will be rewritten. 
				createStaticFiles: true,
				// When this is true, .webp images will be generated for images in html fields
				// in addition to the images gatsby-image normally generates.
				generateWebpImages: true,
				// This can be either "blurred" or "dominantColor". This is the type of
				// placeholder image to be used in Gatsby Images in HTML fields.
				placeholderType: "blurred",
			},
		},
    },

    /**
     * We need this plugin so that it adds the "File.publicURL" to our site
     * It will allow us to access static url's for assets like PDF's
     *
     * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },

    /**
     * The following two plugins are required if you want to use Gatsby image
     * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
     * if you're curious about it.
     */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
		// See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
		resolve: `gatsby-plugin-manifest`,
		options: {
			name: `Gatsby Starter WordPress Blog`,
			short_name: `GatsbyJS & WP`,
			start_url: `/`,
			background_color: `#ffffff`,
			theme_color: `#663399`,
			display: `minimal-ui`,
			icon: `content/assets/gatsby-icon.png`,
		},
    },

    // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
    `gatsby-plugin-react-helmet`,

    /**
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.dev/offline
     */
    // `gatsby-plugin-offline`,
  ],
}
