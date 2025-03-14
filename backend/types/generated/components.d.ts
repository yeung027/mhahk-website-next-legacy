import type { Schema, Struct } from '@strapi/strapi';

export interface FooterFooterBottomParagraph extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_bottom_paragraphs';
  info: {
    description: '';
    displayName: 'Footer Bottom Paragraph';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface FooterFooterIcon extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_icons';
  info: {
    description: '';
    displayName: 'Footer Icon';
  };
  attributes: {
    external_url: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface FooterFooterIconGroup extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_icon_groups';
  info: {
    description: '';
    displayName: 'Footer Icon Group';
  };
  attributes: {
    icons: Schema.Attribute.Component<'footer.footer-icon', true>;
  };
}

export interface FooterFooterNavGroup extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_nav_groups';
  info: {
    displayName: 'Footer Nav Group';
  };
  attributes: {
    subgroup: Schema.Attribute.Component<'footer.footer-nav-sub-group', true>;
  };
}

export interface FooterFooterNavItem extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_nav_items';
  info: {
    description: '';
    displayName: 'Footer Nav Item';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface FooterFooterNavSubGroup extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_nav_sub_groups';
  info: {
    description: '';
    displayName: 'Footer Nav Sub-Group';
  };
  attributes: {
    items: Schema.Attribute.Component<'footer.footer-nav-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface FooterFooterXlOnlyNavIcon extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_xl_only_nav_icons';
  info: {
    description: '';
    displayName: 'Footer XL Only Nav Icon';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface IndexIndexGridCategoryLister extends Struct.ComponentSchema {
  collectionName: 'components_index_index_grid_category_listers';
  info: {
    description: '';
    displayName: 'index grid category lister item';
    icon: 'apps';
  };
  attributes: {
    bg_image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    bg_image_mobile: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    title: Schema.Attribute.String;
    title2: Schema.Attribute.String;
  };
}

export interface IndexIndexHero extends Struct.ComponentSchema {
  collectionName: 'components_index_index_heroes';
  info: {
    displayName: 'index hero';
    icon: 'picture';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface IndexIndexTabsLayoutLeftAndRight
  extends Struct.ComponentSchema {
  collectionName: 'components_index_index_tabs_layout_left_and_rights';
  info: {
    description: '';
    displayName: 'index tabs layout left and right';
  };
  attributes: {
    pages: Schema.Attribute.Component<
      'index.index-tabs-page-left-and-right',
      true
    >;
  };
}

export interface IndexIndexTabsPageLeftAndRight extends Struct.ComponentSchema {
  collectionName: 'components_index_index_tabs_page_left_and_rights';
  info: {
    description: '';
    displayName: 'index tabs page left and right';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['green', 'cyan', 'orange', 'purple']> &
      Schema.Attribute.Required;
    items: Schema.Attribute.Component<
      'index.index-tabs-page-left-and-right-item',
      true
    >;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface IndexIndexTabsPageLeftAndRightItem
  extends Struct.ComponentSchema {
  collectionName: 'components_index_index_tabs_page_left_and_right_items';
  info: {
    description: '';
    displayName: 'index tabs item left and right';
    icon: 'file';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    position: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'right'>;
    short_content: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MainMenuMainmenuCategory extends Struct.ComponentSchema {
  collectionName: 'components_main_menu_mainmenu_categories';
  info: {
    displayName: 'Mainmenu-category';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'index',
        'about',
        'service',
        'news',
        'publish',
        'share',
        'volunteer',
        'recruitment',
      ]
    >;
  };
}

export interface MainMenuMainmenuRootitem extends Struct.ComponentSchema {
  collectionName: 'components_main_menu_mainmenu_rootitems';
  info: {
    displayName: 'Mainmenu-rootitem';
  };
  attributes: {
    category: Schema.Attribute.Component<'main-menu.mainmenu-category', false>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface MainMenuMainmenuSubitem extends Struct.ComponentSchema {
  collectionName: 'components_main_menu_mainmenu_subitems';
  info: {
    description: '';
    displayName: 'Mainmenu-subitem';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface MainMenuMainmenuSubmenu extends Struct.ComponentSchema {
  collectionName: 'components_main_menu_mainmenu_submenus';
  info: {
    description: '';
    displayName: 'Mainmenu-submenu';
  };
  attributes: {
    category: Schema.Attribute.Component<'main-menu.mainmenu-category', false>;
    items: Schema.Attribute.Component<'main-menu.mainmenu-subitem', true>;
    title: Schema.Attribute.String;
  };
}

export interface MainMenuMainmenuSubsubitem extends Struct.ComponentSchema {
  collectionName: 'components_main_menu_mainmenu_subsubitems';
  info: {
    description: '';
    displayName: 'Mainmenu-subsubitem';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface MainMenuMainmenuSubsubmenu extends Struct.ComponentSchema {
  collectionName: 'components_main_menu_mainmenu_subsubmenus';
  info: {
    description: '';
    displayName: 'Mainmenu-subsubmenu';
  };
  attributes: {
    category: Schema.Attribute.Component<'main-menu.mainmenu-category', false>;
    menus: Schema.Attribute.Component<
      'main-menu.mainmenu-subsubmenu-menu',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface MainMenuMainmenuSubsubmenuMenu extends Struct.ComponentSchema {
  collectionName: 'components_main_menu_mainmenu_subsubmenu_menus';
  info: {
    description: '';
    displayName: 'Mainmenu-subsubmenu-menu';
  };
  attributes: {
    items: Schema.Attribute.Component<'main-menu.mainmenu-subsubitem', true>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.footer-bottom-paragraph': FooterFooterBottomParagraph;
      'footer.footer-icon': FooterFooterIcon;
      'footer.footer-icon-group': FooterFooterIconGroup;
      'footer.footer-nav-group': FooterFooterNavGroup;
      'footer.footer-nav-item': FooterFooterNavItem;
      'footer.footer-nav-sub-group': FooterFooterNavSubGroup;
      'footer.footer-xl-only-nav-icon': FooterFooterXlOnlyNavIcon;
      'index.index-grid-category-lister': IndexIndexGridCategoryLister;
      'index.index-hero': IndexIndexHero;
      'index.index-tabs-layout-left-and-right': IndexIndexTabsLayoutLeftAndRight;
      'index.index-tabs-page-left-and-right': IndexIndexTabsPageLeftAndRight;
      'index.index-tabs-page-left-and-right-item': IndexIndexTabsPageLeftAndRightItem;
      'main-menu.mainmenu-category': MainMenuMainmenuCategory;
      'main-menu.mainmenu-rootitem': MainMenuMainmenuRootitem;
      'main-menu.mainmenu-subitem': MainMenuMainmenuSubitem;
      'main-menu.mainmenu-submenu': MainMenuMainmenuSubmenu;
      'main-menu.mainmenu-subsubitem': MainMenuMainmenuSubsubitem;
      'main-menu.mainmenu-subsubmenu': MainMenuMainmenuSubsubmenu;
      'main-menu.mainmenu-subsubmenu-menu': MainMenuMainmenuSubsubmenuMenu;
    }
  }
}
