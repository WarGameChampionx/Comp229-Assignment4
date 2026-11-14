
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Projects from './Projects'
import { getProjects } from '../services/api'

// Replace real API calls with controlled test responses.
vi.mock('../services/api', () => ({
    getProjects: vi.fn()
}))

describe('Projects page', () => {
    it('displays projects returned by the API', async () => {
        getProjects.mockResolvedValue([
            {
                _id: '1',
                title: 'Factory Through The Ages',
                description: 'A browser-based factory game.'
            }
        ])

        render(<Projects />)

        expect(screen.getByRole('status'))
            .toHaveTextContent('Loading projects...')

        expect(
            await screen.findByRole('heading', {
                name: 'Factory Through The Ages'
            })
        ).toBeInTheDocument()

        expect(
            screen.getByText('A browser-based factory game.')
        ).toBeInTheDocument()
    })

    it('displays an error when the API fails', async () => {
        getProjects.mockRejectedValue(
            new Error('Network error')
        )

        render(<Projects />)

        expect(
            await screen.findByRole('alert')
        ).toHaveTextContent(
            'Unable to load projects: Network error'
        )
    })

    it('displays a message when no projects exist', async () => {
        getProjects.mockResolvedValue([])

        render(<Projects />)

        expect(
            await screen.findByText(
                'No projects are currently available.'
            )
        ).toBeInTheDocument()
    })
})
