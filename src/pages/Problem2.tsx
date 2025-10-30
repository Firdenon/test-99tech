import { Link } from 'react-router-dom';

function Problem2() {
  return (
    <div className="p-8 relative z-10">
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
        Problem 2
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--muted)' }}>
        This is the Problem 2 page. You can implement your solution here.
      </p>
      
      {/* Placeholder content for Problem 2 */}
      <div 
        className="p-6 rounded-lg my-8 border"
        style={{ 
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
          boxShadow: '0 4px 20px rgba(58, 74, 92, 0.3)'
        }}
      >
        <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--card-foreground)' }}>
          Problem Description:
        </h3>
        <p style={{ color: 'var(--muted)' }}>
          Add your problem description and solution here.
        </p>
      </div>
      
      <Link 
        to="/" 
        className="inline-block px-6 py-3 text-white no-underline rounded transition-all duration-300 hover:scale-105 relative z-20"
        style={{ 
          backgroundColor: 'var(--secondary)',
          boxShadow: '0 4px 15px rgba(71, 96, 114, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--muted)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(90, 122, 138, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--secondary)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(71, 96, 114, 0.3)';
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default Problem2;