
const componentFactory = ({
  initialState = {},
  Component,
  dataProps,
  functionProps,
}) => {
  class LiveViewFixture extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        ...initialState,
        ...this.getBoundFunctions
      }
    }

    componentWillMount() {

    }

    componentWillReceiveProps() {

    }

    render() {

    }
  }
  return LiveViewFixture
}
