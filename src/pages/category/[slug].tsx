import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { Content, Sidebar } from 'src/components';
import { BlogsType } from 'src/interfaces/blog.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';
import Layout from 'src/layout/layout';
import { BlogsService } from 'src/services/blog.service';

const DetailCategoryBlog = ({ blogs, latestBlog, categories }: DetailCategoryBlogProps) => {
	return (
		<Layout>
			<Box
				sx={{
					display: 'flex',
					gap: '10px',
					flexDirection: { xs: 'column', md: 'row' },
					padding: '20px',
				}}
			>
				<Sidebar latestBlog={latestBlog} categories={categories} />
				<Content blogs={blogs} />
			</Box>
		</Layout>
	);
};

export default DetailCategoryBlog;

export const getServerSideProps: GetServerSideProps<DetailCategoryBlogProps> = async ({
	query,
}) => {
	const blogs = await BlogsService.getDetailedCategorisBlog(query.slug as string);
	const latestBlog = await BlogsService.getLatestBlog();
	const categories = await BlogsService.getCategories();

	return {
		props: {
			blogs,
			latestBlog,
			categories,
		},
	};
};

interface DetailCategoryBlogProps {
	blogs: BlogsType[];
	latestBlog: BlogsType[];
	categories: CategoriesType[];
}
