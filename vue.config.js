const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const { version, openGzip } = require('./package.json');
module.exports = {
    publicPath: '/',
    assetsDir: 'static',
    outputDir: 'dist',
    lintOnSave: 'error',
    transpileDependencies: ['biyi-admin'],
    productionSourceMap: false,
    devServer: {
        open: false,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        disableHostCheck: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                target: `${process.env.VUE_APP_BASE_API}`,
                changeOrigin: true,
                // ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        config.entry('main').add('babel-polyfill');
        config.resolve.symlinks(true);
        config.resolve.alias
            .set('@', path.resolve(__dirname, './src'))
            .set('@assets', path.resolve(__dirname, './src/assets'))
            .set('@components', path.resolve(__dirname, './src/components'))
            .set('@views', path.resolve(__dirname, './src/views'))
            .set('@layouts', path.resolve(__dirname, './src/layouts'))
            .set('@utils', path.resolve(__dirname, './src/utils'));
    },

    configureWebpack: config => {
        console.log(isProduction);
        if (isProduction) {
            config.mode = 'production';

            if (openGzip) {
                config.plugins.push(
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: /\.js$|\.html$|.\css/, // 匹配文件名
                        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                        deleteOriginalAssets: false // 删除原文件
                    })
                );

                // 将每个依赖包打包成单独的js文件
                Object.assign(config, {
                    performance: {
                        hints: 'error',
                        maxEntrypointSize: 10000000,
                        maxAssetSize: 30000000
                    },
                    output: {
                        ...config.output,
                        filename: `static/js/[name].[chunkhash].${version}.js`,
                        chunkFilename: `static/js/[name].[chunkhash].${version}.js`
                    },
                    optimization: {
                        minimizer: [
                            new TerserPlugin({
                                cache: true, // 是否缓存
                                // paraller: true, // 是否并行打包
                                sourceMap: true,
                                terserOptions: {
                                    compress: {
                                        pure_funcs: ['console.log']
                                    }
                                }
                            })
                        ]
                    }
                });
            }
        } else {
            config.mode = 'development';
        }
    },
    css: {
        extract: false,
        sourceMap: false,
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
            css: {},
            postcss: {}
        },
        requireModuleExtension: true
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    pluginOptions: {}
};