module.exports = {
   siteMetadata: {
      title: 'Aurelio De Rosa'
   },
   plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-transformer-yaml',
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
      {
         resolve: 'gatsby-plugin-google-analytics',
         options: {
            trackingId: 'UA-6265682-14',
            head: false,
         }
      },
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            name: 'src',
            path: `${__dirname}/src`,
         }
      },
      {
         resolve: 'gatsby-plugin-manifest',
         options: {
            name: 'Aurelio De Rosa',
            short_name: 'Audero',
            description: "Aurelio De Rosa's website",
            start_url: '/',
            background_color: '#FFFFFF',
            theme_color: '#F8F9FA',
            display: 'minimal-ui',
            icon: 'static/images/audero-logo.png',
         },
      },
      'gatsby-plugin-offline',
      {
         resolve: 'gatsby-plugin-sass',
         options: {
            precision: 8
         }
      }
   ]
};
