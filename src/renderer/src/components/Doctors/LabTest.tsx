import { LabTest } from '@renderer/types/Doctor'
import { useRecoilState, useRecoilValue } from 'recoil'
import { labTestsState, selectedLabTestsState } from './stores'
import { useState } from 'react'
import clsx from 'clsx'
import { Select } from 'antd'
import { TestResult } from './TestResult'

const tabs = [
  { key: 'viewSelectLabTests', label: 'Chỉ định xét nghiệm' },
  { key: 'viewResultLabTests', label: 'Kết quả xét nghiệm' }
]

const optionsXRay = [
  { label: 'Chụp X-quang phổi', value: 1 },
  { label: 'Chụp X-quang cột sống', value: 2 },
  { label: 'Chụp X-quang chân', value: 3 }
]

const optionsMRI = [
  { label: 'Chụp MRI não', value: 1 },
  { label: 'Chụp MRI cột sống', value: 2 },
  { label: 'Chụp MRI chân', value: 3 }
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

export const LabTestExamination = () => {
  const [selectedLabTests, setSelectedLabTests] = useRecoilState(selectedLabTestsState)
  const labTests = useRecoilValue<LabTest[]>(labTestsState)
  const [currentView, setCurrentView] = useState(tabs[0].key)
  const [isResult, setIsResult] = useState(true)
  const [isViewTest, setIsViewTest] = useState({
    bloodTest: false,
    mriTest: false,
    xTest: false
  })

  const handleLabTestSelect = (testId: number) => {
    setSelectedLabTests((prev) =>
      prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]
    )
  }
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
              {labTests?.map((test) => (
                <div key={test.id} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`test-${test?.id}`}
                      checked={selectedLabTests?.includes(test?.id)}
                      onChange={() => handleLabTestSelect(test?.id)}
                    />
                    <label htmlFor={`test-${test.id}`}>{test.name}</label>
                  </div>
                  <div>
                    {selectedLabTests.includes(test.id) && (
                      <div>
                        {{
                          2: (
                            <div className="space-y-2">
                              <Select
                                mode="multiple"
                                allowClear
                                placeholder="Chọn loại chụp X-quang"
                                // onChange={handleChange}
                                options={optionsXRay}
                                className="w-full"
                              />
                            </div>
                          ),
                          3: (
                            <div className="space-y-2">
                              <Select
                                mode="multiple"
                                allowClear
                                placeholder="Chọn loại chụp MRI"
                                // onChange={handleChange}
                                options={optionsMRI}
                                className="w-full"
                              />
                            </div>
                          )
                        }[test.id] || null}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() => console.log('selectedLabTests', selectedLabTests)}
                className="w-full text-white btn btn-outline btn-primary rounded-xl"
              >
                Xác nhận
              </button>
            </>
          ),
          viewResultLabTests: (
            <>
              {isResult ? (
                <div className="space-y-3">
                  <TestResult
                    type={typeTest.BloodTest}
                    testData={bloodTest}
                    isVisible={isViewTest.bloodTest}
                    setIsVisible={(value) => setIsViewTest({ ...isViewTest, bloodTest: value })}
                  />

                  <TestResult
                    type={typeTest.XRay}
                    testData={xTest}
                    isVisible={isViewTest.xTest}
                    setIsVisible={(value) => setIsViewTest({ ...isViewTest, xTest: value })}
                  />

                  <TestResult
                    type={typeTest.MRI}
                    testData={mriTest}
                    isVisible={isViewTest.mriTest}
                    setIsVisible={(value) => setIsViewTest({ ...isViewTest, mriTest: value })}
                  />
                </div>
              ) : (
                <div>Hiện không có kết quả xét nghiệm</div>
              )}
            </>
          )
        }[currentView]
      }
    </div>
  )
}
