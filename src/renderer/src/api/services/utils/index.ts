export const detectQueryType = (
  searchValue: string
): 'phone' | 'patient_id' | 'email' | 'fullName' => {
  if (/^\d+$/.test(searchValue)) {
    return 'phone'
  }
  if (/\S+@\S+\.\S+/.test(searchValue)) {
    return 'email'
  }
  // patient_id : PAT0001
  if (/^PAT\d+$/.test(searchValue)) {
    return 'patient_id'
  }
  return 'fullName'
}
