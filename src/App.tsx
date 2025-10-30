import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Problem1 from './pages/Problem1';
import Problem2 from './pages/Problem2';
import Problem3 from './pages/Problem3';
import './App.css';

function App() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursorGlow = document.querySelector('.cursor-glow') as HTMLElement;
      if (cursorGlow) {
        cursorGlow.style.setProperty('--x', `${e.clientX}px`);
        cursorGlow.style.setProperty('--y', `${e.clientY}px`);
        cursorGlow.classList.add('active');
      }
    };

    const handleMouseLeave = () => {
      const cursorGlow = document.querySelector('.cursor-glow') as HTMLElement;
      if (cursorGlow) {
        cursorGlow.classList.remove('active');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="cursor-glow"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problem-1" element={<Problem1 />} />
          <Route path="/problem-2" element={<Problem2 />} />
          <Route path="/problem-3" element={<Problem3 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
