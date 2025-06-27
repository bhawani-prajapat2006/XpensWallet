import express from 'express'
import { addTransactions, deleteTransaction, getTransactions, transactionSummary } from '../controllers/transactionController.js'

const transactionRouter = express.Router()

transactionRouter.get('/:userId', getTransactions)
transactionRouter.post('/', addTransactions)
transactionRouter.delete('/:id', deleteTransaction)
transactionRouter.get('/summary/:userId', transactionSummary)

export default transactionRouter