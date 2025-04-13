"use client";

import React, { useState, useEffect } from "react";

const InstagramPost = () => {
  const [postLink, setPostLink] = useState(null);

  useEffect(() => {
    const fetchInstagramPost = async () => {
      try {
        const response = await fetch("/api/social");

        if (!response.ok) {
          throw new Error("Failed to fetch Instagram data");
        }

        const data = await response.json();

        // Filter the data where name === "Insta"
        const instaPost = data.find((item) => item.name === "Insta");

        if (instaPost?.link) {
          setPostLink(instaPost.link);
        } else {
          console.error("No Instagram post found with name 'Insta'");
        }
      } catch (error) {
        console.error("Error fetching Instagram data:", error);
      }
    };

    fetchInstagramPost();
  }, []);

  return (
    <div className="flex justify-center">
      {postLink ? (
        <iframe
          src={`https://www.instagram.com/p/${postLink.split("/")[4]}/embed`}
          width="328"
          height="600"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Instagram Post"
        ></iframe>
      ) : (
        <p>No Instagram post available.</p>
      )}
    </div>
  );
};

export default InstagramPost;
