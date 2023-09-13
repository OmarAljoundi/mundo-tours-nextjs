export function http<T>(endPoint: string) {
  return {
    post: async (data: any = "") => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
            next: {
              revalidate: 0,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        return (await response.json()) as T;
      } catch (ex) {
        console.log(ex);
        throw new Error("Error while fetching data: " + ex);
      }
    },
    get: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`,
          {
            next: {
              revalidate: 0,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        return (await response.json()) as T;
      } catch (ex) {
        console.log(ex);
        throw new Error("Error while fetching data: " + ex);
      }
    },
    delete: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        return (await response.json()) as T;
      } catch (ex) {
        console.log(ex);
        throw new Error("Error while fetching data: " + ex);
      }
    },
    update: async (data: any = "") => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
            next: {
              revalidate: 0,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        return (await response.json()) as T;
      } catch (ex) {
        console.log(ex);
        throw new Error("Error while fetching data: " + ex);
      }
    },
  };
}
