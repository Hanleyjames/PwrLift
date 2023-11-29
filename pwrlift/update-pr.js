const axios = require('axios');
module.exports = async function updatePr(lift, pounds, baseUrl){
    await axios.put(`${baseUrl}/pr`, {
        lift_name: `${lift}`,
        pounds: `${pounds}`
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}