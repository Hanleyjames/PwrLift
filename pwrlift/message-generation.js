const updatePr = require('./update-pr');
const addLift = require('./add-lift');
module.exports = async function generateMessage(reps, sets, lift_name, pounds, isPR, baseUrl){
    if(reps == 1 && sets == 1 && isPR){
        await updatePr(lift_name, pounds, baseUrl);
        return `New 1RM PR: ${lift_name} @ ${pounds}\n`;
    } else {
        await addLift(lift_name, sets, reps, pounds, baseUrl);
        return `${lift_name}: ${sets}x${reps} @ ${pounds}.`
    }
}