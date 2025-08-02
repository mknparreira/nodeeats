import mongoose from 'mongoose';

import { eventEmitter } from '@providers/eventEmitter.provider';

export class DatabaseProvider {
  private static DATABASE_URL = process.env.DATABASE_URL;

  static async connect(): Promise<void> {
    try {
      mongoose.set('strictQuery', true);
      if (this.DATABASE_URL == null) {
        throw new Error('DATABASE_URL is not defined');
      }
      await mongoose.connect(this.DATABASE_URL);
      eventEmitter.emit('database.connected', 'MongoDB connected successfully');
    } catch (error) {
      eventEmitter.emit('database.error', error);
      process.exit(1);
    }
  }

  static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      eventEmitter.emit('database.disconnected', 'Disconnected from MongoDB');
    } catch (error) {
      eventEmitter.emit('database.error', error);
    }
  }
}
