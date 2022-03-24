const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  entry: {
    index: "./src/index.js", // File đầu vào
    signIn: "./src/sign-in.js",
    signUp: "./src/sign-up.js",
    404: "./src/404.js", 
    main: "./src/main.js",
    tables: "./src/tables.js",
    addKnife: "./src/add-knife.js",
    updateKnife: "./src/update-knife.js",
  },
  output: {
    // File đầu ra
    filename: "[name]_bundle.min.js", // Tên file đầu ra
    path: path.resolve(__dirname, "build/script"), // Nơi chưa file đầu ra
    // clean: true,
  },
  mode: "development",
  devServer: {
    static: "./build",
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "../index.html",
      template: "public/index.html",
      inject: false,
      // publicPath: "build",
    }),
    new HtmlWebpackPlugin({
      filename: "../sign-in.html",
      template: "public/sign-in.html",
      inject: false,

    }),
    new HtmlWebpackPlugin({
      filename: "../sign-up.html",
      template: "public/sign-up.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: "../404.html",
      template: "public/404.html",
      inject: false, 
    }),
    new HtmlWebpackPlugin({
      filename: "../admin/tables.html",
      template: "public/admin/tables.html",
      inject: false, 
    }),
    new HtmlWebpackPlugin({
      filename: "../admin/add-knife.html",
      template: "public/admin/add-knife.html",
      inject: false, 
    }),
    new HtmlWebpackPlugin({
      filename: "../admin/update-knife.html",
      template: "public/admin/update-knife.html",
      inject: false, 
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets", to: "../assets"}
      ]
    }),
    
  ],
  // optimization: {
  //   // Code spliting
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
};

module.exports = config;
