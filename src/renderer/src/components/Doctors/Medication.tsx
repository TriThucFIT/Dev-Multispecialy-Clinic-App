import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { medicationsSelector, prescriptionState } from './stores'
import { Form, FormInstance, Input, InputRef, Popconfirm, Select, Table, TableProps } from 'antd'
import { MedicationResponseDto } from './stores/type'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
const EditableContext = createContext<FormInstance<any> | null>(null)
type ColumnTypes = Exclude<TableProps<MedicationResponseDto>['columns'], undefined>
interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  dataIndex: keyof MedicationResponseDto
  record: MedicationResponseDto
  handleSave: (record: MedicationResponseDto) => void
}
interface EditableRowProps {
  index: number
}
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          { required: dataIndex === 'quantity' ? true : false, message: `${title} is required.` }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}
export const Medication = () => {
  const [prescription, setPrescription] = useRecoilState(prescriptionState)
  const medications = useRecoilValueLoadable(medicationsSelector)

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Tên thuốc',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Hàm lượng',
      dataIndex: 'dosage',
      key: 'dosage'
    },
    {
      title: 'ĐVT',
      dataIndex: 'unitStock',
      key: 'unitStock'
    },
    {
      title: 'Cách dùng',
      dataIndex: 'usage',
      key: 'usage'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      editable: true,
      width: 20
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      editable: true
    },
    {
      title: 'Thao tác',
      dataIndex: 'operation',
      render: (_, record) =>
        prescription.length >= 1 ? (
          <Popconfirm
            className="text-red-400"
            title="Xóa mục này ?"
            onConfirm={() => handleRemoveMedication(record.id)}
          >
            <a>Xóa</a>
          </Popconfirm>
        ) : null
    }
  ]

  const handleSave = (row: MedicationResponseDto) => {
    const newData = [...prescription]
    const index = newData.findIndex((item) => row.id === item.id)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
    setPrescription(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: MedicationResponseDto) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })

  const handleAddMedication = (medicationId: number) => {
    if (medications.state === 'loading' || medications.state === 'hasError') return
    const medicationToAdd = medications.contents.find((med) => med.id === medicationId)
    if (medicationToAdd) {
      setPrescription((prev) => [...prev, medicationToAdd])
    }
  }

  const handleRemoveMedication = (medicationId: number) => {
    setPrescription((prev) => prev.filter((med) => med.id !== medicationId))
  }

  return (
    <div className="mt-4 space-y-4">
      <h3 className="font-semibold">Kê đơn thuốc</h3>
      {medications.state === 'hasValue' && medications.contents.length > 0 && (
        <Select
          showSearch
          showAction={['focus']}
          className="w-full"
          placeholder="Chọn thuốc"
          onChange={(value) => handleAddMedication(Number(value))}
          options={medications.contents.map((med) => ({
            label: `${med.name} - ${med.dosage}`,
            value: med.id
          }))}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      )}

      <Table<MedicationResponseDto>
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        pagination={false}
        dataSource={prescription}
        columns={columns as ColumnTypes}
      />
    </div>
  )
}
