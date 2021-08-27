export interface NavItem {
  Name: string;
  disabled?: boolean;
  IconCss: string;
  URL?: string;
  ChildFunctions?: NavItem[];
}
