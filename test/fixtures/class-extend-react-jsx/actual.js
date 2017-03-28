import { Component } from 'react'

class A extends Component {
  constructor() {
    super()

    this.state = {
      a: 1
    }
  }

  say() {
    return (
      <div>
        <a href="javascript:void(0)">link</a>
      </div>
    )
  }
}
