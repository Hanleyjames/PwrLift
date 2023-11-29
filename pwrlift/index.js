const baseUrl = 'https://portfolio-api.alwaysdata.net/api';
const util = require('util');
const sbus = require('./azure-servicebus-message');
const isNewPR = require('./is-new-pr');
const generateMessage = require('./message-generation');
const azureServicebusMessage = require('./azure-servicebus-message');

module.exports = async function (context, req) {
    context.log('PwrLift HTTP trigger function processed a request.');
    try{
        let message = '';
        const bodyCount = req.body instanceof Array;
        if(bodyCount){
            for(lift in req.body){
                const lift_name = (req.query.lift_name || (req.body && req.body.lift_name));
                const weight = (req.query.weight || (req.body && req.body.weight));
                const sets = (req.query.sets || (req.body && req.body.sets));
                const reps = (req.query.reps || (req.body && req.body.reps));
                const isPR = await isNewPR(lift_name, weight, baseUrl);
            
                message += generateMessage(reps, sets, lift_name, weight, isPR, baseUrl);
            }
        }else{
            const lift_name = (req.query.lift_name || (req.body && req.body.lift_name));
            const weight = (req.query.weight || (req.body && req.body.weight));
            const sets = (req.query.sets || (req.body && req.body.sets));
            const reps = (req.query.reps || (req.body && req.body.reps));
            const isPR = await isNewPR(lift_name, weight, baseUrl);
        
            message += generateMessage(reps, sets, lift_name, pounds, isPR, baseUrl);
        }

        const queueResponse = await azureServicebusMessage(process.env.connectionString || process.env["connectionString"],
        process.env.queueName || process.env["queueName"], message);

        
    
        context.res = {
            isInQueue: queueResponse,
            body: message
        };
    }
    catch(e){
        context.res = {
            status: 500,
            body: e
        }
    }

}

