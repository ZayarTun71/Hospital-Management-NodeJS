const Image = require("../../models").images;

exports.deleteImage = async (id) => {
    const image = await Image.findByPk(id);
  
    await image.destroy();
    
    return image;
  };