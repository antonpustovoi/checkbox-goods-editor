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
    headers,
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
      "X-License-Key": "13b2be6e7ce6c862b2e04f38",
    },
    body: JSON.stringify(data),
  });
  window.localStorage.setItem("token", response["access_token"]);
};

export const getGoods = async ({ queryKey }) => {
  const [, inputValue] = queryKey;
  const searchParams = new URLSearchParams({
    query: inputValue,
  });
  const response = await apiCall(Endpoints.GoodsUrl(searchParams), {
    method: "GET",
  });
  response.results.forEach((el) => {
    el.price = el.price / 100;
  });
  return response.results;
};

export const getImportStatus = async (taskId) => {
  while (true) {
    const { status } = await apiCall(Endpoints.GoodsImportStatusUrl(taskId), {
      method: "GET",
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
      barcodes: el.related_barcodes,
    })),
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
    body: formData,
  });
  await getImportStatus(response.task_id);
  await apiCall(Endpoints.GoodsImportApplyChangesUrl(response.task_id), {
    method: "POST",
  });
  await getImportStatus(response.task_id);
};
