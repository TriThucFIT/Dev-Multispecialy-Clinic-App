/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: '#299ec4',
        input: '#299ec4',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        bluePrimary: 'var(--blue-primary)',
        blueSecondary: 'var(--blue-secondary)',
        success: 'var(--success)',
        error: 'var(--error)',
        bgHover: 'var(--bg-hover)',
        bgActive: 'var(--bg-active)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 1s ease-out',
        'accordion-up': 'accordion-up 1s ease-out'
      },
      backgroundColor: {
        primary: '#299ec4'
      },
      textColor: {
        primary: {
          DEFAULT: '#299ec4',
          hover: '#ffffff',
          foreground: '#ffffff'
        }
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#299ec4',
          'primary-content': '#ffffff',
          '--btn-text-hover': '#ffffff',
          '--btn-primary-hover': '#299ec4',

          error: '#ff0000',
          'error-content': '#ffffff',
          '--btn-text-error': '#ffffff',
          '--btn-error-hover': '#ff0000'
        }
      }
    ]
  },

  plugins: [require('tailwindcss-animate'), require('daisyui')]
}
