import postgres from 'postgres';

async function checkDatabaseConnection() {
  console.log('Checking database connection...');
  
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Parse the DATABASE_URL to extract host for simple testing
    const url = new URL(process.env.DATABASE_URL);
    console.log(`Host: ${url.hostname}`);
    
    // Attempt to connect to the database
    const sql = postgres(process.env.DATABASE_URL, { 
      max: 1, // Use only one connection for testing
      connect_timeout: 10, // 10 seconds timeout
      debug: true, // Log all queries
    });
    
    // Try a simple query to verify connection
    console.log('Executing simple query...');
    const result = await sql`SELECT 1 as test`;
    console.log('Query result:', result);
    
    console.log('Successfully connected to the database!');
    
    // Close the connection
    await sql.end();
    
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

checkDatabaseConnection();