const BASE_URL = `${process.env.API_ROUTE}`;

function generateSiteMap() {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    
      <!-- Manually set the URLs we know already-->
      <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${BASE_URL}/settings</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/keuangan</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/design</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>

    </urlset>
  `;
}
// function generateSiteMap(movies) {
//   const timeElapsed = Date.now();
//   const today = new Date(timeElapsed);

//   return `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

//       <!-- Manually set the URLs we know already-->
//       <url>
//         <loc>${BASE_URL}</loc>
//         <lastmod>${today.toISOString()}</lastmod>
//         <priority>1.00</priority>
//       </url>
//       <url>
//         <loc>${BASE_URL}/settings</loc>
//         <lastmod>${today.toISOString()}</lastmod>
//         <priority>0.80</priority>
//       </url>
//       <url>
//         <loc>${BASE_URL}/keuangan</loc>
//         <lastmod>${today.toISOString()}</lastmod>
//         <priority>0.80</priority>
//       </url>
//       <url>
//         <loc>${BASE_URL}/design</loc>
//         <lastmod>${today.toISOString()}</lastmod>
//         <priority>0.80</priority>
//       </url>

//   <!-- Automatically generate dynamic movies page-->
//   ${movies
//     .map((movie) => {
//       return `
//       <url>
//         <loc>${`${BASE_URL}/movies/${movie.id}`}</loc>
//         <lastmod>${today.toISOString()}</lastmod>
//       </url>
//     `;
//     })
//     .join('')}

//     </urlset>
//   `;
// }

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  // const getAllMovies = await fetch(`${process.env.API_ROUTE}/api/movies`);
  // const movies = await getAllMovies.json();

  // We generate the XML sitemap with the data
  // const sitemap = generateSiteMap(movies);
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
