/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color scheme from your CSS variables
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'muted': 'var(--muted)',
        'border': 'var(--border)',
        'card': 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        'surface': 'var(--surface)',
        'surface-variant': 'var(--surface-variant)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'destructive': 'var(--destructive)',
        'info': 'var(--info)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(58, 74, 92, 0.3)',
        'card-hover': '0 8px 30px rgba(58, 74, 92, 0.4)',
        'button': '0 4px 15px rgba(71, 96, 114, 0.3)',
        'button-hover': '0 8px 25px rgba(90, 122, 138, 0.4)',
      },
    },
  },
  plugins: [],
}