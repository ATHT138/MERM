const Brand = require("../models/brand");
const Watch = require("../models/watch");

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    if (brands.length === 0) {
      return res.status(200).send("No brands found");
    }
    console.log("Brands", brands);
    res.status(200).json({ success: true, data: brands });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.createBrand = async (req, res) => {
  try {
    const { brandName } = req.body;
    const existingBrand = await Brand.findOne({ brandName });
    if (existingBrand) {
      return res.status(400).send("Brand name already exists");
    }
    const newBrand = new Brand({ brandName });
    await newBrand.save();
    res.json({ msg: "Brand created", brandId: newBrand._id });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const { brandName } = req.body;
    const brand = await Brand.findByIdAndUpdate(
      brandId,
      { brandName },
      { new: true }
    );
    if (!brand) {
      return res.status(404).send("Brand not found");
    }

    res.json({ msg: "Brand updated", brandId: brand._id });
  } catch (err) {
    if (err.codeName === "DuplicateKey") {
      return res.status(404).send({ msg: "Brand name already exists" });
    }
    res.status(500).send("Server error");
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const existedBrand = await Brand.findById(brandId);

    if (!existedBrand) {
      return res.status(404).send("Brand not found");
    }

    const brandInWatch = await Watch.findOne({ brand: brandId });
    if (brandInWatch) {
      return res
        .status(404)
        .send({ msg: "Brand is in use, please delete the watch first" });
    }

    await Brand.findByIdAndDelete(brandId);

    return res.json({ msg: "Brand deleted" });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const { brandId } = req.params;
    // console.log(brandId);
    const brand = await Brand.findById(brandId);
    if (brand === null) {
      return res.status(404).send("Brand not found");
    }
    res.json(brand);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).send("Brand not found");
    }
    res.status(500).send("Server error");
  }
};
