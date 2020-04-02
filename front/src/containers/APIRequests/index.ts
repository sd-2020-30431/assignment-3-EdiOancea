type APIRequestsType = {
  post: (route: string, data: any) => Promise<any>;
};

const APIRequests = {
  post: async (route: string, data: any) => {
    const res = await fetch(`http://localhost:5000${route}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
};

export default APIRequests;
