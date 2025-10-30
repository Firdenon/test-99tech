import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/atom-one-dark.css";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);

function Problem3() {
  const codeRef = useRef<HTMLElement>(null);
  const refactoredCodeRef = useRef<HTMLElement>(null);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
    if (refactoredCodeRef.current) {
      hljs.highlightElement(refactoredCodeRef.current);
    }
  }, [showSolution]);

  const originalCode = `interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (lhsPriority > -99) {
         if (balance.amount <= 0) {
           return true;
         }
      }
      return false
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}`;

  return (
    <div className="p-8 relative z-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-foreground">
        🤢 Problem 3: Messy React
      </h1>

      {/* Task Description */}
      <div className="p-6 rounded-lg my-8 border border-border bg-card shadow-card">
        <h3 className="text-xl font-semibold mb-4 text-card-foreground">
          Task
        </h3>
        <p className="mb-4 text-muted">
          List out the computational inefficiencies and anti-patterns found in the code block below.
        </p>
        <p className="mb-4 text-muted">
          <strong>This code block uses:</strong>
        </p>
        <ul className="mb-4 text-muted space-y-1 ml-6">
          <li>• ReactJS with TypeScript</li>
          <li>• Functional components</li>
          <li>• React Hooks</li>
        </ul>
        <p className="mb-4 text-muted">
          You should provide a refactored version of the code, but more points are awarded to 
          accurately stating the issues and explaining correctly how to improve them.
        </p>

        {/* Original Code */}
        <h4 className="text-lg font-medium mb-3 text-card-foreground">Original Code:</h4>
        <pre className="rounded-lg overflow-x-auto text-sm bg-surface border border-border">
          <code ref={codeRef} className="language-typescript">
            {originalCode}
          </code>
        </pre>
      </div>

      {/* Solution Section */}
      <div className="p-6 rounded-lg my-8 border border-border bg-card shadow-card">
        <h3 className="text-xl font-semibold mb-4 text-card-foreground">
          Analysis & Solution
        </h3>
        
        <button 
          onClick={() => setShowSolution(!showSolution)}
          className="mb-6 px-4 py-2 bg-primary hover:bg-accent text-white rounded transition-colors duration-200 font-medium"
        >
          {showSolution ? 'Hide Solution' : 'Show Solution & Analysis'}
        </button>

        {showSolution && (
          <div className="space-y-6">
            {/* Detailed Problems */}
            <div>
              <h4 className="text-lg font-medium mb-4 text-destructive">🚨 Problems Found (Detailed)</h4>
              <div className="space-y-4">
                
                <div className="p-4 bg-surface rounded border border-border">
                  <h5 className="font-semibold text-warning mb-2">WalletBalance missing blockchain field</h5>
                  <p className="text-muted text-sm mb-2">
                    You call <code>balance.blockchain</code> everywhere, but WalletBalance only defines currency and amount.
                  </p>
                  <p className="text-destructive text-sm">
                    <strong>Effect:</strong> TypeScript error (Property 'blockchain' does not exist) and runtime assumptions fail.
                  </p>
                </div>

                <div className="p-4 bg-surface rounded border border-border">
                  <h5 className="font-semibold text-warning mb-2">FormattedWalletBalance not used / type mismatch</h5>
                  <p className="text-muted text-sm mb-2">
                    You declare FormattedWalletBalance but then later map sortedBalances as if each item has formatted. sortedBalances doesn't contain formatted.
                  </p>
                  <p className="text-destructive text-sm">
                    <strong>Effect:</strong> Type mismatch and runtime undefined for formatted.
                  </p>
                </div>

                <div className="p-4 bg-surface rounded border border-border">
                  <h5 className="font-semibold text-warning mb-2">lhsPriority undefined / variable name bug in filter</h5>
                  <p className="text-muted text-sm mb-2">
                    In the filter you compute <code>const balancePriority = getPriority(balance.blockchain);</code> but then check <code>if (lhsPriority {'>'} -99)</code>.
                  </p>
                  <p className="text-destructive text-sm">
                    <strong>Effect:</strong> ReferenceError at runtime, or TypeScript error. The condition will never be evaluated as intended.
                  </p>
                </div>

                <div className="p-4 bg-surface rounded border border-border">
                  <h5 className="font-semibold text-warning mb-2">Filter logic inverted / unclear</h5>
                  <p className="text-muted text-sm mb-2">
                    The filter returns true only if <code>balance.amount ≤ 0</code> (assuming the condition used the right var). Usually you want to keep positive balances; current code keeps non-positive ones.
                  </p>
                  <p className="text-destructive text-sm">
                    <strong>Effect:</strong> Keeps zero or negative balances and throws away positive balances — almost certainly incorrect.
                  </p>
                </div>

                <div className="p-4 bg-surface rounded border border-border">
                  <h5 className="font-semibold text-warning mb-2">Sort comparator may not return anything on equality</h5>
                  <p className="text-muted text-sm mb-2">
                    In <code>.sort(...)</code> if priorities are equal, neither <code>return -1</code> nor <code>return 1</code> runs and the function reaches the end with no return (i.e. undefined).
                  </p>
                  <p className="text-destructive text-sm">
                    <strong>Effect:</strong> .sort() comparator must return -1 | 0 | 1. Returning undefined results in unpredictable behavior.
                  </p>
                </div>

                <div className="p-4 bg-surface rounded border border-border">
                  <h5 className="font-semibold text-warning mb-2">Using sortedBalances in rows but never using formattedBalances</h5>
                  <p className="text-muted text-sm mb-2">
                    You build formattedBalances with the formatted field, but then you use <code>sortedBalances.map</code> when building rows and annotate the mapped items as FormattedWalletBalance.
                  </p>
                  <p className="text-destructive text-sm">
                    <strong>Effect:</strong> balance.formatted will be undefined in rows because sortedBalances elements do not have that property.
                  </p>
                </div>

                <div className="p-4 bg-surface rounded border border-border">
                  <h5 className="font-semibold text-warning mb-2">Other Issues</h5>
                  <ul className="text-muted text-sm space-y-1">
                    <li>• <code>balance.amount.toFixed()</code> without decimals - probably want <code>toFixed(2)</code></li>
                    <li>• <code>prices[balance.currency]</code> might be undefined, causing NaN</li>
                    <li>• <code>classes.row</code> referenced but not defined</li>
                    <li>• Using array index as key instead of stable id - anti-pattern for lists</li>
                    <li>• <code>BoxProps</code> not imported</li>
                    <li>• useMemo dependency includes prices though sorting doesn't depend on prices</li>
                    <li>• <code>getPriority</code> param typed <code>any</code> - loses type safety</li>
                    <li>• Missing imports (React, useMemo, etc.)</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Corrected Version */}
            <div>
              <h4 className="text-lg font-medium mb-3 text-success">✅ Corrected & Improved Version</h4>
              <pre className="rounded-lg overflow-x-auto text-sm bg-surface border border-border p-4">
                <code ref={refactoredCodeRef} className="language-typescript">{`import React, { useMemo } from "react";
// import { BoxProps } from "your-ui-lib"; // uncomment & adjust if needed

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // added
  id?: string; // optional stable id for keys (recommended)
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props /* extends BoxProps */ {
  // add BoxProps import + extension if you actually use it
  children?: React.ReactNode;
}

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;

  // assume these hooks exist and return the right shapes:
  const balances: WalletBalance[] = useWalletBalances();
  const prices: Record<string, number> = usePrices();

  // Filter & sort balances (memoized)
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const prio = getPriority(balance.blockchain);
        // Keep only balances with a recognized blockchain priority and positive amount
        const hasValidPriority = prio > -99;
        const positiveAmount = typeof balance.amount === "number" && balance.amount > 0;
        return hasValidPriority && positiveAmount;
      })
      .sort((lhs, rhs) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        if (leftPriority > rightPriority) return -1; // higher priority first
        if (leftPriority < rightPriority) return 1;
        return 0; // equal priority => keep stable
      });
    // only depends on balances & getPriority -> do not include prices here
  }, [balances]);

  // Add formatted string (formattedBalances used for rendering)
  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map((b) => ({
    ...b,
    // show 2 decimals for display — change if you prefer different precision
    formatted: Number.isFinite(b.amount) ? b.amount.toFixed(2) : "0.00",
  }));

  const rows = formattedBalances.map((balance) => {
    const price = typeof prices[balance.currency] === "number" ? prices[balance.currency] : 0;
    const usdValue = price * balance.amount;
    const key = balance.id ?? balance.currency; // prefer id if present
    return (
      <WalletRow
        className={(/*classes?.row*/ undefined) as any} // replace with actual classes or remove
        key={key}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
        currency={balance.currency}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
      {children}
    </div>
  );
};

export default WalletPage;`}</code>
              </pre>
            </div>

            {/* Key Fixes */}
            <div className="p-4 bg-surface rounded border border-border">
              <h5 className="font-semibold text-success mb-3">🎯 Key Fixes Applied:</h5>
              <ul className="text-muted text-sm space-y-1 ml-4">
                <li>• Added <code>blockchain</code> to WalletBalance so <code>getPriority(balance.blockchain)</code> is valid</li>
                <li>• Fixed the filter logic: only keep positive amounts and valid priority</li>
                <li>• Fixed variable name bug (lhsPriority vs balancePriority)</li>
                <li>• Sort comparator returns 0 on equality, avoiding undefined comparator result</li>
                <li>• Use formattedBalances when rendering so formatted exists</li>
                <li>• Safe price usage: fallback to 0 if price missing to avoid NaN</li>
                <li>• Changed toFixed() to toFixed(2) for monetary display</li>
                <li>• Used a stable key: id if present, otherwise currency</li>
                <li>• Removed prices from useMemo deps because sorting doesn't depend on prices</li>
                <li>• Proper TypeScript typing throughout</li>
              </ul>
            </div>

            {/* Additional Suggestions */}
            <div className="p-4 bg-surface rounded border border-border">
              <h5 className="font-semibold text-primary mb-3">💡 Additional Improvements (Optional):</h5>
              <ul className="text-muted text-sm space-y-1 ml-4">
                <li>• Use a type or enum for known blockchains instead of string to avoid typos</li>
                <li>• Add validation for amount as number (could be string coming from API)</li>
                <li>• Use Intl.NumberFormat for formatting currency and USD values (handles localization)</li>
                <li>• If balances may be large lists, consider virtualization for rendering rows</li>
                <li>• Replace key with a true unique id from backend; currencies may not always be unique</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <Link
        to="/"
        className="inline-block px-6 py-3 text-white no-underline rounded transition-colors duration-200 hover:scale-105 relative z-20 bg-secondary shadow-button hover:bg-muted hover:shadow-button-hover"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default Problem3;