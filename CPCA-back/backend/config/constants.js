import dotenv from 'dotenv';
dotenv.config();
const dbURI = process.env.dbURI || ''
const TOKEN_KEY = process.env.TOKEN_KEY || '30d'
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY
const NODE_ENV = process.env.NODE_ENV || 'production'

//firebase configuration 
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
}


export { dbURI, TOKEN_KEY, TOKEN_EXPIRY, firebaseConfig, NODE_ENV }
