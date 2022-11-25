import { tw, css } from 'twind/css';
import { useRouter } from 'next/router';

const headerStyle = css`
  background-color: #ffffff;
  min-height: calc(100vh - 6rem);
`;

export function Header() {
  const router = useRouter();


  return (<header className={tw(headerStyle)}>
    <div className={tw(`max-w-4xl mx-auto py-16 px-14 sm:px-6 lg:px-8`)}>
      <h1 className={tw(`font-sans font-bold text-4xl md:text-5xl lg:text-8xl text-center leading-snug text-gray-800`)}>
        To own the AI Art as NFT
      </h1>
      <div className={tw(`max-w-xl mx-auto`)}>
        <p className={tw(`mt-10 text-gray-500 text-center text-xl lg:text-3xl`)}>
          To own the AI Art as NFT
        </p>
      </div>
      <div className={tw(`mt-10 flex justify-center items-center w-full mx-auto`)}>
        <button className="bg-none cursor-pointer inline-block flex-shrink-0 text-2xl py-3 px-3 relative text-white no-underline z-10 font-bold
        before:bg-gray-800 before:h-full before:absolute before:w-full before:-z-10 before:top-3 before:right-3
        after:border-white after:border-solid after:border-2 after:h-full after:opacity-100 after:absolute after:top-0 after:right-0 after:w-full
        hover:before:translate-x-3 hover:before:-translate-y-3
        hover:after:-translate-x-3 hover:after:translate-y-3
        hover:before:transition-transform hover:before:duration-500 hover:before:ease-in
        hover:after:transition-transform hover:after:duration-500 hover:after:ease-in
        after:transition-transform after:duration-500
        before:transition-transform before:duration-500
        " onClick={
          () => {
            router.push({pathname: '/process/gallery', query: {
          }}, "/process/gallery");
          }
        }>Click here to start </button>
      </div>
    </div>
  </header>
  )
};

export default Header;