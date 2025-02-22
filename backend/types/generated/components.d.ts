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
      'main-menu.main-menu-item': MainMenuMainMenuItem;
      'main-menu.mainmenu-submenu': MainMenuMainmenuSubmenu;
    }
  }
}
