import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { CategoriesType } from 'src/interfaces/categories.interface';
import Layout from 'src/layout/layout';
import { BlogsService } from 'src/services/blog.service';

const CategoryBlog = ({ categories }: CategoryBlogProps) => {
	const router = useRouter();

	return (
		<Layout>
			<Box
				width={{ xs: '100%', md: '80%' }}
				mx={'auto'}
				mt={'10vh'}
				borderRadius={'10px'}
				height={{ xs: '30vh', md: '50vh' }}
				sx={{
					backgroundColor: 'black',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					rowGap: '10px',
				}}
			>
				<Typography variant='h3' fontFamily={'cursive'}>
					All Category
				</Typography>
				<ButtonGroup variant='contained' arial-label='outlined primary button group'>
					{categories.map(item => (
						<Button key={item.slug} onClick={() => router.push(`/category/${item.slug}`)}>
							{' '}
							# {item.label}
						</Button>
					))}
				</ButtonGroup>
			</Box>
		</Layout>
	);
};

export default CategoryBlog;

export const getServerSideProps: GetServerSideProps<CategoryBlogProps> = async () => {
	const categories = await BlogsService.getCategories();

	return {
		props: { categories },
	};
};

interface CategoryBlogProps {
	categories: CategoriesType[];
}
