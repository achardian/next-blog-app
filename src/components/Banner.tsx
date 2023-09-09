import Image from "next/image";

const Banner = () => {
  return (
    <div className='w-full h-96 md:h-80 flex flex-col-reverse gap-6 md:gap-0 md:flex-row items-center justify-between gradient-bg p-3 rounded-xl'>
      <div className='text-3xl font-bold tracking-wide pl-5 gradient-text'>
        <h1>Share Your Ideas</h1>
        <h1>to Everyone Around The World!</h1>
      </div>
      <div className='relative w-full md:w-2/3 h-full'>
        <Image src='/Blogging.svg' alt='Blogging' fill />
      </div>
    </div>
  );
};

export default Banner;
