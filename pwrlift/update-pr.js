const axios = require('axios');
exports.module = async function udatePr(lift, pounds, baseUrl){
    await axios.put(`/${baseUrl}/pr`, {
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