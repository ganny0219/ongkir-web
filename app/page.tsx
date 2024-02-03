import CheckOngkirForm from "@/components/check-ongkir-form";
import { City } from "@/types/global";
import { rajaAxios } from "@/utils/axios";
import axios from "axios";

export default async function HomePage() {
  const cities = await rajaAxios.get("/city").then((res) => {
    const responseCities: City[] = res.data.rajaongkir.results;
    const listCity: City[] = [];
    for (let i = 0; i < responseCities.length; i++) {
      if (
        responseCities[i]?.city_name === responseCities[i + 1]?.city_name ||
        responseCities[i]?.city_name === responseCities[i - 1]?.city_name
      ) {
        listCity.push({
          ...responseCities[i],
          city_name:
            responseCities[i].city_name + ` (${responseCities[i].type})`,
        });
      } else {
        listCity.push(responseCities[i]);
      }
    }
    return listCity;
  });

  return (
    <>
      <h1 className="text-[#656565]">
        Periksa ongkos kirim dan lacak paket dengan cepat di sini!
      </h1>
      <CheckOngkirForm cities={cities} />
    </>
  );
}
