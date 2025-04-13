import { useEffect, useState } from 'react';

export default function FacebookEmbed() {
  const [embedHtml, setEmbedHtml] = useState('');

  useEffect(() => {
    async function fetchFacebookEmbed() {
      try {
        const response = await fetch('/api/social'); // Fetch API data
        const data = await response.json();

        // Filter for the item with name === "Facebook"
        const facebookData = data.find(item => item.name === 'Facebook');

        if (facebookData?.link) {
          setEmbedHtml(`
            <iframe 
              src="${facebookData.link}" 
              width="267" 
              height="476" 
              style="border:none;overflow:hidden" 
              scrolling="no" 
              frameborder="0" 
              allowfullscreen="true" 
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
          `);
        }
      } catch (error) {
        console.error('Error fetching Facebook embed:', error);
      }
    }

    fetchFacebookEmbed();
  }, []);

  useEffect(() => {
    // Load the Facebook SDK for JavaScript
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [embedHtml]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
    </div>
  );
}
