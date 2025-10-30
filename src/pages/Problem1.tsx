import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/atom-one-dark.css";

// Register the JavaScript language
hljs.registerLanguage("javascript", javascript);

function Problem1() {
  const codeRef = useRef<HTMLElement>(null);
  const solutionRefs = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
  ];
  const [input, setInput] = useState<string>("5");
  const [results, setResults] = useState<{ [key: string]: number | string }>(
    {}
  );

  // Solution implementations
  const sum_to_n_a = function (n: number): number {
    // Approach 1: Using formula n(n+1)/2
    return (n * (n + 1)) / 2;
  };

  const sum_to_n_b = function (n: number): number {
    // Approach 2: Using for loop
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };

  const sum_to_n_c = function (n: number): number {
    // Approach 3: Using recursion
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
  };

  const handleTest = () => {
    const num = parseInt(input);
    if (isNaN(num)) {
      setResults({
        a: "Invalid input",
        b: "Invalid input",
        c: "Invalid input",
      });
      return;
    }

    // Check for negative numbers
    if (num < 0) {
      setResults({
        a: "Negative numbers not supported",
        b: "Negative numbers not supported",
        c: "Negative numbers not supported",
      });
      return;
    }

    // Check if result would exceed JavaScript's safe integer limit
    const maxSafeN = Math.floor(Math.sqrt(2 * Number.MAX_SAFE_INTEGER));
    if (num > maxSafeN) {
      setResults({
        a: `Number too large (max: ${maxSafeN})`,
        b: `Number too large (max: ${maxSafeN})`,
        c: `Number too large (max: ${maxSafeN})`,
      });
      return;
    }

    try {
      const results: { [key: string]: number | string } = {};
      
      // Formula approach - always works for valid inputs
      try {
        results.a = sum_to_n_a(num);
      } catch {
        results.a = "Calculation error";
      }
      
      // Loop approach - may be slow for very large numbers
      if (num > 1000000) {
        results.b = "Too large for loop (>1M)";
      } else {
        try {
          results.b = sum_to_n_b(num);
        } catch {
          results.b = "Calculation error";
        }
      }
      
      // Recursive approach - limited by call stack
      if (num > 10000) {
        results.c = "Stack overflow risk (>10K)";
      } else {
        try {
          results.c = sum_to_n_c(num);
        } catch (error) {
          // Handle specific error types for recursion
          results.c = error instanceof RangeError ? "Stack overflow" : "Recursion error";
        }
      }
      
      setResults(results);
    } catch {
      // Fallback error handling (should rarely trigger now)
      setResults({
        a: "Unexpected error",
        b: "Unexpected error",
        c: "Unexpected error",
      });
    }
  };

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }

    // Highlight solution code blocks
    solutionRefs.forEach((ref) => {
      if (ref.current) {
        hljs.highlightElement(ref.current);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8 relative z-10 max-w-5xl m-auto">
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

        {/* Test Interface */}
        <div className="mb-6 p-4 bg-surface rounded-lg border border-border">
          <h4 className="text-lg font-medium mb-3 text-card-foreground">
            Test the Solutions
          </h4>
          <div className="flex gap-3 items-center mb-4">
            <label className="text-muted font-medium">Input (n):</label>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter a number"
            />
            <button
              onClick={handleTest}
              className="px-4 py-2 bg-primary hover:bg-accent text-white rounded transition-colors duration-200 font-medium"
            >
              Test All
            </button>
          </div>
          
          {/* Limitations Info */}
          <div className="mb-4 p-3 bg-background rounded border border-border">
            <h5 className="text-sm font-medium text-warning mb-2">⚠️ Input Limitations:</h5>
            <ul className="text-xs text-muted space-y-1">
              <li>• <strong>Formula:</strong> Max n ≈ 3.03 billion (JavaScript safe integer limit)</li>
              <li>• <strong>Loop:</strong> Practical limit ~1 million (performance)</li>
              <li>• <strong>Recursion:</strong> Max n ≈ 10,000 (call stack limit)</li>
              <li>• Negative numbers are not supported</li>
            </ul>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-muted text-sm">Formula</div>
                <div className="text-primary font-mono text-lg">
                  {results.a}
                </div>
              </div>
              <div className="text-center">
                <div className="text-muted text-sm">Loop</div>
                <div className="text-success font-mono text-lg">
                  {results.b}
                </div>
              </div>
              <div className="text-center">
                <div className="text-muted text-sm">Recursion</div>
                <div className="text-accent font-mono text-lg">{results.c}</div>
              </div>
            </div>
          )}
        </div>

        {/* Solution 1: Mathematical Formula */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2 text-primary">
            Approach 1: Mathematical Formula
          </h4>
          <p className="text-muted mb-3 text-sm">
            Time: O(1), Space: O(1) - Most efficient using the formula n(n+1)/2
          </p>
          <pre className="rounded-lg overflow-x-auto text-sm bg-surface border border-border">
            <code
              ref={solutionRefs[0]}
              className="language-javascript"
            >{`var sum_to_n_a = function(n) {
  // Using mathematical formula: n(n+1)/2
  return (n * (n + 1)) / 2;
};`}</code>
          </pre>
        </div>

        {/* Solution 2: Iterative */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2 text-success">
            Approach 2: Iterative (For Loop)
          </h4>
          <p className="text-muted mb-3 text-sm">
            Time: O(n), Space: O(1) - Traditional loop approach
          </p>
          <pre className="rounded-lg overflow-x-auto text-sm bg-surface border border-border">
            <code
              ref={solutionRefs[1]}
              className="language-javascript"
            >{`var sum_to_n_b = function(n) {
  // Using for loop iteration
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};`}</code>
          </pre>
        </div>

        {/* Solution 3: Recursive */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2 text-accent">
            Approach 3: Recursive
          </h4>
          <p className="text-muted mb-3 text-sm">
            Time: O(n), Space: O(n) - Elegant but uses call stack
          </p>
          <pre className="rounded-lg overflow-x-auto text-sm bg-surface border border-border">
            <code
              ref={solutionRefs[2]}
              className="language-javascript"
            >{`var sum_to_n_c = function(n) {
  // Using recursion
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};`}</code>
          </pre>
        </div>
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
