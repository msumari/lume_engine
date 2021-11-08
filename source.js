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
      console.log(result[i].title);
    }
  } else {
    return "parameters are required";
  }
}

module.exports = getData;
