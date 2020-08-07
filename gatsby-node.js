/*
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [`${__dirname}/src`, "node_modules"],
    },
  })
}
*/

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /ScrollMagic/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
