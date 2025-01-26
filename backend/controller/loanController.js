const Loan = require("../models/loanModel");
const categorySubcategoryMapping = {
  education: ["child loan", "uni fee"],
  wedding: ["valima", "other"],
  business: ["startup", "expansion", "other"],
  "home construction": ["renovation", "new home", "other"],
};


const loanController = async (req, res) => {
    const { category, subCategory, loanAmount, duration } = req.body;
    try {
      if (!categorySubcategoryMapping[category]) {
        return res.status(400).json({ message: "Invalid category." });
      }
  
      if (!categorySubcategoryMapping[category].includes(subCategory)) {
        return res.status(400).json({
          message: `Invalid subCategory for category ${category}. Allowed subcategories are: ${categorySubcategoryMapping[category].join(
            ", "
          )}`,
        });
      }
  
  
      const loan = new Loan({
        user: req.user._id,
        category,
        subCategory,
        loanAmount,
        duration,
      });
  
      await loan.save();
  
      res.status(201).json({ message: "Loan application submitted!", loan });
    } catch (err) {
      res.status(500).json({ message: "Error submitting loan.", error: err });
    }
  }
module.exports = loanController;
