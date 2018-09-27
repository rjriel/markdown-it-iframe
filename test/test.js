"use strict"

var path = require("path")
var generate = require("markdown-it-testgen")

/*eslint-env mocha*/

describe("markdown-it-iframe basic", function() {
  var md = require("markdown-it")().use(require("../"))

  generate(path.join(__dirname, "fixtures/iframe.txt"), md)
})

describe("markdown-it-iframe with no render", function() {
  var md = require("markdown-it")({ linkify: true }).use(require("../"), {
    renderIframe: false
  })

  generate(path.join(__dirname, "fixtures/iframe-renderIframe.txt"), md)
})

describe("markdown-it-iframe with options", function() {
  var md = require("markdown-it")({ linkify: true }).use(require("../"), {
    renderIframe: true,
    width: 800,
    height: 600,
    allowfullscreen: true,
    frameborder: 1
  })

  generate(path.join(__dirname, "fixtures/iframe-options.txt"), md)
})
