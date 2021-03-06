import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Align from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

/* eslint-disable react/no-multi-comp */

storiesOf('Align', module)
  .add('Regular', () => (
    <PreviewContainer shade="dark">
      <Preview label="Top" theme={{ content: styles.preview }}>
        <Align position="Top" portal={<div style={styles.portal}>Portal</div>}>
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Right" theme={{ content: styles.preview }}>
        <Align position="Right" portal={<div style={styles.portal}>Portal</div>}>
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Bottom" theme={{ content: styles.preview }}>
        <Align position="Bottom" portal={<div style={styles.portal}>Portal</div>}>
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Left" theme={{ content: styles.preview }}>
        <Align position="Left" portal={<div style={styles.portal}>Portal</div>}>
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Top Right, Gravity Right" theme={{ content: styles.preview }}>
        <Align
          position="Top Right"
          gravity="Right"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Top Right, Gravity Top" theme={{ content: styles.preview }}>
        <Align
          position="Top Right"
          gravity="Top"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Top Right, Gravity Corner" theme={{ content: styles.preview }}>
        <Align
          position="Top Right"
          gravity="Corner"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Bottom Right, Gravity Right" theme={{ content: styles.preview }}>
        <Align
          position="Bottom Right"
          gravity="Right"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Bottom Right, Gravity Corner" theme={{ content: styles.preview }}>
        <Align
          position="Bottom Right"
          gravity="Corner"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Bottom Right, Gravity Bottom" theme={{ content: styles.preview }}>
        <Align
          position="Bottom Right"
          gravity="Bottom"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Bottom Left, Gravity Bottom" theme={{ content: styles.preview }}>
        <Align
          position="Bottom Left"
          gravity="Bottom"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Bottom Left, Gravity Corner" theme={{ content: styles.preview }}>
        <Align
          position="Bottom Left"
          gravity="Corner"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Bottom Left, Gravity Left" theme={{ content: styles.preview }}>
        <Align
          position="Bottom Left"
          gravity="Left"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Top Left, Gravity Left" theme={{ content: styles.preview }}>
        <Align
          position="Top Left"
          gravity="Left"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Top Left, Gravity Corner" theme={{ content: styles.preview }}>
        <Align
          position="Top Left"
          gravity="Corner"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview label="Top Left, Gravity Top" theme={{ content: styles.preview }}>
        <Align
          position="Top Left"
          gravity="Top"
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
    </PreviewContainer>
  ))
  .add('targetSelector', () => (
    <div style={{ position: 'relative' }}>
      <Align
        gravity="Right"
        portal={<div style={{ backgroundColor: 'blue', height: 30, width: 30 }} />}
        position="Bottom Right"
        targetSelector="#target"
      />
      <div
        id="target"
        style={{
          backgroundColor: 'red',
          height: 100,
          position: 'relative',
          top: 300,
          left: 300,
          width: 100,
        }}
      />
    </div>
  ))
  .add('targetRef', () => <AlignContainerWithTargetRef />)
  .add('resizing', () => (
    <PreviewContainer>
      <Preview label="Monitoring element and window resize">
        <AlignContainerWithResizing monitorElementRezize />
      </Preview>
    </PreviewContainer>
  ))

class AlignContainerWithTargetRef extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetRef: null,
    }
  }
  saveRefToTarget = targetRef => this.setState({ targetRef })
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Align
          gravity="Right"
          portal={<div style={{ backgroundColor: 'blue', height: 30, width: 30 }} />}
          position="Bottom Right"
          targetRef={this.state.targetRef}
        />
        <div
          ref={this.saveRefToTarget}
          style={{
            backgroundColor: 'red',
            height: 100,
            position: 'relative',
            top: 300,
            left: 300,
            width: 100,
          }}
        />
      </div>
    )
  }
}

const lengths = [50, 100, 300]

class VariableSizeBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 50,
      width: 50,
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState({
        height: lengths[Math.floor(Math.random() * 3)],
        width: lengths[Math.floor(Math.random() * 3)],
      })
    }, 1000)
  }
  render() {
    return (
      <div
        ref={this.saveRefToTarget}
        style={{
          backgroundColor: 'red',
          position: 'relative',
          height: this.state.height,
          width: this.state.width,
        }}
      >
        {'target'}
      </div>
    )
  }
}

class AlignContainerWithResizing extends React.Component {
  props: {
    monitorElementRezize: boolean,
  }
  constructor(props) {
    super(props)
    this.state = {
      targetRef: null,
    }
  }
  saveRefToTarget = targetRef => this.setState({ targetRef })
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Align
          gravity="Right"
          monitorElementRezize={this.props.monitorElementRezize}
          portal={<div style={{ backgroundColor: 'blue', height: 30, width: 30 }} />}
          position="Bottom Right"
          targetRef={this.state.targetRef}
        />
        <VariableSizeBox ref={this.saveRefToTarget} />
      </div>
    )
  }
}

const commonStyle = {
  padding: 8,
  color: '#232323',
  fontFamily: 'sans-serif',
}

const styles = {
  target: {
    ...commonStyle,
    backgroundColor: 'cyan',
  },
  portal: {
    ...commonStyle,
    backgroundColor: 'purple',
    color: 'white',
    height: 40,
    fontSize: 12,
  },
  preview: {
    alignItems: 'center',
  },
}
