const axios = require('axios');

axios.get('http://localhost:3000/5872/abc123')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });