// // src/components/Footer.jsx

// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-white border-t mt-12">
//       <div className="container mx-auto px-6 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           {/* Logo/Brand Name */}
//           <p className="text-2xl font-bold text-blue-600 mb-4 md:mb-0">SkillSwap</p>
          
//           {/* Navigation Links */}
//           <div className="flex space-x-6 text-gray-600">
//             <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>
//             <a href="#" className="hover:text-blue-600 transition-colors">How It Works</a>
//             <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
//           </div>
//         </div>
        
//         {/* Copyright Notice */}
//         <div className="text-center text-gray-500 mt-8 border-t pt-6">
//           <p>&copy; 2025 SkillSwap. A community for creators to collaborate and grow.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-10">
        
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-2 tracking-wide">SkillSwap</h2>
            <p className="text-sm text-gray-400">
              Empowering creators to share, learn, and grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-200">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="hover:text-blue-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-blue-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-blue-400 transition">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social / Newsletter */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-200">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-3">
              Follow us for updates and community highlights.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 002.048-2.578 9.3 9.3 0 01-2.958 1.13a4.66 4.66 0 00-7.938 4.25 13.229 13.229 0 01-9.602-4.868c-.333.564-.523 1.234-.523 1.962 0 1.61.82 3.028 2.068 3.868a4.63 4.63 0 01-2.11-.583v.06a4.66 4.66 0 003.737 4.568 4.69 4.69 0 01-2.104.08 4.661 4.661 0 004.352 3.234 9.348 9.348 0 01-5.786 1.995 9.5 9.5 0 01-1.112-.065 13.175 13.175 0 007.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 002.323-2.41z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} SkillSwap. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;