const BASE_PATH = "https://api.checkbox.ua/api/v1";

export const Endpoints = {
  AuthorizeUrl: () => `${BASE_PATH}/cashier/signinPinCode`,
  ProductsUrl: (searchParams) => `${BASE_PATH}/goods?${searchParams}`,
  ProductUrl: (id = "") => `${BASE_PATH}/goods/${id}`
};
