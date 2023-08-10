const Department = require("../../models").departments;

exports.getAllDepartment = async () => {
  const department = await Department.findAll();
  return department;
};

exports.createDepartment = async (name) => {
  const newDepartment = await Department.create({ name });
  return newDepartment;
};

exports.getDepartmentById = async (id) => {
  const department = await Department.findByPk(id);
  return department;
};

exports.updateDepartment = async ({ id, name }) => {
  const department = await Department.findByPk(id);

  department.name = name;

  await department.save();

  return department;
};

exports.deleteDepartment = async (id) => {
  const department = await Department.findByPk(id);

  await department.destroy();
  
  return department;
};
