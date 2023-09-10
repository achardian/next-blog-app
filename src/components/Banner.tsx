import Image from "next/image";
import { Button } from ".";

const Banner = () => {
  return (
    <div className='w-full h-96 md:h-80 flex flex-col-reverse gap-6 md:gap-0 md:flex-row items-center justify-between gradient-bg p-5 rounded-xl'>
      <div className='pl-5'>
        <div className='text-3xl font-bold tracking-wide  gradient-text'>
          <h1>Share Your Ideas</h1>
          <h1>to Everyone Around The World!</h1>
        </div>
        <Button
          text='Sign In'
          className='bg-blue-600 px-5 mt-3 rounded-full hover:bg-blue-500 text-white w-full md:w-fit'
        />
      </div>
      <div className='relative w-full md:w-2/3 h-full'>
        <Image src='/Blogging.svg' alt='Blogging' fill />
      </div>
    </div>
  );
};

export default Banner;
