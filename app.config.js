const withWasm = require('./withWasm')
const path = require('path')

module.exports = withWasm({
    expo: {
      name: "react-native-wasm",
      slug: "react-native-wasm",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      updates: {
        fallbackToCacheTimeout: 0
      },
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#FFFFFF"
        }
      },
      web: {
        favicon: "./assets/favicon.png"
      }
    },
    withWasm: {
      crateDirectory: path.resolve(__dirname, "wasm2js")
    } 
})
  