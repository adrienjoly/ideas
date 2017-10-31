const json = require('./' + (process.argv[2] || 'wunderlist-20170805-16-12-22.json'));
const LIST_ID = process.argv[3] || 131400047; // "ideas" list
const URL_PREFIX = process.argv[4] || 'https://adrienjoly.com/ideas#';
const TWITTER_USERNAME = process.argv[5] || 'adrienjoly';

const makeTwitterButton = (text, url, via, hastag) => `<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="${text}" data-url="${url}" data-via="${via}" data-hashtags="${hastag}" data-related="${via}" data-show-count="true">Tweet</a><a href="http://leadstories.com/opensharecount" target="_blank" class="osc-counter" data-dir="left" title="Powered by Lead Stories' OpenShareCount">0</a>`;

json.data.tasks
  .filter(task => task.list_id == LIST_ID)
  .reverse()
  .forEach((task) => console.log(
    '-',
    task.title,
    task.completed ? '✅' : '',
    makeTwitterButton('Idea: ' + task.title, URL_PREFIX + task.id, TWITTER_USERNAME)
  ));

console.log('<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>');
console.log('<script type="text/javascript" src="//opensharecount.com/bubble.js"></script>');
