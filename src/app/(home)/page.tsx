import { Banner } from "@/components";

const Home = () => {
  return (
    <div>
      <div className='wrapper flex flex-col md:flex-row px-3 mt-5 gap-5'>
        <div className='flex-1'>
          <Banner />
        </div>
        <div className='w-1/3'>side content</div>
      </div>
    </div>
  );
};

export default Home;
