import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/atom-one-dark.css";

// Register the JavaScript language
hljs.registerLanguage("javascript", javascript);

function Problem1() {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

  return (
    <div className="p-8 relative z-10">
      <h1 className="text-3xl font-bold mb-4 text-foreground">
        🔣 Problem 1: Three ways to sum to n
      </h1>
      {/* Placeholder content for Problem 1 */}
      <div className="p-6 rounded-lg my-8 border border-border bg-card shadow-card">
        <h3 className="text-xl font-semibold mb-4 text-card-foreground">
          Task
        </h3>
        <p className="mb-4 text-muted">
          Provide 3 unique implementations of the following function in
          JavaScript.
        </p>
        <p className="mb-4 text-muted">
          <strong>Input:</strong> n - any integer
          <br />
          <strong>Output:</strong> summation to n, i.e. sum_to_n(5) === 1 + 2 +
          3 + 4 + 5 === 15
        </p>

        <pre className="rounded-lg overflow-x-auto text-sm bg-surface border border-border">
          <code
            ref={codeRef}
            className="language-javascript"
          >{`var sum_to_n_a = function(n) {
  // your code here
};

var sum_to_n_b = function(n) {
  // your code here
};

var sum_to_n_c = function(n) {
  // your code here
};`}</code>
        </pre>
      </div>

      <div className="p-6 rounded-lg my-8 border border-border bg-card shadow-card">
        <h3 className="text-xl font-semibold mb-4 text-card-foreground">
          Solution
        </h3>
      </div>

      <Link
        to="/"
        className="inline-block px-6 py-3 text-white no-underline rounded transition-all duration-300 hover:scale-105 relative z-20 bg-secondary shadow-button hover:bg-muted hover:shadow-button-hover"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default Problem1;
