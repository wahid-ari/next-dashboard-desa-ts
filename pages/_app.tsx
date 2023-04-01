import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { GlobalProvider } from '@utils/GlobalContext';
// import { AxiosConfigProvider } from "@utils/useAxiosConfig";
import '@styles/globals.css';
import '@styles/prism.css';
// import { useRouter } from "next/router";
import { Inter } from '@next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  return (
    <ThemeProvider attribute='class' storageKey='theme' enableSystem={false} defaultTheme='light'>
      <GlobalProvider>
        {/* <AxiosConfigProvider> */}
        <main className={inter.className}>
          <Toaster />
          <Component {...pageProps} />
        </main>
        {/* </AxiosConfigProvider> */}
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default MyApp;
