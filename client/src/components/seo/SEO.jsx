import { Helmet } from 'react-helmet-async';

export const SEO = ({ title, description, image, url, type = 'website', noindex = false }) => {
  const siteTitle = 'Publicon';
  const fullTitle = title ? `${title} · ${siteTitle}` : siteTitle;
  const defaultDescription = 'A high-signal knowledge platform combining Q&A, communities, and professional identity.';
  const defaultImage = '/og-image.png';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};