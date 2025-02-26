import sql from "mssql";
import dbConfig from '../Config/db.js'

class DBHelper {
  constructor() {
    this.poolPromise = null; // Pool will be initialized once
  }

  // Initialize the connection pool only once
  async init() {
    if (!this.poolPromise) {
      this.poolPromise = sql.connect(dbConfig)
        .then(pool => {
          console.log("✅ Connected to MSSQL Database");
          return pool;
        })
        .catch(err => {
          console.error("❌ Database Connection Failed:", err);
          this.poolPromise = null;
          throw err;
        });
    }
    return this.poolPromise;
  }

  // Execute a stored procedure
  async executeProcedure(procedureName, params = {}) {
    try {
      const pool = await this.init();
      const request = pool.request();

      // Add parameters dynamically
      for (const [key, value] of Object.entries(params)) {
        request.input(key, value);
      }

      // Execute the stored procedure
      const result = await request.execute(procedureName);
      return result.recordset; // Return the result
    } catch (error) {
      console.error("❌ Error executing procedure:", error);
      throw error;
    }
  }

  // Gracefully close the pool when the app exits
  async closePool() {
    if (this.poolPromise) {
      try {
        const pool = await this.poolPromise;
        await pool.close();
        console.log("✅ Database Connection Pool Closed");
      } catch (error) {
        console.error("❌ Error closing connection pool:", error);
      } finally {
        this.poolPromise = null;
      }
    }
  }
}

// Create a single instance of DBHelper (Singleton Pattern)
const dbHelper = new DBHelper();

// Ensure the pool is closed when the application exits
process.on("SIGINT", async () => {
  await dbHelper.closePool();
  process.exit(0);
});

export default dbHelper;
