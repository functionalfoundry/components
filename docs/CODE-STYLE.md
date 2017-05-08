# Workflo JavaScript Style Guide

## Overview
This document is a work in progress of code style conventions established in Workflo Javascript projects.

Unlike other code style guides (AirBnB) this is meant to be a minimalist style guide only to cover specific cases which are not already covered by Eslint or Prettier, which all Workflo Javascript projects should be using.

A good workflow for adding to this document is when a code style issue comes up in a PR, update this document to reflect the precedent set by that decision.
## Table of Contents

  1. [Classes](#classes)


## Classes
1. Prefer class properties for functions instead of binding in constructor

```javascript
// bad
class Foo {
  constructor(props) {
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    // ...
  }
}

// good
class Foo {
  onClick = () => {
    // ...
  }
}
```

## React

1. Prefer not to use arrow functions in render method.
 - Not enforced by linter because there are instances in which creating a closure is desirable and using an arrow function is acceptable.

```javascript
// bad
render () {
  return (
    <div onClick={() => this.setState({ isActive: true })}
  )
}
// good
handleClick = () => {
  this.setState({ isActive: true })
}
render () {
  return (
    <div onClick={this.handleClick}/>
  )
}
```
