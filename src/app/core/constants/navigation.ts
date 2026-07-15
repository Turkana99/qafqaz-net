export interface NavItem {
  label: string;
  route: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Xidmətlərimiz', route: '/services' },
  { label: 'Məhsullar', route: '/products' },
  { label: 'Şirkət', route: '/company' },
  { label: 'Bloqlar', route: '/blogs' },
  { label: 'Karyera', route: '/careers' },
] as const;
