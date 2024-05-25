module.exports = {
  apps: [
    {
      name: "postcraft",
      script: "dist/app.js",
      watch: true,
      env_dev: {
        NODE_ENV: "dev",
      },
      env_prod: {
        NODE_ENV: "prod",
      }
    },
  ],
};
