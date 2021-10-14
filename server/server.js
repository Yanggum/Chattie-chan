const express = require('express');
const request = require('request');
const {TranslationServiceClient} = require('@google-cloud/translate');
const translationClient = new TranslationServiceClient();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = 3000;
let resultText = ""; 
app.get("/", (req, res) => {
    res.send("Hello World");
})

async function translateText(txt) {
    // Construct request
    resultText = "";

    const request = {
      parent: `projects/strongai/locations/global`,
      contents: txt,
      mimeType: 'text/plain', // mime types: text/plain, text/html
      sourceLanguageCode: 'en',
      targetLanguageCode: 'ko-KR',
    };
  
    // Run request
    const [response] = await translationClient.translateText(request);
    for (const translation of response.translations) {
      console.log(`Translation: ${translation.translatedText}`);
      resultText += translation.translatedText + " ";
    }

    return resultText;
}

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

    request.post(options, async function(err, httpResponse, body){
        var text = JSON.parse(body).output;
        var array = [];
        array.push(text);

        var result = "";
        result = await translateText(array);

        res.send(resultText);
    });
});

app.listen(PORT, () => console.log());
