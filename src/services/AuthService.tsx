import { signOut } from '@firebase/auth';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword as signIn, 
  createUserWithEmailAndPassword as signUp 
} from '@firebase/auth';
import { User, AuthResponse } from '../models/User';

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const userCredential = await signIn(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    const authResponse: AuthResponse = { user: user as User, token: idToken };
    return authResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const userCredential = await signUp(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    const authResponse: AuthResponse = { user: user as User, token: idToken };
    return authResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  } catch (error) {
    console.error("Error during logout:", error);

  }
};
