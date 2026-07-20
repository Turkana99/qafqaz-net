export interface EquipmentItem {
  readonly id: string;
  readonly label: string;
}

export interface EquipmentGroup {
  readonly id: string;
  readonly title: string;
  readonly items: readonly EquipmentItem[];
  readonly slider?: boolean;
}

export interface EquipmentCategory {
  readonly id: string;
  readonly label: string;
  readonly defaultArrowIcon: string;
  readonly activeArrowIcon: string;
  readonly groups: readonly EquipmentGroup[];
}

export const EQUIPMENT_CATEGORIES: ReadonlyArray<EquipmentCategory> = [
  {
    id: 'cameras-security',
    label: 'Kameralar, Təhlükəsizlik və Nəzarət Sistemləri',
    defaultArrowIcon: 'assets/icons/gray-arrow.svg',
    activeArrowIcon: 'assets/icons/green-arrow.svg',
    groups: [
      {
        id: 'recorders',
        title: 'Rekorderlər',
        items: [{ id: 'rec-1', label: 'DVR və NVR sistemləri' }],
      },
      {
        id: 'accessories',
        title: 'Aksesuarlar və Avadanlıqlar',
        slider: true,
        items: [
          { id: 'acc-1', label: 'Təhlükəsizlik sistemləri (siqnalizasiya və giriş nəzarət həlləri)' },
          { id: 'acc-2', label: 'Access control cihazları, maqnit kilidlər, çıxış düymələri' },
          { id: 'acc-3', label: 'Kamera aksesuarları və mühafizə avadanlıqları' },
          { id: 'acc-4', label: 'Video domofonlar və çağırış panelləri' },
        ],
      },
      {
        id: 'cameras',
        title: 'Kameralar',
        items: [
          { id: 'cam-1', label: 'IP və HD kameralar' },
          { id: 'cam-2', label: 'Fisheye, bullet, dome, PTZ tipli kameralar' },
        ],
      },
    ],
  },
  {
    id: 'office-computer',
    label: 'Ofis və Kompüter Avadanlıqları',
    defaultArrowIcon: 'assets/icons/gray-arrow.svg',
    activeArrowIcon: 'assets/icons/green-arrow.svg',
    groups: [
      {
        id: 'computers',
        title: 'Kompüter və Monobloklar',
        items: [
          { id: 'pc-1', label: 'Noutbuklar və Masaüstü Kompüterlər' },
          { id: 'pc-2', label: 'Monobloklar (All-in-One)' },
        ],
      },
      {
        id: 'office-supplies',
        title: 'Ofis Avadanlıqları',
        slider: true,
        items: [
          { id: 'off-1', label: 'Proyektorlar və İnteraktiv Lövhələr' },
          { id: 'off-2', label: 'Skanerlər və Laminasiya Aparatları' },
          { id: 'off-3', label: 'UPS (Fasiləsiz Qida Mənbələri)' },
        ],
      },
    ],
  },
  {
    id: 'printers-cartridges',
    label: 'Printer, Kartriclər və Çap Avadanlıqları',
    defaultArrowIcon: 'assets/icons/gray-arrow.svg',
    activeArrowIcon: 'assets/icons/green-arrow.svg',
    groups: [
      {
        id: 'printers',
        title: 'Printerlər və MFQ',
        items: [
          { id: 'pr-1', label: 'Lazer və Şırnaqlı Printerlər' },
          { id: 'pr-2', label: 'Çoxfunksiyalı Qurğular (MFQ)' },
        ],
      },
      {
        id: 'cartridges',
        title: 'Kartriclər və Sərf Təchizatı',
        slider: true,
        items: [
          { id: 'cart-1', label: 'Orijinal və Analoq Kartriclər' },
          { id: 'cart-2', label: 'Toner və Çap Kağızları' },
        ],
      },
    ],
  },
  {
    id: 'network-it',
    label: 'Şəbəkə və İnformasiya Texnologiyaları (İT) Avadanlıqları',
    defaultArrowIcon: 'assets/icons/gray-arrow.svg',
    activeArrowIcon: 'assets/icons/green-arrow.svg',
    groups: [
      {
        id: 'switches-routers',
        title: 'Şəbəkə Qurğuları',
        items: [
          { id: 'net-1', label: 'Sviçlər (Switch) və Routerlər' },
          { id: 'net-2', label: 'Wi-Fi Access Point həlləri' },
        ],
      },
      {
        id: 'servers-racks',
        title: 'Serverlər və Şkaflar',
        slider: true,
        items: [
          { id: 'srv-1', label: 'Rack və Tower Serverlər' },
          { id: 'srv-2', label: 'Server Şkafları və Kabel Menecmenti' },
          { id: 'srv-3', label: 'PATCH Panellər və Optik Kabel Sistemləri' },
        ],
      },
    ],
  },
];
