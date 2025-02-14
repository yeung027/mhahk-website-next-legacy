import type { Schema, Struct } from '@strapi/strapi';

export interface HeroHero extends Struct.ComponentSchema {
  collectionName: 'components_hero_heroes';
  info: {
    description: '';
    displayName: 'index-hero';
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
      'hero.hero': HeroHero;
      'main-menu.main-menu-item': MainMenuMainMenuItem;
      'main-menu.mainmenu-submenu': MainMenuMainmenuSubmenu;
    }
  }
}
