// API client for Flask backend
import {
  User,
  Product,
  Cart,
  Transaction,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  AddToCartRequest,
  UpdateCartItemRequest,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

// Helper function to create headers
const getHeaders = (includeAuth: boolean = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic fetch wrapper with error handling
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth: boolean = false
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers = getHeaders(includeAuth);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

// Auth API
export const authAPI = {
  async register(email: string, password: string): Promise<AuthResponse> {
    const data = await apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store token in localStorage
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
    }

    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store token in localStorage
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
    }

    return data;
  },

  async logout(): Promise<{ message: string }> {
    const data = await apiFetch<{ message: string }>('/auth/logout', {
      method: 'DELETE',
    }, true);

    // Remove token from localStorage
    localStorage.removeItem('access_token');

    return data;
  },

  async getProfile(): Promise<User> {
    return apiFetch<User>('/auth/profile', {
      method: 'GET',
    }, true);
  },
};

// Products API
export const productsAPI = {
  async getAll(): Promise<Product[]> {
    return apiFetch<Product[]>('/products', {
      method: 'GET',
    }, true);
  },

  async getByBarcode(barcode: string): Promise<Product> {
    return apiFetch<Product>(`/products/${barcode}`, {
      method: 'GET',
    }, true);
  },

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    return apiFetch<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }, true);
  },

  async update(barcode: string, product: Partial<Product>): Promise<Product> {
    return apiFetch<Product>(`/products/${barcode}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }, true);
  },

  async delete(barcode: string): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`/products/${barcode}`, {
      method: 'DELETE',
    }, true);
  },
};

// Cart API
export const cartAPI = {
  async get(): Promise<Cart> {
    return apiFetch<Cart>('/cart', {
      method: 'GET',
    }, true);
  },

  async addItem(barcode: string, quantity: number = 1): Promise<{ message: string; cart: Cart }> {
    return apiFetch<{ message: string; cart: Cart }>('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ barcode, quantity }),
    }, true);
  },

  async updateItem(itemId: number, quantity: number): Promise<{ message: string; cart: Cart }> {
    return apiFetch<{ message: string; cart: Cart }>(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }, true);
  },

  async removeItem(itemId: number): Promise<{ message: string; cart: Cart }> {
    return apiFetch<{ message: string; cart: Cart }>(`/cart/items/${itemId}`, {
      method: 'DELETE',
    }, true);
  },
};

// Transactions API
export const transactionsAPI = {
  async checkout(): Promise<Transaction> {
    return apiFetch<Transaction>('/transactions/checkout', {
      method: 'POST',
    }, true);
  },

  async getHistory(): Promise<Transaction[]> {
    return apiFetch<Transaction[]>('/transactions', {
      method: 'GET',
    }, true);
  },
};

// Export all APIs as a single object
export const api = {
  auth: authAPI,
  products: productsAPI,
  cart: cartAPI,
  transactions: transactionsAPI,
};
