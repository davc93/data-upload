import dotenv from 'dotenv'

dotenv.config()
export const config = {
    API_KEY:process.env.API_KEY,
    API_SECRET:process.env.API_SECRET,
}

