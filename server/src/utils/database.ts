import { MongoClient, ConnectOptions } from "mongodb";
const CONNECTION_STRING =
	"mongodb+srv://Dima:1234@cluster0.kbrkavi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(CONNECTION_STRING, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
} as ConnectOptions);
let dbConnection: MongoClient;

export const connect = async (callback: () => void) => {
	try {
		dbConnection = await client.connect();
		console.log("Successfully connected to database");
		callback();
	} catch (e) {
		console.log(e);
		throw new Error("Database connection failed");
	}
};

export const getDb = () => {
	if (dbConnection) {
		return dbConnection.db("expenseTracker");
	} else {
		throw new Error("No database connection");
	}
};
