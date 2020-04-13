import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostLink = styled(Link)`
	text-decoration: none;
`

const BlogPostTitle = styled.h3`
	margin-bottom: 20px;
	color: blue;
`

export const query = graphql`
	query {
		allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
			totalCount
			edges {
				node {
					id
					html
					excerpt
					fields {
						slug
					}
					frontmatter {
						date
						description
						title
					}
				}
			}
		}
	}
`

const IndexPage = ({ data }) => (
	<Layout>
		<SEO title="Home" />
		<div>
			<h1>Alex's Thoughts</h1>
			<span>{data.allMarkdownRemark.totalCount} Posts</span>
			<br />
			<br />
			{data.allMarkdownRemark.edges.map(({ node }) => (
				<div key={node.id}>
					<BlogPostLink to={node.fields.slug}>
						<BlogPostTitle>
							{node.frontmatter.title} - {node.frontmatter.date}
						</BlogPostTitle>
					</BlogPostLink>
					<p>{node.excerpt}</p>
				</div>
			))}
		</div>
	</Layout>
)

export default IndexPage
