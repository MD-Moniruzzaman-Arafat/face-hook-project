import { useEffect, useState } from 'react';
import editIcon from '../../assets/icons/edit.svg';
import avatar from '../../assets/images/avatars/avatar_1.png';
import PostCard from '../../components/PostCard/PostCard';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    async function fetchUserData() {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        console.log(response?.data);
        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    }
    if (auth?.user?.id) {
      fetchUserData();
    }
  }, [auth?.user?.id, api]);
  console.log(user);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="container">
        {/* <!-- profile info --> */}
        <div className="flex flex-col items-center py-8 text-center">
          {/* <!-- profile image --> */}
          <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <img className="max-w-full" src={avatar} alt="sumit saha" />

            <button className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
              <img src={editIcon} alt="Edit" />
            </button>
          </div>
          {/* <!-- name , email --> */}
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg">{user?.email}</p>
          </div>

          {/* <!-- bio --> */}
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
                {user?.bio}
              </p>
            </div>
            {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
            <button className="flex-center h-7 w-7 rounded-full">
              <img src={editIcon} alt="Edit" />
            </button>
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        {/* <!-- end profile info --> */}

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

        {/* <!-- posts --> */}
        {posts && posts.length > 0 ? (
          posts.map((post, idx) => (
            <PostCard key={post.id || idx} post={post} />
          ))
        ) : (
          <div>No posts found.</div>
        )}
      </div>
    </>
  );
}
