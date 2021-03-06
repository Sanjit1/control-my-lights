const Discord = require("discord.js"); // cheese
require("dotenv/config");
const client = new Discord.Client();
const axios = require('axios');
const messed_with_lights = new Set();
const in_session_lol = new Set();
const cant_use_lol = new Set();


var ip = 'cheese';
client.once('ready', () => {
    console.log('ready');
});

client.login(process.env.DISCORD_TOKEN);


axios.get('https://discovery.meethue.com/').then(function (response) {
    ip = response.data[0].internalipaddress;
}).catch(function (err) {
    console.error(err);
});

client.on('message', message => {
    messageString = message.content.toLowerCase();


    user_id = message.author.id;
    if (message.author.id == "") { // SRV thingie
        user_id = "Sanjit1"
    }
    if (messageString.startsWith("l?help")) {
        var helpEmbed = new Discord.MessageEmbed().setColor('#32a885').setTitle('LiteBot Functions')
            .setAuthor(message.author.username).setDescription("For some reason everyone thinks it is I, no it is l: l for light").addFields(
                { name: "l?on", value: "Turns on the light to the last state of the light.", inline: true },
                { name: "l?off", value: "Turns off the light", inline: true },
                { name: "l?normal", value: "Turns on the light to normal mode", inline: true },
                { name: "l?disco", value: "Turns on disco mode.", inline: true },
                { name: "l?bright <val>", value: "Sets the brightness of the light to val", inline: true },
                { name: "l?color <H> <S> <B>", value: "Sets the color of the light. This is in HSB. DW its normal HSB now lol" },
                { name: "Clarification", value: "<> is obviously supposed to be omitted lol. and don't use % lol" }
            ).setFooter("Made you look.")
        message.channel.send(helpEmbed);
    } else if (messageString.startsWith("l?")) {

        var allow_switch = false;
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
        if (user_id == "Sanjit1" || user_id == "542937555251888143") {
            allow_switch = true;
            message.channel.send("lmao ignore the previous messages sifu");
        }
        if (allow_switch) {


            if (message.content.startsWith("l?on")) {


                axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true}')
                    .then((res) => {
                        if (res.status == 200) {
                            message.channel.send('Ight. lol')
                        }
                    }).catch((err) => {
                        message.channel.send('Fuck that did not work: ' + err.message);
                    });


            } else if (message.content.startsWith("l?off")) {


                axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": false}')
                    .then((res) => {
                        if (res.status == 200) {
                            message.channel.send('Ight. lol')
                        }
                    }).catch((err) => {
                        message.channel.send('Fuck that did not work: ' + err.message);
                    });


            } else if (message.content.startsWith("l?normal")) {


                axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 0, "sat": 0, "bri": 254}')
                    .then((res) => {
                        if (res.status == 200) {
                            message.channel.send('Ight. lol')
                        }
                    }).catch((err) => {
                        message.channel.send('Fuck that did not work: ' + err.message);
                    });


            } else if (message.content.startsWith("l?disco")) {


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
                                message.channel.send('Ight. lol')
                            }
                        }).catch((err) => {
                            message.channel.send('Fuck that did not work: ' + err.message);
                        });
                    setTimeout(() => {
                        axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 5461, "sat": 254, "bri": 127}')
                            .then((res) => {
                                if (res.status == 200) {
                                    message.channel.send('Ight. lol')
                                }
                            }).catch((err) => {
                                message.channel.send('Fuck that did not work: ' + err.message);
                            });
                        setTimeout(() => {
                            axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 910, "sat": 251, "bri": 134}')
                                .then((res) => {
                                    if (res.status == 200) {
                                        message.channel.send('Ight. lol')
                                    }
                                }).catch((err) => {
                                    message.channel.send('Fuck that did not work: ' + err.message);
                                });
                            setTimeout(() => {
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
                                                message.channel.send('Ight. lol')
                                            }
                                        }).catch((err) => {
                                            message.channel.send('Fuck that did not work: ' + err.message);
                                        });
                                    setTimeout(() => {
                                        axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 5461, "sat": 254, "bri": 127}')
                                            .then((res) => {
                                                if (res.status == 200) {
                                                    message.channel.send('Ight. lol')
                                                }
                                            }).catch((err) => {
                                                message.channel.send('Fuck that did not work: ' + err.message);
                                            });
                                        setTimeout(() => {
                                            axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 910, "sat": 251, "bri": 134}')
                                                .then((res) => {
                                                    if (res.status == 200) {
                                                        message.channel.send('Ight. lol')
                                                    }
                                                }).catch((err) => {
                                                    message.channel.send('Fuck that did not work: ' + err.message);
                                                });
                                            setTimeout(() => {
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
                                                                message.channel.send('Ight. lol')
                                                            }
                                                        }).catch((err) => {
                                                            message.channel.send('Fuck that did not work: ' + err.message);
                                                        });
                                                    setTimeout(() => {
                                                        axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 5461, "sat": 254, "bri": 127}')
                                                            .then((res) => {
                                                                if (res.status == 200) {
                                                                    message.channel.send('Ight. lol')
                                                                }
                                                            }).catch((err) => {
                                                                message.channel.send('Fuck that did not work: ' + err.message);
                                                            });
                                                        setTimeout(() => {
                                                            axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 910, "sat": 251, "bri": 134}')
                                                                .then((res) => {
                                                                    if (res.status == 200) {
                                                                        message.channel.send('Ight. lol')
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
    }



    /*
        if (message.content.startsWith("Sanjit1 »")) {
            messageString = message.content.split("» ").pop();
            console.log(messageString);
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
                    axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": ' + Math.round(parseInt(messageString.split(" ")[1])) + ', "sat": ' + Math.round(parseInt(messageString.split(" ")[2])) + ', "bri": ' + Math.round(parseInt(messageString.split(" ")[3])) + "}")
                        .then((res) => {
                            if (res.status == 200) {
                                message.channel.send('Ight. lol')
                            }
                        }).catch((err) => {
                            message.channel.send('Fuck that did not work: ' + err.message);
                        });
                }
            } else if (messageString.startsWith("l?normal")) {
                axios.put('http://' + ip + '/api/' + process.env.HUE_TOKEN + '/lights/3/state', '{"on": true, "hue": 0, "sat": 0, "bri": 254}')
                    .then((res) => {
                        if (res.status == 200) {
                            message.channel.send('Ight. lol')
                        }
                    }).catch((err) => {
                        message.channel.send('Fuck that did not work: ' + err.message);
                    });
            }
        }
    */
});