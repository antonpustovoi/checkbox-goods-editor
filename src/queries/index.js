import { Endpoints } from "./endpoints";

const sleep = async (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

const apiCall = async (endpoint, options) => {
  const token = window.localStorage.getItem("token");
  const headers = { ...options.headers };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(endpoint, {
    ...options,
    headers
  });
  const data = await response.json();
  if (response.status > 400) {
    throw new Error(data.message);
  }
  return data;
};

export const authorize = async (data) => {
  const { licenseKey, pinCode } = data;
  const response = await apiCall(Endpoints.AuthorizeUrl(), {
    method: "POST",
    headers: {
      "X-License-Key": licenseKey
    },
    body: JSON.stringify({ pin_code: pinCode })
  });
  window.localStorage.setItem("token", response["access_token"]);
  window.location.reload();
};

const getProductObject = (srcObject) => ({
  id: srcObject.id,
  code: srcObject.code,
  name: srcObject.name,
  price: srcObject.price / 100,
  is_weight: srcObject.is_weight,
  related_barcodes: srcObject.related_barcodes
});

export const getProducts = async ({ queryKey, pageParam }) => {
  const [, inputValue, limit] = queryKey;
  const searchParams = new URLSearchParams({
    query: inputValue,
    limit,
    offset: pageParam * limit
  });
  const response = await apiCall(Endpoints.ProductsUrl(searchParams), {
    method: "GET"
  });
  return {
    data: response.results.map(getProductObject),
    pageParam
  };
};

export const getProduct = async ({ queryKey }) => {
  const [, query] = queryKey;
  const searchParams = new URLSearchParams({ query, limit: 1 });
  const response = await apiCall(Endpoints.ProductsUrl(searchParams), {
    method: "GET"
  });
  return response.results[0] ? getProductObject(response.results[0]) : null;
};

export const getImportStatus = async (taskId) => {
  const shouldGetStatus = true;
  while (shouldGetStatus) {
    const { status } = await apiCall(
      Endpoints.ProductsImportStatusUrl(taskId),
      {
        method: "GET"
      }
    );
    if (["completed", "done"].includes(status)) {
      return status;
    } else {
      await sleep(1000);
    }
  }
};

export const saveProducts = async (data) => {
  const payloadData = {
    goods: data.map((el) => ({
      code: el.code,
      good_name: el.name,
      price: el.price,
      is_weight: el.is_weight,
      barcodes: el.related_barcodes || " "
    }))
  };
  const formData = new FormData();
  const file = new File(
    Array.from(JSON.stringify(payloadData)),
    "import.json",
    { type: "application/json" }
  );
  formData.append("file", file);
  const response = await apiCall(Endpoints.UploadProductsUrl(), {
    method: "POST",
    body: formData
  });
  await getImportStatus(response.task_id);
  await apiCall(Endpoints.ProductsImportApplyChangesUrl(response.task_id), {
    method: "POST"
  });
  await getImportStatus(response.task_id);
  const responses = await Promise.all(
    data.map((el) => getProduct({ queryKey: ["Product", el.code] }))
  );
  return data.map((el, index) => ({ ...el, original: responses[index] }));
};
