export default interface ProductListing {
  key: string;
  name: string;
  shortDescription?: string;
  price_html?: string;
  qty?: number;
  mainImage?: string;
  clicked?: any;
}
