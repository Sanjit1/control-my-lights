const Discord = require("discord.js"); // cheese
require("dotenv/config");
const client = new Discord.Client();
const axios = require('axios');
const messed_with_lights = new Set();
const in_session_lol = new Set();
const cant_use_lol = new Set();
const mqtt = require('mqtt');
const lite = mqtt.connect("mqtt://192.168.68.15");
const messed_with_large_lite = new Set();
const TuyAPI = require('tuyapi');
const device = new TuyAPI({
    id: '05214081c4dd572690bd',
    key: 'e5c485ebd253c34d'
});
let stateHasChanged = false;
device.find().then(() => {
    device.connect();
});
var sifu;

device.on('error', error => {
    console.log('Fine now this error has been handled lol ', error);
});

var ip = 'cheese';
client.once('ready', () => {
    console.log('ready');
    client.users.fetch('542937555251888143')
        .then(user => sifu = user);
});

client.login(process.env.DISCORD_TOKEN);


axios.get('https://discovery.meethue.com/').then(function (response) {
    ip = response.data[0].internalipaddress;
}).catch(function (err) {
    console.error(err);
});

can_stuff_happen = true;

function turnMainLite(state) {
    // lite.publish('cmnd/SanjitLite/POWER', state ? 'ON' : 'OFF');
    // If I am using mqtt then this otherwise
    device.set({ set: state }).then();
}

// device.on('data', data => { device.get().then(state => lite.publish('cmnd/SanjitLite/POWER', state ? 'ON' : 'OFF')) });

