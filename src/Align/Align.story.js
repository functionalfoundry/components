import React from 'react'
import ReactDOM from 'react-dom'
import { storiesOf, action } from '@kadira/storybook'
import Align from '.'
import PreviewContainer from '../PreviewContainer/PreviewContainer'
import Preview from '../Preview'

storiesOf('Align', module)
  .add('Regular', () => (
    <PreviewContainer
      shade='dark'
    >
      <Preview
        label='Center Right Center Left'
        theme={{ content: styles.preview }}
      >
        <Align
          portalVertical='Center'
          portalHorizontal='Right'
          targetVertical='Center'
          targetHorizontal='Left'
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview
        label='Center Right Center Left + on edge of screen'
        theme={{
          content: {
            marginRight: 400,
          }
        }}
      >
        <Align
          portalVertical='Center'
          portalHorizontal='Right'
          targetVertical='Center'
          targetHorizontal='Left'
          portal={<div style={styles.portal}>Portal</div>}
          onRealign={action('onRealign 1')}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview
        label='Center Left Center Right'
        theme={{ content: styles.preview }}
      >
        <Align
          portalVertical='Center'
          portalHorizontal='Left'
          targetVertical='Center'
          targetHorizontal='Right'
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview
        label='Top Right Top Left'
        theme={{ content: styles.preview }}
      >
        <Align
          portalVertical='Top'
          portalHorizontal='Right'
          targetVertical='Top'
          targetHorizontal='Left'
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview
        label='Top Left Bottom Right'
        theme={{ content: styles.preview }}
      >
        <Align
          portalVertical='Top'
          portalHorizontal='Left'
          targetVertical='Bottom'
          targetHorizontal='Right'
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview
        label='Bottom Right Top Left'
        theme={{ content: styles.preview }}
      >
        <Align
          portalVertical='Bottom'
          portalHorizontal='Right'
          targetVertical='Top'
          targetHorizontal='Left'
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview
        label='Top Left Top Right'
        theme={{ content: styles.preview }}
      >
        <Align
          portalVertical='Top'
          portalHorizontal='Left'
          targetVertical='Top'
          targetHorizontal='Right'
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview
        label='Bottom Center Top Center'
        theme={{ content: styles.preview }}
      >
        <Align
          portalVertical='Bottom'
          portalHorizontal='Center'
          targetVertical='Top'
          targetHorizontal='Center'
          portal={<div style={styles.portal}>Portal</div>}
        >
          <div style={styles.target}>Target content</div>
        </Align>
      </Preview>
      <Preview
        label='Top Left Bottom Left + fixed width'
        theme={{ content: styles.preview }}
      >
        <Align
          portalVertical='Top'
          portalHorizontal='Left'
          targetVertical='Bottom'
          targetHorizontal='Left'
          portal={<div style={{ ...styles.portal, width: 150 }}>Portal</div>}
        >
          <div style={{ ...styles.target, width: 150 }}>Target content</div>
        </Align>
      </Preview>
    </PreviewContainer>
  ))

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
