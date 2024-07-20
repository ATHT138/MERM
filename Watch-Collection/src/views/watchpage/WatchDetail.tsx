import DataRenderer from "@/components/dataRender";
import useFetch from "@/hooks/useFetch";
import { Comment, ResponseSingle, WatchDetail as Watch } from "@/models";
import { useParams } from "react-router-dom";
import RenderComment from "./RenderComment";
import WatchDetailCard from "./WatchDetailCard";
import CommentWatch from "./CommentWatch";
import { useEffect, useState } from "react";

const WatchDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: watch,
    error,
    loading,
  } = useFetch<ResponseSingle<Watch>>(`/watches/${id}`);

  const [comments, setComments] = useState<Comment[]>(
    watch?.data?.watch.comments || []
  );

  useEffect(() => {
    if (watch) {
      setComments(watch?.data?.watch.comments ?? []);
    }
  }, [watch]);

  const handleNewComment = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <DataRenderer error={error} isLoading={loading}>
      <div className="container p-4 mx-auto">
        <WatchDetailCard data={watch?.data} />
        <CommentWatch onNewComment={handleNewComment} />
        <RenderComment comments={comments} />
      </div>
    </DataRenderer>
  );
};

export default WatchDetail;
