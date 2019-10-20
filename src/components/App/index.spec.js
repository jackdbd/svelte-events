import App from './index.svelte'
import { render } from '@testing-library/svelte'

describe('App', () => {
  it('starts from an overview page with a meetup grid and controls', () => {
  const { getByTestId } = render(App)
    expect(getByTestId('meetups-grid')).toBeInTheDocument()
    expect(getByTestId('meetups-controls')).toBeInTheDocument()
  })
})
