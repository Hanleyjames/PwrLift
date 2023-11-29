const { ServiceBusClient } = require("@azure/service-bus");
module.exports = async function azServiceBus(connectionString, queueName, message){
    let didSend = false;
    const msg = {body: `${message}`};
    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(queueName);
    try{
        await sender.sendMessages(msg);
        console.log(`Message added to queue: ${queueName}`);
        await sender.close();
    }catch(e){
        console.log(e);
    }finally{
        didSend = true;
        await sbClient.close();
    }
    return didSend;
}