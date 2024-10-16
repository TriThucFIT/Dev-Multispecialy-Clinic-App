export const useAppointment = () => {
  const appointment = async (formValues: any) => {
    try {
      console.log('formValues', formValues)
      // const response = await axiosInstance.post("appointment", {
      //   service: formValues.service,
      //   doctor: formValues.doctor,
      //   specialization: formValues.specialty,
      //   date: formValues.date,
      //   time: formValues.time,
      //   symptoms: formValues.description,
      //   patient: {
      //     fullName: formValues.name,
      //     phone: formValues.phone,
      //     address:
      //       formValues.city +
      //       ", " +
      //       formValues.district +
      //       ", " +
      //       formValues.address,
      //     gender: formValues.gender,
      //     dob: formValues.dob,
      //   },
      // });
      // console.log("Response:", response);

      // return response.data;
      return {}
    } catch (error) {
      console.error('Error:', error)
      return {}
    }
  }
  return { appointment }
}
