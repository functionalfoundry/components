/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { Power2, TweenMax } from 'gsap'
import Grid from 'react-virtualized/dist/commonjs/Grid'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'

type PropsT = {
  renderer: Function,
  onClickItem: Function,
  rowHeight: number,
  flush: boolean,
  data: Array<any>,
  overscanRowCount: number,
  rowHeight: number,
  theme: Object,
}

type StateT = {
  columnCount: number,
  height: number,
  overscanColumnCount: number,
  overscanRowCount: number,
  rowHeight: number,
  rowCount: number,
}

const defaultProps = {
  minColumnWidth: 350,
  overscanRowCount: 4,
  rowHeight: 300,
}

export default class VirtualizedGrid extends React.Component {
  props: PropsT
  state: StateT
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.state = {
      columnCount: this.getColumnCount(props),
      height: this.getHeight(props),
      overscanColumnCount: 0,
      overscanRowCount: props.overscanRowCount,
      rowHeight: props.rowHeight,
      rowCount: this.getRowCount(props),
    }
    this.gridWidth = 0
    this.gridHeight = 0
  }

  componentDidMount(callback?: Function) {
    const gridChild = ReactDOM.findDOMNode(this.gridContainer).childNodes
    setTimeout(() => {
      // The children aren't available for another tick
      const children = gridChild[0].childNodes
      TweenMax.set(children, {
        transformOrigin: '50% 50%',
      })

      TweenMax.staggerFromTo(
        children,
        0.8,
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          onComplete: callback,
          ease: Power2.easeOut,
        },
        0.1
      )
    })
  }

  componentWillUnmount(callback?: Function) {
    const gridChild = ReactDOM.findDOMNode(this.gridContainer).childNodes
    const children = gridChild[0].childNodes

    TweenMax.set(children, {
      transformOrigin: '50% 50%',
    })

    TweenMax.staggerTo(
      children,
      0.8,
      {
        scale: 0.9,
        opacity: 0,
        onComplete: callback,
        ease: Power2.easeIn,
      },
      0.1
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rowCount: this.getRowCount(nextProps),
      rowHeight: nextProps.rowHeight,
      overscanRowCount: nextProps.overscanRowCount,
    })
  }

  getRowCount = props => {
    return Math.ceil(props.data.length / this.getColumnCount(props))
  }

  getColumnCount = props => {
    if (!this.gridWidth) return 3
    return Math.floor(this.gridWidth / props.minColumnWidth)
  }

  getHeight = props => {
    return this.getRowCount(props) * props.rowHeight
  }

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const { data, renderer } = this.props
    const { columnCount } = this.state
    const Item = renderer
    const datum = data[rowIndex * columnCount + columnIndex]
    return (
      <div key={key} style={{ ...style, display: 'flex' }}>
        {datum && <Item {...datum} />}
      </div>
    )
  }

  getColumnWidth = () => {
    return this.gridWidth / this.state.columnCount
  }

  noContentRenderer = () => {
    return <div>No cells</div>
  }

  handleResize = ({ width }) => {
    const node = ReactDOM.findDOMNode(this)
    this.gridWidth = width
    this.gridHeight = node !== null ? node.parentNode.offsetHeight : 0

    const newColumnCount = this.getColumnCount(this.props)
    if (newColumnCount !== this.state.columnCount) {
      this.setState({
        columnCount: newColumnCount,
        rowCount: this.getRowCount(this.props),
      })
    }
  }

  render() {
    const {
      columnCount,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
    } = this.state

    return (
      <AutoSizer onResize={this.handleResize} disableHeight>
        {({ width }) => (
          <Grid
            ref={c => (this.gridContainer = c)}
            cellRenderer={this.cellRenderer}
            columnWidth={width / this.state.columnCount}
            columnCount={columnCount}
            height={this.gridHeight}
            noContentRenderer={this.noContentRenderer}
            overscanColumnCount={overscanColumnCount}
            overscanRowCount={overscanRowCount}
            rowHeight={rowHeight}
            rowCount={rowCount}
            width={width}
          />
        )}
      </AutoSizer>
    )
  }
}
