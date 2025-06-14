import type { Schema, Struct } from '@strapi/strapi';

export interface SeoSeoMetadata extends Struct.ComponentSchema {
  collectionName: 'components_seo_seo_metadata';
  info: {
    displayName: 'SeoMetadata';
    icon: 'alien';
  };
  attributes: {
    canonical_url: Schema.Attribute.String & Schema.Attribute.Required;
    seo_description: Schema.Attribute.Text & Schema.Attribute.Required;
    seo_image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    seo_title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedAddress extends Struct.ComponentSchema {
  collectionName: 'components_shared_addresses';
  info: {
    displayName: 'Address';
    icon: 'house';
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    state: Schema.Attribute.String;
    street: Schema.Attribute.String;
    zip_code: Schema.Attribute.String;
  };
}

export interface SharedLocalizedPrice extends Struct.ComponentSchema {
  collectionName: 'components_shared_localized_prices';
  info: {
    displayName: 'LocalizedPrice';
    icon: 'cog';
  };
  attributes: {
    currency: Schema.Attribute.Relation<'oneToOne', 'api::currency.currency'>;
    price: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface SharedOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_order_items';
  info: {
    displayName: 'OrderItem';
    icon: 'puzzle';
  };
  attributes: {
    price_at_purchase: Schema.Attribute.Decimal & Schema.Attribute.Required;
    product_variant: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-variant.product-variant'
    >;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'seo.seo-metadata': SeoSeoMetadata;
      'shared.address': SharedAddress;
      'shared.localized-price': SharedLocalizedPrice;
      'shared.order-item': SharedOrderItem;
    }
  }
}
