import type { Schema, Struct } from '@strapi/strapi';

export interface HeroImages extends Struct.ComponentSchema {
  collectionName: 'components_hero_images';
  info: {
    displayName: 'images';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero.images': HeroImages;
    }
  }
}
