const path = require("path");
const fs = require("fs");
const LoadCommands = require("./LoadCommands");

module.exports = async (client, dir = "") => {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdirSync(filePath);
    for (const file of files) {
        const stat = await fs.lstatSync(path.join(filePath, file));
        if (stat.isDirectory()) LoadCommands(client, path.join(dir, file));
        if (file.endsWith('.js')) {
            const cmd = require(path.join(filePath, file));
            if (cmd.disabled == true) {
                continue;
            }
            client.commands.set(cmd.name, cmd);
            cmd.aliases.forEach((alias) => {
                client.commands.set(alias, cmd);
            });
        }
    }
}