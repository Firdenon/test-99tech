import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Token interface based on the API structure
interface Token {
  currency: string;
  date: string;
  price: number;
}

interface FormErrors {
  fromAmount?: string;
  fromToken?: string;
  toToken?: string;
  general?: string;
}

function Problem2() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [swapping, setSwapping] = useState(false);
  const [fromToken, setFromToken] = useState<string>("");
  const [toToken, setToToken] = useState<string>("");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [iconErrors, setIconErrors] = useState<Set<string>>(new Set());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch token prices on component mount
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        const data: Token[] = await response.json();

        // Filter out tokens without prices and remove duplicates
        const validTokens = data
          .filter((token) => token.price > 0)
          .reduce((acc: Token[], current) => {
            const exists = acc.find(
              (item) => item.currency === current.currency
            );
            if (!exists) {
              acc.push(current);
            }
            return acc;
          }, [])
          .sort((a, b) => a.currency.localeCompare(b.currency));

        setTokens(validTokens);

        // Set default selections
        if (validTokens.length >= 2) {
          setFromToken(validTokens[0].currency);
          setToToken(validTokens[1].currency);
        }
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
        setErrors({
          general: "Failed to load token prices. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  // Calculate exchange rate and update toAmount when fromAmount or tokens change
  useEffect(() => {
    if (fromAmount && fromToken && toToken && tokens.length > 0) {
      const fromTokenData = tokens.find((t) => t.currency === fromToken);
      const toTokenData = tokens.find((t) => t.currency === toToken);

      if (fromTokenData && toTokenData && !isNaN(parseFloat(fromAmount))) {
        const rate = fromTokenData.price / toTokenData.price;
        const calculatedAmount = parseFloat(fromAmount) * rate;
        setToAmount(calculatedAmount.toFixed(6));
      } else {
        setToAmount("");
      }
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken, tokens]);

  // Get token icon URL
  const getTokenIcon = (currency: string) => {
    return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
  };

  // Token icon component with fallback
  const TokenIcon = ({
    currency,
    className = "w-5 h-5",
  }: {
    currency: string;
    className?: string;
  }) => {
    // Check if this token has already failed to load
    if (iconErrors.has(currency)) {
      return (
        <div
          className={`${className} rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold`}
        >
          {currency.charAt(0).toUpperCase()}
        </div>
      );
    }

    const handleImageError = () => {
      setIconErrors((prev) => new Set(prev).add(currency));
    };

    return (
      <img
        src={getTokenIcon(currency)}
        alt={currency}
        className={className}
        onError={handleImageError}
      />
    );
  };

  // Show toast notification
  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  // Handle form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      newErrors.fromAmount = "Please enter a valid amount";
    }

    if (!fromToken) {
      newErrors.fromToken = "Please select a token to swap from";
    }

    if (!toToken) {
      newErrors.toToken = "Please select a token to swap to";
    }

    if (fromToken === toToken) {
      newErrors.general = "Cannot swap the same token";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle swap tokens
  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSwapping(true);

    // Simulate API call with loading delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success toast
      showToastNotification(
        `Successfully swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}!`
      );

      // Reset form
      setFromAmount("");
      setToAmount("");
      setErrors({});
    } catch (err) {
      console.error("Swap failed:", err);
      setErrors({ general: "Swap failed. Please try again." });
    } finally {
      setSwapping(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted">Loading token prices...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 relative z-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-foreground">
        🍭 Problem 2: Fancy Form
      </h1>
      <p className="text-lg mb-8 text-muted">
        Swap tokens with live exchange rates and an intuitive interface.
      </p>

      <div className="grid md:grid-cols-4 grid-cols-1 md:gap-6 gap-2">
        {/* Main Swap Form */}
        <div className="p-6 rounded-lg my-8 border border-border bg-card shadow-card mx-auto md:col-span-2 col-span-1 h-fit w-full">
          <h3 className="text-xl font-semibold mb-6 text-card-foreground text-center">
            Token Swap
          </h3>

          {errors.general && (
            <div className="p-3 mb-4 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* From Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                From
              </label>
              <div className="relative">
                <div className="flex border border-border rounded-lg overflow-hidden bg-surface">
                  <select
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value)}
                    className="flex-1 pl-10 py-3 bg-transparent text-foreground focus:outline-none min-w-0 md:max-w-1/3 max-w-1/2"
                  >
                    <option value="" disabled>
                      Select token
                    </option>
                    {tokens.map((token) => (
                      <option key={token.currency} value={token.currency}>
                        {token.currency}
                      </option>
                    ))}
                  </select>
                  <div className="w-px bg-border"></div>
                  <input
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    placeholder="0.00"
                    step="any"
                    min="0"
                    className="flex-1 p-3 bg-transparent text-foreground focus:outline-none text-right min-w-0"
                  />
                </div>
                {fromToken && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <TokenIcon currency={fromToken} />
                  </div>
                )}
              </div>
              {errors.fromAmount && (
                <p className="text-destructive text-xs">{errors.fromAmount}</p>
              )}
              {errors.fromToken && (
                <p className="text-destructive text-xs">{errors.fromToken}</p>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center m-0">
              <button
                type="button"
                onClick={handleSwapTokens}
                className="p-2 rounded-full bg-primary hover:bg-accent transition-colors duration-200 group"
                disabled={swapping}
              >
                <svg
                  className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </div>

            {/* To Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                To
              </label>
              <div className="relative">
                <div className="flex border border-border rounded-lg overflow-hidden bg-surface">
                  <select
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value)}
                    className="flex-1 pl-10 py-3 bg-transparent text-foreground focus:outline-none min-w-0 md:max-w-1/3 max-w-1/2"
                  >
                    <option value="" disabled>
                      Select token
                    </option>
                    {tokens.map((token) => (
                      <option key={token.currency} value={token.currency}>
                        {token.currency}
                      </option>
                    ))}
                  </select>
                  <div className="w-px bg-border"></div>
                  <input
                    type="text"
                    value={toAmount}
                    readOnly
                    placeholder="0.00"
                    className="flex-1 p-3 bg-transparent text-muted focus:outline-none text-right min-w-0"
                  />
                </div>
                {toToken && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <TokenIcon currency={toToken} />
                  </div>
                )}
              </div>
              {errors.toToken && (
                <p className="text-destructive text-xs">{errors.toToken}</p>
              )}
            </div>

            {/* Exchange Rate Info */}
            {fromToken && toToken && fromAmount && toAmount && (
              <div className="p-3 bg-surface rounded border border-border">
                <div className="text-sm text-muted">
                  <div className="flex justify-between">
                    <span>Exchange Rate:</span>
                    <span>
                      1 {fromToken} ={" "}
                      {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(
                        6
                      )}{" "}
                      {toToken}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={swapping || !fromAmount || !fromToken || !toToken}
              className="w-full p-4 bg-primary hover:bg-accent disabled:bg-muted disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {swapping ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Swapping...</span>
                </>
              ) : (
                <span>Swap Tokens</span>
              )}
            </button>
          </form>
        </div>

        {/* Token List */}
        <div className="p-6 rounded-lg my-8 border border-border bg-card shadow-card md:col-span-2 col-span-1">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">
            Available Tokens ({tokens.length})
          </h3>
          <p className="text-sm text-muted mb-4">
            Click any token to select it as "From" currency
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto">
            {tokens.map((token) => (
              <div
                key={token.currency}
                onClick={() => {
                  setFromToken(token.currency);
                  setErrors({}); // Clear any existing errors
                }}
                className={`flex items-center space-x-2 p-2 rounded bg-surface border transition-colors duration-200 cursor-pointer hover:border-primary/30 ${
                  token.currency === fromToken
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-accent/10"
                }`}
              >
                <TokenIcon currency={token.currency} className="w-6 h-6" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground">
                    {token.currency}
                  </div>
                  <div className="text-xs text-muted">
                    ${token.price.toFixed(4)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        to="/"
        className="inline-block px-6 py-3 text-white no-underline rounded transition-all duration-300 hover:scale-105 relative z-20 bg-secondary shadow-button hover:bg-muted hover:shadow-button-hover"
      >
        ← Back to Home
      </Link>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center animate-slide-up">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md">
            <div className="shrink-0">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-sm font-medium">{toastMessage}</p>
            <button
              onClick={() => setShowToast(false)}
              className="shrink-0 ml-4 text-green-200 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Problem2;
