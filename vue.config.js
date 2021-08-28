// const webpack = require("webpack");
const path = require('path');
const resolve = dir => {
  return path.join(__dirname, dir);
};
const isProduction = process.env.NODE_ENV === 'production';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
// Generate pages object
const pagesObj = {};
const chromeName = ['popup', 'options'];

// const cdn = {
//   css: [
//     // 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css',
//     // 'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.6.3/antd.min.css'
//   ],
//   js: [
//     "https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js",
//     "https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js",
//     "https://cdn.bootcdn.net/ajax/libs/qs/6.9.4/qs.min.js",
//     "sakdlskd",
//   ],
// };

const externals = {
  vue: 'Vue',
  echarts: 'echarts',
  axios: 'axios',
  qs: 'Qs'
};

// 为每个 .vue 文件引入公共样式
const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('./src/assets/sass/common/index.sass'),
        resolve('./src/assets/sass/architecture/index.sass'),
        resolve('./src/assets/sass/global/index.sass')
      ]
    });
};

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`
  };
});

// 生成manifest文件
const manifest =
  process.env.NODE_ENV === 'production'
    ? {
        from: path.resolve('src/manifest.production.json'),
        to: `${path.resolve('dist')}/manifest.json`
      }
    : {
        from: path.resolve('src/manifest.development.json'),
        to: `${path.resolve('dist')}/manifest.json`
      };
const plugins = [CopyWebpackPlugin([manifest])];

// 开发环境将热加载文件复制到dist文件夹
if (!isProduction) {
  plugins.push(
    CopyWebpackPlugin([
      {
        from: path.resolve('src/utils/hot-reload.js'),
        to: path.resolve('dist/js')
      }
    ])
  );
} else {
  plugins.push(
    new ZipPlugin({
      path: path.resolve('dist'),
      filename: '多兔助手.zip'
    }),
    CopyWebpackPlugin([
      {
        from: path.resolve('src/utils/init.js'),
        to: path.resolve('dist/js')
      },
      {
        from: path.resolve('src/assets/js/common/axios.min.js'),
        to: path.resolve('dist/js')
      },
      {
        from: path.resolve('src/assets/js/common/vue.min.js'),
        to: path.resolve('dist/js')
      },
      {
        from: path.resolve('src/assets/js/common/echarts.min.js'),
        to: path.resolve('dist/js')
      },
      {
        from: path.resolve('src/assets/js/common/qs.min.js'),
        to: path.resolve('dist/js')
      }
    ]),
    new JavaScriptObfuscator(
      {
        // 压缩代码
        compact: true,
        // 是否启用控制流扁平化(降低1.5倍的运行速度)
        controlFlowFlattening: true,
        // 应用概率;在较大的代码库中，建议降低此值，因为大量的控制流转换可能会增加代码的大小并降低代码的速度。
        controlFlowFlatteningThreshold: 0.75,
        // 随机的死代码块(增加了混淆代码的大小)
        deadCodeInjection: true,
        // 死代码块的影响概率
        deadCodeInjectionThreshold: 0.4,
        // 此选项几乎不可能使用开发者工具的控制台选项卡
        debugProtection: false,
        // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
        debugProtectionInterval: false,
        // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
        disableConsoleOutput: true,
        // 标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        // 是否启用全局变量和函数名称的混淆
        renameGlobals: false,
        // 通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
        rotateStringArray: true,
        // 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
        selfDefending: true,
        // 删除字符串文字并将它们放在一个特殊的数组中
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        transformObjectKeys: false,
        // // 允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
        unicodeEscapeSequence: false
      },
      []
    )
  );
}
module.exports = {
  pages: pagesObj,
  // // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      content: './src/content/index.js',
      background: './src/background/index.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'img-loader', //配置图片资源加载器，用于图片压缩
              options: {
                plugins: [
                  //给图片资源加载配置插件
                  require('imagemin-pngquant')({
                    //用于图片压缩的imagemin-pngquant，还有一个隐式调用的加载器imagemin-loader
                    // quality: [0.3, 0.5], //图片压缩30%~50%
                  })
                ]
              }
            }
          ]
        }
      ]
    }
  },
  css: {
    // requireModuleExtension: true,
    extract: {
      filename: 'css/[name].css'
      // chunkFilename: 'css/[name].css'
    }
  },
  chainWebpack: config => {
    if (process.env.npm_config_report) {
      // 在运行命令中添加 --report参数运行， 如：npm run build --report
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
    if (isProduction) {
      config.externals(externals);
    }

    // 添加 公共样式文件 到 每个组件
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type =>
      addStyleResource(config.module.rule('sass').oneOf(type))
    );
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@a', resolve('src/assets'))
      .set('@u', resolve('src/utils'))
      .set('@img', resolve('src/assets/img'))
      .set('@js', resolve('src/assets/js'))
      .set('@config', resolve('src/config'))
      .set('@api', resolve('src/api'))
      .set('@archInterface', resolve('src/interface/architecture'))
      .set('@bizInterface', resolve('src/interface/business'))
      .set('@globalInterface', resolve('src/interface/global'))
      .set('@bizCmp', resolve('src/components/business'))
      .set('@globalCmp', resolve('src/components/global'))
      .set('@mixins', resolve('src/mixins'))
      .set('@globalMixins', resolve('src/mixins/global'))
      .set('@archSass', resolve('src/assets/sass/architecture'))
      .set('@globalSass', resolve('src/assets/sass/global'));
  }
};
