import { HashRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Layout } from './components/layout'
import { ConfigProvider } from 'antd'
import { configAntd } from './css/configAntd'
import { Toaster } from 'react-hot-toast'

function App(): JSX.Element {
  return (
    <>
      <RecoilRoot>
        <HashRouter>
          <ConfigProvider theme={configAntd}>
            <Layout />
          </ConfigProvider>
        </HashRouter>
      </RecoilRoot>
      <Toaster />
    </>
  )
}

export default App
