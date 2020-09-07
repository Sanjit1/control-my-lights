const Discord = require("discord.js"); // cheese
require("dotenv/config");
const client = new Discord.Client();
const axios = require('axios');

client.once('ready', () => {
    console.log('ready');
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', message => {
    if (message.content.startsWith("l?help")) {
        message.channel.send('First of all im not gonna fucking format this, so If you want me to do that, fuck off.');
        message.channel.send('Next, you can use l?on, to turn my light on, l?off, to turn my light off.');
        message.channel.send('You can use l?bright <brightness> to change the brightness of my light. Ex: l?bright 30');
        message.channel.send('You can use l?color <HSB Color>, to change the color of my light. Ex: l?color 65535 254 254.');
        message.channel.send('WTF is HSB? Go search it up yourself. Also those are the max values you can put.');
    } else if (message.content.startsWith("l?on")) {
        axios.put('http://192.168.68.100/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true}')
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    message.channel.send('Ight.')
                }
            }).catch((err) => {
                message.channel.send('Fuck that did not work: ' + err.message);
            });
    } else if (message.content.startsWith("l?off")) {
        axios.put('http://192.168.68.100/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": false}')
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    message.channel.send('Ight.')
                }
            }).catch((err) => {
                message.channel.send('Fuck that did not work: ' + err.message);
            });
    } else if (message.content.startsWith("l?bright")) {
        if (message.content.split(" ").length > 1) {
            axios.put('http://192.168.68.100/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"bri": ' + Math.round(message.content.split(" ")[1] * 2.54) + '}')
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        message.channel.send('Ight.')
                    }
                }).catch((err) => {
                    message.channel.send('Fuck that did not work: ' + err.message);
                });
        }
    } else if (message.content.startsWith("l?color")) {
        if (message.content.split(" ").length > 3) {
            axios.put('http://192.168.68.100/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"hue": ' + Math.round(parseInt(message.content.split(" ")[1])) + ', "sat": ' + Math.round(parseInt(message.content.split(" ")[2])) + ', "bri": ' + Math.round(parseInt(message.content.split(" ")[3])) + "}")
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        message.channel.send('Ight.')
                    }
                }).catch((err) => {
                    message.channel.send('Fuck that did not work: ' + err.message);
                });
        }
    }
});


function rgb2hsv(r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
        diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    };
}