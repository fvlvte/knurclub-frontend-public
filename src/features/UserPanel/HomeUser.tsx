import { Home } from './Home.tsx'
import { PersistentStore } from '../../util/PersistentStore.ts'
import { Config } from '../../util/Config.ts'
import { SRGuide } from './SRGuide.tsx'

function copyToClipboard(token: string | null) {
  navigator.clipboard.writeText(Config.getWidgetWithTokenURL(token ?? ''))
  alert('OK SKOPIOWANED')
}

export const HomeUser = () => {
  return (
    <Home>
      <SRGuide
        onCopyLink={() => copyToClipboard(PersistentStore.getKey('token'))}
      />
    </Home>
  )
}
