export type Province = {
  province_id: number;
  province: string;
};

export type City = {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
};

export type CityResponse = {
  rajaongkir: {
    status: {
      code: number;
      description: string;
    };
    results: City[];
  };
};

export type Cost = {
  service: string;
  description: string;
  cost: [
    {
      value: number;
      etd: string;
      note: string;
    }
  ];
};
export type CostResponse = {
  rajaongkir: {
    query: {
      origin: number;
      destination: number;
      weight: number;
      courier: string;
    };
    status: {
      code: number;
      description: string;
    };
    origin_details: {
      city_id: string;
      province_id: string;
      province: string;
      type: string;
      city_name: string;
      postal_code: string;
    };
    destination_details: {
      city_id: string;
      province_id: string;
      province: string;
      type: string;
      city_name: string;
      postal_code: string;
    };
    results: [
      {
        code: string;
        name: string;
        costs: Cost[];
      }
    ];
  };
};

export type PageProps = {
  searchParams: {
    [key: string]: any;
  };
  params: {
    [key: string]: any;
  };
};
