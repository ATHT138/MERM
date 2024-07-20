const Comment = require("../models/comment");
const Watch = require("../models/watch");

// Post a comment
exports.postComment = async (req, res, next) => {
  const { rating, content } = req.body;
  const { watchId } = req.params;
  const user = req.user;
  try {
    const watch = await Watch.findById(watchId);
    if (!watch) {
      console.log("Watch not found");
      return res
        .status(404)
        .json({ success: false, message: "Watch not found" });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!rating || !content) {
      return res
        .status(400)
        .json({ message: "Rating and content are required" });
    }

    const newComment = await Comment.create({
      rating,
      content,
      author: user._id,
      watch: watchId,
    });

    watch.comments.push(newComment);
    await watch.save();

    const authorComment = {
      ...newComment._doc,
      authorName: user.memberName,
    };

    res.status(201).json({ success: true, data: authorComment });
  } catch (error) {
    next(error);
  }
};

// Update a comment
exports.updateComment = async (req, res, next) => {
  const { commentId, watchId } = req.params;
  const { rating, content } = req.body;
  const user = req.user;
  try {
    const watch = await Watch.findById(watchId);
    if (!watch) {
      return res
        .status(404)
        .json({ success: false, message: "Watch not found" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (comment.author._id.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    // Update the comment
    comment.rating = rating;
    comment.content = content;

    // Update the comment in the watch
    watch.comments.forEach((comment, index) => {
      if (comment.id === commentId) {
        watch.comments[index].rating = rating;
        watch.comments[index].content = content;
      }
    });

    // Save the changes
    await watch.save();
    await comment.save();

    res.status(200).json({
      success: true,
      msg: "Comment update successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
  const { commentId, watchId } = req.params;
  const user = req.user;
  try {
    const comment = await Comment.findById(commentId).populate("author");
    // Check if the comment exists
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    // Check if the user is the author of the comment
    if (comment.author._id.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const watch = await Watch.findById(watchId);
    // Check if the watch exists
    if (!watch) {
      return res
        .status(404)
        .json({ success: false, message: "Watch not found" });
    }

    // Remove the comment from the watch
    watch.comments = watch.comments.filter(
      (comment) => comment.id !== commentId
    );
    await watch.save();

    await Comment.findByIdAndDelete(commentId);

    res
      .status(200)
      .json({ success: true, message: "Comment deleted succesfully" });
  } catch (error) {
    next(error);
  }
};
