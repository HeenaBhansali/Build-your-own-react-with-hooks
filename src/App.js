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

let nextUnitOfWork = null

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfUnit)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfUnit) {}

const Didact = {
  createElement,
  render
}

/** @jsx Didact.createElement */
const element = (
  <div>
    <h1> Hello World</h1>
    <h2> from didact </h2>
  </div>
)

const container = document.getElementById("root")
Didact.render(element, container)
