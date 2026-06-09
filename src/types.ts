export interface Booklet {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  year: string;
  category: string;
  coverColor: string;
  themeColor: string; // e.g. '#2563eb'
  description: string;
  image?: string;
  pages: {
    title: string;
    content: string;
    imagePlaceholder?: string;
    image?: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
}

export interface TYRProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  specs: string[];
  colorVariants: {
    name: string;
    hex: string;
  }[];
  images: string[];
  features: {
    title: string;
    desc: string;
  }[];
}
