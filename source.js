const axios = require("axios");

async function getData(page, limit) {
  const config = {
    method: "get",
    url: `https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${page}`,
    headers: {
      Cookie: "PHPSESSID=s8tcefbvcicrtgqh5pqrfmnesj",
    },
  };
  if (page && limit) {
    const response = await axios(config);
    let result = response.data.data.movies;
    for (let i = 0; i < result.length; i++) {
      let movie = {
        title: "" + result[i].title,
        desc: "" + result[i].description_full,
        image: "" + result[i].background_image_original,
        imageSm: "" + result[i].medium_cover_image,
        video: "" + result[i].yt_trailer_code,
        year: "" + result[i].year,
        limit: result[i].runtime,
        genre: result[i].genres,
        limit: result[i].runtime,
        language: "" + result[i].language,
        rating: result[i].rating,
      };
      console.log(movie);
    }
  } else {
    return "parameters are required";
  }
}

module.exports = getData;
