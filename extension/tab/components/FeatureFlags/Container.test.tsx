// @ts-nocheck

import React from 'react'
import '@testing-library/jest-dom'
import 'fake-indexeddb/auto'
import { fireEvent, render, screen } from '@testing-library/react'
import FeatureFlagsContainer from './Container'
import { act } from 'react-dom/test-utils'

describe('Test Feature Flags', () => {
  it('Checks if feature toggling works', async () => {
    const featureFlags = await import('../../../utils/featureFlags')

    await act(async () => await render(<FeatureFlagsContainer />))

    const checkbox = await screen.findByTestId(`feature-checkbox-0`)
    expect(checkbox).not.toBeChecked()
    expect(await featureFlags.hasFeatureFlag(0)).not.toBeTruthy()

    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    const saveBtn = await screen.findByTestId(`save-flags`)
    fireEvent.click(saveBtn)

    expect(await featureFlags.hasFeatureFlag(0)).toBeTruthy()

    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
    fireEvent.click(saveBtn)

    expect(await featureFlags.hasFeatureFlag(0)).not.toBeTruthy()
  })
})
