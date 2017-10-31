const json = require('./' + (process.argv[2] || 'wunderlist-20170805-16-12-22.json'));
const LIST_ID = process.argv[3] || 131400047; // "ideas" list
const URL_PREFIX = process.argv[4] || 'https://adrienjoly.com/ideas#';
const TWITTER_USERNAME = process.argv[5] || 'adrienjoly';

const sanitize = str => !str ? '' : str
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const makeTwitterButton = (text, url, via, hastag) => `<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="${sanitize(text)}" data-url="${sanitize(url)}" data-via="${sanitize(via)}" data-hashtags="${sanitize(hastag)}" data-related="${sanitize(via)}" data-show-count="true">Tweet</a><a href="http://leadstories.com/opensharecount" target="_blank" class="osc-counter" data-dir="left" title="Powered by Lead Stories' OpenShareCount">0</a>`;

const items = json.data.tasks.filter(task => task.list_id == LIST_ID).reverse();

console.log('## Done');

items.filter(task => task.completed).forEach((task) => console.log(
  '-',
  task.title,
  '✅'
));

console.log('## Not done yet');

items.filter(task => !task.completed).forEach((task) => console.log(
  '-',
  task.title,
  makeTwitterButton('Idea: ' + task.title, URL_PREFIX + task.id, TWITTER_USERNAME)
));

console.log('<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>');
console.log('<script type="text/javascript" src="//opensharecount.com/bubble.js"></script>');
