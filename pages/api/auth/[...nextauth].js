import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../database/conn'
import Users from '../../../model/UsersSchema'
import { compare } from 'bcryptjs';

export default NextAuth({
    providers : [
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            type : "Credentials",
            async authorize(credentials, req){
                connectMongo().catch(error => { error: "Connection Failed...!"})

                // check user existence
                const result = await Users.findOne( { email : credentials.email} )
                if(!result){
                    throw new Error("No user Found with Email Please Sign Up...!")
                }

                // compare()
                const checkPassword = await compare(credentials.password, result.password);
                
                // incorrect password
                if(!checkPassword || result.email !== credentials.email){
                    throw new Error("Username or Password doesn't match");
                }

                return result;

            }
        })
    ],
    secret: "6XcgbKTloKcUh05vkJApbBr6qL4b81G5ZhiNZz2Zy3o=",
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: "/tabs/emergencies", // callback page for sign in
    },
})