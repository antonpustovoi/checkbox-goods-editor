const BASE_PATH = "https://api.checkbox.ua/api/v1";

export const Endpoints = {
  AuthorizeUrl: () => `${BASE_PATH}/cashier/signinPinCode`,
  GoodsUrl: (searchParams) => `${BASE_PATH}/goods?${searchParams}`,
  UploadGoodsUrl: () => `${BASE_PATH}/goods/import/upload`,
  GoodsImportStatusUrl: (id) => `${BASE_PATH}/goods/import/task_status/${id}`,
  GoodsImportApplyChangesUrl: (id) =>
    `${BASE_PATH}/goods/import/apply_changes/${id}`
};
