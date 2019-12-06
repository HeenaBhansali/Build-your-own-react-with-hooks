function createElement(type, props, ...children) {
  return {
    type,
    props: {
      children: children.map(child =>
        typeof child === "object" ? child : creteTextElement(child)
      )
    }
  }
}

function creteTextElement(text) {
  return {
    type: "Text_Element",
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function render(element, container) {
  const dom =
    element.type == "Text_Element"
      ? document.createTextNode("")
      : document.createElement(element.type)

  const isProperty = key => key !== "children"

  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  element.props.children.forEach(child => render(child, dom))
  container.appendChild(dom)
}

const Didact = {
  createElement,
  render
}
/** @jsx Didact.createElement */

const element = Didact.createElement(
  "div",
  null,
  Didact.createElement("h1", null, " Hello World"),
  Didact.createElement("h2", null, " from didact ")
)
const container = document.getElementById("root")
Didact.render(element, container)
