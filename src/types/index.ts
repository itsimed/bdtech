export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
}

export interface Configuration {
  id: string;
  name: string;
  description: string;
  price: number;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    graphics?: string;
  };
  default?: boolean;
}

export interface ProductConfigurations {
  configurations: Configuration[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specifications: string[];
  category: string;
  subcategory: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  configurations?: ProductConfigurations;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories: Subcategory[];
} 