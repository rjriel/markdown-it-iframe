# markdown-it-iframe

[![Build Status](https://img.shields.io/travis/markdown-it/markdown-it-iframe/master.svg?style=flat)](https://travis-ci.org/markdown-it/markdown-it-iframe)
[![NPM version](https://img.shields.io/npm/v/markdown-it-iframe.svg?style=flat)](https://www.npmjs.org/package/markdown-it-iframe)
[![Coverage Status](https://img.shields.io/coveralls/markdown-it/markdown-it-iframe/master.svg?style=flat)](https://coveralls.io/r/markdown-it/markdown-it-iframe?branch=master)

> Iframe (`<iframe>`) tag plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

__v1.+ requires `markdown-it` v4.+, see changelog.__

Markdown:

```
Below will render an iframe

/i/https://www.youtube.com/embed/qkcx0kf6jME
```

HTML:

```html
<p>Below will render an iframe</p>
<div class="iframe-container">
<iframe frameborder="0" src="https://www.youtube.com/embed/qkcx0kf6jME"></iframe>
</div>
```

## Install

node.js, browser:

```bash
npm install markdown-it-iframe --save
bower install markdown-it-iframe --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-iframe'));

md.render(/*...*/) // see example above
```

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitIframe`.


## License

[MIT](https://github.com/markdown-it/markdown-it-iframe/blob/master/LICENSE)
