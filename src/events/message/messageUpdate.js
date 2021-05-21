module.exports = {
    name: "messageUpdate",
    run: async (client, oldMessage, newMessage) => {
        if (oldMessage.author.bot) return; //bot can't run commands
        if (!client.editSnipes.get(oldMessage.channel.id)) client.editSnipes.set(oldMessage.channel.id, []); //if there are no snipes, turn it to an empty array
        const editSnipes = client.editSnipes.get(oldMessage.channel.id); //the array of edit snipes in the current channel
        const obj = { oldMessage, newMessage, editedAt: Date.now() }; // an object containing both the old and new messages
        client.editSnipes.set(oldMessage.channel.id, editSnipes.concat([obj])); //save it to client.editSnipes
    }
}