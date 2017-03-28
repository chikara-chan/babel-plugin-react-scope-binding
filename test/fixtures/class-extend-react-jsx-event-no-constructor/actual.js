import { Component } from 'react'

class A extends Component {
  handleClick() {
    this.setState({
      a: 2
    })
  }

  say() {
    return (
      <div>
        <a href="javascript:void(0)" onClick={this.handleClick}>link</a>
      </div>
    )
  }
}
