import Paper from "../models/Paper.js";

export const getPapers = async (req, res) => {
  try {
    const papers = await Paper.find();
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPaper = async (req, res) => {
  try {
    const { title, subject, year, category } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const paper = await Paper.create({
      title,
      subject,
      year,
      fileUrl,
      category
    });
    res.status(201).json(paper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
