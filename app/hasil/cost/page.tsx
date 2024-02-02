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

  return (
    <>
      <h1>Hasil Cost</h1>
      <ul>
        {result.rajaongkir.results[0].costs.map((cost, index) => {
          return (
            <li
              key={index}
              className="flex flex-col w-[80%] my-4 bg-slate-300 p-4 rounded-sm"
            >
              <div className="flex flex-row w-full justify-between">
                <p className="w-[50%]">
                  {result.rajaongkir.results[0].code.toUpperCase()}
                </p>
                <p className="w-[30%]">{cost.service}</p>
                <p className="flex flex-1">
                  Rp.{cost.cost[0].value.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-row w-full justify-between">
                <p className="w-[50%] text-sm">
                  {result.rajaongkir.results[0].name}
                </p>
                <p className="w-[30%] text-sm">{cost.description}</p>
                <p className="flex flex-1" />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default HasilCostPage;
