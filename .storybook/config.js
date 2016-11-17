import { configure } from '@kadira/storybook'
// import insertFont from './insertFont'

// insertFont()

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}

function loadStories() {
  requireAll(require.context('../src', true, /story\.js?$/))
}

configure(loadStories, module)
