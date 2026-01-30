
export default defineEventHandler(async (event) => {
	// @ts-ignore
	const articles = await queryCollection(event, 'blog')
			// Exclude articles starting with underscore
			.where('path', 'NOT LIKE', '/blog/%/_%')
			.order('date', 'DESC')
			.all();
	
	event.node.res.setHeader('Content-Type', 'application/xml');

	if (!articles) {
		return `error: no articles found`;
	}

	const items = articles.map(article => `<item>
<title>${article.title}</title>
<link>https://tonystr.net/${article.path}</link>
<guid isPermaLink="true">https://tonystr.net${article.path}</guid>
<description>${article.description}</description>
<pubDate>${article.date}</pubDate>
</item>`);

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>TonyStr's blog</title>
<link>https://tonystr.net</link>
${items.join('\n')}
</channel>
</rss>`;
});
