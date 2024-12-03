import { Button } from 'antd'
import { RenderTestResult } from './stores/type'

const typeTest = {
  BloodTest: 'BloodTest',
  XRay: 'XRay',
  MRI: 'MRI'
}

export const TestResult = ({ type, testData, isVisible, setIsVisible }: RenderTestResult) => {
  const textSelectedClass =
    'text-primary-700 font-semibold bg-primary-100 rounded-lg flex items-center justify-center p-2'

  const ValueResultRow = ({
    name,
    value1,
    value2,
    className
  }: {
    name: string
    value1: string | number
    value2?: string | number
    className?: string
  }) => (
    <div className={className}>
      <span className="font-semibold mr-1">{name}:</span>
      <span>{value1}</span> {value2 && <span>{value2}</span>}
    </div>
  )

  return (
    <>
      <div className="flex justify-between">
        <div className={`${isVisible ? textSelectedClass : 'font-semibold'}`}>
          {testData.labTest.name}
        </div>
        {isVisible ? (
          <Button type="default" onClick={() => setIsVisible(false)}>
            Ẩn kết quả
          </Button>
        ) : (
          <Button type="primary" onClick={() => setIsVisible(true)}>
            Xem kết quả
          </Button>
        )}
      </div>
      {isVisible && (
        <>
          {/* {testData.map((test) => ( */}
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Kết quả: </span>
              {testData.testResult?.result}
            </div>
            <div className="font-semibold">Chi tiết:</div>
            <div className="grid grid-cols-3 gap-4">
              {testData.testResult?.detail.map((detail) => (
                <div key={detail.name} className="col-span-1 border-2 rounded-lg p-2">
                  <div>
                    <span className="font-semibold">{detail.name}</span>

                    {type !== typeTest.BloodTest && <span>: {detail.status} </span>}
                  </div>
                  <div>
                    {/* {
                      {
                        [typeTest.BloodTest]: (
                          <>
                            <div className="grid grid-cols-2">
                              <ValueResultRow
                                name="Giá trị"
                                value1={detail.value}
                                value2={detail.unit}
                                className={'col-span-1'}
                              />
                              <ValueResultRow
                                name="Phạm vi"
                                value1={detail.range}
                                value2={detail.unit}
                                className={'col-span-1'}
                              />
                            </div>
                            <ValueResultRow name="Trạng thái" value1={detail.status} />
                          </>
                        ),
                        [typeTest.MRI]: (
                          <>
                            <ValueResultRow name="Ghi chú" value1={detail.notes} />
                            <ValueResultRow name="Khuyến nghị" value1={detail.recommendations} />
                          </>
                        )
                      }[type]
                    } */}
                    <div className="grid grid-cols-2">
                      <ValueResultRow
                        name="Giá trị"
                        value1={detail.value}
                        value2={detail.unit}
                        className={'col-span-1'}
                      />
                      <ValueResultRow
                        name="Phạm vi"
                        value1={detail.range}
                        value2={detail.unit}
                        className={'col-span-1'}
                      />
                    </div>
                    <ValueResultRow name="Trạng thái" value1={detail.status} />
                    <ValueResultRow name="Ghi chú" value1={detail.notes} />
                    <ValueResultRow name="Khuyến nghị" value1={detail.recommendations} />
                    <ValueResultRow name="Mô tả" value1={detail.description || detail.notes} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="font-semibold">Kết luận:</div>
              {testData.testResult?.notes}
            </div>
            <div>
              <div className="font-semibold">Hình ảnh kết quả:</div>
              <div className="grid grid-cols-3">
                {testData.testResult?.images.map((image, idx) => (
                  <div key={idx} className="col-span-1">
                    <img src={image} alt="lab-test" className="size-96 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* ))} */}
        </>
      )}
    </>
  )
}
