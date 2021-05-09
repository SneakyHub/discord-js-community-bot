const db = require("quick.db");

module.exports = {
    name: "ready",
    run: async (client) => {
        console.log("Bot is ready and online.");

        client.user.setActivity("?help", { type: "LISTENING" })

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
            let array = ['!', '`', '#', "'", '-', '.', '_', '"', '+', '*', '£', "$", '%', '^', "&", '(', ')', '>', '<', '[', ']', ','];

            guild.members.cache.forEach(member => {
                for (let i = 0; i < array.length; i++) {
                    if (member.displayName.startsWith(array[i])) {
                        member.setNickname("Tried Hoisting");
                    } else if (member.user.username.startsWith(array[i])) {
                        member.setNickname("Tried Hoisting");
                    }
                }
            });
        }, 120000);
    }
}