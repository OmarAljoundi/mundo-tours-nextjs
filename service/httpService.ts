const onRequest = async <T>(
  endPoint: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  data: any = "",
  next?: NextFetchRequestConfig
): Promise<T> => {
  var headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method,
    headers,
    next,
  };

  if (method === "POST" || method === "PUT") {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${endPoint}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const responseData: T = await response.json();
    return responseData;
  } catch (ex) {
    console.error(ex);
    throw new Error("Error while fetching data: " + ex);
  }
};

export function http<T>(endPoint: string, next?: NextFetchRequestConfig) {
  return {
    post: (data: any = "") => onRequest<T>(endPoint, "POST", data, next),
    update: (data: any = "") => onRequest<T>(endPoint, "PUT", data, next),
    get: () => onRequest<T>(endPoint, "GET", undefined, next),
    delete: () => onRequest<T>(endPoint, "DELETE", undefined, next),
  };
}
