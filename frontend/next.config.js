module.exports = {
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            '/': { page: '/' },
            '/Login': { page: '/Login' },
            '/Profile': { page: '/Profile' },
            '/Reserve': { page: '/Reserve' },
        }
    },
    env: {
        dev: "http://localhost",
        production: ""
    }
}