const Discord = require("discord.js");
const hd = require("humanize-duration");
const db = require("quick.db");
const saved_roles = new db.table("saved_roles");
const Canvas = require("canvas")

const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        context.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (context.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return context.font;
};

module.exports = {
    name: "guildMemberAdd",
    run: async (client, member) => {
        const canvas = Canvas.createCanvas(700, 250)
        const context = canvas.getContext("2d")
        const background = await Canvas.loadImage("../../assets/welcome.png")
        context.drawImage(background, 0, 0, canvas.width, canvas.height)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png')

        context.strokeRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.arc(125, 125, 100, 0, Math.PI * 2, true)
        context.closePath()
        context.clip()

        context.font = applyText(canvas, `${member} welcome to ${member.guild.name}, head over to <#825797019103789056> to get started with hosting! If you need help feel free to ask for it in <#828253375387795486>!`)
        context.fillStyle = '#ffffff'
        context.fillText(`${member} welcome to ${member.guild.name}, head over to <#825797019103789056> to get started with hosting! If you need help feel free to ask for it in <#828253375387795486>!`, canvas.width / 2.5, canvas.height / 1.8)

        let channel_id = "826544543297437766";
        let channel = member.guild.channels.cache.find(c => c.id == `${channel_id}`);

        /*if (member.user.bot) {
            member.guild.fetchAuditLogs({ type: "BOT_ADD", limit: 10 }).then(entries => {
                let entry = entries.last()

                return channel.send(`${member} has joined the server!\n\n\nInvited By: <@!${entry.executor.id}>`);
            })
        }

        member.guild.fetchInvites().then(guildInvites => {
            let ei = client.invites[member.guild.id]

            client.invites[member.guild.id] = guildInvites

            let invite = guildInvites.find(i => ei.get(i.code).users < i.uses)
            let inviter = client.users.cache.get(invite.inviter.id)

            channel.send(`${member} welcome to ${member.guild.name}, head over to <#825797019103789056> to get started with hosting! If you need help feel free to ask for it in <#828253375387795486>!\n\nInvite Code: ${invite.code}\nInvited By: <@!${inviter.id}>`);
        })*/

        const embed = new Discord.MessageEmbed()
            .setTitle("New Member!")
            .setColor("RANDOM")
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`${member} welcome to ${member.guild.name}, head over to <#825797019103789056> to get started with hosting! If you need help feel free to ask for it in <#828253375387795486>!`)
            .setFooter("SneakyHub")

        channel.send(`${member}`, attachment)

        if (saved_roles.has(`${member.user.id}`)) {
            try {
                if (!member.guild.me.hasPermission("MANAGE_ROLES")) return

                let array = [];
                let user_roles = saved_roles.fetch(`${member.user.id}.roles`);

                user_roles.forEach(role => {
                    if (array.includes(`${role}`)) return;
                    array.push(`${role}`);
                });

                array.forEach(d => {
                    let role = member.guild.roles.cache.get(`${d}`);

                    member.roles.add(role);
                });

                saved_roles.delete(`${member.user.id}`);
            } catch (error) {
                console.log("failed to add roles to person")
            }
        }

        if (Date.now() - member.user.createdAt < 259200000) {
            if (member.user.bot) return

            member.ban({ reason: "Account is less than 3 days old. - Banned by Auto-Ban" });
            //channel.send(`${member.user.tag} was banned due to the account being less than 3 days old.`);
        } else if (Date.now() - member.user.createdAt < 2419200000) {
            if (member.user.bot) return

            try {
                member.user.send(`Sorry! We only allow accounts over the age of 28 days to join.\nYour account was created ${hd(Date.now() - member.user.createdAt, { round: true })} ago.\n\nYou are welcome to join again once this account is over 28 days old!`);
            } catch (error) {
                return;
            }

            member.kick(`Account is less than 28 days old. - Kicked by Auto-Kick`);
            //channel.send(`${member.user.tag} was kicked due to the account being less than 28 days old.`);
        }
    }
}