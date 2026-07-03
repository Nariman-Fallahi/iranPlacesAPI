export type Province = {
  id: number;
  name: string;
  slug: string;
  tel_prefix: string;
};

export type City = {
  id: number;
  name: string;
  slug: string;
  province_id: number;
  location: {
    latitude: string;
    longitude: string;
  };
};
