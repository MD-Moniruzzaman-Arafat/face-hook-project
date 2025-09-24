import PostCard from '../../components/PostCard/PostCard';
import WhatsOnMind from '../../components/WhatsOnMind/WhatsOnMind';
import useAuth from '../../hooks/useAuth';

export default function HomePage() {
  const { auth } = useAuth();
  console.log('Auth from HomePage:', auth);
  return (
    <>
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
    </>
  );
}
