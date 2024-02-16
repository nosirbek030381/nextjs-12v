import { Avatar, Box, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Sidebar } from 'src/components';
import { calculateEstimatedTimeToRead } from 'src/helpers/time.format';
import { BlogsType } from 'src/interfaces/blog.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';
import Layout from 'src/layout/layout';
import { BlogsService } from 'src/services/blog.service';

const DetailedBlog = ({ blog, latestBlog, categories }: DetailBlogProps) => {
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
				<Box width={{ xs: '100%', md: '70%' }}>
					<Box
						sx={{
							borderRadius: '8px',
							boxShadow: '0px 8px 16px rgba(255, 255, 255, .1)',
							backgroundColor: 'rgba(0, 0, 0, .5)',
							p: '20px',
						}}
						position={'relative'}
						width={'100%'}
						height={{ xs: '30vh', md: '50vh' }}
						mb={'20px'}
					>
						<Image
							src={blog.image.url}
							alt={blog.title}
							fill
							style={{ objectFit: 'cover', borderRadius: '8px' }}
						/>
					</Box>
					<Box display={'flex'} flexDirection={'column'} rowGap={'10px'}>
						<Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', mt: '20px' }}>
							<Avatar alt={blog.author.name} src={blog.author.avatar.url} />
							<Box>
								<Typography variant='h6'>{blog.author.name}</Typography>
								<Box color={'gray'} sx={{ opacity: '.6' }}>
									{' '}
									{format(new Date(blog.createdAt), 'dd MMM, yyyy')} &#x2022;{' '}
									{calculateEstimatedTimeToRead(blog.description.text)}min read
								</Box>
							</Box>
						</Box>
						<Typography variant='h4'>{blog.title}</Typography>
						<Typography color={'gray'} variant='body2'>
							{blog.excerpt}
						</Typography>
						<Divider />
						<div
							style={{ opacity: '.8' }}
							dangerouslySetInnerHTML={{ __html: blog.description.text }}
						/>
					</Box>
				</Box>
				<Sidebar latestBlog={latestBlog} categories={categories} />
			</Box>
		</Layout>
	);
};

export default DetailedBlog;

export const getServerSideProps: GetServerSideProps<DetailBlogProps> = async ({ query }) => {
	const blog = await BlogsService.getDetailedBlog(query.slug as string);
	const latestBlog = await BlogsService.getLatestBlog();
	const categories = await BlogsService.getCategories();

	return {
		props: {
			blog,
			latestBlog,
			categories,
		},
	};
};

interface DetailBlogProps {
	blog: BlogsType;
	latestBlog: BlogsType[];
	categories: CategoriesType[];
}
