import axios from 'axios'
import * as cheerio from 'cheerio'
import type { Element } from 'domhandler';

export default defineEventHandler(async () => {
  const { data: html } = await axios.get('https://georgebrook.github.io/')
  const $ = cheerio.load(html)
  const root = $('html')[0] as Element

  function convertNode(node: Element) {
    const result: Record<string, any> = {
      tag: node.tagName,
    }

    if (node.attribs && Object.keys(node.attribs).length > 0) {
      result.attributes = node.attribs
    }

    const children: any[] = []
    if (node.children) {
      for (const child of node.children) {
        if (child.type === 'tag') {
          children.push(convertNode(child as Element))
        } else if (child.type === 'text') {
          const content = child.data.trim()
          if (content) {
            children.push({ content })
          }
        }
      }
    }

    const cleanChildren = children.filter(Boolean)

    if (cleanChildren.length) {
      result.children = cleanChildren
    }

    if (
      ['meta', 'link', 'img', 'input', 'br', 'hr', 'source', 'script'].includes(result.tag) &&
      (!result.children || result.children.length === 0)
    ) {
      result.noEndTag = true
    }

    return result
  }


  const jsonTree = convertNode(root)
  return jsonTree
})
