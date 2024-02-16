import request, { gql } from 'graphql-request';
import { BlogsType } from 'src/interfaces/blog.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';

const graphqlAPI = process.env.NEXT_PUBLIC_HYPOGRAPH_ENDPOINT as string;

export const BlogsService = {
	async getAllBlogs() {
		const query = gql`
			query GetBlogs {
				blogs {
					excerpt
					id
					slug
					title
					createdAt
					image {
						url
					}
					description {
						text
					}
					author {
						name
						avatar {
							url
						}
					}
					category {
						label
						slug
					}
				}
			}
		`;

		const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query);
		return result.blogs;
	},

	async getLatestBlog() {
		const query = gql`
			query GetLatestBlogs {
				blogs(last: 2) {
					id
					slug
					title
					createdAt
					image {
						url
					}
					description {
						text
					}
					author {
						name
						avatar {
							url
						}
					}
				}
			}
		`;
		const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query);
		return result.blogs;
	},

	async getCategories() {
		const query = gql`
			query GetCategories {
				categories {
					label
					slug
				}
			}
		`;

		const result = await request<{ categories: CategoriesType[] }>(graphqlAPI, query);
		return result.categories;
	},
};
