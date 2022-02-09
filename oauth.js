const Client = require('disco-oauth');
const client = new Client(process.env.id, process.env.secret);

client.setScopes('identify', 'guilds');
client.setRedirect('https://node-server.darkmole.repl.co/login');

module.exports = client;