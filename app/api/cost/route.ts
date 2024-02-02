import { rajaAxios } from "@/utils/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const dataRequest = await req.json();

  const result = await rajaAxios
    .post("/cost", dataRequest)
    .then((res) => res.data.rajaongkir.results);
  return NextResponse.json(result);
}
