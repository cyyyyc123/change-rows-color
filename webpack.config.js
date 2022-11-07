const path = require('path')

// 1.导入html-webpack-plugin这个插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')
// 2.new构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
    // 指定要复制哪个页面
    template: './src/index.html',
    // 指定复制出来的文件名和存放路径，放在内存中
    filename: './index.html'
})

// 1、按需导入插件、得到插件的构造函数之后，创建插件的实例对象
// 左侧的{}是解构赋值
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')
const cleanWebpackPlugin = new CleanWebpackPlugin()

// 使用Node.js中的到处语法，向外导出一个webpack的配置对象
module.exports = {
    // 代表webpack运行的模式，可选值有两个development和production
    // 结论：开发时候一定要用development，因为追求的是打包的速度，而不是体积；
    // 反过来，发布上线的时候一定能要用production，因为上线追求的是体积小，而不是打包速度快！
    mode: 'development',
    // eval-source-map仅限在“开发模式”下使用，不建议在“生产模式”下使用
    // 此选项生成的Source Map能够保证“运行时报错的行数”与“源代码的行数”保持一致
    // 在开发调试阶段，建议大家都把devtool的值设置为eval-source-map
    // devtool: 'eval-source-map',
    // 在实际发布的时候，建议大家把devtool的值设置为nosources-source-map或直接关闭SourceMap
    // devtool: 'nosources-source-map',
    devtool: 'source-map',
    // mode: 'production',
    // entry：'指定要处理哪个文件'
    entry: path.join(__dirname, './src/index1.js'),
    // 指定生成文件要存放到哪里
    output: {
        // 存放的目录
        path: path.join(__dirname, 'dist'),
        // 生成的文件名
        filename: 'js/bundle.js'
    },
    // 3.插件的数组，把创建的插件实例对象接收到plugins节点中,将来webpack在运行时，会加载并调用这些插件
    plugins: [htmlPlugin, cleanWebpackPlugin],
    devServer: {
        open: true, // 初次打包完成后，自动打开浏览器
        port: 80, // 实时打包所使用的端口号，在http协议中，如果端口号是80，则可以被省略
        host: '127.0.0.1' // 实时打包所使用的主机地址
        // GET 200需要输入以下代码解决
        // static: {
        //     directory: path.join(__dirname, './'),
        //     watch: true
        // }
    },
    module: { //所有第三方文件模块的匹配规则
        rules: [ // 文件后缀名的匹配规则
            // 定义了不同模块对应的loader
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 处理.less文件的loader
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            // 如果需要调用的loader只有一个，则只传递一个字符串也行，如果有多个loader，则必须指定数组
            // 在配置url-loader的时候，多个参数之间，使用&符号进行分隔
            { test: /\.jpg|png|gif$/, use: 'url-loader?limit=370&outputPath=images' },
            // 使用babel-loader处高级的js语法
            // 在配置babel0loader的时候，程序员只需要把自己的代码进行转换即可，一定要排除node_modules目录中的JS文件
            // 因为第三方包中的JS兼容性，不需要程序员关心
            // 注意：必须使用exclude指定排除项，因为node_modules目录下的第三方包不需要被打包
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        alias: {
            // 告诉webpack，程序员写的代码中，@符号表示src这一层目录
            '@': path.join(__dirname, './src/')
        }
    }
}