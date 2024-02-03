"use client";
import { City, Province } from "@/types/global";
import { rajaAxios } from "@/utils/axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type Props = {
  cities: City[];
};

function CheckOngkirForm({ cities }: Props) {
  const [inputKotaAsal, setInputKotaAsal] = useState("");
  const [kotaAsalTerpilih, setKotaAsalTerpilih] = useState("");
  const [inputKotaTujuan, setInputKotaTujuan] = useState("");
  const [kotaTujuanTerpilih, setKotaTujuanTerpilih] = useState("");
  const [listKotaAsalVisible, setListKotaAsalVisible] = useState(false);
  const [listKotaTujuanVisible, setListKotaTujuanVisible] = useState(false);
  const berat = useRef(0);

  const router = useRouter();

  const citiesKotaAsal = cities.filter((city) =>
    city.city_name.toLowerCase().includes(inputKotaAsal.toLowerCase())
  );
  const citiesKotatujuan = cities.filter((city) =>
    city.city_name.toLowerCase().includes(inputKotaTujuan.toLowerCase())
  );

  const onInputKotaChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    e.preventDefault();
    if (key == "kotaAsal") {
      return setInputKotaAsal(e.target.value);
    }
    return setInputKotaTujuan(e.target.value);
  };

  const onListVibleChange = (key: string) => {
    if (key == "asal") {
      setTimeout(() => {
        setListKotaAsalVisible((prevValue) => !prevValue);
      }, 500);
    } else {
      setTimeout(() => {
        setListKotaTujuanVisible((prevValue) => !prevValue);
      }, 500);
    }
  };

  const onKotaTerpilih = (city: City, key: "awal" | "tujuan") => {
    if (key == "awal") {
      setInputKotaAsal(city.city_name);
      return setKotaAsalTerpilih(city.city_id);
    }
    setInputKotaTujuan(city.city_name);
    return setKotaTujuanTerpilih(city.city_id);
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);

    const data = {
      origin: +kotaAsalTerpilih,
      destination: +kotaTujuanTerpilih,
      weight: berat.current,
      courier: "jne",
    };
    if (!data.origin || !data.destination || !data.weight) {
      return alert("Mohon isi semua data!");
    }
    router.push(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/hasil/cost" +
        `?origin=${kotaAsalTerpilih}&destination=${kotaTujuanTerpilih}&weight=${berat.current}&courier=jne`
    );
    // await axios.post("http://localhost:3000/api/cost", data);
  }
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row justify-between"
    >
      <div className="flex flex-col my-2">
        <input
          className="outline-none border-[#cccccc80] w-full md:w-[200px]  border-solid border-[1px] p-2"
          placeholder="Kota asal pengiriman"
          name="asal"
          autoComplete="off"
          value={inputKotaAsal}
          onChange={(e) => onInputKotaChange(e, "kotaAsal")}
          onFocus={() => onListVibleChange("asal")}
          onBlur={() => onListVibleChange("asal")}
        />
        {citiesKotaAsal.length > 0 &&
          listKotaAsalVisible &&
          inputKotaAsal != "" && (
            <div className="relative ">
              <ul className="h-[100px] w-full px-2 overflow-y-scroll absolute">
                {citiesKotaAsal.map((city, index) => {
                  return (
                    <li
                      className="cursor-pointer hover:bg-[#ccc]"
                      key={index}
                      onClick={() => onKotaTerpilih(city, "awal")}
                    >
                      {city.city_name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
      </div>
      <div className="flex flex-col my-2">
        <input
          className="outline-none border-[#cccccc80] w-full md:w-[200px] border-solid border-[1px] p-2"
          placeholder="Kota tujuan pengiriman"
          name="tujuan"
          autoComplete="off"
          value={inputKotaTujuan}
          onChange={(e) => onInputKotaChange(e, "kotaTujuan")}
          onFocus={() => onListVibleChange("tujuan")}
          onBlur={() => onListVibleChange("tujuan")}
        />
        {citiesKotatujuan.length > 0 &&
          listKotaTujuanVisible &&
          inputKotaTujuan != "" && (
            <div className="relative">
              <ul className="h-[100px] w-full px-2 overflow-y-scroll absolute">
                {citiesKotatujuan.map((city, index) => {
                  return (
                    <li
                      className="cursor-pointer hover:bg-[#ccc]"
                      key={index}
                      onClick={() => onKotaTerpilih(city, "tujuan")}
                    >
                      {city.city_name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
      </div>
      <div className="flex flex-row my-2">
        <input
          className="outline-none border-[#cccccc80] w-full md:w-[120px] border-solid border-[1px] p-2"
          placeholder="Berat Kiriman"
          name="berat"
          onChange={(e) => (berat.current = +e.target.value)}
        />
        <div className="flex justify-center items-center bg-gray-100 border-gray-100 border-solid border-[1px] px-2 ">
          <p className="text-[#898989]">gram</p>
        </div>
      </div>
      <button className="bg-violet-300 px-2 my-2">Priksa Ongkir</button>
    </form>
  );
}

export default CheckOngkirForm;
