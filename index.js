const Discord = require("discord.js");
require("dotenv/config");
const mqtt = require("mqtt");
const axios = require("axios");

var sifu;
var ip = "cheese";
const sifuID = "542937555251888143";
const broker = mqtt.connect("mqtt:192.168.68.105");
const client = new Discord.Client();

const messed_with_lights = new Set();
const in_session = new Set();
const spam_use = new Set();

client.login(process.env.DISCORD_TOKEN);
client.once("ready", () => {
    console.log("re-di");
    client.users.fetch(sifuID).then((user) => (sifu = user));
});

axios
    .get("https://discovery.meethue.com/")
    .then((res) => (ip = res.data[0].internalipaddress))
    .catch((err) => console.error(err));

can_stuff_happen = true;

client.on("message", (msg) => {
    message = msg.content.toLocaleLowerCase();
    user_id = msg.author.id;
    if (msg.author.id == "775086819775610881" && message.includes("»")) {
        // SRV thingie
        user_id = msg.content.split(" » ")[0];
        message = msg.content.split(" » ")[1];
    }
    date = new Date();
    sleepy_time =
        sifu.presence.status == "offline" &&
        (date.getHours() < 6 || date.getHours() > 22);

    if (message.startsWith("l?help")) {
        var helpEmbed = new Discord.MessageEmbed()
            .setColor("#32a885")
            .setTitle("LiteBot Functions")
            .setAuthor(msg.author.username)
            .setDescription(
                "For some reason everyone thinks it is I, no it is l: l for light"
            )
            .addFields(
                {
                    name: "l?<num> on",
                    value: "Turns on the light to the last state of the light.",
                    inline: true,
                },
                {
                    name: "l?<num> off",
                    value: "Turns off the light",
                    inline: true,
                },
                {
                    name: "l?<num> normal",
                    value: "Turns on the light to normal mode",
                    inline: true,
                },
                {
                    name: "l?<num> disco",
                    value: "Turns on disco mode.",
                    inline: true,
                },
                {
                    name: "l?<num> bright <val>",
                    value: "Sets the brightness of the light to val",
                    inline: true,
                },
                {
                    name: "l?<num> color <H> <S> <B>",
                    value: "Sets the color of the light. This is in HSB.",
                },
                {
                    name: "l?pingpong <H> <S> <B>",
                    value: "Will alternate between HSB is optional.",
                    inline: true,
                },
                { name: "l?github", value: "Gives Github link", inline: true },
                {
                    name: "Secret Codes",
                    value: "There are secret codes that secret code so secret code.",
                    inline: true,
                },
                {
                    name: "Stuff",
                    value: "<> is obviously supposed to be omitted lol. and don't use % lol",
                }
            )
            .setFooter("Made you look.");
        msg.channel.send(helpEmbed);
    } else if (
        message.startsWith("l?killbot ") &&
        (user_id == "Sanjit1" || user_id == "542937555251888143")
    ) {
        duration = parseInt(message.split("killbot ")[1]) * 60000;
        can_stuff_happen = false;
        channel_of_kill = msg.channel;
        setTimeout(() => {
            can_stuff_happen = true;
            channel_of_kill.send(
                "<@542937555251888143> Sifu, ppl can now access lites."
            );
        }, duration);
        msg.channel.send(
            "k lites killed for " + duration.toString() / 60000 + " mins."
        );
    } else if (
        message.startsWith("l?sleep") &&
        (user_id == "Sanjit1" || user_id == "542937555251888143")
    ) {
        can_stuff_happen = false;
        channel_of_kill = msg.channel;
        channel_of_kill.send("Lites Now locked for some time");
        setTimeout(() => {
            can_stuff_happen = true;
            channel_of_kill.send(
                "<@542937555251888143> Sifu, ppl can now access lites."
            );
        }, 25200000);
    } else if (
        message.startsWith("l?unkillbot") &&
        (user_id == "Sanjit1" || user_id == "542937555251888143")
    ) {
        can_stuff_happen = true;
        msg.channel.send("Lites Unkilled.");
    } else if (message.startsWith("l?github")) {
        msg.channel.send("Amazing stuff");
        msg.channel.send("https://github.com/Sanjit1/control-my-lights");
    } else if (message.startsWith("l?pain")) {
        msg.channel.send(
            "https://tenor.com/view/pain-painful-rip-gif-19017159"
        );
    } else if (
        (msg.channel.id == "827062913100939275" ||
            (msg.channel.type == "dm" && msg.author.id != sifuID)) &&
        msg.content.startsWith("l?")
    ) {
        msg.channel.send("LiteBot wont work here. Verify your identity first");
    } else if (message.startsWith("l?")) {
        if ((can_stuff_happen && !sleepy_time) || user_id == sifuID) {
            var allow_switch = false;
            if (user_id == sifuID) {
                allow_switch = true;
            } else {
                if (messed_with_lights.has(user_id)) {
                    msg.channel.send(
                        "You gotta wait rip. 1 hour cooldown since last session."
                    );
                } else if (in_session.has(user_id)) {
                    if (spam_use.has(user_id)) {
                        msg.channel.send("Wait for like a second lol");
                    } else {
                        user_id_cuz_bs = user_id;
                        spam_use.add(user_id_cuz_bs);
                        allow_switch = true;
                        setTimeout(() => {
                            spam_use.delete(user_id_cuz_bs);
                        }, 2000);
                    }
                } else {
                    user_id_cuz_bs = user_id;
                    in_session.add(user_id_cuz_bs);
                    allow_switch = true;
                    spam_use.add(user_id_cuz_bs);
                    setTimeout(() => {
                        spam_use.delete(user_id_cuz_bs);
                    }, 2000);
                    setTimeout(() => {
                        in_session.delete(user_id_cuz_bs);
                        messed_with_lights.add(user_id_cuz_bs);
                        setTimeout(() => {
                            messed_with_lights.delete(user_id_cuz_bs);
                        }, 3600000);
                    }, 120000);
                }
            }

            if (allow_switch) {
                if (
                    message.startsWith("l?pingpong") ||
                    message.startsWith("l?ping pong")
                ) {
                    message = message + " ";
                    hsb = message.split("pong ")[1].split(" ");
                    if (hsb.length == 4) {
                        broker.publish(
                            "Ecosystem",
                            '{"device": "hue", "data": {"light": 2, "payload": {"on": true, "hue": ' +
                                Math.round((parseInt(hsb[0]) * 65535) / 360) +
                                ', "sat": ' +
                                Math.round(parseInt(hsb[1]) * 2.54) +
                                ', "bri": ' +
                                Math.round(parseInt(hsb[2]) * 2.54) +
                                "}}}"
                        );
                        broker.publish(
                            "Ecosystem",
                            '{"device": "hue", "data": {"light": 3, "payload": {"on": true, "hue": ' +
                                Math.round((parseInt(hsb[0]) * 65535) / 360) +
                                ', "sat": ' +
                                Math.round(parseInt(hsb[1]) * 2.54) +
                                ', "bri": ' +
                                Math.round(parseInt(hsb[2]) * 2.54) +
                                "}}}"
                        );
                    }
                    var x = 0;
                    interval = setInterval(() => {
                        broker.publish(
                            "Ecosystem",
                            '{"device": "hue", "data": {"light": 3, "payload": {"on": true}}}'
                        );
                        broker.publish(
                            "Ecosystem",
                            '{"device": "hue", "data": {"light": 2, "payload": {"on": false}}}'
                        );
                        setTimeout(() => {
                            broker.publish(
                                "Ecosystem",
                                '{"device": "hue", "data": {"light": 2, "payload": {"on": true}}}'
                            );
                            broker.publish(
                                "Ecosystem",
                                '{"device": "hue", "data": {"light": 3, "payload": {"on": false}}}'
                            );
                        }, 1111);
                        if (++x == 5) {
                            clearInterval(interval);
                        }
                    }, 2222);
                } else {
                    liteToFlick = 4 - parseInt(message.charAt(2));
                    if (
                        isNaN(liteToFlick) &&
                        liteToFlick > 0 &&
                        liteToFlick < 3
                    ) {
                        liteToFlick++;
                    }
                    func =
                        message.charAt(3) == " "
                            ? message.substring(4)
                            : message.substring(3);

                    if (func == "on") {
                        broker.publish(
                            "Ecosystem",
                            '{"device": "hue", "data": {"light": ' +
                                liteToFlick +
                                ', "payload": {"on": true}}}'
                        );
                        msg.channel.send("Ight. lol. turned light on");
                    } else if (func == "off") {
                        broker.publish(
                            "Ecosystem",
                            '{"device": "hue", "data": {"light": ' +
                                liteToFlick +
                                ', "payload": {"on": false}}}'
                        );
                        msg.channel.send("Ight. lol. turned light off");
                    } else if (func == "normal") {
                        broker.publish(
                            "Ecosystem",
                            '{"device": "hue", "data": {"light": 3, "payload": {"on": true, "hue": 0, "sat": 0, "bri": 254}}}'
                        );
                        msg.channel.send("Ight. lol. made lite normal");
                    } else if (func == "disco") {
                        h = 0;
                        msg.channel.send("Ight. lol. I am a disco dancer");
                        interval = setInterval(() => {
                            s = Math.floor(Math.random() * 30) + 220;
                            broker.publish(
                                "Ecosystem",
                                '{"device": "hue", "data": {"light": 3, "payload": {"on": true, "hue": ' +
                                    (h % 65535) +
                                    ', "sat": ' +
                                    s +
                                    ', "bri": 254}}}'
                            );
                            if (h > 174759) {
                                clearInterval(interval);
                                msg.channel.send(":sadge: disco over");
                            }
                            h += 20000;
                        }, 888);
                    } else if (func.startsWith("color")) {
                        hsb = message.split("color ")[1].split(" ");
                        if (hsb.length == 3) {
                            broker.publish(
                                "Ecosystem",
                                '{"device": "hue", "data": {"light": ' +
                                    liteToFlick +
                                    ', "payload": {"on": true, "hue": ' +
                                    Math.round(
                                        (parseInt(hsb[0]) * 65535) / 360
                                    ) +
                                    ', "sat": ' +
                                    Math.round(parseInt(hsb[1]) * 2.54) +
                                    ', "bri": ' +
                                    Math.round(parseInt(hsb[2]) * 2.54) +
                                    "}}}"
                            );
                            msg.channel.send(
                                "Ight. lol. Changed colour with a u."
                            );
                        }
                    } else if (func.startsWith("bright")) {
                        b = message.split("bright ")[1];
                        broker.publish(
                            "Ecosystem",
                            '{"device": "hue", "data": {"light": ' +
                                liteToFlick +
                                ', "payload": {"on": true, "bri": ' +
                                Math.round(parseInt(b) * 2.54) +
                                "}}}"
                        );
                        msg.channel.send("Ight. lol. Changed the brightness");
                    }
                }
            }
        }
    }
    // 1&2? stuff
    //else if ()
});
