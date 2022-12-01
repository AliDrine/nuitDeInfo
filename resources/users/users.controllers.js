import { User } from "./users.model.js";

export const me = (req, res) => {
  res.status(200).json({ data: req.user });
};

export const getAll = async (req, res) => {
  const isAdmin = req.user.role.includes("admin");
  if (isAdmin) {
    const users = await User.find({archived:false});
    res.status(200).json({ status: 1, data: users });
  } else {
    res.status(401).json({ status: 0, message: "not Authorized !" });
  }
};
export const getById = async (req, res) => {
  const isAdmin = req.user.role.includes("admin");
  if (isAdmin) {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json({ status: 1, data: user });
  } else {
    res.status(401).json({ status: 0, message: "not Authorized !" });
  }
};

export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body)
      .lean()
      .exec();

    res.status(200).json({ status: 1, data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateById = async (req, res) => {
  const isAdmin = req.user.role.includes("admin");
  if (isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body)
        .lean()
        .exec();

      res.status(200).json({ status: 1, data: user });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  } else {
    res.status(401).json({ status: 0, message: "not Authorized !" });
  }
};

export const deleteById = async (req, res) => {
  const isAdmin = req.user.role.includes("admin");
   console.log('admin',isAdmin)
  if (isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        archived: true,
      })
        .lean()
        .exec();
      res.status(200).json({ status: 1, data: user });
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  } else {
    res.status(401).json({ status: 0, message: "not Authorized !" });
  }
};
