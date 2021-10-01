const express = require('express');
const request = require('request');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/api/chat", (req, res) => {
    const options = {
        uri:"https://main-openchat-fpem123.endpoint.ainize.ai/send/bak405",
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        form: {
            bot_id: req.query.botId,
            text: req.query.message,
            topic:"all",
            agent:"blender.medium",
        }
    };

    request.post(options, function(err, httpResponse, body){
//        var text = JSON.parse(body).output;
         res.send(body);
    });
});

app.listen(PORT, () => console.log());
