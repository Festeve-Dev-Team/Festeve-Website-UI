import { QueryKey } from "@tanstack/react-query";

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string;
  categoryFullSlug?: string;
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
  q?: string; // Search query parameter
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  background_image?: any;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type ProductVariant = {
  _id: string;
  sku: string;
  specs: {
    set?: string;
    closures?: string;
    ageGroup?: string;
    [key: string]: unknown;
  };
  price: number;
  stock: number;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  images: string[];
  size?: string;
  color: string;
  colorCode: string;
  colorFamily: string;
  material: string;
  weight: number;
  isActive: boolean;
  isDownloadable?: boolean;
  downloadUrl?: string;
};

export type Variation = {
  id: number;
  value: string;
  meta?: string;
  attribute: {
    id: number;
    name: string;
    slug: string;
  };
};

export type ProductMeta = {
  id: number;
  title: string;
  content: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  assignedCategoryId: string;
  assignedCategoryLevel: number;
  categoryPathIds: string[];
  categoryFullSlug: string;
  categoryPathSlugs: string[];
  isCategoryActiveAtAssignment: boolean;
  tags: string[];
  isHotItem: boolean;
  ingredients: any[];
  vendors: any[];
  variants: ProductVariant[];
  defaultDiscountType?: "percentage" | "fixed";
  defaultDiscountValue?: number;
  linkedEvents: string[];
  isTrending: boolean;
  meta: {
    occasion: string[];
    origin: string;
    [key: string]: unknown;
  };
  createdAt: string;
  updatedAt: string;
};
export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};

export type EventRecurring = {
  isRecurring: boolean;
  frequency: string;
  daysOfWeek: number[];
};

export type EventLinkedProduct = {
  productId: string;
  relation: string;
};

export type EventSpecialOffer = {
  offerType: string;
  productId: string;
};

export type EventExtraData = {
  theme?: string;
  dressCode?: string;
  [key: string]: unknown;
};

export type Event = {
  _id: string;
  name: string;
  description: string;
  type: string;
  date: string;
  recurring: EventRecurring;
  linkedProducts: EventLinkedProduct[];
  purohitRequired: boolean;
  ritualNotes: string;
  region: string;
  regions: string[];
  specialOffers: EventSpecialOffer[];
  extraData: EventExtraData;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type EventsQueryOptionsType = {
  limit?: number;
  region?: string;
  startDate?: string;
  endDate?: string;
};
