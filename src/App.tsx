import { useState } from 'react'
import MultiFilter from './components/MultiFilter'
import { MultiFilterType } from './types/MultifilterTypes'

import './App.css'

function App() {
  const [mFilters, setMFilters] = useState<MultiFilterType>({
    filters: [{
      name: 'MS1',
      type: 'multi-select',
      options: ['xx', 'yy', 'zz']
    }, {
      name: 'MS2',
      type: 'multi-select',
      options: ['aa', 'ss', 'dd']
    }, {
      name: 'lol2',
      type: 'date-range'
    }, {
      name: 'lol3',
      type: 'num-range'
    }],
  })

  return (
    <div className="App">
      <MultiFilter filters={mFilters} updateFilter={setMFilters} />
      <pre>
        {JSON.stringify(mFilters, null, 2)}
      </pre>
    </div>
  )
}

export default App
