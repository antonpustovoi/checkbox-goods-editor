import { Endpoints } from "./endpoints";

const apiCall = async (endpoint, options) => {
  const token = window.localStorage.getItem("token");
  const headers = { ...options.headers };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(endpoint, {
    ...options,
    headers,
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
      "X-License-Key": licenseKey,
    },
    body: JSON.stringify({ pin_code: pinCode }),
  });
  window.localStorage.setItem("token", response["access_token"]);
  window.location.reload();
};

const getProductObject = (srcObject) => ({
  id: srcObject.id,
  code: Number(srcObject.code),
  name: srcObject.name,
  price: srcObject.price / 100,
  is_weight: srcObject.is_weight,
  related_barcodes: srcObject.related_barcodes || "",
});

export const getProducts = async ({ queryKey, pageParam }) => {
  const [, inputValue, limit] = queryKey;
  const searchParams = new URLSearchParams({
    query: inputValue,
    limit,
    offset: pageParam * limit,
  });
  const response = await apiCall(Endpoints.ProductsUrl(searchParams), {
    method: "GET",
  });
  return {
    data: response.results.map(getProductObject),
    pageParam,
  };
};

export const getProduct = async ({ queryKey }) => {
  const [, query] = queryKey;
  const searchParams = new URLSearchParams({ query, limit: 1 });
  const response = await apiCall(Endpoints.ProductsUrl(searchParams), {
    method: "GET",
  });
  return response.results[0] ? getProductObject(response.results[0]) : null;
};

export const getProductById = async (data) => {
  const response = await apiCall(Endpoints.ProductUrl(data.id), {
    method: "GET",
  });
  return getProductObject(response);
};

export const saveProduct = async (data) => {
  const payload = {
    type: "good",
    code: data.code,
    name: data.name,
    price: data.price * 100,
    is_weight: data.is_weight,
    barcodes: data.related_barcodes?.split(",") || null,
  };
  const response = await apiCall(Endpoints.ProductUrl(data.id), {
    method: data.id ? "PUT" : "POST",
    body: JSON.stringify(payload),
  });
  return getProductObject(response);
};

export const saveProducts = async (data) => {
  const responses = await Promise.all(data.map(saveProduct));
  return data.map((el) => ({
    ...el,
    original: responses.find((response) => response.code === el.code),
  }));
};

export const deleteProduct = async (data) => {
  return apiCall(Endpoints.ProductUrl(data.id), { method: "DELETE" });
};
