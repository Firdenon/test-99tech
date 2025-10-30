import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='mt-52 text-center p-8 relative z-10'>
      <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
        Welcome to 99Tech Test
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--muted)' }}>
        Choose a what problem you want to see the solution for.
      </p>
      
      <div className="flex flex-col gap-4 max-w-xs mx-auto">
        <Link 
          to="/problem-1" 
          className="p-4 text-white no-underline rounded-lg transition-all duration-300 hover:scale-105 relative z-20"
          style={{ 
            backgroundColor: 'var(--primary)',
            boxShadow: '0 4px 20px rgba(100, 164, 196, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(107, 157, 200, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(100, 164, 196, 0.3)';
          }}
        >
          Problem 1
        </Link>
        
        <Link 
          to="/problem-2" 
          className="p-4 text-white no-underline rounded-lg transition-all duration-300 hover:scale-105 relative z-20"
          style={{ 
            backgroundColor: 'var(--success)',
            boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#16a34a';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(34, 197, 94, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--success)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.3)';
          }}
        >
          Problem 2
        </Link>
        
        <Link 
          to="/problem-3" 
          className="p-4 text-white no-underline rounded-lg transition-all duration-300 hover:scale-105 relative z-20"
          style={{ 
            backgroundColor: 'var(--destructive)',
            boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#dc2626';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(239, 68, 68, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--destructive)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.3)';
          }}
        >
          Problem 3
        </Link>
      </div>
    </div>
  );
}

export default Home;