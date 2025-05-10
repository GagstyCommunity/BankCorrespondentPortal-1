import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';

async function setupDatabase() {
  console.log('Setting up database...');
  
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    console.log('Connecting to database...');
    const client = postgres(process.env.DATABASE_URL, { 
      max: 1, 
      connect_timeout: 10, 
      debug: true 
    });
    
    console.log('Initializing Drizzle ORM...');
    const db = drizzle(client, { schema });

    // Test connection
    console.log('Testing connection...');
    await client`SELECT 1 as test`;
    console.log('Connection successful!');

    // This would be used with drizzle-kit in a more sophisticated setup
    // For now, we're just checking the connection
    console.log('Database setup completed successfully!');
    
    // Close the connection
    await client.end();
    
  } catch (error) {
    console.error('Database setup failed:', error);
  }
}

setupDatabase();