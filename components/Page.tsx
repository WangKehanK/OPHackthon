import Head from 'next/head';
import { tw } from 'twind';

interface IProps {
  children: React.ReactNode;
}

const Page = ({ children }: IProps) => (
  <div>
    <Head>
      <link rel="icon" href="/logo.svg" />
    </Head>
    <div className={tw(`min-h-screen flex flex-col`)}>
      {children}
    </div>
  </div>
);

export default Page;