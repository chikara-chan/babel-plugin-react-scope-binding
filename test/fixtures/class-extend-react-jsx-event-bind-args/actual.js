import { Component } from 'react'

class A extends Component {
  constructor() {
    super()

    this.state = {
      a: 1
    }
  }

  handleClick(e, ...args) {
    this.setState({
      a: args
    })
  }

  say() {
    const args = [1, 2, 3]

    return (
      <div>
        <a href="javascript:void(0)" onClick={this.handleClick(...args)}>link</a>
      </div>
    )
  }
}
