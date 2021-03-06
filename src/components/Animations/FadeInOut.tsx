import * as React from 'react'
import posed, { PoseGroup } from 'react-pose'

interface IProps {
  show: boolean
}
interface IState {
  show: boolean
}

const AnimationContainer = posed.div({
  enter: { y: -10, opacity: 1 },
  exit: { y: 5, opacity: 0 },
})

export class FadeInOut extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { show: props.show }
  }

  componentWillReceiveProps(props: IProps) {
    this.setState({ show: props.show })
  }

  render() {
    return (
      <PoseGroup>
        {this.state.show && (
          <AnimationContainer key="animationContainer">
            {this.props.children}
          </AnimationContainer>
        )}
      </PoseGroup>
    )
  }
}
