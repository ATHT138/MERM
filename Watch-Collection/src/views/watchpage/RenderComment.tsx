import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ScrollArea,
} from "@/components/ui";
import { Comment } from "@/models";
import RatingRender from "@/components/ratingRender";
import { FormatType, formatFromISOString } from "@/lib/formatDate";

interface RenderCommentProps {
  comments?: Comment[];
}

const RenderComment = ({ comments }: RenderCommentProps) => {
  return (
    <div className="mb-11">
      <h1 className="mt-8 ml-1 text-2xl font-semibold">Comments</h1>
      <ScrollArea className="w-full mt-5 border rounded-md h-96">
        {comments?.map((comment) => (
          <div
            key={comment._id}
            className="flex items-start p-10 border-b border-gray-300 shadow-2xl "
          >
            <Avatar className="mt-2 size-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="pl-10">
              <div className="text-3xl font-bold">{comment.authorName}</div>
              <div className="flex">
                <RatingRender rating={comment.rating} />
                <p className="ml-4 text-xs font-bold text-gray-400">
                  {formatFromISOString(comment.createdAt, FormatType.DATETIME)}
                </p>
              </div>
              <div className="mt-4">{comment.content}</div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default RenderComment;
