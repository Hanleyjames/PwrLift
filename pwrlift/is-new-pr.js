const axios = require('axios');
module.exports = async function isNewPR(lift_name, pounds, baseUrl) {
    let bool = false;
    await axios.get(`${baseUrl}/pr`).then( res=>{
        const lifts = res.data;
        for(lift of lifts){
            if(lift.lift_name == lift_name && lift.pounds < pounds){
                bool = true;
                break;
            }
        }
        
    }).catch(err => {
        console.log('Error: ', err.message);
      });
    return bool;
}