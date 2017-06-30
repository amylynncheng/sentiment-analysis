// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Your Google Cloud Platform project ID
const projectId = 'YOUR_PROJECT_ID';

// Instantiates a client
const language = Language({
  projectId: projectId
});

// The text to analyze
const text = 'Hello, world!';

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
