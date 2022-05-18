const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "70c2c6887c3aabc39030e394366f70a3",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
