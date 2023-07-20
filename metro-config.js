const path = require("path");
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
      resolveRequest: (context, moduleName, platform) => {
        // use a custom path instead of a relative import to load the mini manifest
        if (moduleName === "minis:manifest") {
          const manifestPath = path.join(process.cwd(), "src", "manifest.json");
          try {
            return {
              filePath: require.resolve(manifestPath),
              type: "sourceFile",
            };
          } catch (err) {
            // This shouldn't really happen, the CLI would explode before actually launching metro.
            console.warn(`Your manifest file could not be found in path ${manifestPath}`);
            return { type: "empty" };
          }
        }

        // Chain to the standard Metro resolver for modules other than the manifest.
        return context.resolveRequest(context, moduleName, platform);
      },
    },
  };
};
