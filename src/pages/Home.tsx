import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='min-h-screen flex items-center justify-center text-center p-8 relative z-10'>
      <div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Welcome to 99Tech Test
        </h1>
        <p className="text-lg mb-8 text-muted">
          Choose a what problem you want to see the solution for.
        </p>
        
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
        <Link 
          to="/problem-1" 
          className="p-4 text-white no-underline rounded-lg transition-all duration-300 hover:scale-105 relative z-20 bg-primary shadow-button hover:bg-accent hover:shadow-button-hover"
        >
          Problem 1
        </Link>
        
        <Link 
          to="/problem-2" 
          className="p-4 text-white no-underline rounded-lg transition-all duration-300 hover:scale-105 relative z-20 bg-success shadow-success hover:bg-green-600 hover:shadow-success-hover"
        >
          Problem 2
        </Link>
        
        <Link 
          to="/problem-3" 
          className="p-4 text-white no-underline rounded-lg transition-all duration-300 hover:scale-105 relative z-20 bg-destructive shadow-destructive hover:bg-red-600 hover:shadow-destructive-hover"
        >
          Problem 3
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Home;