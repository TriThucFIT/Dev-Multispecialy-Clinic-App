import { selectedLabTestsState } from '@renderer/states/doctor'
import { Input, Select } from 'antd'
import { useRecoilState } from 'recoil'

const optionsBloodTest = [
  { label: 'Xét nghiệm công thức máu', value: 1 },
  { label: 'Xét nghiệm sinh hóa máu', value: 2 },
  { label: 'Xét nghiệm nhóm máu', value: 3 }
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

export function TestSelectionTab({ test }: { test: { id: number; name: string } }) {
  const [selectedLabTests, setSelectedLabTests] = useRecoilState(selectedLabTestsState)

  return (
    <div>
      {selectedLabTests.includes(test.id) && (
        <div>
          {{
            1: (
              <div className="space-y-2">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Chọn loại xét nghiệm máu"
                  // onChange={handleChange}
                  options={optionsBloodTest}
                  className="w-full"
                />
                <div>
                  <Input placeholder="Ghi chú" />
                </div>
              </div>
            ),
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
                <div>
                  <Input placeholder="Ghi chú" />
                </div>
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
                <div>
                  <Input placeholder="Ghi chú" />
                </div>
              </div>
            )
          }[test.id] || null}
        </div>
      )}
    </div>
  )
}
