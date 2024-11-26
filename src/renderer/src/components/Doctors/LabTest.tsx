import { LabTest } from '@renderer/types/Doctor'
import { useRecoilState, useRecoilValue } from 'recoil'
import { labTestsState, selectedLabTestsState } from './stores'

export const LabTestExamination = () => {
  const [selectedLabTests, setSelectedLabTests] = useRecoilState(selectedLabTestsState)
  const labTests = useRecoilValue<LabTest[]>(labTestsState)
  const handleLabTestSelect = (testId: number) => {
    setSelectedLabTests((prev) =>
      prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]
    )
    console.log('handleLabTestSelect', selectedLabTests)
  }
  return (
    <div className="mt-4 space-y-2">
      {labTests?.map((test) => (
        <div key={test.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`test-${test?.id}`}
            checked={selectedLabTests?.includes(test?.id)}
            onChange={() => handleLabTestSelect(test?.id)}
          />
          <label htmlFor={`test-${test.id}`}>{test.name}</label>
        </div>
      ))}

      <button
        onClick={() => console.log('selectedLabTests', selectedLabTests)}
        className="w-full text-white btn btn-outline btn-primary rounded-xl"
      >
        Chỉ định xét nghiệm
      </button>
    </div>
  )
}
