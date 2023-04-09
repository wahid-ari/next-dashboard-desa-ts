const BASE_URL = `${process.env.API_ROUTE}`;

function generateRssFeed() {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Next Dashboard Desa | RSS Feed</title>
        <link>${BASE_URL}</link>
        <description>Welcome Next Dashboard Desa RSS Feed</description>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <language>en-us</language>
        <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
        <generator>Feed for Node.js</generator>
        <ttl>60</ttl>
        <managingEditor>wahiid.ari@gmail.com (Wahid Ari)</managingEditor>
        <webMaster>wahiid.ari@gmail.com (Wahid Ari)</webMaster>
        <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
        <image>
          <title>Next Dashboard Desa | RSS Feed</title>
          <url>${BASE_URL}/logo.png</url>
          <link>${BASE_URL}</link>
          <description>Next Dashboard Desa Logo</description>
        </image>
        <copyright>All rights reserved 2022, Next Dashboard Desa</copyright>
      </channel>
    </rss>
  `;
}

// function generateRssFeed(movies: any) {
//   const timeElapsed = Date.now();
//   const today = new Date(timeElapsed);

//   return `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
//       <channel>
//         <title>Next Dashboard Desa | RSS Feed</title>
//         <link>${BASE_URL}</link>
//         <description>Welcome Next Dashboard Desa RSS Feed</description>
//         <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
//         <pubDate>${new Date().toUTCString()}</pubDate>
//         <language>en-us</language>
//         <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
//         <generator>Feed for Node.js</generator>
//         <ttl>60</ttl>
//         <managingEditor>wahiid.ari@gmail.com (Wahid Ari)</managingEditor>
//         <webMaster>wahiid.ari@gmail.com (Wahid Ari)</webMaster>
//         <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
//         <image>
//           <title>Next Dashboard Desa | RSS Feed</title>
//           <url>${BASE_URL}/logo.png</url>
//           <link>${BASE_URL}</link>
//           <description>Next Dashboard Desa Logo</description>;
//         </image>
//         <copyright>All rights reserved 2022, Next Dashboard Desa</copyright>

//         <!-- Automatically generate dynamic movies page-->
//         ${movies
//           .map((movie: any) => {
//             return `
//             <item>
//               <title>
//                 <![CDATA[ ${movie.name} ]]>
//               </title>
//               <description>
//                 <![CDATA[ ${movie.description} ]]>
//               </description>
//               <author>wahiid.ari@gmail.com</author>
//               <pubDate>${movie.created_at.substring(0,10)}</pubDate>
//               <link>${BASE_URL}/movies/${movie.id}</link>
//               <guid>${BASE_URL}/movies/${movie.id}</guid>
//             </item>
//           `;
//           })
//           .join('')}
        
//       </channel>
//     </rss>
//   `;
// }

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  // const getAllMovies = await fetch(`https://my-moviee.vercel.app/api/movies`);
  // const movies = await getAllMovies.json();

  // We generate the XML sitemap with the data
  // const sitemap = generateRssFeed(movies.slice(0,2));
  const sitemap = generateRssFeed();

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
