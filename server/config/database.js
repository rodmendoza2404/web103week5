import 'dotenv/config'
import pg from 'pg'

const clean = (value) => typeof value === 'string' ? value.trim() : value

const databaseUrl = clean(process.env.DATABASE_URL)

const config = databaseUrl
  ? {
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false
      }
    }
  : {
      user: clean(process.env.PGUSER),
      password: clean(process.env.PGPASSWORD),
      host: clean(process.env.PGHOST),
      port: Number(clean(process.env.PGPORT) || 5432),
      database: clean(process.env.PGDATABASE),
      ssl: {
        rejectUnauthorized: false
      }
    }

export const pool = new pg.Pool(config)