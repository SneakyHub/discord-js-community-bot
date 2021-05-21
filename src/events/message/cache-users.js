module.exports = {
    name: "message",
    run: async (client, message) => {
        if (client.userCache.has(message.author.id)) {
            return;
        } else {
            client.userCache.set(message.author.id, message.author);
        }
    }
}