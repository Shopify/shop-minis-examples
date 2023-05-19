const { getDefaultConfig } = require("metro-config");

module.exports.getMinisMetroConfig = async function getMinisMetroConfig() {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    server: {
      port: 8082,
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
      platforms: ["ios", "android"],
    },
  };
};
