import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Link } from 'expo-router'
import { Text, View, Image, TouchableOpacity, FlatList, Alert, RefreshControl } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions.js'
import { useEffect, useState } from 'react'
import PageLoader from '../../components/PageLoader.jsx'
import { styles } from '../../assets/styles/home.styles.js'
import { Ionicons } from "@expo/vector-icons"
import BalanceCard from '../../components/BalanceCard.jsx'
import TransactionItem from '../../components/TransactionItem.jsx'
import NoTransactionFound from '../../components/NoTransactionFound.jsx'

export default function Page() {
  const { user } = useUser()

  const router = useRouter()

  const [refreshing, setRefreshing] = useState(false)

  const {transactions, summary, isLoading, loadData, deleteTransaction } =  useTransactions(user.id)

  useEffect(() => {
    loadData() 
  }, [loadData]) 

  const onRefresh = async() => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  const handleDelete = (id) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
      {text: "Cancel", style: "cancel"},
      {text: "Delete", style: "destructive", onPress: () => deleteTransaction(id)}
    ])
  }

  if(isLoading && !refreshing) return <PageLoader />

  console.log("transactions..............: ", transactions)
  console.log("summary:......... ", summary)

  return (
    <View style={styles.container}>

      <View style={styles.content}>

        <View style={styles.header}>
          {/* left part */}
          <View style={styles.headerLeft}>
            <Image source={require("../../assets/images/logo.png")}
             style={styles.headerLogo}
             resizeMode='contain'
            />

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress}
              </Text>
            </View>

          </View>

          {/* right part */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>

            </TouchableOpacity>
            <SignOutButton />

          </View>

        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

      </View>

    {/* flatlist is a performant way to render long lists in react native */}
    {/* it renders items lazily - only those on the screen */}
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({item}) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        ) }
        ListEmptyComponent={<NoTransactionFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
 
      {/* <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Text>Income: {summary.income}</Text>
        <Text>Expenses: {summary.expenses}</Text>
        <Text>Balance: {summary.balance}</Text>
        
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut> */}
    </View>
  )
}