/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Override the default webpack configuration
    webpack: (config, { isServer }) => {
        // See https://webpack.js.org/configuration/resolve/#resolvealias
        config.resolve.alias = {
            ...config.resolve.alias,
            sharp$: false,
            "onnxruntime-node$": false,
        }
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
            asyncWebAssembly: true,
        }
        config.module.rules.push({
            test: /\.md$/i,
            use: "raw-loader",
        })
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
                // by next.js will be dropped. Doesn't make much sense, but how it is
                fs: false, // the solution
                "node:fs/promises": false,
                module: false,
                perf_hooks: false,
            }
        }
        return config
    },
    // Configures the system headers
    async headers() {
        return [
            //? All routes listed here can be accessed by every origin
            {
                source: "/",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,DELETE,PATCH,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
            //? Here you can add custom origins to allow only some origins to access
            {
                source: "/api/auth/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,DELETE,PATCH,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
