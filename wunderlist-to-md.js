const json = require('./' + (process.argv[2] || 'wunderlist-20170805-16-12-22.json'));
const LIST_ID = process.argv[3] || 131400047; // "ideas" list
const URL_PREFIX = process.argv[4] || 'https://adrienjoly.com/ideas#';
const TWITTER_USERNAME = process.argv[5] || 'adrienjoly';

const highlightTags = str => !str ? '' : str
  .replace(/(\#[^ ]+)/g, '<span class="hashtag">$1</span>');

const sanitize = str => !str ? '' : str
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

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

const items = json.data.tasks.filter(task => task.list_id == LIST_ID).reverse();

// jekyll frontmatter
console.log('---\ntitle: Adrien Joly\'s ideas\n---\n');

console.log('## Done');

items.filter(task => task.completed).forEach((task) => console.log(
  '-',
  highlightTags(task.title),
  '✅'
));

console.log('## Not done yet');

items.filter(task => !task.completed && task.title[0] !== '(').forEach((task) => console.log(
  '-',
  highlightTags(task.title),
  makeTwitterButton('Idea: ' + task.title, task.id, TWITTER_USERNAME)
));

console.log(`
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<script type="text/javascript" src="//opensharecount.com/bubble.js"></script>
<style>
  .hashtag{ color: #0366d6 }
  .vote-button{ display:inline-block; opacity:0.5; }
</style>`);
