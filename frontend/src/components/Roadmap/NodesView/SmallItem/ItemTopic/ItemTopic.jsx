import React from "react";
import "./ItemTopic.css";

const TYPE_OPTIONS = [
  "Video",
  "Article",
  "Opensource",
  "Course",
  "Website",
  "Podcast",
];

export default function ItemTopic({ type, title, href }) {
  return (
    <div className="item-topic">
      <span className={`type-badge ${type.toLowerCase()}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
      <a
        href={href}
        className="topic-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {title || "No title provided"}
      </a>
    </div>
  );
}
