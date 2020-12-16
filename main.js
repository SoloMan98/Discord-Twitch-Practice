//Server Modules
const http = require('http');
const fs = require('fs');

//Discord API Modules
const Discord = require('discord.js');
const client = new Discord.Client();
const hook = new Discord.WebhookClient('');
hook.send('Connection started')

//Twitch API Modules
const tmi = require('tmi.js');
const tmiOpts = {
          identity: {
            username: "",
            password: ""
          },
          channels: [
            ""
          ]
        };
const tmiClient = new tmi.client(tmiOpts);

tmiClient.on('message', function(target, context, msg, self){
    hook.send(target.trim());
    hook.send(context.trim());
    // hook.send(self.trim());
    hook.send(msg.trim());
});
tmiClient.on('connected', function(addr, port){
    console.log(`* Connected to ${addr}:${port}`);
});
tmiClient.connect();

http.createServer(function(req,res){
    if (req.method == 'POST'){
        let body = '';
        req.on('data', function(data){
            body += data
            console.log(body);
            hook.send(body)
        })
        req.on('end', function(){
            res.end();
        })
    } else {
        fs.readFile('input.html', function(err, data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data);
            res.end();
        });
    };
}).listen(8080);
