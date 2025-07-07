import Link from 'next/link';
import Image from 'next/image';
import errorImage from '@/assets/error.webp';
import { ArrowBigRight } from 'lucide-react';

const Page404 = () => (
  <>
    <div className="py-[60px] text-center md:py-[80px] lg:py-[150px] xl:py-[160px]">
      <div className="container mx-auto px-[12px] 2xl:px-0">
        <Image src={errorImage} alt={'404 Error'} className={'mx-auto'} width={300} height={300} />
        <h3 className="mb-[15px] mt-[40px] text-[20px] font-bold leading-[1.3] text-black md:text-[22px] lg:text-[30px]">
          Oops! That page can&apos;t be found
        </h3>

        <p className="mb-[15px] ml-auto mr-auto text-[14px] leading-[1.7] text-[#4c4c4c] md:max-w-[540px] md:text-[15px] lg:mb-[18px] lg:text-[16px]">
          The page you are looking for might have been removed had its name changed or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-black px-[38px] py-[15px] text-[14px] font-medium uppercase text-white transition duration-500 ease-in-out hover:bg-[#EF4335]">
          Back To Home <ArrowBigRight className="relative -top-[2px] inline-block" size={20} />
        </Link>
      </div>
    </div>
  </>
);
export default Page404;
