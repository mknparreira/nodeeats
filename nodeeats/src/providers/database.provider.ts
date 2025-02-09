import mongoose from 'mongoose';

export class DatabaseProvider {
  private static DATABASE_URL = process.env.DATABASE_URL;

  static async connect(): Promise<void> {
    try {
      mongoose.set('strictQuery', true);
      if (this.DATABASE_URL == null) {
        throw new Error('DATABASE_URL is not defined');
      }
      await mongoose.connect(this.DATABASE_URL);
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
