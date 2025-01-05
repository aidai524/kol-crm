export { default as request } from '@/utils/request';

export interface WrapperResponse<T> {
  code: number;
  data?: T;
  message?: string;
}

export type PaginationResponse<T> = WrapperResponse<
  { list?: T[]; has_next_page: boolean } | undefined
>;

export const innerApiPrefix = (url: string) => {
  return '/api/v1/' + url;
};
