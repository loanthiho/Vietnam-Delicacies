const {
  Product,
  Province,
  User,
  Category,
  File,
  Review,
} = require("../models");
const {
  resSuccessData,
  resInternalError,
  resCreated,
  resNotFound,
} = require("../utils/response");
const cloudinary = require("../utils/cloudinary");
const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const files = req.files;
    const productCreated = await Product.create(product);
    if (productCreated) {
      if (files) {
        var file_into_dbs = [];
        for (var file of files) {
          var cloudFiles = {};
          cloudFiles = {
            product_id: productCreated.id,
            file_name: file.originalname,
          };
          if (file.mimetype.startsWith("video/")) {
            const result = await cloudinary.uploader.upload(file.path, {
              resource_type: "video",
            });
            if (result) {
              cloudFiles.src = result.secure_url;
              cloudFiles.file_type = result.resource_type;
            } else {
              resInternalError(
                res,
                (error = {
                  serverErr: result,
                  msg: "Upload files to cloudinary unsuccesful!",
                })
              );
            }
          } else if (file.mimetype.startsWith("image/")) {
            const result = await cloudinary.uploader.upload(file.path);
            if (result) {
              cloudFiles.src = result.secure_url;
              cloudFiles.file_type = result.resource_type;
            } else {
              resInternalError(
                res,
                (error = {
                  serverErr: result,
                  msg: "Upload files to cloudinary unsuccesful!",
                })
              );
            }
          }
          file_into_dbs.push(cloudFiles);
        }
        await File.bulkCreate(file_into_dbs)
          .then((result) => {
            resSuccessData(
              res,
              (result = { files: result, product: productCreated }),
              "Product and files created successfully!"
            );
          })
          .catch((error) =>
            resInternalError(
              res,
              (error = { serverErr: error, msg: "File create unsuccessful!" })
            )
          );
      }
    }
  } catch (error) {
    resInternalError(res, error);
    console.log(error);
  }
};

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  resSuccessData(res, id);
  await Product.update(req.body, {
    where: {
      id: id,
    },
  });
};
const removeProduct = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    try {
      const product = await Product.findOne({ where: { id: id } });
      if (!product) {
        return resNotFound(res, "Product not found!");
      }
      await Product.destroy({ where: { id: id } });
      const file = await File.findAll({ where: { product_id: id } });
      if (file) {
        await File.destroy({ where: { product_id: id } });
      }
      const review = await Review.findAll({ where: { product_id: id } });
      if (review) {
        await Review.destroy({ where: { product_id: id } });
      }
      resSuccessData(res, product, "Product delete successfully!");
    } catch (error) {
      resNotFound(res, "Not Found Product");
    }
  }
};

const getAllProduct = async (req, res, next) => {
  await Product.findAll({
    include: [
      { model: Province },
      { model: User },
      { model: Category },
      { model: File },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((result) => resSuccessData(res, result))
    .catch((error) => resInternalError(res, error));
};
module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  removeProduct,
};
