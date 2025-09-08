import React from 'react'
import ShareIcon from '../../icons/ShareIcon';

interface CardProps {
  title: string,
  link: string,
  type: "twitter" | "youtube"
}

function Card( {title, link, type}: CardProps ) {
  return (
    <div>
      <div
        style={{ border: "2px solid grey" }}
        className="bg-slate-200 rounded-xl  p-3 max-w-80 min-h-60"
      >
        <div className="flex justify-between">
          <div className="flex">
            <div className="pr-2 text-gray-600">
              <ShareIcon variant="md" />
            </div>
            <span className="text-xl">{title}</span>
          </div>
          <div className="flex">
            <div className="pr-2 text-gray-600">
              <a href={link} target="_blank"></a>
              <ShareIcon variant="md" />
            </div>
            <div className="text-gray-600">
              <ShareIcon variant="md" />
            </div>
          </div>
        </div>
        <div className="pt-6">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card
