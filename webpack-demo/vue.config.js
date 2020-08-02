const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = {
    publicPath:"/dist", // 设置应用的目录 可以改成 app myapp 等 对应的是服务器下的目录
    productionSourceMap: false, // 生成生产版本的时候 关闭 源码映射
    configureWebpack: smp.wrap({
        // https://webpack.js.org/configuration/devtool/#development
        // 修改source map
        // devtool:"eval-source-map",
        plugins: [
        ]
    }),
    chainWebpack: config => {
        // 代码最小化处理
        config.optimization.minimize(true);
        // 使用splitChunks进行代码分割
        config.optimization.splitChunks({
            // // include all types of chunks
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'my-chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // only package third parties that are initially dependent
                }
            }
        })
        // 提取公用代码, 使用免费的cdn资源
        config.externals({
            vue: 'Vue',
            vuex: 'Vuex',
            'vue-router': "VueRouter",
             'element-ui': "'element-ui'",
        })
    }
}

