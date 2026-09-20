const natural = require("natural");
const analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");
function analyze(text) { return analyzer.getSentiment(new natural.WordTokenizer().tokenize(text)); }
if (require.main === module) console.log("GiftLink sentiment service ready.");
module.exports = { analyze };
