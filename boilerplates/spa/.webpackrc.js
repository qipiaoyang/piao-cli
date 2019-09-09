export default {
  "entry": "src/index.js",
  "disableCSSModules": true,
  "theme": "./src/theme.js",
  "publicPath": "/",
  "hash": true,
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "style": true }]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "@babel/transform-runtime"
      ],
      "devtool": "source-map"
    },
    "production": {
      "extraBabelPlugins": [
        "@babel/transform-runtime"
      ]
    }
  },
  "html": {
        "template": "./src/index.ejs"
    },
  "define": {
    "process.env": {},
    "process.env.NODE_ENV": process.env.NODE_ENV,
    "process.env.API_ENV": process.env.API_ENV,
    
  },
  "sass": {}
}
