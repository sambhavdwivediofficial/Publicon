export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export const getPagination = (options: PaginationOptions) => {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};