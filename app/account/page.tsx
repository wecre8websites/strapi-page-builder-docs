import Account from '@/components/Account';
import { FC } from 'react';

type PageProps = {
  children: React.ReactNode;
}

const Page: FC<PageProps> = async ({ children }) => {
  return (
    <main id="main" className="bg-black overflow-x-hidden">
      <Account />
    </main>
  );
};

export default Page;