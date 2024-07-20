import RatingRender from "@/components/ratingRender";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Label,
  Textarea,
} from "@/components/ui";
import { axiosInstance } from "@/configs";
import { Comment, ResponseSingle } from "@/models";
import { useUserZustand } from "@/stores";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface CommentWatchProps {
  onNewComment: (newComment: Comment) => void;
}

const CommentWatch = ({ onNewComment }: CommentWatchProps) => {
  const { id } = useParams();

  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const user = useUserZustand((state) => state.user);

  if (user === null) {
    return (
      <div className="flex p-5 mt-5 text-black bg-yellow-400">
        <p>Please login to comment.</p>
        <Link
          className="ml-3 font-bold underline uppercase text-black-100 hover:text-indigo-700"
          to="/login"
        >
          Login
        </Link>
      </div>
    );
  }

  const onSubmitComment = async () => {
    await axiosInstance
      .post<ResponseSingle<Comment>>(`/comments/${id}`, { rating, content })
      .then((res) => {
        const newComment: ResponseSingle<Comment> = res.data;

        if (newComment.data) {
          onNewComment(newComment.data);
        }
        setContent("");
        setRating(0);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 400) {
          toast.error("Please fill in all fields.");
        }
      });
  };

  return (
    <div className="mt-6 ">
      <div className="flex items-start p-10 border-b border-gray-300 shadow-2xl ">
        <Avatar className="mt-2 size-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="relative w-full ml-10 grid  gap-1.5">
          <Label htmlFor="message-2">Your Message</Label>
          <Textarea
            id="message-2"
            className="mb-3"
            placeholder="Type your message here."
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex items-start justify-between w-full">
            <RatingRender
              rating={rating}
              onChangeRating={handleRatingChange}
              interactive={true}
            />
            <Button onClick={onSubmitComment}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentWatch;
