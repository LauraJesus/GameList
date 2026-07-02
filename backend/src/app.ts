
import express from "express"
import cors from "cors"
import { authRoutes } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
/*
import { wishlistRoutes } from "./routes/wishlist.routes";
import { reviewRoutes } from "./routes/review.routes";
*/
const app = express();

app.use(express.json());
app.use(cors({ // local front-end
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(cookieParser()); //serve para ler os cookies que vem do front-end, para pegar o token de autenticação
app.use("/auth", authRoutes);


/*
app.use("/wishlist", wishlistRoutes);
app.use("/reviews", reviewRoutes);
*/
export { app };
