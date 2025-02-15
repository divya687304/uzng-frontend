module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://uzng-service-status.srisankaranarayana-muralidaran.svc.cluster.local',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
  