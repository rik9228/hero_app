module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.module.rules.delete("eslint");
  },
  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true
      }
    }
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/hero_app/" //任意
      : "/"
};
