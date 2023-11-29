const axios = require('axios');
modules.export = async function addLift(lift_name, sets, reps, weight, baseUrl){
    await axios.post(`/${baseUrl}/lift`, {
        lift_name: `${lift_name}`,
        reps: `${reps}`,
        sets: `${sets}`,
        weight: `${weight}`
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}