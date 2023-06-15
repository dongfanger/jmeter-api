const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true,
      },
    }
  }
}