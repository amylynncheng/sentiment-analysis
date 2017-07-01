'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Your Google Cloud Platform project ID
const projectId = 'animal-guesser-76145';

// Instantiates a client
const language = Language({
  projectId: projectId
});

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());
restService.post('/reply', function(req, res) {
    var action = req.body.result.action;
    // The text to analyze
    var text = 'Hello, world!';
    var output = '';
  
    if (action === "sentiment.analysis") {
      // Detects the sentiment of the text
      language.detectSentiment(text)
        .then((results) => {
          const sentiment = results[0];

          console.log(`Text: ${text}`);
          console.log(`Sentiment score: ${sentiment.score}`);
          console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
        })
        .catch((err) => {
          console.error('ERROR:', err);
        });
        output = `Sentiment score: ${sentiment.score}`;
    }
  
   return res.json({
        speech: output,
        displayText: output,
        source: "sentiment-analysis"
    });
});

restService.listen((process.env.PORT || 8080), function() {
    console.log("Server up and running");
});
