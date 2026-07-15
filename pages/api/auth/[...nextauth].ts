import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../lib/mongodb";
import bcrypt from "bcryptjs";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email e senha são obrigatórios.");
                }

                const client = await clientPromise;
                const db = client.db(process.env.REACT_APP_MONGODB_DATABASE); // Troque para o nome do seu banco

                // 1. Busca o usuário no MongoDB pelo email
                const user = await db.collection("users").findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("Usuário não encontrado.");
                }

                // 2. Compara a senha digitada com o hash salvo no banco
                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Senha incorreta.");
                }

                // 3. Retorna os dados do usuário para salvar na sessão
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/entrar', // Diz ao NextAuth para usar sua página customizada
    },
    secret: process.env.NEXTAUTH_SECRET, // Gere uma string aleatória no .env.local
});