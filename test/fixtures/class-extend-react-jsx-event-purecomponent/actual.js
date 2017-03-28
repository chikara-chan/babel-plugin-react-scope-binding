import { PureComponent } from 'react'

class A extends PureComponent {
  constructor() {
    super()

    this.state = {
      a: 1
    }
  }

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
