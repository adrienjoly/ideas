const json = require('./' + (process.argv[2] || 'wunderlist-20170805-16-12-22.json'));
const LIST_ID = process.argv[3] || 131400047; // "ideas" list
const URL_PREFIX = process.argv[4] || 'https://adrienjoly.com/ideas#';
const TWITTER_USERNAME = process.argv[5] || 'adrienjoly';

const highlightTags = str => !str ? '' : str
  .replace(/(^|[\( ])(\#[^\,\) $]+)/g, '$1<span class="hashtag">$2</span>');

const renderLinks = str => !str ? '' : str
  .replace(/(^|[\( )])(https?\:\/\/([^\/\,\) $]+)[^\,\) $]*)/g, `$1<a href="$2">$3</a>`);

const processText = str => renderLinks(highlightTags(str));

const sanitize = str => !str ? '' : str
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');
/*
const makeTwitterButton = (text, id, via, hastag) => `
  <span id="${id}" class="vote-button">
    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw"
       class="twitter-share-button"
       data-text="${sanitize(text)}"
       data-url="${sanitize(URL_PREFIX + id)}"
       data-via="${sanitize(via)}"
       data-hashtags="${sanitize(hastag)}"
       data-related="${sanitize(via)}"
       data-show-count="true">Tweet
    </a>
    <a href="http://leadstories.com/opensharecount"
       target="_blank"
       class="osc-counter"
       data-dir="left"
       title="Powered by Lead Stories' OpenShareCount">0</a>
  </span>`;
*/

const makeTwitterButton = (text, id, via, hastag) => `
  <div id="${id}" class="vote-button">
    <div class="btn-o" data-scribe="component:button" style="width: 61px;">
      <a href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fadrienjoly.com%2Fideas%2F&amp;ref_src=twsrc%5Etfw&amp;related=${encodeURIComponent(via)}&amp;text=${encodeURIComponent(text)}&amp;tw_p=tweetbutton&amp;url=${encodeURIComponent(URL_PREFIX + id)}&amp;via=${encodeURIComponent(via)}" class="btn" onclick="window.open(this.href);return false;">
        <i></i>
        <span class="label">Tweet</span>
      </a>
    </div>
  </div>`;

const items = json.data.tasks.filter(task => task.list_id == LIST_ID).reverse();

// jekyll frontmatter
console.log('---\ntitle: Adrien Joly\'s ideas\n---\n');
console.log('<link rel="stylesheet" href="tests/tweet-btn.css?v2">');

console.log('## Done');

items.filter(task => task.completed).forEach((task) => console.log(
  '-',
  processText(task.title),
  '✅'
));

console.log('## Not done yet');

items.filter(task => !task.completed && task.title[0] !== '(').forEach((task) => console.log(
  '-',
  processText(task.title),
  makeTwitterButton('Idea: ' + task.title, task.id, TWITTER_USERNAME)
));

//<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
//<script async type="text/javascript" src="https://opensharecount.com/bubble.js"></script>
console.log(`
<style>
  .hashtag{ color: #0366d6 }
  .vote-button{ display:inline-block; opacity:0.5; }
</style>`);
