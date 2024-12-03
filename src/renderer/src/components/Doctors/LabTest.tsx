import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState
} from 'recoil'
import {
  createLabRequestSelector,
  createLabRequestState,
  currentPatientState,
  labRequestsSlector,
  labtestListSelector,
  selectedLabTestsState
} from './stores'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Select } from 'antd'
import { TestResult } from './TestResult'
import { usePopup } from '@renderer/hooks/usePopup'
import { ExaminationData } from './stores/type'

const tabs = [
  { key: 'viewSelectLabTests', label: 'Chỉ định xét nghiệm' },
  { key: 'viewResultLabTests', label: 'Kết quả xét nghiệm' }
]

const bloodTest = [
  {
    id: 'BloodTest',
    name: 'Xét Nghiệm Máu',
    testResults: {
      result: 'Bình thường',
      detail: [
        {
          name: 'Hemoglobin',
          unit: 'g/dL',
          range: '12.0-16.0',
          value: 14.5,
          status: 'Bình thường',
          notes: 'Mức hemoglobin trong giới hạn bình thường, đảm bảo đủ oxy trong máu.'
        },
        {
          name: 'WBC',
          unit: 'x10^9/L',
          range: '4.0-11.0',
          value: 6.8,
          status: 'Bình thường',
          notes: 'Không có dấu hiệu nhiễm trùng hoặc viêm nhiễm.'
        },
        {
          name: 'Glucose',
          unit: 'mmol/L',
          range: '3.9-6.1',
          value: 5.2,
          status: 'Bình thường',
          notes: 'Chỉ số đường huyết bình thường, không có dấu hiệu tiểu đường.'
        },
        {
          name: 'Platelet',
          unit: 'x10^9/L',
          range: '150-400',
          value: 250,
          status: 'Bình thường',
          notes: 'Số lượng tiểu cầu trong máu ổn định.'
        },
        {
          name: 'RBC',
          unit: 'x10^12/L',
          range: '4.3-5.7',
          value: 4.8,
          status: 'Bình thường',
          notes: 'Số lượng hồng cầu trong máu ổn định.'
        },
        {
          name: 'Hematocrit',
          unit: '%',
          range: '37-47',
          value: 42,
          status: 'Bình thường',
          notes: 'Tỷ lệ hồng cầu trong máu ổn định.'
        },
        {
          name: 'MCV',
          unit: 'fL',
          range: '80-100',
          value: 90,
          status: 'Bình thường',
          notes: 'Kích thước hồng cầu trong giới hạn bình thường.'
        }
      ],
      notes: 'Xét nghiệm máu không phát hiện bất thường.',
      images: [
        'https://bizweb.dktcdn.net/100/234/598/files/xet-nghiem-cong-thuc-mau.jpg?v=1503202730035',
        'https://benhvienphuongdong.vn/public/uploads/2022/thang-3/benh-ly-lien-quan-den-hong-cau.jpg'
      ]
    }
  }
]
const mriTest = [
  {
    id: 'MRI',
    name: 'Chụp MRI',
    testResults: {
      result: 'Bình thường',
      detail: [
        {
          name: 'Hình ảnh não',
          description: 'Không phát hiện tổn thương hoặc bất thường trong cấu trúc não.',
          status: 'Bình thường',
          notes: 'Kích thước não bình thường, không có dấu hiệu phù não.',
          recommendations: 'Không cần can thiệp, tiếp tục theo dõi sức khỏe định kỳ.'
        },
        {
          name: 'Mạch máu não',
          description: 'Mạch máu thông suốt, không có dấu hiệu hẹp hoặc phình.',
          status: 'Bình thường',
          notes: 'Tuần hoàn máu trong não ổn định.',
          recommendations: 'Duy trì lối sống lành mạnh, tránh căng thẳng.'
        }
      ],
      notes: 'Hình ảnh MRI không phát hiện bất kỳ bất thường nào.',
      images: ['https://example.com/mri_normal1.jpg', 'https://example.com/mri_normal2.jpg']
    }
  }
]
const xTest = [
  {
    id: 'XRay',
    name: 'Chụp X Quang Tim, Phổi',
    testResults: {
      result: 'Bất thường nhẹ',
      detail: [
        {
          name: 'Phổi',
          description: 'Có dấu hiệu tổn thương nhẹ ở phổi phải.',
          status: 'Bất thường'
        },
        {
          name: 'Tim',
          description: 'Tim có kích thước bình thường.',
          status: 'Bình thường'
        }
      ],
      notes: 'Cần kiểm tra thêm để xác định nguyên nhân.',
      images: ['https://example.com/xray2.jpg']
    }
  }
]
const typeTest = {
  BloodTest: 'BloodTest',
  XRay: 'XRay',
  MRI: 'MRI'
}

export const LabTestExamination = (onSubmitExamination: {
  onSubmitExamination: (data: ExaminationData, type: string) => void
}) => {
  const setSelectedLabTests = useSetRecoilState(selectedLabTestsState)
  const labRequests = useRecoilValueLoadable(labRequestsSlector)
  const [categoryLabTests, setCategoryLabTests] = useState<number[]>([])
  const labTests = useRecoilValueLoadable(labtestListSelector)
  const refreshLabRequests = useRecoilRefresher_UNSTABLE(labRequestsSlector)
  const [currentView, setCurrentView] = useState(tabs[0].key)
  // const [isResult, _setIsResult] = useState(true)
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
      onSubmitExamination.onSubmitExamination({} as ExaminationData, 'labrequest')
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
                      // type={typeTest.BloodTest}
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
