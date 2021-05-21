const db = require("quick.db");
const wait = require("util").promisify(setTimeout)

module.exports = {
    name: "ready",
    run: async (client) => {
        await wait(1000)

        console.log("Bot is ready and online.");

        client.user.setActivity("Listening to ?help")

        client.channels.cache.get("825721068395560981").messages.fetch({ limit: 99 }).then(async (fetched) => {
            console.log(fetched.size);
        }).catch(error => {
            console.error(error);
        });

        client.channels.cache.get("826165658541752390").messages.fetch({ limit: 99 }).then(async (fetched) => {
            console.log(fetched.size);
        }).catch(error => {
            console.error(error);
        });

        /*client.guilds.cache.forEach(guild => {
            guild.fetchInvites().then(guildInvites => {
                client.invites[guild.id] = guildInvites

                guild.members.cache.forEach(member => {
                    let info = guildInvites.find(invite => invite.inviter.id == member.id)

                    client.userInvites.set(member.id, info)
                })
            })
        })*/

        // 120 second user cache

        setInterval(() => {
            client.guilds.cache.forEach(guild => {
                guild.members.cache.forEach(member => {
                    if (client.users.cache.has(member.user.id)) return;
                    client.userCache.set(member.user.id, member.user);
                });
            });
        }, 120000);

        // Automatic anti-hoist checker

        setInterval(() => {
            let guild = client.guilds.cache.get("825699580779823125");

            guild.members.cache.filter(member => member.displayName.match(/^[a-z0-9]/i) == null).forEach(x => {
                let root = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
                let newNickname = ""

                while (newNickname.length < 10) {
                    newNickname += root[Math.floor(Math.random() * root.length)]
                }

                x.setNickname(newNickname)
            })
        }, 120000);
    }
}