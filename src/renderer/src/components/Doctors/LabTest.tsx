import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import {
  createLabRequestSelector,
  createLabRequestState,
  labRequestsSlector,
  labtestListSelector,
  selectedLabTestsState
} from './stores'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Select } from 'antd'
import { TestResult } from './TestResult'
import { usePopup } from '@renderer/hooks/usePopup'

const tabs = [
  { key: 'viewSelectLabTests', label: 'Chỉ định xét nghiệm' },
  { key: 'viewResultLabTests', label: 'Kết quả xét nghiệm' }
]

export const LabTestExamination = (onSubmitExamination: {
  onSubmitExamination: (type: string) => void
}) => {
  const setSelectedLabTests = useSetRecoilState(selectedLabTestsState)
  const labRequests = useRecoilValueLoadable(labRequestsSlector)
  const [categoryLabTests, setCategoryLabTests] = useState<number[]>([])
  const labTests = useRecoilValueLoadable(labtestListSelector)
  const refreshLabRequests = useRecoilRefresher_UNSTABLE(labRequestsSlector)
  const [currentView, setCurrentView] = useState(tabs[0].key)
  const [isViewTest, setIsViewTest] = useState({
    bloodTest: false,
    mriTest: false,
    xTest: false
  })

  const setIsCreateLabRequest = useSetRecoilState(createLabRequestState)
  const createLabRequestResult = useRecoilValueLoadable(createLabRequestSelector)

  const handleLabTestSelect = (testId: number) => {
    setCategoryLabTests((prev) =>
      prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]
    )
  }

  useEffect(() => {
    if (createLabRequestResult.state === 'hasValue' && createLabRequestResult.contents) {
      setIsCreateLabRequest(false)
      usePopup('Đã tạo yêu cầu xét nghiệm thành công', 'success')
      onSubmitExamination.onSubmitExamination('labrequest')
    } else if (createLabRequestResult.state === 'hasError') {
      usePopup('Đã xảy ra lỗi khi tạo yêu cầu xét nghiệm', 'error')
      setIsCreateLabRequest(false)
    }

    console.log('createLabRequestResult.state', createLabRequestResult)
  }, [createLabRequestResult.state])

  useEffect(() => {
    if (currentView === 'viewResultLabTests') {
      console.log('labRequests', labRequests)

      refreshLabRequests()
    }
  }, [currentView])

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-2 mt-4 py-2">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => setCurrentView(tab.key)}
            className={clsx('p-2 rounded-t-md border-b-2 cursor-pointer', {
              'border-primary-700 text-primary-600 font-semibold': currentView === tab.key,
              'border-gray-300': currentView !== tab.key
            })}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {
        {
          viewSelectLabTests: (
            <>
              {labTests.state === 'loading' && (
                <div className="loading loading-bars text-primary loading-lg" />
              )}
              {labTests.state === 'hasValue' &&
                labTests.contents.map((test) => (
                  <div key={test.id} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`test-${test?.id}`}
                        checked={categoryLabTests?.includes(test?.id)}
                        onChange={() => handleLabTestSelect(test?.id)}
                      />
                      <label htmlFor={`test-${test.id}`}>{test.name}</label>
                    </div>
                    <div>
                      {categoryLabTests.includes(test.id) && test.labtests.length > 0 && (
                        <div>
                          <Select
                            mode="multiple"
                            allowClear
                            placeholder={`Chọn loại ${test.name}`}
                            options={test.labtests.map((labTest) => ({
                              label: labTest.name,
                              value: labTest.id
                            }))}
                            disabled={!categoryLabTests.includes(test.id)}
                            className="w-full"
                            onChange={(values) => {
                              setSelectedLabTests((prev) => [
                                ...prev.filter((id) => id !== test.id),
                                ...values
                              ])
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              <button
                onClick={() => setIsCreateLabRequest(true)}
                className="w-full text-white btn btn-outline btn-primary rounded-xl"
              >
                {createLabRequestResult.state === 'loading' ? (
                  <div className="loading loading-spinner text-white loading-sm" />
                ) : (
                  'Tạo yêu cầu xét nghiệm'
                )}
              </button>
            </>
          ),
          viewResultLabTests: (
            <>
              {labRequests.state === 'hasValue' && labRequests.contents?.length > 0 ? (
                <div className="space-y-3">
                  {labRequests.contents.map((labRequest) => (
                    <TestResult
                      testData={labRequest}
                      isVisible={isViewTest.bloodTest}
                      setIsVisible={(value) => setIsViewTest({ ...isViewTest, bloodTest: value })}
                    />
                  ))}
                </div>
              ) : labRequests.state === 'loading' ? (
                <div className="loading loading-bars text-primary loading-lg" />
              ) : (
                <div>Không có kết quả xét nghiệm</div>
              )}
            </>
          )
        }[currentView]
      }
    </div>
  )
}
