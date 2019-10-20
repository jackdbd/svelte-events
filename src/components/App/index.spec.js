import App from './index.svelte'
import { render } from '@testing-library/svelte'

describe('App', () => {
    it('should render the app', () => {
        const { container } = render(App)

        expect(container.getElementsByClassName('layout').length).toBe(1)
        expect(container.getElementsByClassName('image-content').length).toBe(1)
        expect(container.getElementsByClassName('bg-image').length).toBe(1)
    })
})
