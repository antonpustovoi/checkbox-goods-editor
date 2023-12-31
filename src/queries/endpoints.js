const BASE_PATH = "https://api.checkbox.ua/api/v1";

export const Endpoints = {
  AuthorizeUrl: () => `${BASE_PATH}/cashier/signinPinCode`,
  ProductsUrl: (searchParams) => `${BASE_PATH}/goods?${searchParams}`,
  UploadProductsUrl: () => `${BASE_PATH}/goods/import/upload`,
  ProductsImportStatusUrl: (id) =>
    `${BASE_PATH}/goods/import/task_status/${id}`,
  ProductsImportApplyChangesUrl: (id) =>
    `${BASE_PATH}/goods/import/apply_changes/${id}`
};
