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
  const response = await apiCall(Endpoints.AuthorizeUrl(), {
    method: "POST",
    headers: {
      "X-License-Key": "13b2be6e7ce6c862b2e04f38"
    },
    body: JSON.stringify(data)
  });
  window.localStorage.setItem("token", response["access_token"]);
};

const getProductObject = (srcObject) => ({
  code: srcObject.code,
  is_weight: srcObject.is_weight,
  name: srcObject.name,
  price: srcObject.price / 100,
  related_barcodes: srcObject.related_barcodes
});

export const getGoods = async ({ queryKey }) => {
  const [, query] = queryKey;
  const searchParams = new URLSearchParams({ query });
  const response = await apiCall(Endpoints.GoodsUrl(searchParams), {
    method: "GET"
  });
  return response.results.map(getProductObject);
};

export const getGood = async ({ queryKey }) => {
  const [, query] = queryKey;
  const searchParams = new URLSearchParams({ query, limit: 1 });
  const response = await apiCall(Endpoints.GoodsUrl(searchParams), {
    method: "GET"
  });
  return response.results[0] ? getProductObject(response.results[0]) : null;
};

export const getImportStatus = async (taskId) => {
  const shouldGetStatus = true;
  while (shouldGetStatus) {
    const { status } = await apiCall(Endpoints.GoodsImportStatusUrl(taskId), {
      method: "GET"
    });
    if (["completed", "done"].includes(status)) {
      return status;
    } else {
      await sleep(1000);
    }
  }
};

export const saveGoods = async (data) => {
  const payloadData = {
    goods: data.map((el) => ({
      code: el.code,
      good_name: el.name,
      price: el.price,
      is_weight: el.is_weight,
      barcodes: el.related_barcodes
    }))
  };
  const formData = new FormData();
  const file = new File(
    Array.from(JSON.stringify(payloadData)),
    "import.json",
    { type: "application/json" }
  );
  formData.append("file", file);
  const response = await apiCall(Endpoints.UploadGoodsUrl(), {
    method: "POST",
    body: formData
  });
  await getImportStatus(response.task_id);
  await apiCall(Endpoints.GoodsImportApplyChangesUrl(response.task_id), {
    method: "POST"
  });
  await getImportStatus(response.task_id);
  const res = await Promise.all(
    data.map((el) => getGood({ queryKey: [null, el.code] }))
  );
};
