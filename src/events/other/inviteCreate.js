const Discord = require("discord.js");
const webhook = {
    token: "P6Nx4CqAVL9cnNOqSXgbSd3YP75SZEydDFhxhJTmqS7HjlkjkLrlZ_fajGV8PgFYpf6P",
    id: "833393130208100432"
};

module.exports = {
    name: "inviteCreate",
    run: async (client, invite) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("Invite Created")
            .addFields(
                {
                    name: "Code",
                    value: invite.code,
                    inline: true
                },
                {
                    name: "Created At",
                    value: invite.createdAt,
                    inline: true
                },
                {
                    name: "Inviter",
                    value: invite.inviter,
                    inline: true
                },
                {
                    name: "Max Age",
                    value: invite.maxAge,
                    inline: true
                },
                {
                    name: "Max Uses",
                    value: invite.maxUses,
                    inline: true
                },
                {
                    name: "Expires",
                    value: invite.expiresAt,
                    inline: true
                },
                {
                    name: "URL",
                    value: invite.url,
                    inline: true
                }
            )

        const hook = new Discord.WebhookClient(webhook.id, webhook.token);

        hook.send(embed);
    }
}