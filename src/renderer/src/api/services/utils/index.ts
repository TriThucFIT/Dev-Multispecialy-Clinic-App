export const detectQueryType = (searchValue: string): 'phone' | 'id' | 'email' | 'fullName' => {
    if (/^\d+$/.test(searchValue)) {
      if (searchValue.startsWith('0')) {
        return 'phone'
      }
      return 'id'
    }
    if (/\S+@\S+\.\S+/.test(searchValue)) {
      return 'email'
    }
    return 'fullName'
  }