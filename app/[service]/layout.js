import LayoutClient from './layout.client';
export { generateMetadata } from './metadata';

export default async function Layout({ children, params }) {
  // Await params in Next.js 15+
  const awaitedParams = await params;
  const service = awaitedParams?.service || '';

  // Format service name for display
  const formatServiceName = (str) => {
    if (!str) return '';
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const serviceName = formatServiceName(service);
  const pageTitle = serviceName
    ? `${serviceName}`
    : 'Transforming Business Through SAP Excellence';

  return (
    <>
      {/* Server-rendered H1 for SEO */}
      <h1
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {pageTitle}
      </h1>

      <h2
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Are you ready to optimize your business processes?
        Expert consulting, customization, and support to transform your business operations
      </h2>

      <LayoutClient>{children}</LayoutClient>
    </>
  );
}
