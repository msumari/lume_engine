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
      let movie = JSON.stringify({
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
      });

      const config2 = {
        method: "post",
        url: "http://lume-engine.herokuapp.com/api/movie",
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODAwNGJiZTZlNGU1NmZhN2UwNzE4NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjM3NTE3NywiZXhwIjoxNjM2ODA3MTc3fQ.KmsoTOJOuyrY1L6cRO_kqT6cWsXZuvWT4pNJusc8TFc",
          "Content-Type": "application/json",
        },
        data: movie,
      };
      await axios(config2)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log("complete");
  } else {
    return "parameters are required";
  }
}

module.exports = getData;
