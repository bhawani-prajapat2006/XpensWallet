import { useCallback, useState } from "react";
import { Alert } from "react-native";

const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${backend_url}/${userId}`);
      const data = await response.json();
      setTransactions(data.transactions);

    } catch (err) {
      console.log("error during getting transactions at frontend", err);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${backend_url}/summary/${userId}`);
      const data = await response.json();
      setSummary({
        balance: parseFloat(data.balance) || 0,
        income: parseFloat(data.income) || 0,
        expenses: parseFloat(data.expenses) || 0,
      });
    } catch (err) {
      console.log("error during getting transactions summary at frontend", err);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);

    try {
      // so that function can be run in parellel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (err) {
      console.log("error during loading data at frontend", err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = useCallback(
    async (id) => {
      try {
        const response = await fetch(`${backend_url}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete transaction");

        // resfresh the data after deletion
        loadData();

        Alert.alert("Success", "Transaction deleted successfully");
      } catch (err) {
        console.log("error during deleting transaction at frontend", err);
        Alert.alert("Error", err.message);
      }
    },
    [userId]
  );;

  return { transactions, summary, isLoading, loadData, deleteTransaction };
};
