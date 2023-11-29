const axios = require('axios');
module.exports = async function addLift(lift_name, sets, reps, pounds, baseUrl){
    await axios.post(`${baseUrl}/lift`, {
        lift_name: `${lift_name}`,
        reps: `${reps}`,
        sets: `${sets}`,
        pounds: `${pounds}`
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}