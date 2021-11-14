module.exports = {
  pages: {
    index: "src/index.js",
  },
  devServer: {
    clientLogLevel: "warning",
    hot: true,
    contentBase: "dist",
    compress: true,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    publicPath: "/",
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: "/node_modules/",
    },
  },
  lintOnSave: process.env.NODE_ENV !== "production",
  pwa: {
    name: "ERD Mobile",
    themeColor: "#fff",
    msTileColor: "#fff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "dev/sw.js",
      // ...other Workbox options...
    },
  },
  productionSourceMap: false,
  assetsDir: "./assets/",
};
