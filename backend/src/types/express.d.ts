// src/types/express.d.ts
import { User } from 'src/auth/auth.service';  // Import your User type here

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Add the `user` property to the Request object
    }
  }
}
