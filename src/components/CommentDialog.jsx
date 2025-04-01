import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment.jsx";
import axios from "axios";
import { setPosts } from "../ReduxStore/PostSlice.js";
import { toast } from "react-toastify";
function CommentDialog({ CommentOpen, setCommentOpen }) {
  const [commentText, setcommentText] = useState("");
  const { SelectedPost } = useSelector((store) => store.post);
  const {user}=useSelector(store=>store.auth);
  const Posts = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const [CommentData, setCommentData] = useState([]);
  useEffect(() => {
    setCommentData(SelectedPost?.comments);
  }, [SelectedPost]);

  const changeEventHandler = (e) => {
    setcommentText(e.target.value);
  };
  const SendCommentHandler = async () => {
    try {
      const response = await axios.post(
        `https://testingquickchatbackend.onrender.com/user/post/${SelectedPost._id}/comment`,
        { text: commentText },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setCommentData([...CommentData, response.data.comment]);
        setcommentText("");
        const updatedpost = Posts.post.map((p) =>
          p._id === SelectedPost._id
            ? {
                ...p,
                comments: [...p.comments, response.data.comment],
              }
            : p
        );
        dispatch(setPosts(updatedpost));
        toast.success(response.data.message || "Comment Added!");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Internal Server Error");
    }
  };
  return (
    <Dialog open={CommentOpen}>
      <DialogContent
        onInteractOutside={() => setCommentOpen(false)}
        className="max-w-5xl p-0 flex flex-col"
      >
        {/* Add DialogTitle for accessibility */}
        <DialogTitle className="sr-only">Comments</DialogTitle>
        <DialogDescription className="sr-only">
          View and post comments on this post.
        </DialogDescription>
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src={SelectedPost?.image}
              alt="post_img"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={SelectedPost?.author?.profilePicture} />
                    <AvatarFallback>cn</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <Link className="font-semibold text-base">
                    {SelectedPost?.author?.username || "username"}
                  </Link>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                    {
                      user?._id!==SelectedPost?.author?._id && "Unfollow"
                    }
                  </div>
                  <div className="cursor-pointer w-full">Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={SelectedPost?.author?.profilePicture} />
                    <AvatarFallback>cn</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <Link className="font-semibold text-base">
                    {SelectedPost?.author?.username || "username"}
                  </Link>
                  <span className="text-sm">{SelectedPost?.caption}</span>
                </div>
              </div>
              {CommentData?.map((comment) => {
                return <Comment key={comment._id} comment={comment} />;
              })}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  onChange={changeEventHandler}
                  placeholder="Add a comment...."
                  className="w-full outline-none border border-gray-300 p-2 rounded"
                />
                <Button
                  disabled={!commentText}
                  onClick={SendCommentHandler}
                  variant="outline"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommentDialog;
