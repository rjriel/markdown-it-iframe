/*! markdown-it-iframe 1.0.0 https://github.com//rjriel/markdown-it-iframe @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitIframe = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// allow iframes in markdown
//
"use strict"

module.exports = function iframe_plugin(md, options) {
  var attrs = []
  options = options || {}

  if (options.renderIframe == null) {
    options.renderIframe = true
  }

  if (options.allowfullscreen) {
    attrs.push(["allowfullscreen"])
  }
  attrs.push(["frameborder", options.frameborder || 0])

  if (options.width) {
    attrs.push(["width", options.width])
  }
  if (options.height) {
    attrs.push(["height", options.height])
  }

  function iframe(state, startLine, endLine, silent) {
    var ch, token

    var pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine]

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    ch = state.src.substring(pos, pos + 3)

    if (ch !== "/i/" || pos + 4 >= max) {
      return false
    }

    if (silent) {
      return true
    }

    state.line = startLine + 1

    var content = state.src.slice(pos + 3, max).trim()
    if (content.indexOf(":") < 0) {
      return false
    }

    if (options.renderIframe) {
      token = state.push("div_open", "div", 1)
      token.attrs = [["class", "iframe-container"]]
      token = state.push("iframe_open", "iframe", 1)
      token.markup = "/i/"
      token.attrs = attrs.concat([["src", content]])
      token.map = [startLine, state.line]

      token = state.push("iframe_close", "iframe", -1)
      token.markup = "/i/"
      token = state.push("div_close", "div", -1)
    } else {
      token = state.push("paragraph_open", "p", 1)
      token.markup = "/i/"

      token = state.push("text", "", 0)
      token.content =
        "iFrame rendering can be buggy, so please only render iframes when the URL is complete\n"

      token = state.push("text", "", 0)
      token.content = ch + content

      token = state.push("paragraph_close", "p", -1)
      token.markup = "/i/"
    }

    return true
  }

  md.block.ruler.before("paragraph", "iframe", iframe)
}

},{}]},{},[1])(1)
});
