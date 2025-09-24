import PostCard from '../../components/PostCard/PostCard';
import WhatsOnMind from '../../components/WhatsOnMind/WhatsOnMind';

export default function HomePage() {
  return (
    <>
      <main className="mx-auto max-w-[1020px] py-8">
        <div className="container">
          {/* <!-- what's on mind --> */}
          {/* <!-- On clicking the TextArea, Create New Post Modal will apear --> */}
          <WhatsOnMind />
          {/* <!-- end what's on mind --> */}

          {/* <!-- post  --> */}
          <PostCard />
          {/* <!-- post ends --> */}

          {/* <!-- post  --> */}
          <PostCard />
          {/* <!-- post ends --> */}
        </div>
      </main>
    </>
  );
}
