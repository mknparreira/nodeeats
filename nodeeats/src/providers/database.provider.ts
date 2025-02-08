import mongoose from 'mongoose';

export class DatabaseProvider {
  private static MONGO_URI =
    process.env.MONGO_URI ?? 'mongodb://admin:password@localhost:27017';

  static async connect(): Promise<void> {
    try {
      mongoose.set('strictQuery', true);
      if (!this.MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
      }
      await mongoose.connect(this.MONGO_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }

  static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}
