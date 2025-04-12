// import React, { useCallback, useEffect, useState } from "react";
// import useGetUserProfile from "../Hooks/useGetUserProfile.jsx";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { CiSettings } from "react-icons/ci";
// import { Link } from "react-router-dom";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { IoLinkOutline } from "react-icons/io5";
// import {
//   FaRegUser,
//   FaRegBookmark,
//   FaRegAddressCard,
//   FaAddressCard,
//   FaBookmark,
//   FaUser,
// } from "react-icons/fa";
// import { Heart, MessageCircle } from "lucide-react";
// import CommentDialog from "./CommentDialog.jsx";
// import { setSelectedPost } from "../ReduxStore/PostSlice.js";
// import { setAuthUser, setUserProfile } from "../ReduxStore/authSlice.js";
// import { toast } from "react-toastify";
// import axios from "axios";
// import FollowingDialog from "./FollowingDialog.jsx";
// function Profile() {
//   const [ActiveTab, setActiveTab] = useState("POSTS");
//   const [CommentOpen, setCommentOpen] = useState(false);
//   const dispatch = useDispatch();
//   const HandleTabChange = (tab) => {
//     setActiveTab(tab);
//   };
//   const [openFollowing, setopenFollowing] = useState(false);
//   const [openFollower, setopenFollower] = useState(false);
//   const params = useParams();
//   const userId = params.id;
//   useGetUserProfile(userId);
//   const { UserProfile, user } = useSelector((state) => state.auth);
//   const [IsFollowing, setIsFollowing] = useState(
//     user?.following?.some((item) => item?._id === UserProfile?._id)
//   );
//   const IsLogedinUserProfile = user?._id === UserProfile?._id;
//   const DisplayData =
//     ActiveTab === "POSTS"
//       ? UserProfile?.posts
//       : ActiveTab === "SAVED"
//       ? UserProfile?.bookmarks
//       : "";
//   const handleFollwoAndUnfollow = useCallback(async () => {
//     if (!UserProfile || !user) return;
//     try {
//       const response = await axios.post(
//         `https://testingquickchatbackend.onrender.com/user/followOrUnfollow/${UserProfile._id}`,
//         {},
//         { withCredentials: true, headers: { "Content-Type": "application/json" } }
//       );
  
//       if (response.data.success) {
//         toast.success(response.data.message);
  
//         // Update follow state
//         const updatedFollowing = IsFollowing
//           ? user.following.filter((item) => item._id !== UserProfile._id)
//           : [...user.following,{_id:UserProfile?._id,username:UserProfile?.username,profilePicture:UserProfile?.profilePicture}];
  
//         const updatedFollowers = IsFollowing
//           ? UserProfile.followers.filter((id) => id !== user._id)
//           : [...UserProfile.followers,user];
  
//         setIsFollowing((prevState)=>!prevState);
//         dispatch(setAuthUser({ ...user, following: updatedFollowing }));
//         dispatch(setUserProfile({ ...UserProfile, followers: updatedFollowers }));
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   }, [IsFollowing, UserProfile, user, dispatch]);
  
