/* @flow */
import React from 'react'

type PropsT = {
  name?: string,
  title?: string,
  count?: number,
}

const TestComponent = ({ name, title, count }: PropsT) => (
  <div>
    {title}
    {name}
    {count}
  </div>
)
// type StateT = {}
//
// class TestComponent extends React.Component {
//   props: PropsT
//   state: StateT
//   constructor(props: PropsT) {
//     super(props)
//     this.state = {}
//   }
//
//   render() {
//     const {
//       name,
//       title,
//       count,
//     } = this.props
//     return (
//       <div>
//         {name}
//         {title}
//         {count}
//       </div>
//     )
//   }
// }

export default TestComponent
