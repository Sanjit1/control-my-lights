const Discord = require("discord.js"); // cheese
require("dotenv/config");
const client = new Discord.Client();
const axios = require('axios');

ip = 'cheese';

client.once('ready', () => {
    console.log('re ady');
});

client.login(process.env.DISCORD_TOKEN);

axios.get('https://discovery.meethue.com/').then(function (response) {
    ip = response.data[0].internalipaddress;
}).catch(function (err) {
    console.error(err);
});

client.on('message', message => {
    console.log(message)
    messageString = message.content;
    if (message.content.startsWith("Sanjit1 »")) {
        messageString = message.content.split("» ").pop();
        console.log(messageString)
    }
    if (message.channel.id == "763986058064822292" || message.channel.id == "752607360077267016" || message.author.id == "542937555251888143" || message.author.id == "775086819775610881") {
        if (messageString.startsWith("l?help")) {
            message.channel.send('First of all im not gonna fucking format this, so If you want me to do that, fuck off.');
            message.channel.send('Is this my light? yes. This can control my room lights. Am I scared? No you are scared.');
            message.channel.send('Next, you can use l?on, to turn my light on, l?off, to turn my light off.');
            message.channel.send('You can use l?bright <brightness> to change the brightness of my light. Ex: l?bright 30');
            message.channel.send('You can use l?color <HSB Color>, to change the color of my light. Ex: l?color 65535 254 254.');
            message.channel.send('WTF is HSB? Go search it up yourself. Also those are the max values you can put.');
        } else if (messageString.startsWith("l?on")) {
            axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true}')
                .then((res) => {
                    if (res.status == 200) {
                        message.channel.send('Ight.')
                    }
                }).catch((err) => {
                    message.channel.send('Fuck that did not work: ' + err.message);
                });
        } else if (messageString.startsWith("l?off")) {
            axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": false}')
                .then((res) => {
                    if (res.status == 200) {
                        message.channel.send('Ight.')
                    }
                }).catch((err) => {
                    message.channel.send('Fuck that did not work: ' + err.message);
                });
        } else if (messageString.startsWith("l?bright")) {
            if (messageString.split(" ").length > 1) {
                axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "bri": ' + Math.round(messageString.split(" ")[1] * 2.54) + '}')
                    .then((res) => {
                        if (res.status == 200) {
                            message.channel.send('Ight.')
                        }
                    }).catch((err) => {
                        message.channel.send('Fuck that did not work: ' + err.message);
                    });
            }
        } else if (messageString.startsWith("l?color")) {
            if (messageString.split(" ").length > 3) {
                axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": ' + Math.round(parseInt(messageString.split(" ")[1])) + ', "sat": ' + Math.round(parseInt(messageString.split(" ")[2])) + ', "bri": ' + Math.round(parseInt(messageString.split(" ")[3])) + "}")
                    .then((res) => {
                        if (res.status == 200) {
                            message.channel.send('Ight.')
                        }
                    }).catch((err) => {
                        message.channel.send('Fuck that did not work: ' + err.message);
                    });
            }
        }
    }
});