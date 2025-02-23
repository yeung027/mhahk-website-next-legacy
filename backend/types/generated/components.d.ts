import type { Schema, Struct } from '@strapi/strapi';

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

export interface MainMenuMainMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_main_menu_main_menu_items';
  info: {
    description: '';
    displayName: 'mainmenu-item';
  };
  attributes: {
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface MainMenuMainmenuSubmenu extends Struct.ComponentSchema {
  collectionName: 'components_main_menu_mainmenu_submenus';
  info: {
    displayName: 'Mainmenu-submenu';
  };
  attributes: {
    submenus: Schema.Attribute.Relation<
      'oneToMany',
      'api::main-menu.main-menu'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'index.index-grid-category-lister': IndexIndexGridCategoryLister;
      'index.index-hero': IndexIndexHero;
      'index.index-tabs-layout-left-and-right': IndexIndexTabsLayoutLeftAndRight;
      'index.index-tabs-page-left-and-right': IndexIndexTabsPageLeftAndRight;
      'index.index-tabs-page-left-and-right-item': IndexIndexTabsPageLeftAndRightItem;
      'main-menu.main-menu-item': MainMenuMainMenuItem;
      'main-menu.mainmenu-submenu': MainMenuMainmenuSubmenu;
    }
  }
}
