import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { PostsProvider } from '@/context/PostsContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { Header } from '@/components/layout/Header'; // Named import
import { Footer } from '@/components/layout/Footer'; // Named import
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import '@/styles/globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SkillSwap - Exchange Skills, Build Together',
  description: 'A platform to connect with talented individuals, offer your skills, and get the help you need.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <ErrorBoundary>
              <PostsProvider>
                <ErrorBoundary>
                  <ThemeProvider>
                    <ErrorBoundary>
                      <NotificationProvider>
                        {/* Toaster for notifications */}
                        <Toaster 
                          position="top-right" 
                          toastOptions={{
                            className: 'dark:bg-gray-800 dark:text-white',
                          }}
                        />
                        
                        <div className="flex flex-col min-h-screen">
                          <Header />
                          <main className="flex-grow bg-slate-50 dark:bg-gray-900 pt-16">
                            {children}
                          </main>
                          <Footer />
                        </div>
                      </NotificationProvider>
                    </ErrorBoundary>
                  </ThemeProvider>
                </ErrorBoundary>
              </PostsProvider>
            </ErrorBoundary>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}