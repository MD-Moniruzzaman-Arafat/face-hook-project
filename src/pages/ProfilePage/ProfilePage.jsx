import { useEffect, useRef, useState } from 'react';
import { actions } from '../../actions';
import checkIcon from '../../assets/icons/check.svg';
import editIcon from '../../assets/icons/edit.svg';
import PostCard from '../../components/PostCard/PostCard';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import useProfile from '../../hooks/useProfile';

export default function ProfilePage() {
  const { state, dispatch } = useProfile();
  const api = useAxios();
  const { auth } = useAuth();
  const [bio, setBio] = useState(state?.user?.bio);
  const [isEditing, setIsEditing] = useState(false);
  const fileUploadRef = useRef(null);
  // Sync local bio state with reducer user bio
  useEffect(() => {
    setBio(state?.user?.bio);
  }, [state?.user?.bio]);

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio }
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  const handleBtnClick = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener('change', async () => {
      const formData = new FormData();
      for (const file of fileUploadRef.current.files) {
        formData.append('avatar', file);
      }

      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
            state?.user?.id
          }/avatar`,
          formData
        );
        if (response.status === 200) {
          dispatch({
            type: actions.profile.IMAGE_UPDATED,
            data: response.data,
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
    fileUploadRef.current.click();
  };

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    async function fetchUserData() {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        console.log(response?.data);
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response?.data,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    if (auth?.user?.id) {
      fetchUserData();
    }
  }, [auth?.user?.id, api, dispatch]);
  if (state?.loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="container">
        {/* <!-- profile info --> */}
        <div className="flex flex-col items-center py-8 text-center">
          {/* <!-- profile image --> */}
          <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <img
              className="max-w-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                state?.user?.avatar
              }`}
              alt="sumit saha"
            />

            <form action="">
              <button
                onClick={handleBtnClick}
                className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
              >
                <img src={editIcon} alt="Edit" />
              </button>
              <input
                type="file"
                name="avatar"
                id="avatar"
                ref={fileUploadRef}
                hidden
              />
            </form>
          </div>
          {/* <!-- name , email --> */}
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {state?.user?.firstName} {state?.user?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg">{state?.user?.email}</p>
          </div>

          {/* <!-- bio --> */}
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              {isEditing ? (
                <textarea
                  cols={80}
                  className="w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:p-6"
                  name="post"
                  id="post"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              ) : (
                <p className="leading-[188%] text-gray-400 lg:text-lg">
                  {state?.user?.bio}
                </p>
              )}
            </div>
            {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
            {isEditing ? (
              <button
                className="flex-center h-7 w-7 rounded-full"
                onClick={handleBioEdit}
              >
                <img src={checkIcon} alt="Edit" />
              </button>
            ) : (
              <button
                className="flex-center h-7 w-7 rounded-full"
                onClick={() => setIsEditing(true)}
              >
                <img src={editIcon} alt="Edit" />
              </button>
            )}
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        {/* <!-- end profile info --> */}

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

        {/* <!-- posts --> */}
        {state?.posts && state?.posts.length > 0 ? (
          state?.posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div>No posts found.</div>
        )}
      </div>
    </>
  );
}
