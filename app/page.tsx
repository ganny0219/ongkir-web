import CheckOngkirForm from "@/components/check-ongkir-form";
import { rajaAxios } from "@/utils/axios";
import axios from "axios";

export default async function HomePage() {
  const cities = await rajaAxios
    .get("/city")
    .then((res) => res.data.rajaongkir.results);

  return (
    <>
      <h1 className="text-[#656565]">
        Periksa ongkos kirim dan lacak paket dengan cepat di sini!
      </h1>
      <CheckOngkirForm cities={cities} />
    </>
  );
}
