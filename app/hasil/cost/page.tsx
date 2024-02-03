import { CostResponse, PageProps } from "@/types/global";
import { rajaAxios } from "@/utils/axios";
import { redirect } from "next/navigation";
import React from "react";

async function HasilCostPage({ params, searchParams }: PageProps) {
  const dataRequest = {
    origin: +searchParams.origin,
    destination: +searchParams.destination,
    weight: +searchParams.weight,
    courier: searchParams.courier,
  };
  const result: CostResponse = await rajaAxios
    .post("/cost", dataRequest)
    .then((res) => res.data)
    .catch(() => {
      redirect(process.env.NEXT_PUBLIC_BASE_URL + "not-found");
    });
  const origin =
    result.rajaongkir.origin_details.type +
    " " +
    result.rajaongkir.origin_details.city_name;
  const destination =
    result.rajaongkir.destination_details.type +
    " " +
    result.rajaongkir.destination_details.city_name;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        <h1>Hasil Pengecekan</h1>
        <div className="flex flex-row">
          <b>{origin}</b> <p>&nbsp;ke&nbsp;</p> <b>{destination}</b>{" "}
          <p>&nbsp;@</p> <b>{dataRequest.weight}</b> <p>gram</p>
        </div>
      </div>
      <ul>
        {result.rajaongkir.results[0].costs.map((cost, index) => {
          return (
            <li
              key={index}
              className="flex flex-col w-full md:w-[80%] my-4 bg-slate-300 p-4 rounded-sm"
            >
              <div className="flex flex-row w-full justify-between">
                <p>{cost.service}</p>
                <p>Rp.{cost.cost[0].value.toLocaleString()}</p>
              </div>
              <div className="flex flex-row w-full justify-between">
                <p className="text-sm">{cost.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default HasilCostPage;
