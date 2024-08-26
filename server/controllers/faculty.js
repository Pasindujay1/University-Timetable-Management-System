import Faculty from "../models/Faculty.js";

export const createFaculty = async (req, res) => {
  const { name, code } = req.body;

  if (!name || !code) {
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });
  }

  const newCode = code.toUpperCase();
  const faculty = new Faculty({ name, code: newCode });

  try {
    const savedFaculty = await faculty.save();
    res.json(savedFaculty);
  } catch (err) {
    res.status(400).json({ error: "Failed to create faculty" });
  }
};

export const getFaculty = async (req, res) => {
  const { code } = req.body;
  try {
    const faculty = await Faculty.findOne({ code: code.toUpperCase() });
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch faculty" });
  }
};

export const updateFaculty = async (req, res) => {
  const { id, name, code } = req.body;

  if (!name || !code) {
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });
  }

  const newCode = code.toUpperCase();

  try {
    const faculty = await Faculty.findOneAndUpdate(
      { _id: id },
      { name, code: newCode },
      { new: true } // This option returns the updated document
    );

    if (!faculty) {
      return res.status(400).json({ error: `Failed to update faculty` });
    }

    return res.status(200).json({ faculty });
  } catch (err) {
    return res.status(500).json({ error: `Failed to update faculty` });
  }
};

export const deleteFaculty = async (req, res) => {
  const { code } = req.body;

  try {
    const faculty = await Faculty.findOneAndDelete({ code: code.toUpperCase() });

    if (!faculty) {
      return res.status(400).json({ error: "Faculty not found" });
    }

    return res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete faculty" });
  }
};
