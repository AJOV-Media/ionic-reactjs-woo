export default interface Reviews {
  id: number;
  date_created: string;
  date_created_gmt: string;
  product_id: number;
  status: string;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  varified: boolean;
  reviewer_avatar_urls?: {};
  _links?: Links;
}

interface Links {
  self?: [];
  collection?: [];
  up?: [];
}
