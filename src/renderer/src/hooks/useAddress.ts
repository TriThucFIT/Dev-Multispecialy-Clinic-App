import { useState } from 'react'

interface ICity {
  value: string
  label: string
}

export const useAddress = () => {
  const [city, setCity] = useState<ICity[]>([])

  const fetchAddressData = async () => {
    try {
      const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm').then((res) =>
        res.json()
      )
      setCity(response.data.map((item: any) => ({ value: item.id, label: item.name })))
    } catch (error) {
      console.log('Error in fetchAddressData', error)
    }
  }

  const fetchDistrictData = () => {
    // const { data: districtData } = useQuery({
    //   queryKey: ['getDistrict', city],
    //   queryFn: async () => {
    //     const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${city}.htm`).then((res) =>
    //       res.json()
    //     )
    //     return response.data.map((item: any) => ({
    //       value: item.id,
    //       label: item.name
    //     }))
    //   },
    //   enabled: !!city
    // })
    // setDistrict(districtData)
    // return districtData
  }

  return {
    city,
    fetchAddressData,
    fetchDistrictData
  }
}
