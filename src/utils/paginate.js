exports.paginate = async (
  model,
  where = {},
  attributes,
  include = [],
  page = 1,
  limit = 10
) => {
  try {
    const totalCount = await model.count({ where });

    const offset = (page - 1) * limit;

    const results = await model.findAll({
      where,
      attributes,
      include,
      limit,
      offset,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: results,
      page,
      limit,
      total: totalCount,
      totalPages,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