//   useEffect(() => {
//     setIsFollowing(
//       user?.following?.some((item) => item?._id === UserProfile?._id)
//     );
//   }, [UserProfile, user]);
//   return (
//     <div className="flex max-w-4xl justify-center mx-auto pl-10">
//       <div className="flex flex-col gap-12 p-8">
//         <div className="grid grid-cols-2">
//           <section className="flex items-center justify-center">
//             <Avatar className="w-36 h-36">
//               <AvatarImage
//                 src={UserProfile?.profilePicture}
//                 alt="User Avatar"
//               />
//               <AvatarFallback>
//                 {UserProfile?.username[0] || "CN"}
//               </AvatarFallback>
//             </Avatar>
//           </section>
//           <section>
//             <div className="flex flex-col gap-6 justify-between">
//               <div className="flex justify-between items-center gap-7">
//                 <span className="text-lg">{UserProfile?.username}</span>
//                 <div className="flex gap-4">
//                   {IsLogedinUserProfile ? (
//                     <>
//                       <Link to="/account/edit">
//                         <Button
//                           variant="secondary"
//                           className="cursor-pointer bg-gray-200 hover:bg-gray-300 py-0"
//                         >
//                           Edit profile
//                         </Button>
//                       </Link>
//                       <Button
//                         variant="secondary"
//                         className="cursor-pointer bg-gray-200 hover:bg-gray-300"
//                       >
//                         View archieve
//                       </Button>
//                       <CiSettings className="text-4xl cursor-pointer" />
//                     </>
//                   ) : IsFollowing ? (
//                     <>
//                       <Button
//                         onClick={handleFollwoAndUnfollow}
//                         className="bg-[#0895F6] hover:bg-[#3192d2] h-8"
//                       >
//                         Unfollow
//                       </Button>
//                       <Button
//                         variant="secondary"
//                         className="h-8 bg-gray-200 hover:bg-gray-300"
//                       >
//                         Message
//                       </Button>
//                     </>
//                   ) : (
//                     <Button
//                       onClick={handleFollwoAndUnfollow}
//                       className="bg-[#0895F6] hover:bg-[#3192d2] h-8"
//                     >
//                       Follow
//                     </Button>
//                   )}
//                 </div>
//               </div>
//               <div className="flex items-center gap-6">
//                 <p>
//                   <span className="text-[#737373]">
//                     <span className="text-black font-semibold">
//                       {UserProfile?.posts?.length}
//                     </span>{" "}
//                     posts
//                   </span>
//                 </p>
//                 <p>
//                   <span
//                     className="text-[#737373]  cursor-pointer"
//                     onClick={() => setopenFollower(true)}
//                   >
//                     <span className="text-black font-semibold">
//                       {UserProfile?.followers?.length}
//                     </span>{" "}
//                     followers
//                   </span>
//                 </p>
//                 <p>
//                   <span
//                     className="text-[#737373]  cursor-pointer"
//                     onClick={() =>setopenFollowing(true)}
//                   >
//                     <span className="text-black font-semibold">
//                       {UserProfile?.following?.length}
//                     </span>{" "}
//                     following
//                   </span>
//                 </p>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <span className="font-semibold">{UserProfile?.name}</span>
//                 <span>
//                   <Badge
//                     variant="secondary"
//                     className="bg-gray-200 hover:bg-gray-300 cursor-pointer"
//                   >
//                     <span className="text-sm">
//                       <i
//                         class="fa-brands fa-threads"
//                         style={{ fontSize: "18px", color: "black" }}
//                       ></i>{" "}
//                       {UserProfile?.username}
//                     </span>
//                   </Badge>
//                 </span>
//                 <span>{UserProfile?.bio}</span>
//                 <span>
//                   <div className="flex items-center gap-2 text-sm">
//                     <IoLinkOutline className="-rotate-45 text-blue-900" />
//                     <a
//                       href={
//                         UserProfile?.website ||
//                         "https://rausnotes39.netlify.app"
//                       }
//                       className="text-blue-900 hover:underline cursor-pointer font-semibold"
//                     >
//                       {UserProfile?.website ||
//                         "https://rausnotes39.netlify.app"}
//                     </a>
//                   </div>
//                 </span>
//               </div>
//             </div>
//           </section>
//         </div>
//         <div className="border-t border-t-gray-200 mt-12">
//           <div className="flex items-center justify-center gap-12 text-sm">
//             <span
//               className={`py-3 cursor-pointer flex gap-2 ${
//                 ActiveTab === "POSTS" && "font-bold"
//               }`}
//               onClick={() => HandleTabChange("POSTS")}
//             >
//               {" "}
//               {ActiveTab === "POSTS" ? (
//                 <FaAddressCard className="text-xl" />
//               ) : (
//                 <FaRegAddressCard className="text-xl" />
//               )}
//               POSTS
//             </span>
//             <span
//               className={`py-3 cursor-pointer flex gap-2 ${
//                 ActiveTab === "SAVED" && "font-bold"
//               }`}
//               onClick={() => HandleTabChange("SAVED")}
//             >
//               {" "}
//               {ActiveTab === "SAVED" ? (
//                 <FaBookmark className="text-xl" />
//               ) : (
//                 <FaRegBookmark className="text-xl" />
//               )}
//               SAVED
//             </span>
//             <span
//               className={`py-3 cursor-pointer flex gap-2 ${
//                 ActiveTab === "TAGGED" && "font-bold"
//               }`}
//               onClick={() => HandleTabChange("TAGGED")}
//             >
//               {ActiveTab === "TAGGED" ? (
//                 <FaUser className="text-xl" />
//               ) : (
//                 <FaRegUser className="text-xl" />
//               )}
//               TAGGED
//             </span>
//           </div>
//           <div className="grid grid-cols-3 gap-1">
//             {DisplayData?.map((post) => (
//               <div
//                 className="relative group cursor-pointer"
//                 key={post._id}
//                 onClick={() => {
//                   dispatch(setSelectedPost(post));
//                   setCommentOpen(true);
//                 }}
//               >
//                 <img
//                   src={post.image}
//                   className="rounded-sm my-2 object-cover w-full h-full aspect-square"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="flex items-center text-white space-x-1 ">
//                     <button className="flex items-center gap-2 hover-text-gray-300">
//                       <Heart />
//                       <span>{post?.likes?.length}</span>
//                     </button>
//                     <button className="flex items-center gap-2 hover:text-gray-300">
//                       <MessageCircle />
//                       <span>{post?.comments?.length}</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <CommentDialog
//             CommentOpen={CommentOpen}
//             setCommentOpen={setCommentOpen}
//           />
//           <FollowingDialog
//             open={openFollowing}
//             setOpen={setopenFollowing}
//             list={UserProfile?.following}
//             type="following"
//           />

