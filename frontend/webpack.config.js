// eslint-disable-next-line no-undef
config.plugins.push(
    // eslint-disable-next-line no-undef
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(true)
    })
)