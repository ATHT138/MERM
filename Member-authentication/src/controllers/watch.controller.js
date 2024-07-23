const Brand = require("../models/brand");
const Watch = require("../models/watch");
const Comment = require("../models/comment");
const Member = require("../models/member");

// Create a new watch
exports.createWatch = async (req, res, next) => {
  try {
    const { watchName, image, price, Automatic, watchDescription, brandName } =
      req.body;

    if (
      !watchName ||
      !image ||
      !price ||
      !Automatic ||
      !watchDescription ||
      !brandName
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check if the brand exists or create a new one
    const brand = await Brand.findOneAndUpdate(
      { brandName },
      { $setOnInsert: { brandName } },
      { new: true, upsert: true }
    );

    const watch = new Watch({
      watchName,
      image,
      price,
      Automatic,
      watchDescription,
      brand: brand._id,
    });
    const newWatch = await watch.save();

    res.status(201).json({ success: true, data: { id: newWatch._id } });
  } catch (error) {
    next(error);
  }
};

// Get all watches
exports.getAllWatches = async (req, res, next) => {
  const { brandName, watchName, page, limit } = req.query;
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  try {
    let query = {};

    // Check for valid page number
    if (options.page < 1) {
      return res.status(404).json({
        success: false,
        message: "Page number must be greater than 0",
      });
    }

    // Process watchName query
    if (watchName) {
      query.watchName = { $regex: watchName, $options: "i" };
    }

    // Process brandName query
    if (brandName) {
      let brands;
      if (Array.isArray(brandName)) {
        // If brandName is an array, search for all brands in the array
        brands = await Brand.find({ brandName: { $in: brandName } });
      } else {
        // If brandName is a single value, convert it to an array
        brands = await Brand.find({ brandName: brandName });
      }

      if (brands.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No brands found" });
      }

      // Extract brand IDs from the found brands
      const brandIds = brands.map((brand) => brand._id);
      query.brand = { $in: brandIds };
    }

    // Fetch watches with pagination
    const watches = await Watch.find(query)
      .populate("brand")
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .exec();

    // Count total watches matching the query
    const totalWatches = await Watch.countDocuments(query);
    const totalPages = Math.ceil(totalWatches / options.limit);

    res.status(200).json({ success: true, data: watches, totalPages });
  } catch (error) {
    next(error);
  }
};

// Get a single watch
exports.getWatchById = async (req, res, next) => {
  const { watchId } = req.params;
  try {
    const watch = await Watch.findById(watchId);
    if (!watch) {
      return res
        .status(404)
        .json({ success: false, message: "Watch not found" });
    }

    const brand = await Brand.findById(watch.brand);
    const nameBrand = brand ? brand.brandName : "Unknown Brand";

    // Calculate the total rating of the watch
    const totalRate =
      watch.comments.reduce((acc, comment) => acc + comment.rating, 0) /
      watch.comments.length;

    const commentsWithMembers = await Promise.all(
      watch.comments.map(async (comment) => {
        const member = await Member.findById(comment.author);

        return {
          ...comment._doc,
          authorName: member ? member.memberName : null,
        };
      })
    );

    const updateWatch = watch.toObject();
    updateWatch.comments = commentsWithMembers;

    res.status(200).json({
      success: true,
      data: { watch: updateWatch, nameBrand, totalRate },
    });
  } catch (error) {
    next(error);
  }
};

// Update a watch
exports.updateWatch = async (req, res, next) => {
  try {
    const { watchId } = req.params;
    const { watchName, image, price, Automatic, watchDescription, brandName } =
      req.body;

    if (
      !watchName ||
      !image ||
      !price ||
      !Automatic ||
      !watchDescription ||
      !brandName
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check if the brand exists or create a new one
    const brand = await Brand.findOneAndUpdate(
      { brandName },
      { $setOnInsert: { brandName } },
      { new: true, upsert: true }
    );

    const watch = await Watch.findByIdAndUpdate(
      watchId,
      {
        watchName,
        image,
        price,
        Automatic,
        watchDescription,
        brand: brand._id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!watch) {
      return res
        .status(404)
        .json({ success: false, message: "Watch not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Watch updated", data: watch });
  } catch (error) {
    next(error);
  }
};

// Delete a watch
exports.deleteWatch = async (req, res, next) => {
  try {
    const watch = await Watch.findById(req.params.watchId);
    if (!watch) {
      return res
        .status(404)
        .json({ success: false, message: "Watch not found" });
    }
    // Delete all comments associated with the watch
    await Comment.deleteMany({ _id: { $in: watch.comments } });

    await Watch.findByIdAndDelete(req.params.watchId);

    res.status(200).json({ success: true, message: "Watch removed" });
  } catch (error) {
    next(error);
  }
};