client.on('message', message => {
    messageString = message.content.toLowerCase();
    user_id = message.author.id;
    if (messageString == null) {
        messageString = "F"
    }
    if (message.author.id == "775086819775610881" && messageString.includes('»')) { // SRV thingie
        user_id = message.content.split(" » ")[0];
        messageString = message.content.split(" » ")[1];
    }
    date = new Date();
    sleepy_time = sifu.presence.status == "offline" && (date.getHours() < 6 && date.getHours() > 22)
    if (message.channel.id == '827062913100939275' && message.content.startsWith('l?')) {
        message.channel.send('LiteBot wont work here. Verify your identity first');
    } else {
        if (messageString.startsWith("l?help")) {
            var helpEmbed = new Discord.MessageEmbed().setColor('#32a885').setTitle('LiteBot Functions')
                .setAuthor(message.author.username).setDescription("For some reason everyone thinks it is I, no it is l: l for light").addFields(
                    { name: "l?on", value: "Turns on the light to the last state of the light.", inline: true },
                    { name: "l?off", value: "Turns off the light", inline: true },
                    { name: "l?normal", value: "Turns on the light to normal mode", inline: true },
                    { name: "l?disco", value: "Turns on disco mode.", inline: true },
                    { name: "l?bright <val>", value: "Sets the brightness of the light to val", inline: true },
                    { name: "l?color <H> <S> <B>", value: "Sets the color of the light. This is in HSB. DW its normal HSB now lol" },
                    { name: "l?large on", value: "Turns off the main lite", inline: true },
                    { name: "l?large off", value: "Turns off the main lite", inline: true },
                    { name: "l?large disco", value: "Turns on disco mode on main lite", inline: true },
                    { name: "l?github", value: "Gives Github link", inline: true },
                    { name: "Clarification", value: "<> is obviously supposed to be omitted lol. and don't use % lol" }
                ).setFooter("Made you look.")
            message.channel.send(helpEmbed);
        } else if (messageString.startsWith('l?killbot ') && (user_id == 'Sanjit1' || user_id == "542937555251888143")) {
            duration = parseInt(messageString.split('killbot ')[1]) * 60000;
            console.log(duration)
            can_stuff_happen = false;
            channel_of_kill = message.channel;
            channel_of_kill.send('Lites Now locked for some time');
            setTimeout(() => {
                can_stuff_happen = true;
                channel_of_kill.send('<@542937555251888143> Sifu, ppl can now access lites.')
            }, duration);
        } else if (messageString.startsWith('l?sleep ') && (user_id == 'Sanjit1' || user_id == "542937555251888143")) {
            can_stuff_happen = false;
            channel_of_kill = message.channel;
            channel_of_kill.send('Lites Now locked for some time');
            setTimeout(() => {
                can_stuff_happen = true;
                channel_of_kill.send('<@542937555251888143> Sifu, ppl can now access lites.')
            }, 25200000);
        } else if (messageString.startsWith('l?unkillbot') && (user_id == 'Sanjit1' || user_id == "542937555251888143")) {
            can_stuff_happen = true;
            message.channel.send('Lites Unkilled.')
        } else if (messageString.startsWith('l?github')) {
            message.channel.send('Amazing stuff');
            message.channel.send('https://github.com/Sanjit1/control-my-lights');
        } else if (messageString.startsWith("l?") && !(messageString.startsWith("l?l")) && !(messageString.startsWith("l?pain"))) {
            if ((can_stuff_happen && !sleepy_time) || user_id == '542937555251888143') {
                var allow_switch = false;
                if (user_id == "542937555251888143") {
                    allow_switch = true;
                } else {
                    if (messed_with_lights.has(user_id)) {
                        message.channel.send("You have to wait rip. 1 hr cooldown since last session");
                    } else if (in_session_lol.has(user_id)) {
                        if (cant_use_lol.has(user_id)) {
                            message.channel.send("Wait like 2 seconds lol");
                        } else {
                            user_id_cuz_bs = user_id
                            cant_use_lol.add(user_id_cuz_bs);
                            allow_switch = true;
                            setTimeout(() => {
                                cant_use_lol.delete(user_id_cuz_bs);
                            }, 2000);
                        }
                    } else {
                        user_id_cuz_bs = user_id;
                        in_session_lol.add(user_id_cuz_bs);
                        allow_switch = true;
                        cant_use_lol.add(user_id_cuz_bs);
                        setTimeout(() => {
                            cant_use_lol.delete(user_id_cuz_bs);
                        }, 2000);
                        setTimeout(() => {
                            in_session_lol.delete(user_id_cuz_bs);
                            messed_with_lights.add(user_id_cuz_bs);
                            setTimeout(() => {
                                messed_with_lights.delete(user_id_cuz_bs);
                            }, 360000);
                        }, 120000);
                    }
                }

                if (allow_switch) {


                    if (messageString.startsWith("l?on")) {


                        axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true}')
                            .then((res) => {
                                if (res.status == 200) {
                                    message.channel.send('Ight. lol')
                                }
                            }).catch((err) => {
                                message.channel.send('Fuck that did not work: ' + err.message);
                            });


                    } else if (messageString.startsWith("l?off")) {


                        axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": false}')
                            .then((res) => {
                                if (res.status == 200) {
                                    message.channel.send('Ight. lol')
                                }
                            }).catch((err) => {
                                message.channel.send('Fuck that did not work: ' + err.message);
                            });


                    } else if (messageString.startsWith("l?normal")) {


                        axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 0, "sat": 0, "bri": 254}')
                            .then((res) => {
                                if (res.status == 200) {
                                    message.channel.send('Ight. lol')
                                }
                            }).catch((err) => {
                                message.channel.send('Fuck that did not work: ' + err.message);
                            });


                    } else if (messageString.startsWith("l?disco")) {


                        axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 49151, "sat": 127, "bri": 152}')
                            .then((res) => {
                                if (res.status == 200) {
                                    message.channel.send('Ight. lol')
                                }
                            }).catch((err) => {
                                message.channel.send('Fuck that did not work: ' + err.message);
                            });
                        setTimeout(() => {
                            axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 28763, "sat": 183, "bri": 99}')
                                .then((res) => {
                                    if (res.status == 200) {
                                    }
                                }).catch((err) => {
                                    message.channel.send('Fuck that did not work: ' + err.message);
                                });
                            setTimeout(() => {
                                axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 5461, "sat": 254, "bri": 127}')
                                    .then((res) => {
                                        if (res.status == 200) {
                                        }
                                    }).catch((err) => {
                                        message.channel.send('Fuck that did not work: ' + err.message);
                                    });
                                setTimeout(() => {
                                    axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 910, "sat": 251, "bri": 134}')
                                        .then((res) => {
                                            if (res.status == 200) {
                                            }
                                        }).catch((err) => {
                                            message.channel.send('Fuck that did not work: ' + err.message);
                                        });
                                    setTimeout(() => {
                                        axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 49151, "sat": 127, "bri": 152}')
                                            .then((res) => {
                                                if (res.status == 200) {
                                                }
                                            }).catch((err) => {
                                                message.channel.send('Fuck that did not work: ' + err.message);
                                            });
                                        setTimeout(() => {
                                            axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 28763, "sat": 183, "bri": 99}')
                                                .then((res) => {
                                                    if (res.status == 200) {
                                                    }
                                                }).catch((err) => {
                                                    message.channel.send('Fuck that did not work: ' + err.message);
                                                });
                                            setTimeout(() => {
                                                axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 5461, "sat": 254, "bri": 127}')
                                                    .then((res) => {
                                                        if (res.status == 200) {
                                                        }
                                                    }).catch((err) => {
                                                        message.channel.send('Fuck that did not work: ' + err.message);
                                                    });
                                                setTimeout(() => {
                                                    axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 910, "sat": 251, "bri": 134}')
                                                        .then((res) => {
                                                            if (res.status == 200) {
                                                            }
                                                        }).catch((err) => {
                                                            message.channel.send('Fuck that did not work: ' + err.message);
                                                        });
                                                    setTimeout(() => {
                                                        axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 49151, "sat": 127, "bri": 152}')
                                                            .then((res) => {
                                                                if (res.status == 200) {
                                                                }
                                                            }).catch((err) => {
                                                                message.channel.send('Fuck that did not work: ' + err.message);
                                                            });
                                                        setTimeout(() => {
                                                            axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 28763, "sat": 183, "bri": 99}')
                                                                .then((res) => {
                                                                    if (res.status == 200) {
                                                                    }
                                                                }).catch((err) => {
                                                                    message.channel.send('Fuck that did not work: ' + err.message);
                                                                });
                                                            setTimeout(() => {
                                                                axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 5461, "sat": 254, "bri": 127}')
                                                                    .then((res) => {
                                                                        if (res.status == 200) {
                                                                        }
                                                                    }).catch((err) => {
                                                                        message.channel.send('Fuck that did not work: ' + err.message);
                                                                    });
                                                                setTimeout(() => {
                                                                    axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 910, "sat": 251, "bri": 134}')
                                                                        .then((res) => {
                                                                            if (res.status == 200) {
                                                                                message.channel.send('K thats enough disco');
                                                                                setTimeout(() => {
                                                                                    axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 0, "sat": 0, "bri": 254}')
                                                                                        .then((res) => {
                                                                                            if (res.status == 200) {
                                                                                                message.channel.send('Lites B Normal now <@542937555251888143> Sifu double check 👍')
                                                                                            }
                                                                                        }).catch((err) => {
                                                                                            message.channel.send('Fuck that did not work: ' + err.message);
                                                                                        });
                                                                                }, 1000);
                                                                            }
                                                                        }).catch((err) => {
                                                                            message.channel.send('Fuck that did not work: ' + err.message);
                                                                        });
                                                                }, 1000);
                                                            }, 1000);
                                                        }, 1000);
                                                    }, 1000);
                                                }, 1000);
                                            }, 1000);
                                        }, 1000);
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    } else if (messageString.startsWith("l?bright")) {
                        if (messageString.split(" ").length > 1) {
                            axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "bri": ' + Math.round(messageString.split(" ")[1] * 2.54) + '}')
                                .then((res) => {
                                    if (res.status == 200) {
                                        message.channel.send('Ight. lol')
                                    }
                                }).catch((err) => {
                                    message.channel.send('Fuck that did not work: ' + err.message);
                                });
                        }
                    } else if (messageString.startsWith("l?color")) {
                        if (messageString.split(" ").length > 3) {
                            axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": ' + Math.round(parseInt(messageString.split(" ")[1]) * 65535 / 360) + ', "sat": ' + Math.round(parseInt(messageString.split(" ")[2]) * 2.54) + ', "bri": ' + Math.round(parseInt(messageString.split(" ")[3]) * 2.54) + "}")
                                .then((res) => {
                                    if (res.status == 200) {
                                        message.channel.send('Ight. lol')
                                    }
                                }).catch((err) => {
                                    message.channel.send('Fuck that did not work: ' + err.message);
                                });
                        }
                    }
                }
            } else {
                if (sleepy_time) {
                    message.channel.send('Rip. Sifu likely asleep.')
                } else {
                    message.channel.send('Rip. Sifu is busy or smthng, and doesn\'t want any lite disturbances');
                }
            }
        } else if (messageString.startsWith("l?l")) {
            if ((can_stuff_happen && !sleepy_time) || user_id == '542937555251888143') {
                if (messed_with_large_lite.has(user_id)) {
                    message.channel.send("wait time is like 1 hr from last large lite change lol")
                } else {
                    if (user_id !== '542937555251888143' && user_id !== 'Sanjit1') {
                        var lmao_more_class_user_id_bs = user_id;
                        messed_with_large_lite.add(lmao_more_class_user_id_bs);
                        setTimeout(() => {
                            messed_with_large_lite.delete(lmao_more_class_user_id_bs);
                        }, 360000);
                    }
                    if (messageString.startsWith("l?large on") || messageString.startsWith("l?lon")) {
                        turnMainLite(true);
                        message.channel.send('Ight. lol');
                    } else if (messageString.startsWith("l?large off") || messageString.startsWith("l?loff")) {
                        turnMainLite(false);
                        message.channel.send('Ight. lol');
                    } else if (messageString.startsWith("l?large disco") || messageString.startsWith("l?ldisco")) {
                        turnMainLite(true);
                        setTimeout(() => {
                            turnMainLite(false);
                            setTimeout(() => {
                                turnMainLite(true);
                                setTimeout(() => {
                                    turnMainLite(false);
                                    setTimeout(() => {
                                        turnMainLite(true);
                                        setTimeout(() => {
                                            message.channel.send('<@542937555251888143> Sifu you have been disco\'d.')
                                        }, 1500);
                                    }, 1500);
                                }, 1500);
                            }, 1500);
                        }, 1500);
                        message.channel.send('Ight. lol ');
                    }
                }
            } else {
                message.channel.send('Rip. Sifu is busy or smthng, and doesn\'t want any lite disturbances');
            }
        } else if (messageString.startsWith('l?pain')) {
            message.channel.send('https://tenor.com/view/pain-painful-rip-gif-19017159');
        }
    }
    // SIFU ID 542937555251888143

});