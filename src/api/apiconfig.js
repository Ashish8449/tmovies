const ApiConfig = {
  baseUrl: `https://api.themoviedb.org/3/`,
  apiKey: "70c2c6887c3aabc39030e394366f70a3",
  originalImage: (imagePath) =>
    `https://image.tmdb.org/t/p/original/${imagePath}`,
  W500Image: (imagePath) => `https://image.tmdb.org/t/p/w500/${imagePath}`,
};

export default ApiConfig;
