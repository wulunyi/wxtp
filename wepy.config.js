const path = require('path');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  cliLogs: true,
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js'),
      resolve: {
        aliasFields: ['browser']
      }
    }
  },
  resolve: {
    alias: {
      service: path.join(__dirname, 'src/service')
      // app: path.join(__dirname, 'src/app'),
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    pug: {
      pretty: true
    },
    less: {
      compress: true
    },
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-export-extensions',
        'syntax-export-extensions',
        'transform-object-rest-spread'
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
};

if (prod) {
  delete module.exports.compilers.babel.sourcesMap;

  // 压缩sass
  module.exports.compilers['sass'] = {outputStyle: 'compressed'};

  // 压缩less
  module.exports.compilers['less'] = {compress: true};

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    },
    autoprefixer: {
      filter: /\.(wxss|css)$/,
      config: {
        browsers: ['last 11 iOS versions']
      }
    }
  };
}
