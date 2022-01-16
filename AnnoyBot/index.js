const { strictEqual } = require('assert');
const mineflayer = require('mineflayer')
const net = require('net');

const bot = mineflayer.createBot({
  host: 'mc.hypixel.net',
  username: 'annoyv2bot@gmail.com',
  //password: 'Annoybot123!',
  version: "1.16.5",
  auth: 'microsoft'
})

const { mineflayer: mineflayerViewer } = require('prismarine-viewer');
const { stringify } = require('querystring');
bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 25565, firstPerson: false }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
  onJoin()
})

//On chat message in chat:
bot.on('message', (message, jsonMSG) => {
  var msg = message.toString()
  //console.log("CHAT MESSAGE: " + msg)
  //Handle limbo:
  if (msg.startsWith("/limbo for more information")){
    sendSocket("inLimbo")
    return;
  }

  //Handle regular message:
  sendSocket(msg)
})

bot.on('login', () => console.log("Mineflayer has logged in"));
bot.on('error', (error) => {
  console.error(`Error: ${error}.\nRestarting...`);
  setTimeout(() => process.exit(code = 1), 15 * 1000);
});

bot.on('kicked', (reason) => {
  console.error(`Kicked: ${reason}.\nRestarting...`);
  setTimeout(() => process.exit(code = 2), 15 * 1000);
});

function onJoin() {
  console.log("Going to limbo...")
  for (let i=0; i<20; i++) {
    setTimeout(() => bot.chat("/"), 500);
  }
  

  require('net').createServer(function (socket) {
    socket.on('data', function (data) {
        console.log("RECEIVED: " + data.toString());

        //If discord bot requests load:
        if (data.toString() == "checkForResponse") {
            
        }
        else {
          bot.chat(data.toString())
        }
    });
})

.listen(6000);

setTimeout(() => process.exit(code = 3), 24 * 60 *60 * 1000);
}

function sendSocket(msg) {
  //console.log("SENDING: " + msg)
  var client = new net.Socket();
  client.connect(4999, '127.0.0.1', function() {
    client.write(msg);
    client.destroy();
    //console.log("SENT: " + msg)
  });
  //console.log("Finished Sending.")
}