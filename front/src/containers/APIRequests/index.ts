type APIRequestsType = {
  post: (route: string, data: any) => Promise<any>;
};

const APIRequests = {
  request: async (method: string, route: string, data?: any) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:5000${route}`, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: method === 'GET' ? null : JSON.stringify(data),
    });

    return await res.json();
  },
};

export default APIRequests;
