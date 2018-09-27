# markdown-it-iframe

[![Build Status](https://img.shields.io/travis/rjriel/markdown-it-iframe/master.svg?style=flat)](https://travis-ci.org/rjriel/markdown-it-iframe)
[![NPM version](https://img.shields.io/npm/v/markdown-it-iframe.svg?style=flat)](https://www.npmjs.org/package/markdown-it-iframe)
[![Coverage Status](https://img.shields.io/coveralls/rjriel/markdown-it-iframe/master.svg?style=flat)](https://coveralls.io/r/rjriel/markdown-it-iframe?branch=master)

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

`markdown-it-iframe` also supports the following options:

```
{
    allowfullscreen: true,
    width: 800,
    height: 600,
    frameborder: 1, // default: 0
    renderIframe: false // default: true
}
```

If you want to do a live preview of markdown rendering you will run into performance
issues when the user is typing out a URL for the iframe. The reason for this is that
markdown-it tries to render the URL being typed out with every keystroke. To combat this
you can specify `renderIframe: false`. This will print a message with the markdown instead
of the actual iframe.

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitIframe`.


## License

[MIT](https://github.com/markdown-it/markdown-it-iframe/blob/master/LICENSE)
