module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      [
          "module:react-native-dotenv",
        {
          "allowUndefined": true,
          "safe": true,
          API_URL: 'https://diploma.isdb-bisew.org/api',
          DEV_API_URL: 'http://192.168.20.231:8001/api'
        }
      ],
      ['react-native-paper/babel']
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
