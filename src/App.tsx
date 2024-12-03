import React, { useState } from "react";
import AuthorList from "./components/AuthorList";
import BookList from "./components/BookList";
import "./App.css";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"authors" | "books">("authors");

  return (
    <div>
      <header className="app-header">
        <h1>Library Management</h1>
        <nav className="navigation">
          <button
            className={activeTab === "authors" ? "active" : ""}
            onClick={() => setActiveTab("authors")}
          >
            Authors
          </button>
          <button
            className={activeTab === "books" ? "active" : ""}
            onClick={() => setActiveTab("books")}
          >
            Books
          </button>
        </nav>
      </header>
      <main className="content">
        {activeTab === "authors" && <AuthorList />}
        {activeTab === "books" && <BookList />}
      </main>
    </div>
  );
};

export default App;
