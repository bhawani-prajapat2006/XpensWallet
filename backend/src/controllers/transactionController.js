import { sql } from "../config/db.js"

const addTransactions = async(req, res) => {

    try {
        const { title, amount, category, user_id } = req.body

        if(!title || !user_id || !category || amount === undefined){
            return res.status(400).json({
                message: "All fields are required!",
                success: false
        })
        }   

        const transaction = await sql`
        INSERT INTO transactions(user_id, title, amount, category)
        VALUES (${user_id}, ${title}, ${amount}, ${category})
        RETURNING *
        `
        
        return res.status(201).json({
            message: "transaction created successfully",
            success: true,
            transaction: transaction[0]
        })
         
    } catch (err) {
        console.log("Error during adding transaction:", err)

        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
        
    }
}

const getTransactions = async(req, res) => {
    
    try {
        const {userId} = req.params

        const transactions =  await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `

        return res.status(200).json({
            message: "Getting transactions successfully",
            success: true,
            transactions: transactions
        })
        
    } catch (err) {
        console.log("Error during getting transaction:", err)

        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
        
    }
}

const deleteTransaction = async(req, res) => {

    try {
        const {id} = req.params

        if(!id || id.trim() === ""){
            return res.status(400).json({
                message: "Id not provided",
                success: false
            })
        }

        if(isNaN(parseInt(id))){
            return res.status(400).json({
                message: "Invalid transaction id",
                success: false
            })
        }

        const transaction = await sql`
        DELETE FROM transactions WHERE id = ${id} RETURNING *
        `

        if(transaction.length === 0){
            return res.status(404).json({
                message: "Transaction Not Found!",
                success: false
            })
        }

        return res.status(200).json({
            message: "Transaction deleted successfully!",
            success: true
        })
        
    } catch (err) {
        console.log("Error during deleting transaction:", err)

        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
        
    }
}

const transactionSummary = async(req, res) => {

    try {
        const {userId} = req.params

        const totalBalance = await sql`
        SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
        `

        const totalIncome = await sql`
        SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0
        `

        const totalExpenses = await sql`
        SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0 
        `

        return res.status(200).json({
            message: "Getting transaction summary successfully!",
            success: true,
            balance: totalBalance[0].balance,
            income: totalIncome[0].income,
            expenses: totalExpenses[0].expenses
        })
        
    } catch (err) {
        console.log("Error during summary of transaction:", err)

        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
        
    }
}


export {addTransactions, getTransactions, deleteTransaction, transactionSummary}