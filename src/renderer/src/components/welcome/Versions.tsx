import { useState } from 'react'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <div className="w-screen h-10 border rounded-lg bottom-0 right-0 absolute bg-slate-200">
      <ul className="flex flex-row justify-around items-center h-full">
        <li className="text-gray-500 font-semibold">Electron v{versions.electron}</li>
        <li className="text-gray-500 font-semibold">Chromium v{versions.chrome}</li>
        <li className="text-gray-500 font-semibold">Node v{versions.node}</li>
      </ul>
    </div>
  )
}

export default Versions
