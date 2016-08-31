import { configure } from '@kadira/storybook' // eslint-disable-line
import insertFont from './insertFont'

insertFont()

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}

function loadStories() {
  requireAll(require.context('..', true, /story\.js?$/))
}

configure(loadStories, module)
