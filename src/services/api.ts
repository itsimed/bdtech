// Détection automatique de l'environnement pour l'URL de l'API
const getApiBaseUrl = () => {
  // Si une variable d'environnement est définie, l'utiliser
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Sinon, détecter automatiquement selon l'environnement
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // En développement local
    return 'http://localhost:5000/api';
  } else {
    // En production - Render backend
    // Cette URL sera mise à jour après déploiement Render
    return 'https://bdtech-backend-production.onrender.com/api';
  }
};

const API_BASE_URL = getApiBaseUrl();

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
  position?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  isActive: boolean;
  isEmailVerified: boolean;
  role: 'client' | 'admin';
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    language: 'en' | 'fr' | 'ar';
  };
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  category: string;
  subcategory?: string;
  brand?: string;
  model?: string;
  sku: string;
  images: {
    url: string;
    alt?: string;
    isPrimary: boolean;
  }[];
  primaryImage?: {
    url: string;
    alt?: string;
  };
  specifications?: Record<string, string>;
  stock: {
    quantity: number;
    isAvailable: boolean;
    warehouse?: string;
  };
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  weight?: {
    value: number;
    unit: string;
  };
  tags: string[];
  featured: boolean;
  isActive: boolean;
  pricing: {
    price: number;
    originalPrice?: number;
    discount: number;
    currency: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface ProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  position?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  preferences?: {
    newsletter?: boolean;
    notifications?: boolean;
    language?: 'en' | 'fr' | 'ar';
  };
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async register(userData: RegisterData): Promise<AuthResponse> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginData): Promise<AuthResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getCurrentUser(): Promise<{ status: string; data: { user: User } }> {
    return this.request('/auth/me');
  }

  async logout(): Promise<{ status: string; message: string }> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async forgotPassword(email: string): Promise<{ status: string; message: string }> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, password: string, confirmPassword: string): Promise<AuthResponse> {
    return this.request(`/auth/reset-password/${token}`, {
      method: 'POST',
      body: JSON.stringify({ password, confirmPassword }),
    });
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ status: string; message: string }> {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // User profile methods
  async updateProfile(profileData: ProfileData): Promise<{ status: string; message: string; data: { user: User } }> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async deleteAccount(): Promise<{ status: string; message: string }> {
    return this.request('/users/profile', {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string; timestamp: string; environment: string }> {
    return this.request('/health');
  }

  // Product methods
  async getProducts(): Promise<{ status: string; count: number; data: { products: Product[] } }> {
    return this.request('/products');
  }

  async getProduct(id: string): Promise<{ status: string; data: { product: Product } }> {
    return this.request(`/products/${id}`);
  }

  async searchProducts(query: string): Promise<{ status: string; count: number; data: { products: Product[] } }> {
    return this.request(`/products/search?q=${encodeURIComponent(query)}`);
  }
}

export const apiService = new ApiService(); 