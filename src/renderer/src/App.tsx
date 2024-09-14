import { HashRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Layout } from './components/layout'

function App(): JSX.Element {

  return (
    <RecoilRoot>
      <HashRouter>
        <Layout />
      </HashRouter>
    </RecoilRoot>
  )
}

export default App
