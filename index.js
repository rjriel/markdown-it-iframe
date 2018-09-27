// allow iframes in markdown
//
"use strict"

module.exports = function iframe_plugin(md, options) {
  const attrs = []

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
    let ch, token

    const pos = state.bMarks[startLine] + state.tShift[startLine],
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

    const content = state.src.slice(pos + 3, max).trim()
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
