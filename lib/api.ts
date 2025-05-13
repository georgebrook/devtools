type NavType = 'main' | 'tools' | 'options' | 'styles';

export type NavItem = {
  label: string;
  href?: string;
  isActive?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  iconName?: string;
  iconPosition?: 'before' | 'after' | 'only';
  iconSize?: number;
};

export const fetchNav = async (type: NavType): Promise<NavItem[]> => {
  const module = await import(`./mock-data/${type}-nav.json`);
  return module.default as NavItem[];
};
