import { useState } from "react";

export const useAddress = () => {
  const [citys, setCitys] = useState([]);

  const fetchAddressData = async () => {
    try {
      await fetch("https://esgoo.net/api-tinhthanh/1/0.htm")
        .then((res) => res.json())
        .then((data) => {
          const cityData = data.data.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
          setCitys(cityData);
        });
    } catch (error) {
      console.log("Error in fetchAddressData", error);
    }
  };

  const fetchDistrictData = async (city: string) => {
    try {
      const res = await fetch(`https://esgoo.net/api-tinhthanh/2/${city}.htm`);
      const data = await res.json();
      const districtData = data.data.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));

      return districtData;
    } catch (error) {
      console.log("Error in fetchDistrictData", error);
      return [];
    }
  };

  return {
    citys,
    fetchAddressData,
    fetchDistrictData,
  };
};
