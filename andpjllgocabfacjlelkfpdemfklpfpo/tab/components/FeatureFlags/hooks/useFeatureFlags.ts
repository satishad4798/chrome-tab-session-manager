import { useEffect, useState } from 'react'
import {
  FeatureFlags,
  retrieveFeatureFlags
} from '../../../../utils/featureFlags'

const useFeatureFlags = () => {
  const [featureFlags, setFeatureFlags] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    retrieveFeatureFlags()
      .then(setFeatureFlags)
      .finally(() => setLoading(false))
  }, [])

  return { featureFlags, setFeatureFlags, loading }
}

export default useFeatureFlags