//           <FollowingDialog
//             open={openFollower}
//             setOpen={setopenFollower}
//             list={UserProfile?.followers}
//             type="followers"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import React, { useCallback, useEffect, useState } from "react";
import useGetUserProfile from "../Hooks/useGetUserProfile.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IoLinkOutline } from "react-icons/io5";
import {
  FaRegUser,
  FaRegBookmark,
  FaRegAddressCard,
  FaAddressCard,
  FaBookmark,
  FaUser,
} from "react-icons/fa";
import { Heart, MessageCircle } from "lucide-react";
import CommentDialog from "./CommentDialog.jsx";
import { setSelectedPost } from "../ReduxStore/PostSlice.js";
import { setAuthUser, setUserProfile } from "../ReduxStore/authSlice.js";
import { toast } from "react-toastify";
import axios from "axios";
import FollowingDialog from "./FollowingDialog.jsx";

function Profile() {
  const [ActiveTab, setActiveTab] = useState("POSTS");
  const [CommentOpen, setCommentOpen] = useState(false);
  const dispatch = useDispatch();
  const [openFollowing, setopenFollowing] = useState(false);
  const [openFollower, setopenFollower] = useState(false);
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const { UserProfile, user } = useSelector((state) => state.auth);
  const [IsFollowing, setIsFollowing] = useState(
    user?.following?.some((item) => item?._id === UserProfile?._id)
  );
  const IsLogedinUserProfile = user?._id === UserProfile?._id;

  const DisplayData =
    ActiveTab === "POSTS"
      ? UserProfile?.posts
      : ActiveTab === "SAVED"
      ? UserProfile?.bookmarks
      : "";

  const handleFollwoAndUnfollow = useCallback(async () => {
    if (!UserProfile || !user) return;
    try {
      const response = await axios.post(
        `https://testingquickchatbackend.onrender.com/user/followOrUnfollow/${UserProfile._id}`,
        {},
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        const updatedFollowing = IsFollowing
          ? user.following.filter((item) => item._id !== UserProfile._id)
          : [
              ...user.following,
              {
                _id: UserProfile?._id,
                username: UserProfile?.username,
                profilePicture: UserProfile?.profilePicture,
              },
            ];

        const updatedFollowers = IsFollowing
          ? UserProfile.followers.filter((id) => id !== user._id)
          : [...UserProfile.followers, user];

        setIsFollowing((prev) => !prev);
        dispatch(setAuthUser({ ...user, following: updatedFollowing }));
        dispatch(setUserProfile({ ...UserProfile, followers: updatedFollowers }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }, [IsFollowing, UserProfile, user, dispatch]);

  useEffect(() => {
    setIsFollowing(
      user?.following?.some((item) => item?._id === UserProfile?._id)
    );
  }, [UserProfile, user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 ml-[60px] sm:ml-[100px] md:ml-[16%]">
      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <section className="flex justify-center">
            <Avatar className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
              <AvatarImage src={UserProfile?.profilePicture} alt="User Avatar" />
              <AvatarFallback>{UserProfile?.username?.[0] || "CN"}</AvatarFallback>
            </Avatar>
          </section>
          <section className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-lg font-semibold">{UserProfile?.username}</span>
              <div className="flex flex-wrap gap-3">
                {IsLogedinUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button variant="secondary" className="bg-gray-200 hover:bg-gray-300 py-0">
                        Edit profile
                      </Button>
                    </Link>
                    <Button variant="secondary" className="bg-gray-200 hover:bg-gray-300">
                      View archive
                    </Button>
                    <CiSettings className="text-3xl cursor-pointer" />
                  </>
                ) : IsFollowing ? (
                  <>
                    <Button onClick={handleFollwoAndUnfollow} className="bg-blue-500 hover:bg-blue-600 h-8">
                      Unfollow
                    </Button>
                    <Button variant="secondary" className="h-8 bg-gray-200 hover:bg-gray-300">
                      Message
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleFollwoAndUnfollow} className="bg-blue-500 hover:bg-blue-600 h-8">
                    Follow
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <p>
                <span className="text-[#737373]">
                  <span className="text-black font-semibold">{UserProfile?.posts?.length}</span> posts
                </span>
              </p>
              <p className="cursor-pointer" onClick={() => setopenFollower(true)}>
                <span className="text-[#737373]">
                  <span className="text-black font-semibold">{UserProfile?.followers?.length}</span> followers
                </span>
              </p>
              <p className="cursor-pointer" onClick={() => setopenFollowing(true)}>
                <span className="text-[#737373]">
                  <span className="text-black font-semibold">{UserProfile?.following?.length}</span> following
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <span className="font-semibold">{UserProfile?.name}</span>
              <span>
                <Badge variant="secondary" className="bg-gray-200 hover:bg-gray-300 cursor-pointer">
                  <i className="fa-brands fa-threads text-black mr-1" style={{ fontSize: "16px" }}></i>
                  {UserProfile?.username}
                </Badge>
              </span>
              <span>{UserProfile?.bio}</span>
              <span>
                <div className="flex items-center gap-2 text-sm break-all">
                  <IoLinkOutline className="-rotate-45 text-blue-900" />
                  <a
                    href={UserProfile?.website || "https://rausnotes39.netlify.app"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-900 hover:underline font-semibold"
                  >
                    {UserProfile?.website || "https://rausnotes39.netlify.app"}
                  </a>
                </div>
              </span>
            </div>
          </section>
        </div>

        <div className="border-t border-gray-200 mt-6">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm mt-6">
            {["POSTS", "SAVED", "TAGGED"].map((tab) => {
              const isActive = ActiveTab === tab;
              const iconMap = {
                POSTS: isActive ? <FaAddressCard /> : <FaRegAddressCard />,
                SAVED: isActive ? <FaBookmark /> : <FaRegBookmark />,
                TAGGED: isActive ? <FaUser /> : <FaRegUser />,
              };
              return (
                <span
                  key={tab}
                  className={`py-2 px-4 flex items-center gap-2 cursor-pointer ${isActive && "font-bold"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {iconMap[tab]} {tab}
                </span>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {DisplayData?.map((post) => (
              <div
                key={post._id}
                className="relative group cursor-pointer"
                onClick={() => {
                  dispatch(setSelectedPost(post));
                  setCommentOpen(true);
                }}
              >
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover aspect-square rounded-sm"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white gap-4">
                    <span className="flex items-center gap-1">
                      <Heart size={18} />
                      {post?.likes?.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={18} />
                      {post?.comments?.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialogs */}
        <CommentDialog CommentOpen={CommentOpen} setCommentOpen={setCommentOpen} />
        <FollowingDialog open={openFollowing} setOpen={setopenFollowing} list={UserProfile?.following} type="following" />
        <FollowingDialog open={openFollower} setOpen={setopenFollower} list={UserProfile?.followers} type="followers" />
      </div>
    </div>
  );
}

export default Profile;
