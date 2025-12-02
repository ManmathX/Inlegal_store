async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(endpoint, config);

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Unauthorized');
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || 'Request failed');
    }

    return { data, status: response.status };
}

export const authAPI = {
    register: (userData) =>
        fetchAPI('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),

    login: (credentials) =>
        fetchAPI('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        }),

    getMe: () => fetchAPI('/api/auth/me'),
};

export const postAPI = {
    getPosts: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return fetchAPI(`/api/posts${queryString ? `?${queryString}` : ''}`);
    },

    getPostById: (id) => fetchAPI(`/api/posts/${id}`),

    createPost: (postData) =>
        fetchAPI('/api/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
        }),

    votePost: (id, isUpvote) =>
        fetchAPI(`/api/posts/${id}/vote`, {
            method: 'POST',
            body: JSON.stringify({ isUpvote }),
        }),
};

export const productAPI = {
    getProducts: () => fetchAPI('/api/products'),

    createOrder: (items) =>
        fetchAPI('/api/products/orders', {
            method: 'POST',
            body: JSON.stringify({ items }),
        }),
};

export const adminAPI = {
    getStats: () => fetchAPI('/api/admin/stats'),

    approvePost: (id) =>
        fetchAPI(`/api/admin/posts/${id}/approve`, {
            method: 'POST',
        }),

    rejectPost: (id, reason) =>
        fetchAPI(`/api/admin/posts/${id}/reject`, {
            method: 'POST',
            body: JSON.stringify({ reason }),
        }),

    banUser: (id, reason) =>
        fetchAPI(`/api/admin/users/${id}/ban`, {
            method: 'POST',
            body: JSON.stringify({ reason }),
        }),
};
