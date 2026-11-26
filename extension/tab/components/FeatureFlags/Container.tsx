import React from 'react'
import {
  DefaultFeatureFlags,
  featureFlagOptions,
  FeatureFlags,
  saveFeatureFlags
} from '../../../utils/featureFlags'
import useFeatureFlags from './hooks/useFeatureFlags'
const FeatureFlagsContainer = () => {
  const { featureFlags, setFeatureFlags, loading } = useFeatureFlags()

  const saveFlags = async () => {
    await saveFeatureFlags(featureFlags ?? {})
    onClose()
  }

  const onClose = () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    urlSearchParams.delete('experimental')
    window.location.search = urlSearchParams.toString()
  }

  const toggleFeatureFlag = (flag: FeatureFlags) => () => {
    setFeatureFlags((flags) => ({
      ...flags,
      [flag]: !flags?.[flag]
    }))
  }

  const isFeatureFlagChecked = (flag: FeatureFlags) => {
    const flagValue = featureFlags?.[flag]

    return flagValue === false
      ? false
      : flagValue || DefaultFeatureFlags.includes(flag)
  }

  return (
    <div style={{ padding: '32px 0' }}>
      {loading && 'Loading...'}

      {!loading &&
        featureFlagOptions.map((featureOption) => (
          <div
            key={featureOption.value}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-black)'
            }}
          >
            <div></div>
            <input
              type="checkbox"
              data-testid={`feature-checkbox-${featureOption.value}`}
              checked={isFeatureFlagChecked(featureOption.value)}
              onChange={toggleFeatureFlag(featureOption.value)}
            />

            <div>{featureOption.label}</div>
          </div>
        ))}

      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          padding: '16px 0'
        }}
      >
        <button onClick={onClose}>Close</button>
        <button data-testid="save-flags" onClick={saveFlags}>
          Save
        </button>
      </div>
    </div>
  )
}

export default FeatureFlagsContainer
