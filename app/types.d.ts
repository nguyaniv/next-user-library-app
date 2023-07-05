export type RequestUserProps = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  userImage: string;
  location: {
    street: {
      number: number;
      name: string;
    };
    country: string;
    city: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  picture: {
    thumbnail: string;
    medium: string;
    large: string;
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
};

export type ShortRequestUserProps = {
  name?: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  userImage: string;
  location?: {
    country?: string;
    city?: string;
    street?: {
      number?: number;
      name?: string;
    };
  };
  uuid?: string;
};
