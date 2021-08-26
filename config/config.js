const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    server: {
      port: 8080,
      hostname: 'localhost',
    },
    database: {
      url: 'mongodb://127.0.0.1:27017/',
    },
  },
};

config[env].isDev = env === 'development';
config[env].isTest = env === 'test';
config[env].isProd = env === 'production';

module.exports = config[env];
