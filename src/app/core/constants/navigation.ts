export interface NavItem {
  label: string;
  route?: string;
  children?: { label: string; route: string }[];
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Xidmətlərimiz', route: '/services' },
  { label: 'Məhsullar', route: '/products' },
  { 
    label: 'Şirkət', 
    children: [
      { label: 'Haqqımızda', route: '/company' },
      { label: 'Maliyyə hesabatları', route: '/financial-reports' }
    ]
  },
  { label: 'Bloqlar', route: '/blogs' },
  { label: 'Karyera', route: '/careers' },
];
