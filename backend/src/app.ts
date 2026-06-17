
import express from "express";
import cors from "cors";
/*import { authRoutes } from "./routes/auth.routes";
import { wishlistRoutes } from "./routes/wishlist.routes";
import { reviewRoutes } from "./routes/review.routes";
*/
const app = express();

/*app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/reviews", reviewRoutes);
*/
export { app };
