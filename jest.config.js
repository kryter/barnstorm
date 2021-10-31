const config = {
  verbose: true,
};

module.exports = config;

// Or async function
module.exports = async () => {
  return {
    rootDir: 'src',
    clearMocks: true
  };
};