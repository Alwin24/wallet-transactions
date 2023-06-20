import { Connection, PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'

const connection = new Connection('https://alpha-dimensional-firefly.solana-mainnet.discover.quiknode.pro/')
const walletId = new PublicKey('HxW4EmTr2WhvrKuxXjB5t5hEpftNebxw6mXsVxcYDMHT')

try {
	const transactionList = await connection.getSignaturesForAddress(walletId, { limit: 5 })
	const transactionDetails = await connection.getParsedTransactions(
		transactionList.map((sig) => sig.signature),
		{ maxSupportedTransactionVersion: 0 }
	)
	let tokenTransfers = transactionDetails.filter((txn) =>
		txn?.transaction.message.accountKeys.some(
			(key) => key.pubkey.equals(TOKEN_PROGRAM_ID) || key.pubkey.equals(TOKEN_2022_PROGRAM_ID)
		)
	)

	console.log(tokenTransfers)
} catch (e) {
	console.log(e)
}
