import Link from "next/link";
import { useState } from "react";

export default function Papers() {
  // Placeholder data for papers - easy to extend by adding more objects
  const papers = [
    {
      title: "Paper Title 1",
      authors: ["Author 1", "Author 2"],
      date: "Date 1",
      href: "#",
    },
    {
      title: "Paper Title 2",
      authors: ["Author 3"],
      date: "Date 2",
      href: "#",
    },
    {
      title: "Paper Title 3",
      authors: ["Author 4", "Author 5", "Author 6"],
      date: "Date 3",
      href: "#",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPapers = papers.filter(paper =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <Link href="/">← Back to Home</Link>{" "}
      {/* Navigation link back to the home page */}
      <h1>Working Papers & Reports</h1>
      <input
        type="text"
        placeholder="Search papers by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper, index) => (
            <li key={index} className="paper-item">
              <h2>
                <a href={paper.href}>{paper.title}</a>
              </h2>
              <p>Authors: {paper.authors.join(", ")}</p>
              <p>Date: {paper.date}</p>
            </li>
          ))
        ) : (
          <p>No papers found matching your search.</p>
        )}
      </ul>
    </div>
  );
}
