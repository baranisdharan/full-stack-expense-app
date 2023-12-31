const Expense = require('../models/Expense')

exports.addExpense = async (req, res, next) => {
  console.log('req.body', req.body)
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const data = await Expense.create({ description: description, amount: amount, category: category })
    res.status(201).json(data)
  }
  catch (err) {
    res.status(500).json({
      error: err
    })
  }
}

exports.getExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses)
  } catch (error) {
    console.log("error in find all elements")
    res.status(500).json({ error: error })
  }
}

exports.deleteExpense = (req, res, next) => {
  const uId = req.params.id;
  Expense.findByPk(uId)
    .then(expense => {
      return expense.destroy()
    })
    .then(result => {
      console.log("Item destroyed")
    })
    .catch(err => console.log(err))
}