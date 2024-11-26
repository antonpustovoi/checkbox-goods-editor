const BASE_PATH = "https://api.checkbox.ua/api/v1";

export const Endpoints = {
  authorizeUrl: () => `${BASE_PATH}/cashier/signinPinCode`,
  productsUrl: (searchParams) => `${BASE_PATH}/goods?${searchParams}`,
  productUrl: (id = "") => `${BASE_PATH}/goods/${id}`,
};
