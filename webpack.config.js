const path = require('path');

module.exports = {
  entry: './src/index.js',  // نقطه ورود به اپلیکیشن
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],  // پسوندهایی که Webpack به طور خودکار حل می‌کند
  },
  mode: 'development',  // یا 'production' برای نسخه تولید
};
