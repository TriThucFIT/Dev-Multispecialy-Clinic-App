import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Radio,
  Select,
} from "antd";
import { useRecoilState, useSetRecoilState } from "recoil";
import { formValuesState, stepState } from "../../stores/states";
import { useEffect, useState } from "react";
import { useAddress } from "../../hooks/useAddress";
import toast from "react-hot-toast";
import { Dayjs } from "dayjs";
import { formatDate } from "@renderer/utils/formatDate";
import { useAppointment } from "../../hooks/Appointment/useAppointment";

export const Step2 = ({ form }: { form: any }) => {
  const setStep = useSetRecoilState(stepState);
  const { citys, fetchAddressData, fetchDistrictData } = useAddress();
  const [districts, setDistricts] = useState([]);
  const { appointment } = useAppointment();
  const [formValues, setFormValues] = useRecoilState(formValuesState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAddressData();
  }, []);

  const handleSelectCity = async (value: string, option: any) => {
    const data = await fetchDistrictData(value);
    if (data) {
      setDistricts(data);
      setFormValues((prev) => ({ ...prev, city: option.label }));
      form.setFieldsValue({ district: undefined });
    }
  };

  const handleDistrictChange = (value: string, option: any) => {
    setFormValues((prev) => ({ ...prev, district: option.label }));
    form.setFieldsValue({ district: value });
  };

  const handleSelectDob: DatePickerProps<Dayjs[]>["onChange"] = (
    date,
    dateString
  ) => {
    setFormValues((prev) => ({
      ...prev,
      dob: formatDate(dateString as string),
    }));
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await appointment(formValues);
    if (response) {
      toast.success("Đặt lịch thành công");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Form.Item label="Họ và tên" name="name" required>
        <Input
          placeholder="Nhập họ và tên"
          onChange={(e) => {
            setFormValues((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      </Form.Item>
      <div className="grid grid-cols-2 gap-5">
        <Form.Item label="Ngày sinh" name="date" required>
          <DatePicker
            format={"DD/MM/YYYY"}
            className="w-full"
            onChange={handleSelectDob}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          tooltip="Nhập email để nhận được các thông báo về lịch hẹn, tái khám,..."
          rules={[{ type: "email", message: "Email không hợp lệ" }]}
        >
          <Input
            placeholder="Nhập email"
            onChange={(e) => {
              setFormValues((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
        </Form.Item>
      </div>
      <div className="flex">
        <Form.Item label="Giới tính" name="gender" required layout="horizontal">
          <Radio.Group
            onChange={(e) => {
              setFormValues((prev) => ({ ...prev, gender: e.target.value }));
            }}
          >
            <Radio value={1}>Nữ</Radio>
            <Radio value={0}>Nam</Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Form.Item label="Tỉnh/Thành phố" name="city" required>
          <Select
            showSearch
            placeholder="Chọn tỉnh/thành phố"
            optionFilterProp="label"
            options={citys}
            onChange={handleSelectCity}
          ></Select>
        </Form.Item>
        <Form.Item label="Quận/Huyện" name="district" required>
          <Select
            showSearch
            placeholder="Chọn quận/huyện"
            optionFilterProp="label"
            options={districts}
            onChange={handleDistrictChange}
            notFoundContent="Không tìm thấy quận/huyện"
            allowClear
          ></Select>
        </Form.Item>
      </div>
      <Form.Item label="Địa chỉ" name="address" required>
        <Input
          placeholder="Nhập địa chỉ"
          onChange={(e) => {
            setFormValues((prev) => ({ ...prev, address: e.target.value }));
          }}
        />
      </Form.Item>
      <div className="grid grid-cols-2 gap-5">
        <Button className="w-full" onClick={() => setStep(1)}>
          Quay lại
        </Button>
        <Button
          type="primary"
          className="w-full"
          onClick={handleSubmit}
          loading={isLoading}
        >
          Đăng ký
        </Button>
      </div>
    </>
  );
};
