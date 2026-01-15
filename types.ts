
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  category: string;
  title: string;
}

export interface NavLink {
  label: string;
  href: string;
}
