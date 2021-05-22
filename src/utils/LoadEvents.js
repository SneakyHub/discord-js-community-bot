const path = require("path");
const fs = require("fs");
const LoadEvents = require("./LoadEvents");

module.exports.run = async (client, dir = "") => {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdirSync(filePath);
    for (const file of files) {
        const stat = await fs.lstatSync(path.join(filePath, file));
        if (stat.isDirectory()) LoadEvents.run(client, path.join(dir, file));
        if (file.endsWith('.js')) {
            const event = require(path.join(filePath, file));
            if (event.disabled == true) {
                continue;
            }
            client.on(event.name, event.run.bind(event, client))
        }
    }
}